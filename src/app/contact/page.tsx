"use client";

import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import {
  Card,
  CardContent,
  CardHeader,
  CardTitle,
  CardDescription,
} from "@/components/ui/card";
import { MapPin, Phone, Mail } from "lucide-react";

export default function ContactPage() {
  return (
    <div className="container mx-auto px-4 py-12">
      <h1 className="text-4xl font-bold mb-12 text-center bg-clip-text text-transparent bg-gradient-to-r from-primary to-accent">
        Contact Us
      </h1>

      <div className="grid md:grid-cols-2 gap-12 max-w-5xl mx-auto">
        {/* Contact Form */}
        <Card className="border-border/50 bg-card/40 backdrop-blur-md">
          <CardHeader>
            <CardTitle>Send a Message</CardTitle>
            <CardDescription>We'd love to hear from you.</CardDescription>
          </CardHeader>
          <CardContent className="space-y-4">
            <div className="grid gap-2">
              <label htmlFor="name" className="text-sm font-medium">
                Name
              </label>
              <Input id="name" placeholder="John Doe" />
            </div>
            <div className="grid gap-2">
              <label htmlFor="email" className="text-sm font-medium">
                Email
              </label>
              <Input id="email" type="email" placeholder="john@example.com" />
            </div>
            <div className="grid gap-2">
              <label htmlFor="message" className="text-sm font-medium">
                Message
              </label>
              <textarea
                className="flex min-h-[120px] w-full rounded-md border border-input bg-background/50 px-3 py-2 text-sm shadow-sm placeholder:text-muted-foreground focus-visible:outline-none focus-visible:ring-1 focus-visible:ring-ring disabled:cursor-not-allowed disabled:opacity-50"
                placeholder="Your inquiry..."
              />
            </div>
            <Button className="w-full">Send Message</Button>
          </CardContent>
        </Card>

        {/* Info & Map */}
        <div className="space-y-8">
          <div className="space-y-6">
            <div className="flex items-start space-x-4">
              <MapPin className="w-6 h-6 text-primary mt-1" />
              <div>
                <h3 className="font-semibold">Headquarters</h3>
                <p className="text-muted-foreground">
                  123 Nebula Way, Tech District
                  <br />
                  Neo-Tokyo, NT 90210
                </p>
              </div>
            </div>
            <div className="flex items-start space-x-4">
              <Phone className="w-6 h-6 text-primary mt-1" />
              <div>
                <h3 className="font-semibold">Phone</h3>
                <p className="text-muted-foreground">+1 (555) 000-0000</p>
              </div>
            </div>
            <div className="flex items-start space-x-4">
              <Mail className="w-6 h-6 text-primary mt-1" />
              <div>
                <h3 className="font-semibold">Email</h3>
                <p className="text-muted-foreground">
                  contact@eliteessences.com
                </p>
              </div>
            </div>
          </div>

          <div className="h-64 rounded-lg bg-secondary/30 relative overflow-hidden border border-border/50 flex items-center justify-center">
            <span className="text-muted-foreground">Map Placeholder</span>
            {/* Gradient overlay to simulate look */}
            <div className="absolute inset-0 bg-gradient-to-t from-background/80 to-transparent pointer-events-none" />
          </div>
        </div>
      </div>
    </div>
  );
}
