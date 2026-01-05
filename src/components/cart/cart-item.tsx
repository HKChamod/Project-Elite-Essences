"use client";

import { X, Minus, Plus } from "lucide-react";
import { useCart, CartItem } from "@/store/use-cart";
import { Button } from "@/components/ui/button";

interface CartItemProps {
  data: CartItem;
}

export function CartItemCard({ data }: CartItemProps) {
  const cart = useCart();

  const onRemove = () => {
    cart.removeItem(data.id);
  };

  const onIncrease = () => {
    cart.updateQuantity(data.id, data.quantity + 1);
  };

  const onDecrease = () => {
    if (data.quantity > 1) {
      cart.updateQuantity(data.id, data.quantity - 1);
    }
  };

  return (
    <li className="flex py-6 border-b">
      <div className="h-24 w-24 flex-shrink-0 overflow-hidden rounded-md border border-gray-200">
        <img
          src={data.image}
          alt={data.name}
          className="h-full w-full object-cover object-center"
        />
      </div>

      <div className="ml-4 flex flex-1 flex-col">
        <div>
          <div className="flex justify-between text-base font-medium">
            <h3 className="text-foreground">{data.name}</h3>
            <p className="ml-4">${(data.price * data.quantity).toFixed(2)}</p>
          </div>
          <p className="mt-1 text-sm text-muted-foreground">{data.category}</p>
        </div>
        <div className="flex flex-1 items-end justify-between text-sm">
          <div className="flex items-center space-x-2">
            <Button
              variant="outline"
              size="icon"
              className="h-8 w-8"
              onClick={onDecrease}
              disabled={data.quantity <= 1}
            >
              <Minus className="h-3 w-3" />
            </Button>
            <span className="w-4 text-center">{data.quantity}</span>
            <Button
              variant="outline"
              size="icon"
              className="h-8 w-8"
              onClick={onIncrease}
            >
              <Plus className="h-3 w-3" />
            </Button>
          </div>

          <Button
            onClick={onRemove}
            variant="ghost"
            size="sm"
            className="text-red-500 hover:text-red-600 hover:bg-red-100/10"
          >
            <X className="w-4 h-4 mr-1" />
            Remove
          </Button>
        </div>
      </div>
    </li>
  );
}
