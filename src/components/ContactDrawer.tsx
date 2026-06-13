"use client";

import dynamic from "next/dynamic";
import { useContact } from "@/context/ContactContext";
import { useEffect, useState } from "react";

const LazyContactDrawerContent = dynamic(
  () => import("./ContactDrawerContent").then((mod) => mod.ContactDrawerContent),
  { ssr: false }
);

export const ContactDrawer = () => {
  return null;
};
