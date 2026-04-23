import { createContext, useContext, useState, ReactNode } from "react";
import AuthModal from "./AuthModal";

type AuthMode = "signin" | "register" | "forgot";

type AuthModalContextType = {
  open: (mode?: AuthMode) => void;
  close: () => void;
};

const AuthModalContext = createContext<AuthModalContextType | undefined>(undefined);

export const AuthModalProvider = ({ children }: { children: ReactNode }) => {
  const [isOpen, setIsOpen] = useState(false);
  const [mode, setMode] = useState<AuthMode>("signin");

  const open = (m: AuthMode = "signin") => {
    setMode(m);
    setIsOpen(true);
  };
  const close = () => setIsOpen(false);

  return (
    <AuthModalContext.Provider value={{ open, close }}>
      {children}
      <AuthModal open={isOpen} onOpenChange={setIsOpen} mode={mode} setMode={setMode} />
    </AuthModalContext.Provider>
  );
};

export const useAuthModal = () => {
  const ctx = useContext(AuthModalContext);
  if (!ctx) {
    // Fallback no-op so consumers don't crash if rendered outside provider (e.g. during HMR)
    return { open: () => {}, close: () => {} };
  }
  return ctx;
};
