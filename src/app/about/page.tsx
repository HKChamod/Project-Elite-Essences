export default function AboutPage() {
  return (
    <div className="container mx-auto px-4 py-12">
      <div className="max-w-4xl mx-auto space-y-12">
        <section className="text-center space-y-6">
          <h1 className="text-4xl md:text-5xl font-bold bg-clip-text text-transparent bg-gradient-to-r from-primary to-accent">
            Our Story
          </h1>
          <p className="text-xl text-muted-foreground">
            Forging the future of fragrance through alchemy and algorithm.
          </p>
        </section>

        <section className="grid md:grid-cols-2 gap-12 items-center">
          <div className="h-[400px] rounded-lg bg-secondary/30 relative overflow-hidden border border-border/50">
            <div className="absolute inset-0 bg-gradient-to-br from-primary/20 to-transparent" />
            {/* Image placeholder */}
          </div>
          <div className="space-y-6">
            <h2 className="text-2xl font-semibold">The Genesis</h2>
            <p className="text-muted-foreground">
              Elite Essences was born from a singular question: What does the
              future smell like? Founded in 2042 (conceptually), we bridge the
              gap between traditional perfumery and molecular science.
            </p>
            <p className="text-muted-foreground">
              Our scents are designed not just to adhere to skin, but to project
              an aura. Using sustainable synthetics and rare naturals, we create
              olfactory signatures for the bold.
            </p>
          </div>
        </section>

        <section className="grid md:grid-cols-2 gap-12 items-center md:flex-row-reverse">
          <div className="space-y-6 md:order-1">
            <h2 className="text-2xl font-semibold">Our Philosophy</h2>
            <p className="text-muted-foreground">
              We believe in the power of the invisible. Scent is the most primal
              sense, yet often the most overlooked in the digital age. We bring
              texture, depth, and emotion back to the forefront.
            </p>
          </div>
          <div className="h-[400px] rounded-lg bg-secondary/30 relative overflow-hidden border border-border/50">
            <div className="absolute inset-0 bg-gradient-to-bl from-accent/20 to-transparent" />
          </div>
        </section>
      </div>
    </div>
  );
}
