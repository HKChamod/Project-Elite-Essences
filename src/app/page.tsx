"use client";

import { Button } from "@/components/ui/button";
import {
  Card,
  CardContent,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { motion } from "framer-motion";
import Link from "next/link";
import { ArrowRight, Star, ShieldCheck, Zap } from "lucide-react";

const featuredProducts = [
  {
    id: 1,
    name: "Nebula Wood",
    price: "$120",
    image: "/placeholder-1.jpg", // Placeholder
    description: "Deep, resinous oud with a touch of stellar dust.",
  },
  {
    id: 2,
    name: "Cyber Citrus",
    price: "$95",
    image: "/placeholder-2.jpg",
    description: "Electric lemon and digital bergamot. A fresh burst.",
  },
  {
    id: 3,
    name: "Void Vanilla",
    price: "$110",
    image: "/placeholder-3.jpg",
    description: "Dark, creamy vanilla from the abyss. Sweet yet mysterious.",
  },
];

export default function Home() {
  return (
    <div className="flex flex-col min-h-screen">
      {/* Hero Section */}
      <section className="relative h-[90vh] flex items-center justify-center overflow-hidden">
        <div className="absolute inset-0 z-0">
          <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[800px] h-[800px] bg-primary/20 rounded-full blur-[120px] animate-pulse" />
          <div className="absolute top-0 right-0 w-[500px] h-[500px] bg-accent/10 rounded-full blur-[100px]" />
        </div>

        <div className="container relative z-10 px-4 text-center">
          <motion.h1
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
            className="text-5xl md:text-7xl font-bold tracking-tighter bg-clip-text text-transparent bg-gradient-to-r from-primary via-white to-accent mb-6"
          >
            Scent of the Future
          </motion.h1>
          <motion.p
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.2 }}
            className="text-lg md:text-xl text-muted-foreground max-w-2xl mx-auto mb-8"
          >
            Elite Essences brings you fragrances crafted for the avant-garde.
            Experience olfactory art that transcends time.
          </motion.p>

          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.4 }}
            className="flex flex-col sm:flex-row gap-4 justify-center"
          >
            <Button
              size="lg"
              className="rounded-full px-8 text-lg shadow-[0_0_20px_rgba(255,255,255,0.2)] hover:shadow-[0_0_30px_rgba(255,255,255,0.4)] transition-shadow"
              asChild
            >
              <Link href="/products">Explore Collection</Link>
            </Button>
            <Button
              size="lg"
              variant="outline"
              className="rounded-full px-8 text-lg"
              asChild
            >
              <Link href="/about">Our Story</Link>
            </Button>
          </motion.div>
        </div>
      </section>

      {/* Featured Products */}
      <section className="py-24 bg-background/50 backdrop-blur-sm">
        <div className="container px-4 mx-auto">
          <div className="text-center mb-16">
            <h2 className="text-3xl md:text-4xl font-bold mb-4">
              Featured Essences
            </h2>
            <p className="text-muted-foreground">
              Curated selections for the discerning.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {featuredProducts.map((product, index) => (
              <motion.div
                key={product.id}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.5, delay: index * 0.1 }}
                viewport={{ once: true }}
              >
                <Card className="h-full hover:border-primary/50 transition-colors group">
                  <div className="h-48 bg-secondary/50 rounded-t-lg flex items-center justify-center relative overflow-hidden">
                    {/* Placeholder gradient for image */}
                    <div className="absolute inset-0 bg-gradient-to-br from-secondary to-background" />
                    <Star className="w-12 h-12 text-muted-foreground/20 group-hover:text-accent/50 transition-colors relative z-10" />
                  </div>
                  <CardHeader>
                    <CardTitle className="flex justify-between items-center">
                      <span>{product.name}</span>
                      <span className="text-accent">{product.price}</span>
                    </CardTitle>
                  </CardHeader>
                  <CardContent>
                    <p className="text-sm text-muted-foreground">
                      {product.description}
                    </p>
                  </CardContent>
                  <CardFooter>
                    <Button className="w-full" variant="ghost">
                      View Details <ArrowRight className="ml-2 h-4 w-4" />
                    </Button>
                  </CardFooter>
                </Card>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* Why Choose Us */}
      <section className="py-24 bg-secondary/10">
        <div className="container px-4 mx-auto grid grid-cols-1 md:grid-cols-3 gap-12 text-center">
          <div className="flex flex-col items-center">
            <div className="w-16 h-16 rounded-full bg-primary/20 flex items-center justify-center mb-6">
              <ShieldCheck className="w-8 h-8 text-primary" />
            </div>
            <h3 className="text-xl font-bold mb-2">Authentic Origins</h3>
            <p className="text-muted-foreground">
              Sourced directly from master perfumers worldwide.
            </p>
          </div>
          <div className="flex flex-col items-center">
            <div className="w-16 h-16 rounded-full bg-accent/20 flex items-center justify-center mb-6">
              <Zap className="w-8 h-8 text-accent" />
            </div>
            <h3 className="text-xl font-bold mb-2">Futuristic Blends</h3>
            <p className="text-muted-foreground">
              Innovative scent profiles using AI-driven formulations.
            </p>
          </div>
          <div className="flex flex-col items-center">
            <div className="w-16 h-16 rounded-full bg-primary/20 flex items-center justify-center mb-6">
              <Star className="w-8 h-8 text-primary" />
            </div>
            <h3 className="text-xl font-bold mb-2">Premium Experience</h3>
            <p className="text-muted-foreground">
              Luxury packaging and concierge service.
            </p>
          </div>
        </div>
      </section>
    </div>
  );
}
