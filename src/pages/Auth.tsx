import { useEffect, useMemo, useState } from "react";
import { Link, useNavigate, useParams } from "react-router-dom";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { z } from "zod";
import { ArrowLeft, CheckCircle2, Eye, EyeOff, Loader2, Mail, Scale } from "lucide-react";

import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { toast } from "@/hooks/use-toast";
import { cn } from "@/lib/utils";
import emblem from "@/assets/nba-emblem.png";
import hero from "@/assets/hero-courthouse.jpg";

type Mode = "signin" | "register" | "forgot";

const signInSchema = z.object({
  email: z.string().trim().min(1, "Email is required").email("Invalid email").max(255),
  password: z.string().min(1, "Password is required").max(100),
});

const registerSchema = z
  .object({
    fullName: z.string().trim().min(2, "Full name must be at least 2 characters").max(100),
    email: z.string().trim().min(1, "Email is required").email("Invalid email").max(255),
    password: z
      .string()
      .min(8, "Password must be at least 8 characters")
      .max(100)
      .regex(/[A-Z]/, "Must include an uppercase letter")
      .regex(/[a-z]/, "Must include a lowercase letter")
      .regex(/[0-9]/, "Must include a number"),
    confirmPassword: z.string(),
  })
  .refine((d) => d.password === d.confirmPassword, {
    path: ["confirmPassword"],
    message: "Passwords do not match",
  });

const forgotSchema = z.object({
  email: z.string().trim().min(1, "Email is required").email("Invalid email").max(255),
});

type SignInValues = z.infer<typeof signInSchema>;
type RegisterValues = z.infer<typeof registerSchema>;
type ForgotValues = z.infer<typeof forgotSchema>;

const isMode = (v: string | undefined): v is Mode =>
  v === "signin" || v === "register" || v === "forgot";

const titles: Record<Mode, { title: string; desc: string; pageTitle: string }> = {
  signin: {
    title: "Welcome back, counsel.",
    desc: "Sign in to access your remuneration dashboard.",
    pageTitle: "Sign In · NBA Remuneration Portal",
  },
  register: {
    title: "Create your account.",
    desc: "Register as an NBA member to begin filing documents.",
    pageTitle: "Register · NBA Remuneration Portal",
  },
  forgot: {
    title: "Reset your password.",
    desc: "Enter your email and we'll send you a link to reset your password.",
    pageTitle: "Reset Password · NBA Remuneration Portal",
  },
};

const Auth = () => {
  const params = useParams<{ mode?: string }>();
  const navigate = useNavigate();
  const mode: Mode = isMode(params.mode) ? params.mode : "signin";

  const meta = useMemo(() => titles[mode], [mode]);

  useEffect(() => {
    if (params.mode && !isMode(params.mode)) navigate("/auth/signin", { replace: true });
  }, [params.mode, navigate]);

  const setMode = (m: Mode) => navigate(`/auth/${m}`);

  return (
    <main className="min-h-screen grid lg:grid-cols-2 bg-background">
      <title>{meta.pageTitle}</title>
      <meta name="description" content={meta.desc} />

      {/* Visual panel */}
      <aside className="relative hidden lg:block overflow-hidden">
        <img src={hero} alt="Nigerian courthouse at golden hour" className="absolute inset-0 h-full w-full object-cover" />
        <div className="absolute inset-0 bg-hero-overlay" />
        <div className="relative z-10 h-full flex flex-col justify-between p-12 text-ivory">
          <Link to="/" className="inline-flex items-center gap-3 group w-fit">
            <img src={emblem} alt="NBA emblem" className="h-11 w-11 object-contain" />
            <div className="leading-tight">
              <p className="font-display text-base font-semibold tracking-display">NBA Remuneration</p>
              <p className="text-[11px] tracking-eyebrow uppercase text-ivory/60">Legal Document Portal</p>
            </div>
          </Link>

          <div>
            <div className="flex items-center gap-4 mb-6">
              <span className="h-px w-12 bg-accent" />
              <span className="text-[11px] tracking-eyebrow uppercase text-accent font-medium">Member Access</span>
            </div>
            <h2 className="font-display text-5xl xl:text-6xl font-light leading-[1.05] tracking-display mb-6">
              Where law meets <em className="italic font-normal text-gradient-gold">precision.</em>
            </h2>
            <p className="text-ivory/75 max-w-md leading-relaxed">
              Prepare, manage, and track legal documents with full committee oversight — built for Nigerian Bar Association members.
            </p>
          </div>

          <p className="text-[11px] tracking-eyebrow uppercase text-ivory/50">Justitia · Veritas · Integritas</p>
        </div>
      </aside>

      {/* Form panel */}
      <section className="flex flex-col">
        <div className="flex items-center justify-between p-6 lg:px-12">
          <Link to="/" className="inline-flex items-center gap-2 text-xs tracking-eyebrow uppercase text-muted-foreground hover:text-primary transition-elegant">
            <ArrowLeft className="h-3.5 w-3.5" />
            Back to home
          </Link>
          <Link to="/" className="lg:hidden flex items-center gap-2">
            <img src={emblem} alt="NBA emblem" className="h-8 w-8 object-contain" />
            <span className="font-display text-sm font-semibold text-primary">NBA</span>
          </Link>
        </div>

        <div className="flex-1 flex items-center justify-center px-6 pb-12 lg:px-12">
          <div className="w-full max-w-md">
            <div className="flex items-center gap-3 mb-8">
              <div className="h-10 w-10 rounded-sm bg-primary flex items-center justify-center">
                <Scale className="h-5 w-5 text-accent" />
              </div>
              <div>
                <p className="text-[10px] tracking-eyebrow uppercase text-muted-foreground">NBA Portal</p>
                <p className="font-display text-base text-primary leading-tight">Member Access</p>
              </div>
            </div>

            {mode !== "forgot" && (
              <div className="flex gap-1 bg-muted p-1 rounded-sm mb-8">
                {(["signin", "register"] as Mode[]).map((m) => (
                  <button
                    key={m}
                    type="button"
                    onClick={() => setMode(m)}
                    className={cn(
                      "flex-1 text-xs tracking-eyebrow uppercase py-2.5 rounded-sm transition-elegant font-medium",
                      mode === m ? "bg-background text-primary shadow-sm" : "text-muted-foreground hover:text-primary",
                    )}
                  >
                    {m === "signin" ? "Sign In" : "Register"}
                  </button>
                ))}
              </div>
            )}

            <div className="mb-6">
              <h1 className="font-display text-3xl md:text-4xl font-normal text-primary leading-tight">{meta.title}</h1>
              <p className="text-sm text-muted-foreground mt-2">{meta.desc}</p>
            </div>

            {mode === "signin" && (
              <SignInForm
                onSuccess={() => navigate("/")}
                switchMode={() => setMode("register")}
                onForgot={() => setMode("forgot")}
              />
            )}
            {mode === "register" && (
              <RegisterForm onSuccess={() => navigate("/")} switchMode={() => setMode("signin")} />
            )}
            {mode === "forgot" && <ForgotForm onBack={() => setMode("signin")} />}
          </div>
        </div>
      </section>
    </main>
  );
};

const PasswordInput = ({ id, ...rest }: React.ComponentProps<"input"> & { id: string }) => {
  const [show, setShow] = useState(false);
  return (
    <div className="relative">
      <Input id={id} type={show ? "text" : "password"} {...rest} className="pr-10" />
      <button
        type="button"
        onClick={() => setShow((s) => !s)}
        className="absolute right-3 top-1/2 -translate-y-1/2 text-muted-foreground hover:text-primary transition-elegant"
        aria-label={show ? "Hide password" : "Show password"}
      >
        {show ? <EyeOff className="h-4 w-4" /> : <Eye className="h-4 w-4" />}
      </button>
    </div>
  );
};

const FieldError = ({ msg }: { msg?: string }) =>
  msg ? <p className="text-xs text-destructive mt-1.5">{msg}</p> : null;

const SignInForm = ({ onSuccess, switchMode, onForgot }: { onSuccess: () => void; switchMode: () => void; onForgot: () => void }) => {
  const { register, handleSubmit, formState: { errors, isSubmitting } } = useForm<SignInValues>({ resolver: zodResolver(signInSchema) });

  const onSubmit = async (values: SignInValues) => {
    await new Promise((r) => setTimeout(r, 700));
    toast({ title: "Signed in", description: `Welcome back, ${values.email}` });
    onSuccess();
  };

  return (
    <form onSubmit={handleSubmit(onSubmit)} className="space-y-4">
      <div>
        <Label htmlFor="signin-email" className="text-xs tracking-eyebrow uppercase text-muted-foreground">Email</Label>
        <Input id="signin-email" type="email" autoComplete="email" placeholder="counsel@example.com" className="mt-1.5" {...register("email")} />
        <FieldError msg={errors.email?.message} />
      </div>

      <div>
        <div className="flex items-center justify-between mb-1.5">
          <Label htmlFor="signin-password" className="text-xs tracking-eyebrow uppercase text-muted-foreground">Password</Label>
          <button type="button" onClick={onForgot} className="text-xs text-primary hover:text-accent transition-elegant">Forgot?</button>
        </div>
        <PasswordInput id="signin-password" autoComplete="current-password" placeholder="••••••••" {...register("password")} />
        <FieldError msg={errors.password?.message} />
      </div>

      <Button type="submit" variant="hero" size="lg" className="w-full mt-2" disabled={isSubmitting}>
        {isSubmitting && <Loader2 className="h-4 w-4 animate-spin" />}
        Sign In
      </Button>

      <p className="text-center text-sm text-muted-foreground pt-2">
        Not a member?{" "}
        <button type="button" onClick={switchMode} className="text-primary font-medium hover:text-accent transition-elegant">
          Register here
        </button>
      </p>
    </form>
  );
};

const RegisterForm = ({ onSuccess, switchMode }: { onSuccess: () => void; switchMode: () => void }) => {
  const { register, handleSubmit, formState: { errors, isSubmitting } } = useForm<RegisterValues>({ resolver: zodResolver(registerSchema) });

  const onSubmit = async (values: RegisterValues) => {
    await new Promise((r) => setTimeout(r, 700));
    toast({ title: "Account created", description: `Welcome, ${values.fullName}` });
    onSuccess();
  };

  return (
    <form onSubmit={handleSubmit(onSubmit)} className="space-y-4">
      <div>
        <Label htmlFor="reg-name" className="text-xs tracking-eyebrow uppercase text-muted-foreground">Full Name</Label>
        <Input id="reg-name" autoComplete="name" placeholder="Barrister Adaeze Okoro" className="mt-1.5" {...register("fullName")} />
        <FieldError msg={errors.fullName?.message} />
      </div>

      <div>
        <Label htmlFor="reg-email" className="text-xs tracking-eyebrow uppercase text-muted-foreground">Email</Label>
        <Input id="reg-email" type="email" autoComplete="email" placeholder="counsel@example.com" className="mt-1.5" {...register("email")} />
        <FieldError msg={errors.email?.message} />
      </div>

      <div>
        <Label htmlFor="reg-password" className="text-xs tracking-eyebrow uppercase text-muted-foreground">Password</Label>
        <PasswordInput id="reg-password" autoComplete="new-password" placeholder="At least 8 characters" {...register("password")} />
        <FieldError msg={errors.password?.message} />
      </div>

      <div>
        <Label htmlFor="reg-confirm" className="text-xs tracking-eyebrow uppercase text-muted-foreground">Confirm Password</Label>
        <PasswordInput id="reg-confirm" autoComplete="new-password" placeholder="Repeat password" {...register("confirmPassword")} />
        <FieldError msg={errors.confirmPassword?.message} />
      </div>

      <Button type="submit" variant="gold" size="lg" className="w-full mt-2" disabled={isSubmitting}>
        {isSubmitting && <Loader2 className="h-4 w-4 animate-spin" />}
        Create Account
      </Button>

      <p className="text-center text-sm text-muted-foreground pt-2">
        Already a member?{" "}
        <button type="button" onClick={switchMode} className="text-primary font-medium hover:text-accent transition-elegant">
          Sign in
        </button>
      </p>
    </form>
  );
};

const ForgotForm = ({ onBack }: { onBack: () => void }) => {
  const [sent, setSent] = useState<string | null>(null);
  const { register, handleSubmit, formState: { errors, isSubmitting } } = useForm<ForgotValues>({ resolver: zodResolver(forgotSchema) });

  const onSubmit = async (values: ForgotValues) => {
    await new Promise((r) => setTimeout(r, 800));
    setSent(values.email);
    toast({
      title: "Reset link sent",
      description: `If an account exists for ${values.email}, you'll receive an email shortly.`,
    });
  };

  if (sent) {
    return (
      <div className="text-center py-2">
        <div className="mx-auto h-14 w-14 rounded-full bg-accent/10 flex items-center justify-center mb-4">
          <CheckCircle2 className="h-7 w-7 text-accent" />
        </div>
        <h3 className="font-display text-xl text-primary mb-2">Check your inbox</h3>
        <p className="text-sm text-muted-foreground mb-6 leading-relaxed">
          We've sent password reset instructions to <span className="text-primary font-medium">{sent}</span>. The link will expire in 30 minutes.
        </p>
        <Button type="button" variant="hero" size="lg" className="w-full" onClick={onBack}>
          Return to Sign In
        </Button>
        <button type="button" onClick={() => setSent(null)} className="mt-3 text-xs text-muted-foreground hover:text-primary transition-elegant">
          Didn't receive it? Try another email
        </button>
      </div>
    );
  }

  return (
    <form onSubmit={handleSubmit(onSubmit)} className="space-y-4">
      <div className="flex items-start gap-3 rounded-sm bg-muted/60 border border-border/60 p-3 mb-2">
        <Mail className="h-4 w-4 text-accent mt-0.5 shrink-0" />
        <p className="text-xs text-muted-foreground leading-relaxed">
          Enter the email associated with your NBA member account. We'll email you a secure link to set a new password.
        </p>
      </div>

      <div>
        <Label htmlFor="forgot-email" className="text-xs tracking-eyebrow uppercase text-muted-foreground">Email</Label>
        <Input id="forgot-email" type="email" autoComplete="email" autoFocus placeholder="counsel@example.com" className="mt-1.5" {...register("email")} />
        <FieldError msg={errors.email?.message} />
      </div>

      <Button type="submit" variant="hero" size="lg" className="w-full mt-2" disabled={isSubmitting}>
        {isSubmitting && <Loader2 className="h-4 w-4 animate-spin" />}
        Send Reset Link
      </Button>

      <p className="text-center text-sm text-muted-foreground pt-2">
        Remembered your password?{" "}
        <button type="button" onClick={onBack} className="text-primary font-medium hover:text-accent transition-elegant">
          Sign in
        </button>
      </p>
    </form>
  );
};

export default Auth;
