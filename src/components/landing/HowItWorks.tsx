const steps = [
  { n: "01", title: "Register & Verify", desc: "Create your account using your NBA membership details. Admins verify and approve your account before access is granted." },
  { n: "02", title: "Prepare Documents", desc: "Use the guided document preparation tool to generate legally accurate documents. Fill in details and preview before submitting." },
  { n: "03", title: "Track & Download", desc: "Submit for approval and track the status in real time. Once approved, download your document as a formatted PDF." },
];

const HowItWorks = () => (
  <section id="how" className="py-32 bg-background">
    <div className="container mx-auto">
      <div className="text-center max-w-2xl mx-auto mb-24">
        <div className="flex items-center justify-center gap-4 mb-6">
          <span className="h-px w-12 bg-accent" />
          <span className="text-[11px] tracking-eyebrow uppercase text-accent font-semibold">How it Works</span>
          <span className="h-px w-12 bg-accent" />
        </div>
        <h2 className="font-display text-5xl md:text-6xl tracking-display text-primary font-light leading-[1.05]">
          Three steps from<br />
          <em className="italic font-normal text-accent">draft to delivery.</em>
        </h2>
      </div>

      <div className="grid md:grid-cols-3 gap-12 lg:gap-20 relative">
        <div className="hidden md:block absolute top-12 left-[16%] right-[16%] h-px bg-gradient-to-r from-transparent via-accent/40 to-transparent" />

        {steps.map((s) => (
          <div key={s.n} className="relative text-center">
            <div className="relative inline-flex items-center justify-center mx-auto mb-8">
              <div className="absolute inset-0 rounded-full bg-accent/10 blur-xl" />
              <div className="relative h-24 w-24 rounded-full bg-card border border-accent/40 flex items-center justify-center shadow-soft">
                <span className="font-display text-2xl text-accent italic">{s.n}</span>
              </div>
            </div>
            <h3 className="font-display text-2xl text-primary tracking-display mb-4">{s.title}</h3>
            <p className="text-muted-foreground leading-relaxed max-w-xs mx-auto">{s.desc}</p>
          </div>
        ))}
      </div>
    </div>
  </section>
);

export default HowItWorks;
