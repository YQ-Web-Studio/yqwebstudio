"use client";

import { useState } from "react";
import Link from "next/link";
import { toast } from "sonner";
import { sendContactEmail } from "../actions/sendEmail";

// ─────────────────────────────────────────────
// Types
// ─────────────────────────────────────────────
type ProjectMode = "form_only" | "estimator";
type WebsiteType = "standard" | "hosted_ecommerce" | "custom_platform" | "";

interface WizardState {
  websiteType: WebsiteType;
  extraPages: number;
  wantsCMS: boolean | null;
  wantsPremiumDesign: boolean | null;
  name: string;
  email: string;
  phone: string;
  businessName: string;
  primaryGoal: string;
  currentWebsite: string;
  message: string;
}

const INITIAL_STATE: WizardState = {
  websiteType: "",
  extraPages: 0,
  wantsCMS: null,
  wantsPremiumDesign: null,
  name: "",
  email: "",
  phone: "",
  businessName: "",
  primaryGoal: "",
  currentWebsite: "",
  message: "",
};

// ─────────────────────────────────────────────
// Pricing calculations
// ─────────────────────────────────────────────
function calculateQuote(state: WizardState): { min: number; max: number; isFlat: boolean } {
  if (state.websiteType === "hosted_ecommerce") {
    return { min: 1500, max: 2000, isFlat: true };
  }
  if (state.websiteType === "custom_platform") {
    return { min: 2500, max: 2500, isFlat: true };
  }
  
  const basePrice = 400 + (state.extraPages * 50);
  const cmsPremium = state.wantsCMS === true ? 400 : 0;
  const designPremium = state.wantsPremiumDesign === true ? 300 : 0;
  
  const total = basePrice + cmsPremium + designPremium;
  const min = total;
  const max = Math.round((total * 1.15) / 50) * 50;
  
  return { min, max: Math.max(min, max), isFlat: false };
}

function formatGBP(amount: number) {
  return new Intl.NumberFormat("en-GB", {
    style: "currency",
    currency: "GBP",
    maximumFractionDigits: 0,
  }).format(amount);
}

// ─────────────────────────────────────────────
// Styled Selection Button (Sliding Hover Fill)
// ─────────────────────────────────────────────
function SelectionButton({
  selected,
  onClick,
  heading,
  body,
}: {
  selected: boolean;
  onClick: () => void;
  heading: string;
  body: string;
}) {
  return (
    <button
      type="button"
      onClick={onClick}
      className="relative w-full text-left rounded-xl p-6 sm:p-7 border border-zinc-800 bg-zinc-900 focus:outline-none transition-colors duration-300 font-sans group overflow-hidden"
    >
      {/* Sliding background color layer like buttons on main page */}
      <span
        className={`absolute inset-0 bg-purple-600 transition-transform duration-500 ease-[cubic-bezier(0.25,0.46,0.45,0.94)] z-0 ${
          selected ? "translate-y-0" : "translate-y-[101%] group-hover:translate-y-0"
        }`}
      />

      <div className="relative z-10 flex justify-between items-start gap-4">
        <span
          className={`block text-base sm:text-lg font-semibold tracking-wide font-unbounded transition-colors duration-350 ${
            selected ? "text-white" : "text-zinc-100 group-hover:text-white"
          }`}
        >
          {heading}
        </span>
        {selected && (
          <span className="w-6 h-6 rounded-full bg-white flex items-center justify-center text-xs text-purple-600 font-bold shrink-0 shadow-sm animate-in zoom-in duration-200">
            ✓
          </span>
        )}
      </div>
      
      <span
        className={`block text-xs sm:text-sm mt-3 leading-relaxed relative z-10 transition-colors duration-350 ${
          selected ? "text-purple-100" : "text-zinc-400 group-hover:text-purple-100"
        }`}
      >
        {body}
      </span>
    </button>
  );
}

// ─────────────────────────────────────────────
// Main Page
// ─────────────────────────────────────────────
export default function QuotePage() {
  const [mode, setMode] = useState<ProjectMode>("form_only");
  const [qStep, setQStep] = useState(0); 
  const [state, setState] = useState<WizardState>(INITIAL_STATE);
  const [submitting, setSubmitting] = useState(false);
  const [submitted, setSubmitted] = useState(false);

  const updateField = <K extends keyof WizardState>(key: K, value: WizardState[K]) => {
    setState((prev) => ({ ...prev, [key]: value }));
  };

  const handleReset = () => {
    setState(INITIAL_STATE);
    setMode("form_only");
    setQStep(0);
    setSubmitted(false);
  };

  const selectWebsiteType = (type: WebsiteType) => {
    updateField("websiteType", type);
    if (type === "hosted_ecommerce") {
      updateField("primaryGoal", "ecommerce");
    } else if (type === "custom_platform") {
      updateField("primaryGoal", "custom");
    }
    
    if (type === "standard") {
      setQStep(1); 
    } else {
      setQStep(4); 
    }
  };

  const selectCMS = (val: boolean) => {
    updateField("wantsCMS", val);
    setQStep(3); 
  };

  const selectDesign = (val: boolean) => {
    updateField("wantsPremiumDesign", val);
    setQStep(4); 
  };

  const handleFormSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    if (!state.name.trim() || !state.email.trim() || !state.primaryGoal) {
      toast.error("Please fill in all required fields.");
      return;
    }
    
    setSubmitting(true);

    const { min, max, isFlat } = calculateQuote(state);
    const hasEstimator = mode === "estimator" && qStep === 4;

    const detailsSummary = hasEstimator
      ? `
Estimated Configurations:
- Solution Type: ${state.websiteType === "standard" ? "Informational Website" : state.websiteType === "hosted_ecommerce" ? "Hosted Store Tier" : "Custom Bespoke Application"}
- Pages Needed: ${state.websiteType === "standard" ? state.extraPages + 1 : "N/A"}
- CMS Enabled: ${state.websiteType === "standard" && state.wantsCMS ? "Yes" : "No"}
- Premium Aesthetics: ${state.websiteType === "standard" && state.wantsPremiumDesign ? "Yes" : "No"}
- Budget Indicator: ${isFlat && state.websiteType === "custom_platform" ? "£2,500 Flat" : `£${min} - £${max}`}

Current Website: ${state.currentWebsite || "None provided"}

User Project Brief:
${state.message || "No notes provided."}
`
      : `
Direct Project Contact:
- Current Website: ${state.currentWebsite || "None provided"}

User Project Brief:
${state.message || "No notes provided."}
`;

    const formData = new FormData();
    formData.append("name", state.name);
    formData.append("email", state.email);
    formData.append("businessName", state.businessName || "N/A");
    formData.append("primaryGoal", state.primaryGoal);
    formData.append("projectDetails", detailsSummary.trim());

    try {
      const result = await sendContactEmail(formData);
      if (result.success) {
        setSubmitted(true);
        toast.success("Enquiry received! I'll get back to you shortly.");
      } else {
        toast.error(result.error || "Failed to submit. Please try again.");
      }
    } catch (err) {
      toast.error("An unexpected error occurred. Please try again.");
    } finally {
      setSubmitting(false);
    }
  };

  const { min, max, isFlat } = calculateQuote(state);
  const showEstimatorOutput = mode === "estimator" && qStep === 4;

  return (
    <div className="min-h-screen bg-background relative font-mono text-zinc-300">
      {/* Ambient structural colors */}
      <div className="pointer-events-none fixed inset-0 z-0" aria-hidden="true">
        <div className="absolute top-[-5%] left-1/2 -translate-x-1/2 w-[600px] h-[500px] rounded-full bg-purple-900/10 blur-[120px]" />
        <div className="absolute bottom-5 right-[-5%] w-[400px] h-[300px] rounded-full bg-violet-900/10 blur-[90px]" />
      </div>

      <div className="relative z-10 px-6 pt-24 pb-20 max-w-4xl mx-auto">
        {/* Navigation link */}
        <Link
          href="/"
          className="inline-flex items-center gap-2 text-zinc-500 hover:text-white text-xs sm:text-sm font-mono uppercase tracking-widest transition-colors duration-200 mb-8"
        >
          ← Return to home
        </Link>

        {/* Header */}
        <div className="mb-10 pb-6 border-b border-zinc-800">
          <h1 className="text-3xl sm:text-4xl font-bold text-white tracking-tight font-syne">
            Start a Project
          </h1>
          <p className="text-zinc-400 text-xs sm:text-sm mt-2 sm:mt-3 leading-relaxed font-mono">
            Setup specifications or send details to our development desk.
          </p>
        </div>

        {/* Wizard Panel */}
        <div className="relative overflow-hidden">
          {submitted ? (
            /* Submission Success State */
            <div className="text-center py-16 space-y-6">
              <div className="w-16 h-16 rounded-full border border-green-500/20 bg-green-500/5 flex items-center justify-center text-2xl text-green-400 mx-auto">
                ✓
              </div>
              <div className="space-y-3">
                <h3 className="text-lg sm:text-xl font-bold text-white font-syne">Brief Received</h3>
                <p className="text-zinc-500 text-sm max-w-md mx-auto leading-relaxed">
                  Thank you for submitting your project requirements. Our engineering team will review the parameters and contact you within one business day.
                </p>
              </div>
              <button
                type="button"
                onClick={handleReset}
                className="px-8 py-3.5 rounded-[2rem] border border-zinc-850 text-xs sm:text-sm uppercase tracking-wider text-zinc-400 hover:text-white hover:border-zinc-700 transition-colors font-mono"
              >
                Reset Form
              </button>
            </div>
          ) : (
            <div className="space-y-8">
              {/* Top Prompt to Trigger Estimator (Only when in form-only mode) */}
              {mode === "form_only" && (
                <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-6 p-6 sm:p-7 bg-purple-950/15 border border-purple-900/30 rounded-2xl">
                  <div>
                    <h3 className="text-sm sm:text-base font-bold text-white font-unbounded">Want to calculate a budget estimate first?</h3>
                    <p className="text-xs sm:text-sm text-zinc-400 mt-1.5 font-sans">Answer a few specification questions to display a budget projection above the brief.</p>
                  </div>
                  <button
                    type="button"
                    onClick={() => {
                      setMode("estimator");
                      setQStep(0);
                    }}
                    className="px-6 py-3 rounded-[2rem] bg-purple-600 hover:bg-purple-700 text-xs font-unbounded uppercase tracking-wider text-white transition-colors whitespace-nowrap self-start sm:self-auto"
                  >
                    Build Estimate
                  </button>
                </div>
              )}

              {/* Estimator Question flow */}
              {mode === "estimator" && qStep < 4 && (
                <div className="space-y-6 p-6 sm:p-8 border border-zinc-800 bg-zinc-950/20 rounded-2xl">
                  {/* Q1: Website Type */}
                  {qStep === 0 && (
                    <div className="space-y-6">
                      <div>
                        <h2 className="text-base sm:text-lg font-bold text-white font-syne mb-1">
                          1. Project Architecture
                        </h2>
                        <p className="text-zinc-500 text-[11px] sm:text-sm leading-relaxed">
                          Choose the baseline infrastructure template.
                        </p>
                      </div>

                      <div className="grid grid-cols-1 gap-4">
                        <SelectionButton
                          selected={state.websiteType === "standard"}
                          onClick={() => selectWebsiteType("standard")}
                          heading="Standard Informational Website"
                          body="For showcasing services, team bio, portfolios, and contact forms. Scalable page-based setup."
                        />
                        <SelectionButton
                          selected={state.websiteType === "hosted_ecommerce"}
                          onClick={() => selectWebsiteType("hosted_ecommerce")}
                          heading="Hosted E-Commerce Store"
                          body="Storefront solution supporting checkout integration, secure payments, and inventory scaling."
                        />
                        <SelectionButton
                          selected={state.websiteType === "custom_platform"}
                          onClick={() => selectWebsiteType("custom_platform")}
                          heading="Bespoke High-Performance Platform"
                          body="High-capacity custom database platform, bespoke integrations, custom dashboards, and performance scaling."
                        />
                      </div>
                    </div>
                  )}

                  {/* Q2: Pages (Only for standard website) */}
                  {qStep === 1 && (
                    <div className="space-y-6">
                      <div>
                        <h2 className="text-base sm:text-lg font-bold text-white font-syne mb-1">
                          2. Project Scale (Pages)
                        </h2>
                        <p className="text-zinc-500 text-[11px] sm:text-sm leading-relaxed">
                          Define the amount of layout templates required.
                        </p>
                      </div>

                      <div className="border border-zinc-800 bg-zinc-900/10 p-6 sm:p-7 rounded-2xl flex items-center justify-between gap-4">
                        <div>
                          <span className="block text-sm font-bold text-white uppercase font-unbounded">Page Count Scale</span>
                          <span className="block text-xs text-zinc-500 mt-1.5 font-sans">£400 base tier covers 1 page. +£50 per additional layout.</span>
                        </div>
                        <div className="flex items-center gap-4 border border-purple-500/25 bg-zinc-950 px-4 py-2.5 rounded-xl">
                          <button
                            type="button"
                            onClick={() => updateField("extraPages", Math.max(0, state.extraPages - 1))}
                            className="text-base font-bold text-purple-400 hover:text-white transition-colors px-1.5"
                          >
                            –
                          </button>
                          <span className="text-sm font-bold text-white min-w-[2.5rem] text-center">
                            {state.extraPages + 1}
                          </span>
                          <button
                            type="button"
                            onClick={() => updateField("extraPages", state.extraPages + 1)}
                            className="text-base font-bold text-purple-400 hover:text-white transition-colors px-1.5"
                          >
                            +
                          </button>
                        </div>
                      </div>

                      <div className="flex justify-between pt-5 border-t border-zinc-900">
                        <button
                          type="button"
                          onClick={() => setQStep(0)}
                          className="text-xs sm:text-sm uppercase tracking-wider text-zinc-500 hover:text-white font-unbounded"
                        >
                          ← Back
                        </button>
                        <button
                          type="button"
                          onClick={() => setQStep(2)}
                          className="px-6 py-3 rounded-[2rem] bg-purple-600 hover:bg-purple-700 text-xs sm:text-sm uppercase tracking-wider text-white transition-colors font-unbounded"
                        >
                          Continue
                        </button>
                      </div>
                    </div>
                  )}

                  {/* Q3: CMS Dashboard (Only for standard website) */}
                  {qStep === 2 && (
                    <div className="space-y-6">
                      <div>
                        <h2 className="text-base sm:text-lg font-bold text-white font-syne mb-1">
                          3. Content Control
                        </h2>
                        <p className="text-zinc-500 text-[11px] sm:text-sm leading-relaxed">
                          Do you require a dashboard console to edit content independently?
                        </p>
                      </div>

                      <div className="grid grid-cols-1 gap-4">
                        <SelectionButton
                          selected={state.wantsCMS === true}
                          onClick={() => selectCMS(true)}
                          heading="Include Editor Dashboard (+£400)"
                          body="Configures an administrator portal to edit copy and media assets without writing code."
                        />
                        <SelectionButton
                          selected={state.wantsCMS === false}
                          onClick={() => selectCMS(false)}
                          heading="No Editor Console (+£0)"
                          body="Content updates will be sent directly to our development desk for code changes."
                        />
                      </div>

                      <div className="flex justify-between pt-5 border-t border-zinc-900">
                        <button
                          type="button"
                          onClick={() => setQStep(1)}
                          className="text-xs sm:text-sm uppercase tracking-wider text-zinc-500 hover:text-white font-unbounded"
                        >
                          ← Back
                        </button>
                      </div>
                    </div>
                  )}

                  {/* Q4: Design Fidelity (Only for standard website) */}
                  {qStep === 3 && (
                    <div className="space-y-6">
                      <div>
                        <h2 className="text-base sm:text-lg font-bold text-white font-syne mb-1">
                          4. Interface Design Fidelity
                        </h2>
                        <p className="text-zinc-500 text-[11px] sm:text-sm leading-relaxed">
                          Specify layout visual customization depth.
                        </p>
                      </div>

                      <div className="grid grid-cols-1 gap-4">
                        <SelectionButton
                          selected={state.wantsPremiumDesign === false}
                          onClick={() => selectDesign(false)}
                          heading="Standard Clean Layout (+£0)"
                          body="Clean design and styling structure mapped perfectly to your brand profile sheets."
                        />
                        <SelectionButton
                          selected={state.wantsPremiumDesign === true}
                          onClick={() => selectDesign(true)}
                          heading="Bespoke Visual System (+£300)"
                          body="Fully tailored custom design layouts, bespoke micro-interactions, and premium aesthetics."
                        />
                      </div>

                      <div className="flex justify-between pt-5 border-t border-zinc-900">
                        <button
                          type="button"
                          onClick={() => setQStep(2)}
                          className="text-xs sm:text-sm uppercase tracking-wider text-zinc-500 hover:text-white font-unbounded"
                        >
                          ← Back
                        </button>
                      </div>
                    </div>
                  )}
                </div>
              )}

              {/* Estimate Output */}
              {showEstimatorOutput && (
                <div className="space-y-6 animate-in fade-in duration-300 p-6 sm:p-8 border border-purple-900/30 bg-purple-950/5 rounded-2xl">
                  <div className="flex justify-between items-center pb-4 border-b border-purple-900/20">
                    <div>
                      <h2 className="text-sm sm:text-base font-bold text-white font-syne">
                        Budget Projection
                      </h2>
                      <p className="text-zinc-500 text-xs tracking-wide mt-0.5">ESTIMATION BASED ON SPECIFICATIONS</p>
                    </div>
                    <button
                      type="button"
                      onClick={() => setMode("form_only")}
                      className="text-xs font-unbounded uppercase tracking-wider text-zinc-500 hover:text-white transition-colors"
                    >
                      Remove Estimate
                    </button>
                  </div>

                  <div className="text-center py-6">
                    <span className="block text-xs font-mono uppercase tracking-widest text-purple-400 mb-1">
                      Calculated Range
                    </span>
                    <span className="block text-4xl sm:text-5xl font-bold font-unbounded text-white">
                      {isFlat && state.websiteType === "custom_platform" ? (
                        <span>{formatGBP(2500)}</span>
                      ) : (
                        <span>
                          {formatGBP(min)}
                          <span className="text-xl sm:text-2xl font-normal text-zinc-500"> – {formatGBP(max)}</span>
                        </span>
                      )}
                    </span>
                  </div>

                  {/* Hosting notices */}
                  <div className="text-sm space-y-3 font-sans border-t border-purple-900/20 pt-5">
                    {state.websiteType === "hosted_ecommerce" && (
                      <div className="p-4 bg-purple-950/10 border border-purple-900/20 rounded-xl text-zinc-400 leading-relaxed">
                        Requires a monthly hosting and platform maintenance plan (starting from £25/mo to keep the platform live and fully supported).
                      </div>
                    )}
                    {(state.websiteType === "custom_platform" || (state.websiteType === "standard" && state.wantsCMS)) && (
                      <div className="p-4 bg-purple-950/10 border border-purple-900/20 rounded-xl text-zinc-400 leading-relaxed">
                        Requires a secure database host package (commencing from £25/mo to maintain backend console pipelines and payments).
                      </div>
                    )}
                    {state.websiteType === "standard" && !state.wantsCMS && (
                      <div className="p-4 bg-zinc-950/20 border border-zinc-900 rounded-xl text-zinc-400 leading-relaxed">
                        Standard low-cost hosting plan applies to maintain static web layouts online.
                      </div>
                    )}
                  </div>
                </div>
              )}

              {/* Core Intake Form */}
              <form onSubmit={handleFormSubmit} className="space-y-6">
                <div>
                  <h3 className="text-base sm:text-lg font-bold text-white font-syne mb-1">
                    Project Brief Details
                  </h3>
                  <p className="text-zinc-500 text-[11px] sm:text-sm leading-relaxed">
                    Provide project parameters or general requirements to initiate details with us.
                  </p>
                </div>

                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                  <div>
                    <label htmlFor="q-name" className="block text-xs uppercase tracking-wider text-zinc-500 mb-2 font-bold font-mono">
                      Contact Name *
                    </label>
                    <input
                      id="q-name"
                      type="text"
                      required
                      placeholder="Contact Name"
                      value={state.name}
                      onChange={(e) => updateField("name", e.target.value)}
                      className="w-full rounded-xl border border-zinc-800 bg-zinc-950/40 text-white placeholder-zinc-700 text-sm px-4 py-3.5 sm:py-4 focus:outline-none focus:border-purple-500 transition-colors"
                    />
                  </div>
                  <div>
                    <label htmlFor="q-email" className="block text-xs uppercase tracking-wider text-zinc-500 mb-2 font-bold font-mono">
                      Email Address *
                    </label>
                    <input
                      id="q-email"
                      type="email"
                      required
                      placeholder="email@domain.com"
                      value={state.email}
                      onChange={(e) => updateField("email", e.target.value)}
                      className="w-full rounded-xl border border-zinc-800 bg-zinc-950/40 text-white placeholder-zinc-700 text-sm px-4 py-3.5 sm:py-4 focus:outline-none focus:border-purple-500 transition-colors"
                    />
                  </div>
                </div>

                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                  <div>
                    <label htmlFor="q-biz" className="block text-xs uppercase tracking-wider text-zinc-500 mb-2 font-bold font-mono">
                      Business Name
                    </label>
                    <input
                      id="q-biz"
                      type="text"
                      placeholder="Business Name"
                      value={state.businessName}
                      onChange={(e) => updateField("businessName", e.target.value)}
                      className="w-full rounded-xl border border-zinc-800 bg-zinc-950/40 text-white placeholder-zinc-700 text-sm px-4 py-3.5 sm:py-4 focus:outline-none focus:border-purple-500 transition-colors"
                    />
                  </div>
                  <div>
                    <label htmlFor="q-website" className="block text-xs uppercase tracking-wider text-zinc-500 mb-2 font-bold font-mono">
                      Current Website <span className="text-zinc-600 font-normal">(if applicable)</span>
                    </label>
                    <input
                      id="q-website"
                      type="text"
                      placeholder="www.currentsite.com"
                      value={state.currentWebsite}
                      onChange={(e) => updateField("currentWebsite", e.target.value)}
                      className="w-full rounded-xl border border-zinc-800 bg-zinc-950/40 text-white placeholder-zinc-700 text-sm px-4 py-3.5 sm:py-4 focus:outline-none focus:border-purple-500 transition-colors"
                    />
                  </div>
                </div>

                <div>
                  <label htmlFor="q-goal" className="block text-xs uppercase tracking-wider text-zinc-500 mb-2 font-bold font-mono">
                    Primary Goal *
                  </label>
                  <select
                    id="q-goal"
                    required
                    value={state.primaryGoal}
                    onChange={(e) => updateField("primaryGoal", e.target.value)}
                    className="w-full rounded-xl border border-zinc-800 bg-zinc-950/40 text-white text-sm px-4 py-3.5 sm:py-4 focus:outline-none focus:border-purple-500 transition-colors"
                  >
                    <option value="" disabled className="bg-zinc-950 text-zinc-650">Select a goal</option>
                    <option value="showcase" className="bg-zinc-950 text-white">Showcase my services / Portfolio</option>
                    <option value="ecommerce" className="bg-zinc-950 text-white">Sell products online (E-commerce)</option>
                    <option value="bookings" className="bg-zinc-950 text-white">Take bookings or appointments</option>
                    <option value="custom" className="bg-zinc-950 text-white">Custom functionality (User logins, databases, etc.)</option>
                    <option value="revamp" className="bg-zinc-950 text-white">Just a general revamp of my current site</option>
                    <option value="other" className="bg-zinc-950 text-white">Something else</option>
                  </select>
                </div>

                <div>
                  <label htmlFor="q-phone" className="block text-xs uppercase tracking-wider text-zinc-500 mb-2 font-bold font-mono">
                    Phone Number
                  </label>
                  <input
                    id="q-phone"
                    type="tel"
                    placeholder="Contact Number"
                    value={state.phone}
                    onChange={(e) => updateField("phone", e.target.value)}
                    className="w-full rounded-xl border border-zinc-800 bg-zinc-950/40 text-white placeholder-zinc-700 text-sm px-4 py-3.5 sm:py-4 focus:outline-none focus:border-purple-500 transition-colors"
                  />
                </div>

                <div>
                  <label htmlFor="q-message" className="block text-xs uppercase tracking-wider text-zinc-500 mb-2 font-bold font-mono">
                    Brief Briefing / Notes
                  </label>
                  <textarea
                    id="q-message"
                    rows={4}
                    placeholder="Describe key functional objectives, target date expectations, or styling instructions..."
                    value={state.message}
                    onChange={(e) => updateField("message", e.target.value)}
                    className="w-full rounded-xl border border-zinc-800 bg-zinc-950/40 text-white placeholder-zinc-700 text-sm px-4 py-3.5 sm:py-4 focus:outline-none focus:border-purple-500 transition-colors resize-none"
                  />
                </div>

                <div className="flex flex-col sm:flex-row gap-4 pt-4 border-t border-zinc-900">
                  <button
                    type="button"
                    onClick={handleReset}
                    className="px-8 py-3.5 rounded-[2rem] border border-zinc-850 text-xs sm:text-sm uppercase tracking-wider text-zinc-500 hover:text-white hover:border-zinc-700 transition-colors font-unbounded order-2 sm:order-1"
                  >
                    Reset Form
                  </button>
                  <button
                    type="submit"
                    disabled={submitting}
                    className="flex-1 px-8 py-3.5 rounded-[2rem] text-xs sm:text-sm font-semibold font-unbounded uppercase tracking-wider bg-purple-600 text-white hover:bg-purple-700 transition-colors order-1 sm:order-2"
                  >
                    {submitting ? "Submitting Inquiry..." : "Submit Project Inquiry →"}
                  </button>
                </div>
              </form>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}
