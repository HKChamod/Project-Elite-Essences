"use server";

import { auth } from "@/auth";
import { prisma } from "@/lib/db";
import { revalidatePath } from "next/cache";

interface CreateOrderParams {
  items: {
    id: number;
    quantity: number;
    price: number; // For validation/snapshot (though we should double check DB)
  }[];
  shippingDetails: {
    firstName: string;
    lastName: string;
    email: string;
    address: string;
    city: string;
    zipCode: string;
  };
}

export async function createOrder({ items, shippingDetails }: CreateOrderParams) {
  try {
    const session = await auth();

    if (!session?.user?.id) {
      return { error: "You must be logged in to place an order." };
    }

    // Verify items and calculate total from DB (secure price check)
    // We fetch all products involved to get their current price
    const productIds = items.map((i) => i.id);
    const dbProducts = await prisma.product.findMany({
        where: { id: { in: productIds } }
    });

    let total = 0;
    const orderItemsData = items.map((item) => {
        const product = dbProducts.find((p) => p.id === item.id);
        if (!product) {
            throw new Error(`Product with ID ${item.id} not found.`);
        }
        
        // Use DB price for calculation
        const itemTotal = product.price * item.quantity;
        total += itemTotal;

        return {
            productId: product.id,
            quantity: item.quantity,
            price: product.price // Snapshot price at time of order
        };
    });

    // Add shipping cost (hardcoded 10 for now as per ui)
    total += 10.00;

    const fullAddress = `${shippingDetails.address}, ${shippingDetails.city}, ${shippingDetails.zipCode}`;

    // Create Order with Transaction
    // Note: We use a transaction if we were deducting stock, but for now simple create is fine.
    const order = await prisma.order.create({
      data: {
        userId: session.user.id,
        status: "pending",
        total: total,
        address: fullAddress,
        items: {
            create: orderItemsData
        }
      },
    });

    revalidatePath("/admin/dashboard");
    
    return { success: true, orderId: order.id };

  } catch (error) {
    console.error("Order creation failed:", error);
    return { error: "Failed to place order. Please try again." };
  }
}
