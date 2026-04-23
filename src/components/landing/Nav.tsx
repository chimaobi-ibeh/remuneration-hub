import { Button } from "@/components/ui/button";
import emblem from "@/assets/nba-emblem.png";
import { useAuthModal } from "@/components/auth/AuthModalProvider";

const links = [
  { label: "Features", href: "#features" },
  { label: "About", href: "#about" },
  { label: "How it Works", href: "#how" },
];

const Nav = () => {
  const { open } = useAuthModal();
  return (
    <header className="fixed top-0 inset-x-0 z-50 backdrop-blur-md bg-background/80 border-b border-border/60">
      <nav className="container mx-auto flex items-center justify-between h-20">
        <a href="#" className="flex items-center gap-3">
          <img src={emblem} alt="NBA emblem" className="h-11 w-11 object-contain" />
          <div className="leading-tight">
            <p className="font-display text-base font-semibold text-primary tracking-display">NBA Remuneration</p>
            <p className="text-[11px] tracking-eyebrow uppercase text-muted-foreground">Legal Document Portal</p>
          </div>
        </a>

        <div className="hidden md:flex items-center gap-10">
          {links.map((l) => (
            <a key={l.href} href={l.href} className="text-sm font-medium text-foreground/80 hover:text-primary transition-elegant tracking-eyebrow uppercase text-[11px]">
              {l.label}
            </a>
          ))}
        </div>

        <div className="flex items-center gap-3">
          <button
            type="button"
            onClick={() => open("signin")}
            className="hidden sm:inline-block text-sm font-medium text-primary hover:text-accent transition-elegant"
          >
            Sign In
          </button>
          <Button variant="hero" size="sm" onClick={() => open("register")}>Register</Button>
        </div>
      </nav>
    </header>
  );
};

export default Nav;
