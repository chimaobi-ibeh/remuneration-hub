import { Button } from "@/components/ui/button";
import { ArrowRight } from "lucide-react";
import hero from "@/assets/hero-courthouse.jpg";
import { Link } from "react-router-dom";

const Hero = () => {
  return (
  <section className="relative min-h-[100vh] flex items-center overflow-hidden pt-20">
    <div className="absolute inset-0">
      <img src={hero} alt="Nigerian courthouse at golden hour" className="h-full w-full object-cover" width={1920} height={1280} />
      <div className="absolute inset-0 bg-hero-overlay" />
    </div>

    <div className="container mx-auto relative z-10 grid lg:grid-cols-12 gap-12 items-center py-24">
      <div className="lg:col-span-8 animate-fade-up">
        <div className="flex items-center gap-4 mb-8">
          <span className="h-px w-12 bg-accent" />
          <span className="text-[11px] tracking-eyebrow uppercase text-accent font-medium">Nigerian Bar Association · Est. 1959</span>
        </div>

        <h1 className="font-display text-[clamp(3rem,7vw,6.5rem)] leading-[0.95] tracking-display text-ivory font-light mb-8">
          Where law<br />
          meets <em className="text-gradient-gold not-italic font-normal italic">precision.</em>
        </h1>

        <p className="text-lg md:text-xl text-ivory/80 max-w-2xl mb-12 leading-relaxed">
          A dedicated platform for NBA members to prepare, manage, and track legal documents — with streamlined administrative oversight and full committee approval workflows.
        </p>

        <div className="flex flex-wrap gap-4">
          <Button asChild variant="hero" size="xl">
            <Link to="/auth/register">Create Account <ArrowRight className="ml-2 h-4 w-4" /></Link>
          </Button>
          <Button asChild variant="ghostLight" size="xl">
            <Link to="/auth/signin">Member Sign In</Link>
          </Button>
        </div>

        <div className="mt-20 grid grid-cols-3 gap-8 max-w-2xl border-t border-ivory/15 pt-8">
          {[
            { k: "120+", v: "NBA Branches" },
            { k: "10k+", v: "Documents Filed" },
            { k: "100%", v: "Compliance Tracked" },
          ].map((s) => (
            <div key={s.v}>
              <p className="font-display text-3xl md:text-4xl text-ivory font-light">{s.k}</p>
              <p className="text-xs tracking-eyebrow uppercase text-ivory/60 mt-2">{s.v}</p>
            </div>
          ))}
        </div>
      </div>
    </div>

    <div className="absolute bottom-8 left-1/2 -translate-x-1/2 flex flex-col items-center gap-2 text-ivory/60 animate-shimmer">
      <span className="text-[10px] tracking-eyebrow uppercase">Scroll</span>
      <div className="h-12 w-px bg-ivory/40" />
    </div>
  </section>
  );
};

export default Hero;
