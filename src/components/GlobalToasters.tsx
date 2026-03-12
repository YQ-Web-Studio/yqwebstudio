"use client";

import dynamic from "next/dynamic";

const LazyToaster = dynamic(() => import("@/components/ui/toaster").then(m => m.Toaster), { ssr: false });
const LazySonner = dynamic(() => import("@/components/ui/sonner").then(m => m.Toaster), { ssr: false });

export const GlobalToasters = () => {
    return (
        <>
            <LazyToaster />
            <LazySonner />
        </>
    );
};
