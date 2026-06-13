import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Instant Quote Generator | YQ Web Studio",
  description:
    "Get an instant, personalised web design & development estimate in under 2 minutes. No commitment — just a transparent starting price tailored to your project scope.",
  openGraph: {
    title: "Instant Quote Generator | YQ Web Studio",
    description:
      "Get an instant, personalised web design & development estimate in under 2 minutes. No commitment required.",
    url: "https://yqwebstudio.com/quote",
    siteName: "YQ Web Studio",
    locale: "en_GB",
    type: "website",
  },
  alternates: {
    canonical: "/quote",
  },
};

export default function QuoteLayout({ children }: { children: React.ReactNode }) {
  return <>{children}</>;
}
