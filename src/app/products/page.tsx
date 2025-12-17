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

const products = [
  {
    id: 1,
    name: "Nebula Wood",
    category: "Woody",
    price: 120,
    image: "/placeholder-1.jpg",
    description: "Deep, resinous oud with a touch of stellar dust.",
  },
  {
    id: 2,
    name: "Cyber Citrus",
    category: "Fresh",
    price: 95,
    image: "/placeholder-2.jpg",
    description: "Electric lemon and digital bergamot.",
  },
  {
    id: 3,
    name: "Void Vanilla",
    category: "Oriental",
    price: 110,
    image: "/placeholder-3.jpg",
    description: "Dark, creamy vanilla from the abyss.",
  },
  {
    id: 4,
    name: "Quantum Rose",
    category: "Floral",
    price: 135,
    image: "/placeholder-4.jpg",
    description: "A rose that blooms in zero gravity.",
  },
  {
    id: 5,
    name: "Neon Musk",
    category: "Musk",
    price: 105,
    image: "/placeholder-5.jpg",
    description: "Synthetic musk with a radiant glow.",
  },
  {
    id: 6,
    name: "Plasma Patchouli",
    category: "Woody",
    price: 115,
    image: "/placeholder-6.jpg",
    description: "Earthy patchouli energized by plasma.",
  },
];

export default function ProductsPage() {
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

  const filteredProducts = products.filter((product) => {
    const matchesSearch = product.name
      .toLowerCase()
      .includes(searchTerm.toLowerCase());
    const matchesCategory =
      selectedCategory === "All" || product.category === selectedCategory;
    return matchesSearch && matchesCategory;
  });

  return (
    <div className="container mx-auto px-4 py-12">
      <h1 className="text-4xl font-bold mb-8 bg-clip-text text-transparent bg-gradient-to-r from-primary to-accent">
        The Collection
      </h1>

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
              <div className="absolute inset-0 bg-gradient-to-br from-secondary/80 to-background z-0" />
              <div className="z-10 text-4xl opacity-50 group-hover:opacity-100 transition-opacity transform group-hover:scale-110 duration-500">
                {/* Placeholder visualization */}
                🧪
              </div>
            </div>
            <CardHeader>
              <div className="flex justify-between items-start">
                <div>
                  <CardTitle>{product.name}</CardTitle>
                  <p className="text-sm text-muted-foreground mt-1">
                    {product.category}
                  </p>
                </div>
                <span className="text-accent font-bold">${product.price}</span>
              </div>
            </CardHeader>
            <CardContent>
              <p className="text-sm text-muted-foreground">
                {product.description}
              </p>
            </CardContent>
            <CardFooter>
              <Button className="w-full">Add to Cart</Button>
            </CardFooter>
          </Card>
        ))}
      </div>
    </div>
  );
}
