"use client";

import { useCart } from "@/store/use-cart";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import {
  Card,
  CardContent,
  CardHeader,
  CardTitle,
  CardFooter,
} from "@/components/ui/card";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { useState, useEffect } from "react";
import { Trash2 } from "lucide-react";
import { createOrder } from "@/actions/order";

export default function CheckoutPage() {
  const cart = useCart();
  const router = useRouter();
  const [isProcessing, setIsProcessing] = useState(false);
  const [isMounted, setIsMounted] = useState(false);

  useEffect(() => {
    setIsMounted(true);
  }, []);

  const subtotal = cart.items.reduce(
    (total, item) => total + Number(item.price) * item.quantity,
    0
  );
  const shipping = 10.0;
  const total = subtotal + shipping;

  const handlePlaceOrder = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsProcessing(true);

    const formData = new FormData(e.target as HTMLFormElement);
    const shippingDetails = {
      firstName:
        (formData.get("firstName") as string) ||
        (document.getElementById("firstName") as HTMLInputElement).value,
      lastName:
        (formData.get("lastName") as string) ||
        (document.getElementById("lastName") as HTMLInputElement).value,
      email:
        (formData.get("email") as string) ||
        (document.getElementById("email") as HTMLInputElement).value,
      address:
        (formData.get("address") as string) ||
        (document.getElementById("address") as HTMLInputElement).value,
      city:
        (formData.get("city") as string) ||
        (document.getElementById("city") as HTMLInputElement).value,
      zipCode:
        (formData.get("zip") as string) ||
        (document.getElementById("zip") as HTMLInputElement).value,
    };

    const result = await createOrder({
      items: cart.items.map((i) => ({
        id: i.id as unknown as number,
        quantity: i.quantity,
        price: i.price,
      })),
      shippingDetails,
    });

    if (result.success) {
      cart.clearCart();
      alert("Order placed successfully!");
      router.push("/orders");
    } else {
      alert(result.error);
    }

    setIsProcessing(false);
  };

  if (!isMounted) return null;

  if (cart.items.length === 0) {
    return (
      <div className="container mx-auto px-4 py-16 text-center">
        <h1 className="text-3xl font-bold mb-4">Your cart is empty</h1>
        <p className="text-muted-foreground mb-8">
          Add some fragrances to your collection first.
        </p>
        <Button asChild>
          <Link href="/products">Browse Products</Link>
        </Button>
      </div>
    );
  }

  return (
    <div className="container mx-auto px-4 py-8">
      <h1 className="text-3xl font-bold mb-8 bg-clip-text text-transparent bg-gradient-to-r from-primary to-accent">
        Check Out
      </h1>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
        {/* Shipping & Payment Form */}
        <div className="space-y-6">
          <Card>
            <CardHeader>
              <CardTitle>Shipping Details</CardTitle>
            </CardHeader>
            <CardContent>
              <form
                id="checkout-form"
                onSubmit={handlePlaceOrder}
                className="space-y-4"
              >
                <div className="grid grid-cols-2 gap-4">
                  <div className="space-y-2">
                    <Label htmlFor="firstName">First Name</Label>
                    <Input id="firstName" required placeholder="John" />
                  </div>
                  <div className="space-y-2">
                    <Label htmlFor="lastName">Last Name</Label>
                    <Input id="lastName" required placeholder="Doe" />
                  </div>
                </div>
                <div className="space-y-2">
                  <Label htmlFor="email">Email</Label>
                  <Input
                    id="email"
                    type="email"
                    required
                    placeholder="john@example.com"
                  />
                </div>
                <div className="space-y-2">
                  <Label htmlFor="address">Address</Label>
                  <Input id="address" required placeholder="123 Perfume St" />
                </div>
                <div className="grid grid-cols-2 gap-4">
                  <div className="space-y-2">
                    <Label htmlFor="city">City</Label>
                    <Input id="city" required placeholder="New York" />
                  </div>
                  <div className="space-y-2">
                    <Label htmlFor="zip">Zip Code</Label>
                    <Input id="zip" required placeholder="10001" />
                  </div>
                </div>
              </form>
            </CardContent>
          </Card>

          <Card>
            <CardHeader>
              <CardTitle>Payment Method</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="space-y-4">
                <div className="p-4 border rounded-md flex items-center space-x-4 bg-secondary/20">
                  <div className="h-4 w-4 rounded-full bg-primary" />
                  <span className="font-medium">Credit Card (Simulated)</span>
                </div>
                <div className="grid grid-cols-1 gap-4 opacity-50 pointer-events-none">
                  <div className="space-y-2">
                    <Label>Card Number</Label>
                    <Input placeholder="0000 0000 0000 0000" />
                  </div>
                  <div className="grid grid-cols-2 gap-4">
                    <div className="space-y-2">
                      <Label>Expiry</Label>
                      <Input placeholder="MM/YY" />
                    </div>
                    <div className="space-y-2">
                      <Label>CVC</Label>
                      <Input placeholder="123" />
                    </div>
                  </div>
                </div>
              </div>
            </CardContent>
          </Card>
        </div>

        {/* Order Summary */}
        <div>
          <Card>
            <CardHeader>
              <CardTitle>Order Summary</CardTitle>
            </CardHeader>
            <CardContent className="space-y-4">
              <ul className="space-y-4 max-h-96 overflow-y-auto pr-2">
                {cart.items.map((item) => (
                  <li
                    key={item.id}
                    className="flex justify-between items-center bg-secondary/10 p-2 rounded-md"
                  >
                    <div className="flex items-center space-x-4">
                      <div className="w-12 h-12 rounded overflow-hidden bg-muted">
                        <img
                          src={item.image}
                          alt={item.name}
                          className="w-full h-full object-cover"
                        />
                      </div>
                      <div>
                        <p className="font-medium">{item.name}</p>
                        <p className="text-xs text-muted-foreground">
                          Qty: {item.quantity}
                        </p>
                      </div>
                    </div>
                    <div className="text-right">
                      <p className="font-medium">
                        ${(item.price * item.quantity).toFixed(2)}
                      </p>
                      <Button
                        variant="ghost"
                        size="icon"
                        className="h-6 w-6 text-red-500"
                        onClick={() => cart.removeItem(item.id)}
                      >
                        <Trash2 className="h-3 w-3" />
                      </Button>
                    </div>
                  </li>
                ))}
              </ul>

              <div className="border-t pt-4 space-y-2">
                <div className="flex justify-between">
                  <span className="text-muted-foreground">Subtotal</span>
                  <span>${subtotal.toFixed(2)}</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-muted-foreground">Shipping</span>
                  <span>${shipping.toFixed(2)}</span>
                </div>
                <div className="flex justify-between font-bold text-lg pt-2 border-t">
                  <span>Total</span>
                  <span className="text-primary">${total.toFixed(2)}</span>
                </div>
              </div>
            </CardContent>
            <CardFooter>
              <Button
                className="w-full text-lg h-12"
                type="submit"
                form="checkout-form"
                disabled={isProcessing}
              >
                {isProcessing ? "Processing..." : `Pay $${total.toFixed(2)}`}
              </Button>
            </CardFooter>
          </Card>
        </div>
      </div>
    </div>
  );
}
