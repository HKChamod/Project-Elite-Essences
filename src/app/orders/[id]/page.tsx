import { auth } from "@/auth";
import { prisma } from "@/lib/db";
import { redirect, notFound } from "next/navigation";
import Link from "next/link";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { ArrowLeft } from "lucide-react";

interface OrderDetailPageProps {
  params: {
    id: string;
  };
}

export default async function OrderDetailPage({
  params,
}: OrderDetailPageProps) {
  const session = await auth();

  if (!session?.user) {
    redirect("/auth/login");
  }

  const order = await prisma.order.findUnique({
    where: {
      id: params.id,
    },
    include: {
      items: {
        include: {
          product: true,
        },
      },
    },
  });

  if (!order) {
    notFound();
  }

  // Security check: Ensure order belongs to current user
  if (order.userId !== session.user.id && session.user.role !== "admin") {
    redirect("/orders"); // Or show unauthorized
  }

  return (
    <div className="container mx-auto px-4 py-8">
      <div className="mb-8">
        <Button
          variant="ghost"
          asChild
          className="mb-4 pl-0 hover:pl-2 transition-all"
        >
          <Link href="/orders">
            <ArrowLeft className="mr-2 h-4 w-4" />
            Back to Orders
          </Link>
        </Button>
        <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
          <h1 className="text-3xl font-bold">Order #{order.id}</h1>
          <div className="flex items-center gap-2">
            <span className="text-muted-foreground mr-2">Status:</span>
            <Badge variant={order.status === "paid" ? "default" : "secondary"}>
              {order.status.toUpperCase()}
            </Badge>
          </div>
        </div>
        <p className="text-muted-foreground mt-2">
          Placed on {new Date(order.createdAt).toLocaleString()}
        </p>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
        <div className="lg:col-span-2 space-y-8">
          <Card>
            <CardHeader>
              <CardTitle>Items</CardTitle>
            </CardHeader>
            <CardContent>
              <ul className="divide-y">
                {order.items.map((item) => (
                  <li
                    key={item.id}
                    className="py-4 flex justify-between items-center"
                  >
                    <div className="flex items-center gap-4">
                      <div className="h-16 w-16 bg-muted rounded overflow-hidden">
                        {/* Since OrderItem doesn't store image snapshot, we use current product image */}
                        <img
                          src={item.product.image}
                          alt={item.product.name}
                          className="h-full w-full object-cover"
                        />
                      </div>
                      <div>
                        <p className="font-medium">{item.product.name}</p>
                        <p className="text-sm text-muted-foreground">
                          Qty: {item.quantity}
                        </p>
                      </div>
                    </div>
                    <p className="font-medium">
                      ${(item.price * item.quantity).toFixed(2)}
                    </p>
                  </li>
                ))}
              </ul>
            </CardContent>
          </Card>
        </div>

        <div className="space-y-8">
          <Card>
            <CardHeader>
              <CardTitle>Order Summary</CardTitle>
            </CardHeader>
            <CardContent className="space-y-2">
              <div className="flex justify-between">
                <span className="text-muted-foreground">Subtotal</span>
                {/* Recalculate subtotal from stored item prices to be accurate to history */}
                <span>
                  $
                  {order.items
                    .reduce((acc, item) => acc + item.price * item.quantity, 0)
                    .toFixed(2)}
                </span>
              </div>
              <div className="flex justify-between">
                <span className="text-muted-foreground">Shipping</span>
                <span>$10.00</span>
              </div>
              <div className="flex justify-between border-t pt-2 font-bold text-lg">
                <span>Total</span>
                <span>${order.total.toFixed(2)}</span>
              </div>
            </CardContent>
          </Card>

          <Card>
            <CardHeader>
              <CardTitle>Shipping Address</CardTitle>
            </CardHeader>
            <CardContent>
              <p className="text-sm leading-relaxed text-muted-foreground">
                {order.address}
              </p>
            </CardContent>
          </Card>
        </div>
      </div>
    </div>
  );
}
