import { Button } from "@/components/ui/button";
import { ArrowRight } from "lucide-react";
import { Link } from "react-router-dom";

const CTA = () => {
  return (
    <section className="py-24 bg-emerald relative overflow-hidden">
      <div className="absolute inset-0 opacity-[0.04]" style={{
        backgroundImage: 'radial-gradient(circle at 2px 2px, hsl(var(--accent)) 1px, transparent 0)',
        backgroundSize: '32px 32px'
      }} />
      <div className="absolute right-0 top-1/2 -translate-y-1/2 hidden lg:block opacity-10">
        <p className="font-display text-[14rem] font-light text-accent leading-none tracking-display">NBA</p>
      </div>

      <div className="container mx-auto relative grid lg:grid-cols-2 gap-12 items-center">
        <div>
          <div className="flex items-center gap-4 mb-6">
            <span className="h-px w-12 bg-accent" />
            <span className="text-[11px] tracking-eyebrow uppercase text-accent font-semibold">Ready to get started?</span>
          </div>
          <h2 className="font-display text-5xl md:text-6xl text-ivory font-light leading-[1.05] tracking-display mb-6">
            Join the future of<br />
            <em className="italic font-normal text-gradient-gold">legal documentation.</em>
          </h2>
          <p className="text-ivory/75 text-lg leading-relaxed max-w-xl">
            Register your NBA member account today and gain instant access to professional document preparation, approval workflows, and remuneration tracking.
          </p>
        </div>

        <div className="flex flex-wrap gap-4 lg:justify-end">
          <Button asChild variant="gold" size="xl">
            <Link to="/auth/register">Create Account <ArrowRight className="ml-2 h-4 w-4" /></Link>
          </Button>
          <Button asChild variant="outlineLight" size="xl">
            <Link to="/auth/signin">Sign In</Link>
          </Button>
        </div>
      </div>
    </section>
  );
};

export default CTA;
