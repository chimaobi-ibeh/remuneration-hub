import { useState } from "react";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { z } from "zod";
import { ArrowLeft, CheckCircle2, Eye, EyeOff, Loader2, Mail, Scale } from "lucide-react";

import { Dialog, DialogContent, DialogDescription, DialogHeader, DialogTitle } from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { toast } from "@/hooks/use-toast";
import { cn } from "@/lib/utils";

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

interface Props {
  open: boolean;
  onOpenChange: (v: boolean) => void;
  mode: Mode;
  setMode: (m: Mode) => void;
}

const AuthModal = ({ open, onOpenChange, mode, setMode }: Props) => {
  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent className="sm:max-w-md p-0 overflow-hidden border-border/60">
        <div className="bg-primary px-8 pt-8 pb-6 text-ivory">
          <div className="flex items-center gap-3 mb-4">
            <div className="h-10 w-10 rounded-sm bg-accent/15 flex items-center justify-center">
              <Scale className="h-5 w-5 text-accent" />
            </div>
            <div>
              <p className="text-[10px] tracking-eyebrow uppercase text-ivory/60">NBA Portal</p>
              <p className="font-display text-lg leading-tight">Member Access</p>
            </div>
          </div>

          {mode !== "forgot" && (
            <div className="flex gap-1 bg-ivory/10 p-1 rounded-sm">
              {(["signin", "register"] as Mode[]).map((m) => (
                <button
                  key={m}
                  type="button"
                  onClick={() => setMode(m)}
                  className={cn(
                    "flex-1 text-xs tracking-eyebrow uppercase py-2.5 rounded-sm transition-elegant font-medium",
                    mode === m ? "bg-ivory text-primary" : "text-ivory/70 hover:text-ivory",
                  )}
                >
                  {m === "signin" ? "Sign In" : "Register"}
                </button>
              ))}
            </div>
          )}
          {mode === "forgot" && (
            <button
              type="button"
              onClick={() => setMode("signin")}
              className="inline-flex items-center gap-2 text-xs tracking-eyebrow uppercase text-ivory/70 hover:text-ivory transition-elegant"
            >
              <ArrowLeft className="h-3.5 w-3.5" />
              Back to Sign In
            </button>
          )}
        </div>

        <div className="px-8 py-7">
          <DialogHeader className="mb-5">
            <DialogTitle className="font-display text-2xl font-normal text-primary">
              {mode === "signin" && "Welcome back, counsel."}
              {mode === "register" && "Create your account."}
              {mode === "forgot" && "Reset your password."}
            </DialogTitle>
            <DialogDescription className="text-sm">
              {mode === "signin" && "Sign in to access your remuneration dashboard."}
              {mode === "register" && "Register as an NBA member to begin filing documents."}
              {mode === "forgot" && "Enter your email and we'll send you a link to reset your password."}
            </DialogDescription>
          </DialogHeader>

          {mode === "signin" && (
            <SignInForm
              onSuccess={() => onOpenChange(false)}
              switchMode={() => setMode("register")}
              onForgot={() => setMode("forgot")}
            />
          )}
          {mode === "register" && (
            <RegisterForm onSuccess={() => onOpenChange(false)} switchMode={() => setMode("signin")} />
          )}
          {mode === "forgot" && <ForgotForm onBack={() => setMode("signin")} />}
        </div>
      </DialogContent>
    </Dialog>
  );
};

const PasswordInput = ({
  id,
  ...rest
}: React.ComponentProps<"input"> & { id: string }) => {
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
  const {
    register,
    handleSubmit,
    formState: { errors, isSubmitting },
  } = useForm<SignInValues>({ resolver: zodResolver(signInSchema) });

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
  const {
    register,
    handleSubmit,
    formState: { errors, isSubmitting },
  } = useForm<RegisterValues>({ resolver: zodResolver(registerSchema) });

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

export default AuthModal;
