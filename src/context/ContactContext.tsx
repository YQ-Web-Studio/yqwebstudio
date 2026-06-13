"use client";

import React, { createContext, useContext, useState } from "react";
import { useRouter } from "next/navigation";

interface ContactContextType {
  isOpen: boolean;
  openContact: () => void;
  closeContact: () => void;
  toggleContact: () => void;
}

const ContactContext = createContext<ContactContextType | undefined>(undefined);

export const ContactProvider = ({ children }: { children: React.ReactNode }) => {
  const [isOpen, setIsOpen] = useState(false);
  const router = useRouter();

  const openContact = () => {
    router.push("/quote");
  };
  const closeContact = () => setIsOpen(false);
  const toggleContact = () => {
    router.push("/quote");
  };

  return (
    <ContactContext.Provider value={{ isOpen, openContact, closeContact, toggleContact }}>
      {children}
    </ContactContext.Provider>
  );
};

export const useContact = () => {
  const context = useContext(ContactContext);
  if (context === undefined) {
    throw new Error("useContact must be used within a ContactProvider");
  }
  return context;
};
