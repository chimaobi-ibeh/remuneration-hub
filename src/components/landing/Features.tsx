import { FileText, ShieldCheck, Bell, Download, Users, Scale, Gavel, ClipboardList } from "lucide-react";

const features = [
  { icon: FileText, title: "Document Preparation", desc: "Generate professionally drafted legal documents — deeds, agreements, powers of attorney, and more — in minutes." },
  { icon: ShieldCheck, title: "Approval Workflow", desc: "Submit documents for administrative review. Track status from draft through to approval with full version history.", featured: true },
  { icon: Bell, title: "Real-time Notifications", desc: "Stay informed with instant alerts on document updates, approvals, and important branch announcements." },
  { icon: Download, title: "PDF Export", desc: "Download any document as a formatted PDF, ready for use in professional and legal proceedings." },
  { icon: Users, title: "Branch-wide Access", desc: "Designed for NBA branches nationwide. Each member gets a secure, dedicated account with profile and history." },
  { icon: Scale, title: "Remuneration Records", desc: "Maintain accurate records of prepared documents by reference number, type, and status — all in one place." },
  { icon: Gavel, title: "Admin Oversight", desc: "Committee administrators can review, approve, or reject submissions with full audit trails and member notes." },
  { icon: ClipboardList, title: "Payment History", desc: "Track all remuneration payments tied to your documents with downloadable receipts and full transaction logs." },
];

const Features = () => (
  <section id="features" className="py-32 bg-background relative overflow-hidden">
    <div className="absolute top-0 right-0 w-[600px] h-[600px] bg-accent/5 rounded-full blur-3xl -z-0" />

    <div className="container mx-auto relative">
      <div className="text-center max-w-2xl mx-auto mb-20">
        <div className="flex items-center justify-center gap-4 mb-6">
          <span className="h-px w-12 bg-accent" />
          <span className="text-[11px] tracking-eyebrow uppercase text-accent font-semibold">Portal Features</span>
          <span className="h-px w-12 bg-accent" />
        </div>
        <h2 className="font-display text-5xl md:text-6xl tracking-display text-primary font-light leading-[1.05] mb-6">
          Everything you need to<br />
          <em className="italic font-normal text-accent">manage legal documents.</em>
        </h2>
      </div>

      <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-px bg-border rounded-sm overflow-hidden shadow-soft">
        {features.map((f, i) => (
          <article
            key={f.title}
            className={`group p-10 transition-elegant cursor-default ${
              f.featured
                ? "bg-emerald text-ivory"
                : "bg-card hover:bg-parchment"
            }`}
          >
            <div className={`mb-8 inline-flex h-12 w-12 items-center justify-center rounded-sm border ${
              f.featured ? "border-accent/40 text-accent" : "border-accent/30 text-accent"
            }`}>
              <f.icon className="h-5 w-5" />
            </div>
            <h3 className={`font-display text-2xl tracking-display mb-4 ${f.featured ? "text-ivory" : "text-primary"}`}>
              {f.title}
            </h3>
            <p className={`text-sm leading-relaxed ${f.featured ? "text-ivory/75" : "text-muted-foreground"}`}>
              {f.desc}
            </p>
            <div className={`mt-8 text-[11px] tracking-eyebrow uppercase font-semibold ${f.featured ? "text-accent" : "text-primary/40"}`}>
              {String(i + 1).padStart(2, "0")} / {String(features.length).padStart(2, "0")}
            </div>
          </article>
        ))}
      </div>
    </div>
  </section>
);

export default Features;
