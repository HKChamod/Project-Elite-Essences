import { auth } from "@/auth";
import { prisma } from "@/lib/db";
import { redirect } from "next/navigation";
import Link from "next/link";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";

export default async function OrdersPage() {
  const session = await auth();

  if (!session?.user) {
    redirect("/auth/login?callbackUrl=/orders");
  }

  const orders = await prisma.order.findMany({
    where: {
      userId: session.user.id,
    },
    orderBy: {
      createdAt: "desc",
    },
    include: {
      items: true,
    },
  });

  return (
    <div className="container mx-auto px-4 py-8">
      <h1 className="text-3xl font-bold mb-8">My Orders</h1>

      {orders.length === 0 ? (
        <div className="text-center py-12">
          <p className="text-muted-foreground mb-4">
            You haven't placed any orders yet.
          </p>
          <Button asChild>
            <Link href="/products">Start Shopping</Link>
          </Button>
        </div>
      ) : (
        <div className="space-y-4">
          {orders.map((order) => (
            <Card key={order.id}>
              <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                <div className="space-y-1">
                  <CardTitle className="text-base">
                    Order #{order.id.slice(-8)}
                  </CardTitle>
                  <CardDescription>
                    {new Date(order.createdAt).toLocaleDateString()}
                  </CardDescription>
                </div>
                <div className="ml-auto flex items-center gap-4">
                  <Badge
                    variant={
                      order.status === "paid"
                        ? "default"
                        : order.status === "pending"
                        ? "secondary"
                        : "destructive"
                    }
                  >
                    {order.status}
                  </Badge>
                  <span className="font-bold">${order.total.toFixed(2)}</span>
                </div>
              </CardHeader>
              <CardContent>
                <div className="text-sm text-muted-foreground mb-4">
                  {order.items.length} item(s) to{" "}
                  {order.address.split(",")[1] || "Address"}
                </div>
                <Button variant="outline" size="sm" asChild>
                  <Link href={`/orders/${order.id}`}>View Details</Link>
                </Button>
              </CardContent>
            </Card>
          ))}
        </div>
      )}
    </div>
  );
}
