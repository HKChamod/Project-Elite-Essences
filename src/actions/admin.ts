"use server";

import { auth } from "@/auth";
import { prisma } from "@/lib/db";
import { revalidatePath } from "next/cache";
import { z } from "zod";

const productSchema = z.object({
  name: z.string().min(1, "Name is required"),
  category: z.string().min(1, "Category is required"),
  price: z.preprocess(
    (a) => parseFloat(z.string().parse(a)),
    z.number().min(0, "Price must be positive")
  ),
  image: z.string().url("Invalid image URL"),
  description: z.string().min(1, "Description is required"),
});

export type ActionState = {
  error?: string;
  success?: boolean;
  fields?: Record<string, string>;
};

export async function createProduct(prevState: ActionState, formData: FormData): Promise<ActionState> {
  const session = await auth();
  if (session?.user?.role !== "admin") {
    return { error: "Unauthorized" };
  }

  const validatedFields = productSchema.safeParse({
    name: formData.get("name"),
    category: formData.get("category"),
    price: formData.get("price"),
    image: formData.get("image"),
    description: formData.get("description"),
  });

  if (!validatedFields.success) {
    return {
      error: "Invalid fields",
      fields: Object.fromEntries(
        Object.entries(validatedFields.error.flatten().fieldErrors).map(([key, value]) => [key, value[0]])
      ),
    };
  }

  try {
    await prisma.product.create({
      data: validatedFields.data,
    });
  } catch (error) {
    return { error: "Failed to create product" };
  }
  
  revalidatePath("/admin/products");
  revalidatePath("/products");
  return { success: true };
}

export async function deleteProduct(productId: number) {
  const session = await auth();
  if (session?.user?.role !== "admin") {
    return { error: "Unauthorized" };
  }

  try {
    await prisma.product.delete({
      where: { id: productId },
    });
    revalidatePath("/admin/products");
    revalidatePath("/products");
    return { success: true };
  } catch (error) {
    return { error: "Failed to delete product" };
  }
}
