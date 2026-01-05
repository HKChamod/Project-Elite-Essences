"use client";

import { Button } from "@/components/ui/button";
import {
  Card,
  CardContent,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Search } from "lucide-react";
import { useState } from "react";
import { Product } from "@prisma/client";
import { useCart } from "@/store/use-cart";

interface ProductListProps {
  initialProducts: Product[];
}

export function ProductList({ initialProducts }: ProductListProps) {
  const cart = useCart();
  const [searchTerm, setSearchTerm] = useState("");
  const [selectedCategory, setSelectedCategory] = useState("All");

  const highlightCategories = [
    "All",
    "Woody",
    "Fresh",
    "Oriental",
    "Floral",
    "Musk",
  ];

  const filteredProducts = initialProducts.filter((product) => {
    const matchesSearch = product.name
      .toLowerCase()
      .includes(searchTerm.toLowerCase());
    const matchesCategory =
      selectedCategory === "All" || product.category === selectedCategory;
    return matchesSearch && matchesCategory;
  });

  return (
    <div>
      {/* Filters & Search */}
      <div className="flex flex-col md:flex-row gap-6 mb-12 items-center justify-between">
        <div className="flex flex-wrap gap-2">
          {highlightCategories.map((category) => (
            <Button
              key={category}
              variant={selectedCategory === category ? "default" : "outline"}
              onClick={() => setSelectedCategory(category)}
              size="sm"
            >
              {category}
            </Button>
          ))}
        </div>
        <div className="relative w-full md:w-72">
          <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-muted-foreground" />
          <Input
            placeholder="Search essences..."
            className="pl-9"
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
          />
        </div>
      </div>

      {/* Product Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
        {filteredProducts.map((product) => (
          <Card
            key={product.id}
            className="hover:border-primary/50 transition-colors"
          >
            <div className="h-64 bg-secondary/50 rounded-t-lg flex items-center justify-center relative overflow-hidden group">
              {product.image ? (
                <img
                  src={product.image}
                  alt={product.name}
                  className="h-full w-full object-cover transition-transform transform group-hover:scale-110 duration-500"
                />
              ) : (
                <>
                  <div className="absolute inset-0 bg-gradient-to-br from-secondary/80 to-background z-0" />
                  <div className="z-10 text-4xl opacity-50 group-hover:opacity-100 transition-opacity transform group-hover:scale-110 duration-500">
                    🧪
                  </div>
                </>
              )}
            </div>
            <CardHeader>
              <div className="flex justify-between items-start">
                <div>
                  <CardTitle>{product.name}</CardTitle>
                  <p className="text-sm text-muted-foreground mt-1">
                    {product.category}
                  </p>
                </div>
                <span className="text-accent font-bold">
                  ${product.price.toFixed(2)}
                </span>
              </div>
            </CardHeader>
            <CardContent>
              <p className="text-sm text-muted-foreground line-clamp-2">
                {product.description}
              </p>
            </CardContent>
            <CardFooter>
              <Button
                className="w-full"
                onClick={() => {
                  cart.addItem({
                    id: product.id,
                    name: product.name,
                    price: product.price,
                    image: product.image || "",
                    quantity: 1,
                    category: product.category || undefined,
                  });
                }}
              >
                Add to Cart
              </Button>
            </CardFooter>
          </Card>
        ))}
      </div>
    </div>
  );
}
