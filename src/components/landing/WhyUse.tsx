import { CheckCircle2, ArrowRight } from "lucide-react";
import { Button } from "@/components/ui/button";

const benefits = [
  "Instant document generation with accurate legal language",
  "Secure document storage tied to your NBA profile",
  "Administrative oversight and compliance tracking",
  "Accessible from any device, any branch",
  "Email notifications for every status change",
  "Full version history for every document prepared",
];

const WhyUse = () => (
  <section className="py-32 bg-parchment">
    <div className="container mx-auto grid lg:grid-cols-2 gap-20 items-center">
      <div>
        <div className="flex items-center gap-4 mb-6">
          <span className="h-px w-12 bg-accent" />
          <span className="text-[11px] tracking-eyebrow uppercase text-accent font-semibold">Why use it</span>
        </div>
        <h2 className="font-display text-5xl md:text-6xl tracking-display text-primary font-light leading-[1.05] mb-8">
          Why use the<br />
          <em className="italic font-normal text-accent">Remuneration Portal?</em>
        </h2>
        <p className="text-lg text-muted-foreground leading-relaxed mb-10">
          Designed specifically for NBA members, the portal eliminates manual paperwork and ensures every document is prepared to the correct legal standard with full committee oversight.
        </p>
        <Button variant="hero" size="xl">
          Get Started <ArrowRight className="ml-2 h-4 w-4" />
        </Button>
      </div>

      <div className="space-y-3">
        {benefits.map((b, i) => (
          <div
            key={b}
            className="group flex items-center gap-5 bg-card p-5 border border-border hover:border-accent/40 hover:shadow-soft transition-elegant"
            style={{ animationDelay: `${i * 60}ms` }}
          >
            <div className="flex-shrink-0 h-10 w-10 rounded-full bg-accent-soft flex items-center justify-center text-accent group-hover:bg-accent group-hover:text-accent-foreground transition-elegant">
              <CheckCircle2 className="h-5 w-5" />
            </div>
            <p className="text-base text-primary font-medium">{b}</p>
          </div>
        ))}
      </div>
    </div>
  </section>
);

export default WhyUse;
