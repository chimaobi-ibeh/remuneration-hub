import { Shield, Scale, Users } from "lucide-react";
import portrait from "@/assets/lawyers-portrait.jpg";

const About = () => (
  <section id="about" className="py-32 bg-parchment">
    <div className="container mx-auto grid lg:grid-cols-2 gap-20 items-center">
      <div className="relative">
        <div className="relative overflow-hidden rounded-sm shadow-elegant">
          <img src={portrait} alt="NBA legal practitioners" className="w-full h-auto" loading="lazy" width={1024} height={1024} />
        </div>
        <div className="absolute -bottom-8 -right-8 lg:-right-16 bg-card p-8 max-w-[280px] shadow-elegant border-t-2 border-accent">
          <p className="font-display text-5xl text-primary font-light">
            100<span className="text-accent">%</span>
          </p>
          <p className="text-[11px] tracking-eyebrow uppercase text-primary font-semibold mt-2">Compliance Tracked</p>
          <p className="text-sm text-muted-foreground mt-3 leading-relaxed">
            Every document prepared and approved with a full digital audit trail.
          </p>
        </div>
        <div className="absolute -top-6 -left-6 hidden lg:block">
          <div className="font-display text-[10rem] leading-none text-accent/20 select-none">"</div>
        </div>
      </div>

      <div>
        <div className="flex items-center gap-4 mb-6">
          <span className="h-px w-12 bg-accent" />
          <span className="text-[11px] tracking-eyebrow uppercase text-accent font-semibold">About the Portal</span>
        </div>
        <h2 className="font-display text-5xl md:text-6xl tracking-display text-primary font-light leading-[1.05] mb-8">
          Built for Nigerian<br />
          <em className="text-accent not-italic italic font-normal">legal practitioners.</em>
        </h2>
        <div className="rule-gold w-24 mb-8" />
        <p className="text-lg text-muted-foreground leading-relaxed mb-6">
          The NBA Remuneration Portal supports legal practitioners across all NBA branches in Nigeria, providing a unified platform for document preparation, remuneration tracking, and committee administration.
        </p>
        <p className="text-base text-muted-foreground leading-relaxed mb-10">
          Access is exclusive to verified NBA members. Upon registration, accounts are reviewed and approved by administrators before full portal access is granted.
        </p>

        <div className="flex flex-wrap gap-8 pt-8 border-t border-border">
          {[
            { icon: Shield, label: "Secure" },
            { icon: Scale, label: "Compliant" },
            { icon: Users, label: "Member-only" },
          ].map(({ icon: Icon, label }) => (
            <div key={label} className="flex items-center gap-3">
              <div className="h-10 w-10 rounded-full border border-accent/40 flex items-center justify-center text-accent">
                <Icon className="h-4 w-4" />
              </div>
              <span className="text-[11px] tracking-eyebrow uppercase font-semibold text-primary">{label}</span>
            </div>
          ))}
        </div>
      </div>
    </div>
  </section>
);

export default About;
