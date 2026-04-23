import emblem from "@/assets/nba-emblem.png";

const Footer = () => (
  <footer className="bg-primary text-ivory/80 py-16">
    <div className="container mx-auto">
      <div className="grid md:grid-cols-4 gap-12 mb-12">
        <div className="md:col-span-2">
          <div className="flex items-center gap-3 mb-6">
            <img src={emblem} alt="NBA emblem" className="h-12 w-12 object-contain bg-ivory/5 rounded-full p-1" />
            <div>
              <p className="font-display text-lg text-ivory font-semibold">NBA Remuneration</p>
              <p className="text-[11px] tracking-eyebrow uppercase text-ivory/50">Legal Document Portal</p>
            </div>
          </div>
          <p className="text-sm text-ivory/60 leading-relaxed max-w-md">
            The official document preparation and remuneration tracking platform of the Nigerian Bar Association.
          </p>
        </div>

        <div>
          <p className="text-[11px] tracking-eyebrow uppercase text-accent font-semibold mb-4">Portal</p>
          <ul className="space-y-3 text-sm">
            <li><a href="#features" className="hover:text-accent transition-elegant">Features</a></li>
            <li><a href="#about" className="hover:text-accent transition-elegant">About</a></li>
            <li><a href="#how" className="hover:text-accent transition-elegant">How it Works</a></li>
          </ul>
        </div>

        <div>
          <p className="text-[11px] tracking-eyebrow uppercase text-accent font-semibold mb-4">Account</p>
          <ul className="space-y-3 text-sm">
            <li><a href="/auth/register" className="hover:text-accent transition-elegant">Register</a></li>
            <li><a href="/auth/signin" className="hover:text-accent transition-elegant">Sign In</a></li>
            <li><a href="#" className="hover:text-accent transition-elegant">Support</a></li>
          </ul>
        </div>
      </div>

      <div className="rule-gold mb-8" />

      <div className="flex flex-wrap justify-between items-center gap-4 text-xs text-ivory/50">
        <p>© {new Date().getFullYear()} Nigerian Bar Association. All rights reserved.</p>
        <p className="tracking-eyebrow uppercase">Justitia · Veritas · Integritas</p>
      </div>
    </div>
  </footer>
);

export default Footer;
