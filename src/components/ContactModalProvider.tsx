"use client";

import { createContext, useContext, useState, useCallback } from "react";
import { ContactModal } from "@/components/ContactModal";

interface ContactModalContextValue {
  openContactModal: () => void;
}

const ContactModalContext = createContext<ContactModalContextValue | null>(null);

export function useContactModal() {
  const ctx = useContext(ContactModalContext);
  if (!ctx) throw new Error("useContactModal must be used within ContactModalProvider");
  return ctx;
}

export function ContactModalProvider({ children }: { children: React.ReactNode }) {
  const [open, setOpen] = useState(false);

  const openContactModal = useCallback(() => setOpen(true), []);

  return (
    <ContactModalContext.Provider value={{ openContactModal }}>
      {children}
      <ContactModal open={open} onOpenChange={setOpen} />
    </ContactModalContext.Provider>
  );
}
