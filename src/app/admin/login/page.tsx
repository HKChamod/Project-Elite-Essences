"use client";

import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import Link from "next/link";

export default function AdminLoginPage() {
  return (
    <div className="min-h-screen flex items-center justify-center bg-background relative overflow-hidden">
      {/* Different background for Admin */}
      <div className="absolute top-[-50%] left-[-20%] w-[800px] h-[800px] rounded-full bg-secondary/20 blur-[120px]" />

      <Card className="w-full max-w-sm border-border/50 bg-card/60 backdrop-blur-md relative z-10">
        <CardHeader className="space-y-1">
          <CardTitle className="text-2xl text-center text-primary">
            Admin Portal
          </CardTitle>
          <CardDescription className="text-center">
            Restricted Access. Please identify yourself.
          </CardDescription>
        </CardHeader>
        <CardContent className="grid gap-4">
          <div className="grid gap-2">
            <label
              htmlFor="admin-id"
              className="text-sm font-medium leading-none"
            >
              Admin ID
            </label>
            <Input id="admin-id" type="text" placeholder="admin" />
          </div>
          <div className="grid gap-2">
            <label
              htmlFor="password"
              className="text-sm font-medium leading-none"
            >
              Secure Key
            </label>
            <Input id="password" type="password" />
          </div>
          <Button className="w-full bg-gradient-to-r from-primary to-accent hover:opacity-90 transition-opacity" asChild>
            <Link href="/admin/dashboard">
              Enter Dashboard
            </Link>
          </Button>
        </CardContent>
        <CardFooter>
          <Link
            href="/"
            className="text-sm text-center w-full text-muted-foreground hover:text-foreground"
          >
            Return to Site
          </Link>
        </CardFooter>
      </Card>
    </div>
  );
}
