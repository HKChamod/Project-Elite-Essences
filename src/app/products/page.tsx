import { prisma } from "@/lib/db";
import { ProductList } from "@/components/products/product-list";

export const dynamic = "force-dynamic";

export default async function ProductsPage() {
  const products = await prisma.product.findMany();

  return (
    <div className="container mx-auto px-4 py-12">
      <h1 className="text-4xl font-bold mb-8 bg-clip-text text-transparent bg-gradient-to-r from-primary to-accent">
        The Collection
      </h1>
      <ProductList initialProducts={products} />
    </div>
  );
}
