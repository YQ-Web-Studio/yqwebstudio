"use client";

import dynamic from "next/dynamic";
import { useContact } from "@/context/ContactContext";
import { useEffect, useState } from "react";

const LazyContactDrawerContent = dynamic(
  () => import("./ContactDrawerContent").then((mod) => mod.ContactDrawerContent),
  { ssr: false }
);

export const ContactDrawer = () => {
  const { isOpen, closeContact } = useContact();
  const [hasOpened, setHasOpened] = useState(false);

  useEffect(() => {
    if (isOpen && !hasOpened) {
      setHasOpened(true);
    }
  }, [isOpen, hasOpened]);

  if (!hasOpened) return null;

  return <LazyContactDrawerContent isOpen={isOpen} closeContact={closeContact} />;
};
