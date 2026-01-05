"use client";

import { ShoppingBag } from "lucide-react";
import { useCart } from "@/store/use-cart";
import { Button } from "@/components/ui/button";
import {
  Sheet,
  SheetContent,
  SheetHeader,
  SheetTitle,
  SheetTrigger,
  SheetFooter,
} from "@/components/ui/sheet";
import { CartItemCard } from "./cart-item";
import { useEffect, useState } from "react";
import Link from "next/link";
import { cn } from "@/lib/utils";

export function CartSheet() {
  const [isMounted, setIsMounted] = useState(false);
  const cart = useCart();

  useEffect(() => {
    setIsMounted(true);
  }, []);

  if (!isMounted) {
    return (
      <Button variant="ghost" size="icon" className="relative">
        <ShoppingBag className="h-5 w-5" />
        <span className="absolute -top-1 -right-1 h-4 w-4 rounded-full bg-primary text-[10px] font-bold text-primary-foreground flex items-center justify-center">
          0
        </span>
      </Button>
    );
  }

  const itemsCount = cart.items.reduce(
    (total, item) => total + item.quantity,
    0
  );
  const total = cart.items.reduce(
    (total, item) => total + Number(item.price) * item.quantity,
    0
  );

  return (
    <Sheet>
      <SheetTrigger asChild>
        <Button variant="ghost" size="icon" className="relative">
          <ShoppingBag className="h-5 w-5" />
          {itemsCount > 0 && (
            <span className="absolute -top-1 -right-1 h-4 w-4 rounded-full bg-primary text-[10px] font-bold text-primary-foreground flex items-center justify-center">
              {itemsCount}
            </span>
          )}
        </Button>
      </SheetTrigger>
      <SheetContent className="flex w-full flex-col pr-0 sm:max-w-lg">
        <SheetHeader className="px-1">
          <SheetTitle>My Cart ({itemsCount})</SheetTitle>
        </SheetHeader>
        {cart.items.length === 0 ? (
          <div className="flex h-full flex-col items-center justify-center space-y-2">
            <ShoppingBag className="h-12 w-12 text-muted-foreground" />
            <span className="text-lg font-medium text-muted-foreground">
              Your cart is empty
            </span>
            <Button
              asChild
              variant="link"
              className="text-primary"
              onClick={() => document.getElementById("close-cart")?.click()}
            >
              <Link href="/products">Start Shopping</Link>
            </Button>
          </div>
        ) : (
          <>
            <ul className="flex-1 overflow-y-auto px-4 py-4">
              {cart.items.map((item) => (
                <CartItemCard key={item.id} data={item} />
              ))}
            </ul>
            <div className="space-y-4 pr-6 pb-6 pt-4 border-t mr-6">
              <div className="flex items-center justify-between text-base font-medium">
                <span>Subtotal</span>
                <span>${total.toFixed(2)}</span>
              </div>
              <p className="text-xs text-muted-foreground">
                Shipping and taxes calculated at checkout.
              </p>
              <div className="grid gap-2">
                <Button className="w-full" asChild>
                  <Link href="/checkout">Checkout</Link>
                </Button>
                <Button
                  variant="outline"
                  className="w-full"
                  onClick={cart.clearCart}
                >
                  Clear Cart
                </Button>
              </div>
            </div>
          </>
        )}
      </SheetContent>
    </Sheet>
  );
}
