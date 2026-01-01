"use client";

import { useActionState } from "react";
import { createProduct } from "@/actions/admin";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Label } from "@/components/ui/label";
import { useRouter } from "next/navigation";
import { useEffect } from "react";
import Link from "next/link";
import { ArrowLeft } from "lucide-react";

import { ActionState } from "@/actions/admin";

const initialState: ActionState = {
  error: "",
  success: false,
  fields: {},
};

export default function NewProductPage() {
  const router = useRouter();
  const [state, action, isPending] = useActionState(
    createProduct,
    initialState
  );

  useEffect(() => {
    if (state.success) {
      router.push("/admin/products");
    }
  }, [state.success, router]);

  return (
    <div className="container mx-auto px-4 py-8 max-w-2xl">
      <Link
        href="/admin/products"
        className="inline-flex items-center text-muted-foreground hover:text-foreground mb-6"
      >
        <ArrowLeft className="w-4 h-4 mr-2" />
        Back to Products
      </Link>

      <div className="bg-card border rounded-lg p-6 shadow-sm">
        <h1 className="text-2xl font-bold mb-6">Add New Product</h1>

        {state.error && !state.fields && (
          <div className="bg-destructive/15 text-destructive p-3 rounded-md mb-6 text-sm">
            {state.error}
          </div>
        )}

        <form action={action} className="space-y-6">
          <div className="space-y-2">
            <Label
              htmlFor="name"
              className={state.fields?.name ? "text-destructive" : ""}
            >
              Product Name
            </Label>
            <Input
              id="name"
              name="name"
              placeholder="e.g. Nebula Wood"
              // required // Removed required to test server validation
              className={state.fields?.name ? "border-destructive" : ""}
            />
            {state.fields?.name && (
              <p className="text-xs text-destructive">{state.fields.name}</p>
            )}
          </div>

          <div className="grid grid-cols-2 gap-4">
            <div className="space-y-2">
              <Label
                htmlFor="category"
                className={state.fields?.category ? "text-destructive" : ""}
              >
                Category
              </Label>
              <Input
                id="category"
                name="category"
                placeholder="e.g. Woody"
                className={state.fields?.category ? "border-destructive" : ""}
              />
              {state.fields?.category && (
                <p className="text-xs text-destructive">
                  {state.fields.category}
                </p>
              )}
            </div>
            <div className="space-y-2">
              <Label
                htmlFor="price"
                className={state.fields?.price ? "text-destructive" : ""}
              >
                Price ($)
              </Label>
              <Input
                id="price"
                name="price"
                type="number"
                step="0.01"
                min="0"
                placeholder="0.00"
                className={state.fields?.price ? "border-destructive" : ""}
              />
              {state.fields?.price && (
                <p className="text-xs text-destructive">{state.fields.price}</p>
              )}
            </div>
          </div>

          <div className="space-y-2">
            <Label
              htmlFor="image"
              className={state.fields?.image ? "text-destructive" : ""}
            >
              Image URL
            </Label>
            <Input
              id="image"
              name="image"
              type="url"
              placeholder="https://example.com/image.jpg"
              defaultValue="https://images.unsplash.com/photo-1594038683742-9411f1d7f4b7?q=80&w=3087&auto=format&fit=crop"
              className={state.fields?.image ? "border-destructive" : ""}
            />
            {state.fields?.image && (
              <p className="text-xs text-destructive">{state.fields.image}</p>
            )}
            <p className="text-xs text-muted-foreground">
              Provide a direct link to the product image.
            </p>
          </div>

          <div className="space-y-2">
            <Label
              htmlFor="description"
              className={state.fields?.description ? "text-destructive" : ""}
            >
              Description
            </Label>
            <Textarea
              id="description"
              name="description"
              placeholder="Describe the fragrance notes and character..."
              rows={4}
              className={state.fields?.description ? "border-destructive" : ""}
            />
            {state.fields?.description && (
              <p className="text-xs text-destructive">
                {state.fields.description}
              </p>
            )}
          </div>

          <div className="flex justify-end gap-4 pt-4">
            <Button
              type="button"
              variant="outline"
              onClick={() => router.back()}
              disabled={isPending}
            >
              Cancel
            </Button>
            <Button type="submit" disabled={isPending}>
              {isPending ? "Creating..." : "Create Product"}
            </Button>
          </div>
        </form>
      </div>
    </div>
  );
}
