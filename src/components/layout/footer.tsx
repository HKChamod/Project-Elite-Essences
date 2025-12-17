import Link from "next/link";

export function Footer() {
  return (
    <footer className="w-full border-t border-border/40 bg-background py-8">
      <div className="container mx-auto px-4 grid grid-cols-1 md:grid-cols-4 gap-8">
        <div>
          <h3 className="text-lg font-bold bg-clip-text text-transparent bg-gradient-to-r from-primary to-accent mb-4">
            Elite Essences
          </h3>
          <p className="text-sm text-muted-foreground">
            Futuristic fragrances for the modern soul. Experience the essence of
            luxury.
          </p>
        </div>

        <div>
          <h4 className="font-semibold mb-4 text-foreground">Links</h4>
          <ul className="space-y-2 text-sm text-muted-foreground">
            <li>
              <Link href="/about" className="hover:text-primary">
                About Us
              </Link>
            </li>
            <li>
              <Link href="/products" className="hover:text-primary">
                Products
              </Link>
            </li>
            <li>
              <Link href="/contact" className="hover:text-primary">
                Contact
              </Link>
            </li>
          </ul>
        </div>

        <div>
          <h4 className="font-semibold mb-4 text-foreground">Legal</h4>
          <ul className="space-y-2 text-sm text-muted-foreground">
            <li>
              <Link href="/privacy" className="hover:text-primary">
                Privacy Policy
              </Link>
            </li>
            <li>
              <Link href="/terms" className="hover:text-primary">
                Terms of Service
              </Link>
            </li>
          </ul>
        </div>

        <div>
          <h4 className="font-semibold mb-4 text-foreground">Connect</h4>
          <div className="flex space-x-4">
            {/* Social Icons Placeholders */}
            <div className="h-8 w-8 rounded-full bg-secondary flex items-center justify-center text-muted-foreground hover:bg-primary hover:text-primary-foreground transition-colors cursor-pointer">
              IG
            </div>
            <div className="h-8 w-8 rounded-full bg-secondary flex items-center justify-center text-muted-foreground hover:bg-primary hover:text-primary-foreground transition-colors cursor-pointer">
              TW
            </div>
          </div>
        </div>
      </div>
      <div className="container mx-auto px-4 mt-8 pt-8 border-t border-border/40 text-center text-sm text-muted-foreground">
        &copy; {new Date().getFullYear()} Elite Essences. All rights reserved.
      </div>
    </footer>
  );
}
