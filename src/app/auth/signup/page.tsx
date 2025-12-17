"use client";

import Link from "next/link";
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
import { SocialAuth } from "@/components/auth/social-auth";

export default function SignUpPage() {
  return (
    <Card className="border-border/50 bg-card/60 backdrop-blur-md">
      <CardHeader className="space-y-1">
        <CardTitle className="text-2xl text-center">
          Create an account
        </CardTitle>
        <CardDescription className="text-center">
          Enter your email below to create your account
        </CardDescription>
      </CardHeader>
      <CardContent className="grid gap-4">
        <SocialAuth />
        <div className="relative">
          <div className="absolute inset-0 flex items-center">
            <span className="w-full border-t border-border/50" />
          </div>
          <div className="relative flex justify-center text-xs uppercase">
            <span className="bg-background px-2 text-muted-foreground">
              Or continue with
            </span>
          </div>
        </div>
        <div className="grid gap-2">
          <label
            htmlFor="email"
            className="text-sm font-medium leading-none peer-disabled:cursor-not-allowed peer-disabled:opacity-70"
          >
            Email
          </label>
          <Input id="email" type="email" placeholder="m@example.com" />
        </div>
        <div className="grid gap-2">
          <label
            htmlFor="password"
            className="text-sm font-medium leading-none peer-disabled:cursor-not-allowed peer-disabled:opacity-70"
          >
            Password
          </label>
          <Input id="password" type="password" />
        </div>
        <div className="grid gap-2">
          <label
            htmlFor="confirm-password"
            className="text-sm font-medium leading-none peer-disabled:cursor-not-allowed peer-disabled:opacity-70"
          >
            Confirm Password
          </label>
          <Input id="confirm-password" type="password" />
        </div>
        <Button className="w-full">Create Account</Button>
      </CardContent>
      <CardFooter>
        <div className="text-sm text-center text-muted-foreground w-full">
          Already have an account?{" "}
          <Link
            href="/auth/login"
            className="underline underline-offset-4 hover:text-primary"
          >
            Sign in
          </Link>
        </div>
      </CardFooter>
    </Card>
  );
}
