"use client";

import { motion, AnimatePresence } from "framer-motion";
import { X, ChevronDown, ChevronLeft, Sparkles } from "lucide-react";
import { useState, useRef } from "react";
import { toast } from "sonner";
import { useMotionValue, useSpring } from "framer-motion";
import { sendContactEmail } from "../../app/actions/sendEmail";

// ─────────────────────────────────────────────
// Types
// ─────────────────────────────────────────────
interface QuoteData {
  projectType: string;
  size: string;
  addons: string[];
}

// ─────────────────────────────────────────────
// Pricing Data
// ─────────────────────────────────────────────
const PROJECT_TYPES = [
  { id: "landing",   label: "Landing Page",      icon: "◈", basePrice: 500  },
  { id: "brochure",  label: "Brochure Site",      icon: "◉", basePrice: 900  },
  { id: "ecommerce", label: "E-Commerce",         icon: "◎", basePrice: 1800 },
  { id: "webapp",    label: "Web Application",    icon: "⬡", basePrice: 3500 },
  { id: "redesign",  label: "Redesign / Refresh", icon: "↺", basePrice: 700  },
  { id: "headless",  label: "Headless CMS / API", icon: "⬢", basePrice: 2200 },
];

const SIZE_OPTIONS = [
  { id: "starter",    label: "Starter",    sub: "Up to 5 pages",    multiplier: 1.0 },
  { id: "growth",     label: "Growth",     sub: "6–15 pages",       multiplier: 1.6 },
  { id: "scale",      label: "Scale",      sub: "16–30 pages",      multiplier: 2.4 },
  { id: "enterprise", label: "Enterprise", sub: "Unlimited scope",  multiplier: 4.0 },
];

const ADD_ONS = [
  { id: "seo",           label: "Technical SEO",        price: 250 },
  { id: "cms",           label: "CMS Integration",      price: 400 },
  { id: "analytics",     label: "Analytics & Tracking", price: 150 },
  { id: "animation",     label: "Premium Animations",   price: 350 },
  { id: "multilang",     label: "Multilingual / i18n",  price: 500 },
  { id: "maintenance",   label: "Monthly Retainer",     price: 200 },
];

function calcEstimate(q: QuoteData): { min: number; max: number } {
  const type = PROJECT_TYPES.find((t) => t.id === q.projectType);
  const size = SIZE_OPTIONS.find((s) => s.id === q.size);
  const addonsTotal = q.addons.reduce((acc, id) => {
    const a = ADD_ONS.find((x) => x.id === id);
    return acc + (a?.price ?? 0);
  }, 0);
  const min = Math.round((type?.basePrice ?? 500) * (size?.multiplier ?? 1) + addonsTotal);
  return { min, max: Math.round(min * 1.2) };
}

function gbp(n: number) {
  return new Intl.NumberFormat("en-GB", { style: "currency", currency: "GBP", maximumFractionDigits: 0 }).format(n);
}

function buildEstimateSummary(q: QuoteData): string {
  const type  = PROJECT_TYPES.find((t) => t.id === q.projectType)?.label ?? "";
  const size  = SIZE_OPTIONS.find((s) => s.id === q.size)?.label ?? "";
  const addons = q.addons.map((id) => ADD_ONS.find((a) => a.id === id)?.label).filter(Boolean).join(", ");
  const { min, max } = calcEstimate(q);
  let summary = `Estimate: ${gbp(min)} – ${gbp(max)}\nProject: ${type} (${size} scope)`;
  if (addons) summary += `\nAdd-ons: ${addons}`;
  return summary;
}

// ─────────────────────────────────────────────
// Mini Quote Wizard (inline inside drawer)
// ─────────────────────────────────────────────
const QUOTE_STEPS = ["Type", "Scope", "Extras"] as const;

function QuoteWizard({
  onDone,
  onCancel,
}: {
  onDone: (summary: string) => void;
  onCancel: () => void;
}) {
  const [step, setStep] = useState(0);
  const [data, setData] = useState<QuoteData>({ projectType: "", size: "", addons: [] });

  const toggleAddon = (id: string) =>
    setData((prev) => ({
      ...prev,
      addons: prev.addons.includes(id) ? prev.addons.filter((a) => a !== id) : [...prev.addons, id],
    }));

  const { min, max } = calcEstimate(data);
  const hasType = !!data.projectType;
  const hasSize = !!data.size;

  return (
    <div className="flex flex-col gap-4">
      {/* Header */}
      <div className="flex items-center justify-between mb-1">
        <div className="flex items-center gap-2">
          <Sparkles className="w-4 h-4 text-purple-400" />
          <span className="text-[10px] font-mono font-bold text-purple-400 uppercase tracking-[0.25em]">
            Instant Estimate
          </span>
        </div>
        <button
          type="button"
          onClick={onCancel}
          className="text-[10px] font-mono uppercase tracking-widest text-zinc-600 hover:text-zinc-400 transition-colors flex items-center gap-1"
        >
          <ChevronLeft className="w-3 h-3" />
          Back to form
        </button>
      </div>

      {/* Step pills */}
      <div className="flex items-center gap-2 mb-1">
        {QUOTE_STEPS.map((label, i) => (
          <div key={label} className="flex items-center gap-2">
            <div className={`flex items-center gap-1.5 text-[10px] font-mono uppercase tracking-widest transition-colors duration-300 ${
              i === step ? "text-purple-400" : i < step ? "text-zinc-500" : "text-zinc-700"
            }`}>
              <span className={`w-4 h-4 rounded-full flex items-center justify-center text-[9px] font-bold transition-all duration-300 ${
                i < step ? "bg-purple-600 text-white" : i === step ? "bg-purple-500/20 text-purple-400 ring-1 ring-purple-500/50" : "bg-zinc-800 text-zinc-600"
              }`}>
                {i < step ? "✓" : i + 1}
              </span>
              {label}
            </div>
            {i < QUOTE_STEPS.length - 1 && <span className={`w-5 h-px ${i < step ? "bg-purple-700" : "bg-zinc-800"}`} />}
          </div>
        ))}
      </div>

      <AnimatePresence mode="wait">
        {/* Step 0 — Project Type */}
        {step === 0 && (
          <motion.div key="type" initial={{ opacity: 0, x: 12 }} animate={{ opacity: 1, x: 0 }} exit={{ opacity: 0, x: -12 }} transition={{ duration: 0.2 }}>
            <p className="text-xs text-zinc-500 mb-3">What are we building?</p>
            <div className="grid grid-cols-2 gap-2">
              {PROJECT_TYPES.map((t) => (
                <button
                  key={t.id}
                  type="button"
                  onClick={() => setData((p) => ({ ...p, projectType: t.id }))}
                  className={`relative text-left rounded-xl border px-3 py-2.5 transition-all duration-200 focus:outline-none focus-visible:ring-1 focus-visible:ring-purple-500 ${
                    data.projectType === t.id
                      ? "border-purple-500/60 bg-purple-950/40 shadow-[0_0_14px_rgba(139,92,246,0.2)]"
                      : "border-zinc-800 bg-zinc-900/50 hover:border-zinc-700"
                  }`}
                >
                  <span className="block text-base leading-none mb-1 text-purple-400">{t.icon}</span>
                  <span className="block text-xs text-zinc-200 font-medium leading-tight">{t.label}</span>
                  {data.projectType === t.id && (
                    <span className="absolute top-2 right-2 w-3.5 h-3.5 rounded-full bg-purple-500 flex items-center justify-center text-[8px] text-white font-bold">✓</span>
                  )}
                </button>
              ))}
            </div>
            <div className="flex justify-end mt-4">
              <button
                type="button"
                disabled={!hasType}
                onClick={() => setStep(1)}
                className={`px-5 py-2 rounded-full text-xs font-mono uppercase tracking-widest transition-all duration-200 ${
                  hasType
                    ? "bg-purple-600 text-white hover:bg-purple-500"
                    : "bg-zinc-800 text-zinc-600 cursor-not-allowed"
                }`}
              >
                Next →
              </button>
            </div>
          </motion.div>
        )}

        {/* Step 1 — Scope */}
        {step === 1 && (
          <motion.div key="scope" initial={{ opacity: 0, x: 12 }} animate={{ opacity: 1, x: 0 }} exit={{ opacity: 0, x: -12 }} transition={{ duration: 0.2 }}>
            <p className="text-xs text-zinc-500 mb-3">What&apos;s the project scope?</p>
            <div className="grid grid-cols-2 gap-2">
              {SIZE_OPTIONS.map((s) => (
                <button
                  key={s.id}
                  type="button"
                  onClick={() => setData((p) => ({ ...p, size: s.id }))}
                  className={`relative text-left rounded-xl border px-3 py-3 transition-all duration-200 focus:outline-none focus-visible:ring-1 focus-visible:ring-purple-500 ${
                    data.size === s.id
                      ? "border-purple-500/60 bg-purple-950/40 shadow-[0_0_14px_rgba(139,92,246,0.2)]"
                      : "border-zinc-800 bg-zinc-900/50 hover:border-zinc-700"
                  }`}
                >
                  <span className="block text-xs text-zinc-200 font-medium">{s.label}</span>
                  <span className="block text-[10px] text-zinc-600 mt-0.5">{s.sub}</span>
                  {data.size === s.id && (
                    <span className="absolute top-2 right-2 w-3.5 h-3.5 rounded-full bg-purple-500 flex items-center justify-center text-[8px] text-white font-bold">✓</span>
                  )}
                </button>
              ))}
            </div>
            <div className="flex items-center justify-between mt-4">
              <button type="button" onClick={() => setStep(0)} className="text-xs text-zinc-600 hover:text-zinc-400 transition-colors">← Back</button>
              <button
                type="button"
                disabled={!hasSize}
                onClick={() => setStep(2)}
                className={`px-5 py-2 rounded-full text-xs font-mono uppercase tracking-widest transition-all duration-200 ${
                  hasSize ? "bg-purple-600 text-white hover:bg-purple-500" : "bg-zinc-800 text-zinc-600 cursor-not-allowed"
                }`}
              >
                Next →
              </button>
            </div>
          </motion.div>
        )}

        {/* Step 2 — Add-ons + Result */}
        {step === 2 && (
          <motion.div key="addons" initial={{ opacity: 0, x: 12 }} animate={{ opacity: 1, x: 0 }} exit={{ opacity: 0, x: -12 }} transition={{ duration: 0.2 }}>
            <p className="text-xs text-zinc-500 mb-3">Any extras? <span className="text-zinc-700">(Optional)</span></p>
            <div className="grid grid-cols-2 gap-2 mb-5">
              {ADD_ONS.map((a) => (
                <button
                  key={a.id}
                  type="button"
                  onClick={() => toggleAddon(a.id)}
                  className={`relative text-left rounded-xl border px-3 py-2.5 transition-all duration-200 focus:outline-none focus-visible:ring-1 focus-visible:ring-purple-500 ${
                    data.addons.includes(a.id)
                      ? "border-purple-500/60 bg-purple-950/40 shadow-[0_0_14px_rgba(139,92,246,0.15)]"
                      : "border-zinc-800 bg-zinc-900/50 hover:border-zinc-700"
                  }`}
                >
                  <span className="block text-xs text-zinc-200 font-medium leading-snug">{a.label}</span>
                  <span className={`block text-[10px] mt-0.5 font-mono transition-colors ${data.addons.includes(a.id) ? "text-purple-400" : "text-zinc-600"}`}>
                    +{gbp(a.price)}
                  </span>
                </button>
              ))}
            </div>

            {/* Estimate result */}
            <div className="rounded-xl border border-purple-500/30 bg-purple-950/25 px-4 py-4 mb-4">
              <p className="text-[10px] font-mono uppercase tracking-[0.25em] text-purple-400 mb-1">Your estimate</p>
              <p className="text-2xl font-bold text-white tracking-tight">
                {gbp(min)}
                <span className="text-base font-normal text-zinc-500"> – {gbp(max)}</span>
              </p>
              <p className="text-[10px] text-zinc-600 mt-2 leading-relaxed italic">
                This acts as an automated preliminary estimate. Final proposals may vary depending on deep technical discovery and precise system specifications.
              </p>
            </div>

            <div className="flex items-center justify-between">
              <button type="button" onClick={() => setStep(1)} className="text-xs text-zinc-600 hover:text-zinc-400 transition-colors">← Back</button>
              <button
                type="button"
                onClick={() => onDone(buildEstimateSummary(data))}
                className="px-5 py-2 rounded-full text-xs font-mono uppercase tracking-widest bg-purple-600 text-white hover:bg-purple-500 transition-colors duration-200"
              >
                Use this & enquire →
              </button>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
}

// ─────────────────────────────────────────────
// Existing sub-components (unchanged)
// ─────────────────────────────────────────────
const goals = [
  { value: "showcase", label: "Showcase my services / Portfolio" },
  { value: "ecommerce", label: "Sell products online (E-commerce)" },
  { value: "bookings", label: "Take bookings or appointments" },
  { value: "custom", label: "Custom functionality (User logins, databases, etc.)" },
  { value: "revamp", label: "Just a general revamp of my current site" },
  { value: "other", label: "Something else" },
];

const PremiumSelect = ({ name, required }: { name: string; required?: boolean }) => {
  const [isOpen, setIsOpen] = useState(false);
  const [selected, setSelected] = useState("");

  const selectedLabel = goals.find((g) => g.value === selected)?.label || "Select a goal";

  return (
    <div className="relative">
      <input type="hidden" name={name} value={selected} required={required} />
      <button
        type="button"
        onClick={() => setIsOpen(!isOpen)}
        className="w-full bg-zinc-900/50 border border-zinc-800 rounded-xl px-4 py-3.5 focus:border-zinc-500 focus:ring-1 focus:ring-zinc-500 outline-none transition-all text-left flex items-center justify-between group"
      >
        <span className={selected ? "text-zinc-100" : "text-zinc-600"}>
          {selectedLabel}
        </span>
        <motion.div
          animate={{ rotate: isOpen ? 180 : 0 }}
          transition={{ duration: 0.2 }}
        >
          <ChevronDown className="text-zinc-600 group-hover:text-zinc-400 transition-colors w-5 h-5" />
        </motion.div>
      </button>

      <AnimatePresence>
        {isOpen && (
          <>
            <div 
              className="fixed inset-0 z-10" 
              onClick={() => setIsOpen(false)} 
            />
            <motion.div
              initial={{ opacity: 0, y: 10, scale: 0.95 }}
              animate={{ opacity: 1, y: 0, scale: 1 }}
              exit={{ opacity: 0, y: 10, scale: 0.95 }}
              transition={{ duration: 0.2, ease: "easeOut" }}
              className="absolute z-20 top-full left-0 right-0 mt-3 bg-zinc-900/90 backdrop-blur-xl border border-zinc-800 rounded-xl overflow-hidden shadow-2xl py-2"
            >
              {goals.map((goal) => (
                <button
                  key={goal.value}
                  type="button"
                  onClick={() => {
                    setSelected(goal.value);
                    setIsOpen(false);
                  }}
                  className={`w-full text-left px-4 py-3 text-sm transition-colors hover:bg-zinc-800/50 ${
                    selected === goal.value ? "text-purple-400 bg-purple-500/5" : "text-zinc-400"
                  }`}
                >
                  {goal.label}
                </button>
              ))}
            </motion.div>
          </>
        )}
      </AnimatePresence>
    </div>
  );
};

const MagneticSubmitButton = ({ isSubmitting, children }: { isSubmitting: boolean, children: React.ReactNode }) => {
  const ref = useRef<HTMLButtonElement>(null);
  const x = useMotionValue(0);
  const y = useMotionValue(0);

  const springConfig = { damping: 15, stiffness: 150, mass: 0.1 };
  const springX = useSpring(x, springConfig);
  const springY = useSpring(y, springConfig);

  const handleMouseMove = (e: React.MouseEvent<HTMLElement>) => {
    const { clientX, clientY } = e;
    if (!ref.current) return;
    const { height, width, left, top } = ref.current.getBoundingClientRect();
    const middleX = clientX - (left + width / 2);
    const middleY = clientY - (top + height / 2);
    x.set(middleX * 0.2);
    y.set(middleY * 0.2);
  };

  const handleMouseLeave = () => {
    x.set(0);
    y.set(0);
  };

  return (
    <motion.button
      ref={ref}
      disabled={isSubmitting}
      type="submit"
      onMouseMove={handleMouseMove}
      onMouseLeave={handleMouseLeave}
      whileHover={{ scale: 1.03 }}
      transition={{ ease: [0.25, 0.46, 0.45, 0.94], duration: 0.4 }}
      style={{ x: springX, y: springY }}
      className="w-full relative overflow-hidden group inline-flex items-center justify-center px-8 py-5 rounded-full bg-zinc-900 border border-zinc-800 text-white font-medium transition-colors disabled:opacity-50 disabled:scale-100"
    >
      <span className="absolute inset-0 bg-purple-600 translate-y-[100%] group-hover:translate-y-0 transition-transform duration-500 ease-[cubic-bezier(0.25,0.46,0.45,0.94)] z-0" />
      <span className="relative z-10 block">{children}</span>
    </motion.button>
  );
};

// ─────────────────────────────────────────────
// Main Drawer Content
// ─────────────────────────────────────────────
export const ContactDrawerContent = ({ isOpen, closeContact }: { isOpen: boolean, closeContact: () => void }) => {
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [isSuccess, setIsSuccess] = useState(false);
  const [showEstimator, setShowEstimator] = useState(false);
  const [estimateBadge, setEstimateBadge] = useState<string | null>(null);
  const projectDetailsRef = useRef<HTMLTextAreaElement>(null);

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setIsSubmitting(true);
    
    const formData = new FormData(e.currentTarget);
    const result = await sendContactEmail(formData);
    
    setIsSubmitting(false);
    
    if (result.success) {
      setIsSuccess(true);
      toast.success("Enquiry received! I'll get back to you shortly.");
    } else {
      toast.error(result.error || "Something went wrong. Please try again.");
    }
  };

  const handleClose = () => {
    closeContact();
    setTimeout(() => {
      setIsSuccess(false);
      setShowEstimator(false);
      setEstimateBadge(null);
    }, 500);
  };

  const handleEstimateDone = (summary: string) => {
    setEstimateBadge(summary);
    setShowEstimator(false);
    // Pre-fill the textarea after the estimator folds away
    setTimeout(() => {
      if (projectDetailsRef.current) {
        projectDetailsRef.current.value = summary + "\n\n";
        // trigger a synthetic input event so React picks up the value
        const nativeInputValueSetter = Object.getOwnPropertyDescriptor(
          window.HTMLTextAreaElement.prototype, "value"
        )?.set;
        if (nativeInputValueSetter) {
          nativeInputValueSetter.call(projectDetailsRef.current, summary + "\n\n");
          projectDetailsRef.current.dispatchEvent(new Event("input", { bubbles: true }));
        }
        projectDetailsRef.current.focus();
        projectDetailsRef.current.setSelectionRange(
          projectDetailsRef.current.value.length,
          projectDetailsRef.current.value.length
        );
      }
    }, 350);
  };

  return (
    <AnimatePresence>
      {isOpen && (
        <div className="fixed inset-0 z-[100] isolate">
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            onClick={handleClose}
            className="absolute inset-0 bg-black/40 backdrop-blur-sm cursor-pointer"
          />

          <motion.div
            initial={{ x: "100%" }}
            animate={{ x: 0 }}
            exit={{ x: "100%" }}
            transition={{ type: "spring", damping: 30, stiffness: 300, mass: 0.8 }}
            className="absolute top-0 right-0 h-full w-full md:w-[500px] bg-zinc-950/95 backdrop-blur-2xl border-l border-zinc-800/50 p-8 md:p-12 overflow-y-auto flex flex-col shadow-2xl"
          >
            <div className="flex items-center justify-between mb-12">
              <div>
                <p className="text-[10px] font-mono font-bold text-purple-500 uppercase tracking-[0.3em] mb-2">
                  Get in touch
                </p>
                <h2 className="text-3xl md:text-4xl font-bold tracking-tight text-zinc-50 leading-tight">
                  Tell me about <br />
                  <span className="text-gradient font-serif italic font-normal">your project.</span>
                </h2>
              </div>
              <button
                onClick={handleClose}
                className="p-3 rounded-full bg-zinc-900 border border-zinc-800 text-zinc-400 hover:text-white hover:border-zinc-700 transition-all active:scale-90"
                aria-label="Close"
              >
                <X className="w-5 h-5" />
              </button>
            </div>

            <div className="flex-1 flex flex-col">
              <AnimatePresence mode="wait">
                {!isSuccess ? (
                  <motion.div
                    key="contact-form-wrapper"
                    initial={{ opacity: 0, y: 10 }}
                    animate={{ opacity: 1, y: 0 }}
                    exit={{ opacity: 0, y: -10 }}
                    className="flex-1 flex flex-col"
                  >
                    {/* ── Inline Estimator Panel ── */}
                    <AnimatePresence>
                      {showEstimator && (
                        <motion.div
                          key="estimator"
                          initial={{ opacity: 0, height: 0 }}
                          animate={{ opacity: 1, height: "auto" }}
                          exit={{ opacity: 0, height: 0 }}
                          transition={{ duration: 0.35, ease: [0.16, 1, 0.3, 1] }}
                          className="overflow-hidden"
                        >
                          <div className="rounded-2xl border border-purple-500/20 bg-purple-950/20 p-5 mb-8">
                            <QuoteWizard
                              onDone={handleEstimateDone}
                              onCancel={() => setShowEstimator(false)}
                            />
                          </div>
                        </motion.div>
                      )}
                    </AnimatePresence>

                    {/* ── Contact Form ── */}
                    <motion.form
                      key="contact-form"
                      onSubmit={handleSubmit}
                      className="flex-1 flex flex-col"
                    >
                      <div className="space-y-6">
                        <div>
                          <label htmlFor="name" className="block text-[10px] font-mono uppercase tracking-widest text-zinc-500 mb-2 px-1">
                            Your Name
                          </label>
                          <input
                            required
                            type="text"
                            id="name"
                            name="name"
                            placeholder="Enter your name"
                            className="bg-zinc-900/50 border border-zinc-800 rounded-xl px-4 py-3.5 focus:border-zinc-500 focus:ring-1 focus:ring-zinc-500 outline-none transition-all text-zinc-100 placeholder:text-zinc-600 w-full"
                          />
                        </div>

                        <div>
                          <label htmlFor="email" className="block text-[10px] font-mono uppercase tracking-widest text-zinc-500 mb-2 px-1">
                            Email Address
                          </label>
                          <input
                            required
                            type="email"
                            id="email"
                            name="email"
                            placeholder="hello@example.com"
                            className="bg-zinc-900/50 border border-zinc-800 rounded-xl px-4 py-3.5 focus:border-zinc-500 focus:ring-1 focus:ring-zinc-500 outline-none transition-all text-zinc-100 placeholder:text-zinc-600 w-full"
                          />
                        </div>

                        <div>
                          <label htmlFor="businessName" className="block text-[10px] font-mono uppercase tracking-widest text-zinc-500 mb-2 px-1">
                            Business Name
                          </label>
                          <input
                            type="text"
                            id="businessName"
                            name="businessName"
                            placeholder="Your Company Inc."
                            className="bg-zinc-900/50 border border-zinc-800 rounded-xl px-4 py-3.5 focus:border-zinc-500 focus:ring-1 focus:ring-zinc-500 outline-none transition-all text-zinc-100 placeholder:text-zinc-600 w-full"
                          />
                        </div>

                        <div>
                          <label htmlFor="primaryGoal" className="block text-[10px] font-mono uppercase tracking-widest text-zinc-500 mb-2 px-1">
                            Primary Goal
                          </label>
                          <PremiumSelect name="primaryGoal" required />
                        </div>

                        <div>
                          <div className="flex items-center justify-between mb-2 px-1">
                            <label htmlFor="projectDetails" className="block text-[10px] font-mono uppercase tracking-widest text-zinc-500">
                              Project Details
                            </label>
                            {/* ── "Get an estimate" trigger ── */}
                            {!showEstimator && (
                              <button
                                type="button"
                                onClick={() => setShowEstimator(true)}
                                className="flex items-center gap-1 text-[10px] font-mono uppercase tracking-widest text-purple-500 hover:text-purple-300 transition-colors duration-200 group"
                              >
                                <Sparkles className="w-3 h-3 group-hover:scale-110 transition-transform duration-200" />
                                {estimateBadge ? "Re-run estimate" : "Get an estimate first"}
                              </button>
                            )}
                          </div>

                          {/* Estimate badge (shown after wizard completes) */}
                          <AnimatePresence>
                            {estimateBadge && !showEstimator && (
                              <motion.div
                                initial={{ opacity: 0, y: -6 }}
                                animate={{ opacity: 1, y: 0 }}
                                exit={{ opacity: 0, y: -6 }}
                                transition={{ duration: 0.25 }}
                                className="flex items-center gap-2 mb-2 px-3 py-2 rounded-lg bg-purple-950/30 border border-purple-500/20"
                              >
                                <Sparkles className="w-3 h-3 text-purple-400 shrink-0" />
                                <span className="text-[10px] font-mono text-purple-300 leading-snug">
                                  {estimateBadge.split("\n")[0]}
                                </span>
                              </motion.div>
                            )}
                          </AnimatePresence>

                          <textarea
                            ref={projectDetailsRef}
                            id="projectDetails"
                            name="projectDetails"
                            required
                            placeholder="Tell me more about what you're looking to build..."
                            className="bg-zinc-900/50 border border-zinc-800 rounded-xl px-4 py-3.5 focus:border-zinc-500 focus:ring-1 focus:ring-zinc-500 outline-none transition-all text-zinc-100 placeholder:text-zinc-600 w-full min-h-[120px] resize-none"
                          />
                        </div>
                      </div>

                      <div className="mt-12 pb-8">
                        <MagneticSubmitButton isSubmitting={isSubmitting}>
                          {isSubmitting ? "Sending Discovery..." : "Send Enquiry"}
                        </MagneticSubmitButton>
                        <div className="flex items-center justify-center gap-2 mt-4 text-zinc-500">
                          <span className="w-1.5 h-1.5 rounded-full bg-green-500 animate-pulse" />
                          <p className="text-[10px] font-mono uppercase tracking-[0.2em]">
                            Typically responds within 24 hours
                          </p>
                        </div>
                      </div>
                    </motion.form>
                  </motion.div>
                ) : (
                  <motion.div
                    key="success-message"
                    initial={{ opacity: 0, scale: 0.95 }}
                    animate={{ opacity: 1, scale: 1 }}
                    exit={{ opacity: 0, scale: 0.95 }}
                    className="flex-1 flex flex-col items-center justify-center text-center space-y-6"
                  >
                    <div className="w-20 h-20 rounded-full bg-green-500/10 flex items-center justify-center mb-4">
                      <motion.div
                         initial={{ scale: 0 }}
                         animate={{ scale: 1 }}
                         transition={{ delay: 0.2, type: "spring", stiffness: 200 }}
                      >
                         <span className="text-4xl text-green-500">✓</span>
                      </motion.div>
                    </div>
                    <h3 className="text-2xl font-bold text-zinc-50">Enquiry Received</h3>
                    <p className="text-zinc-400 max-w-[300px]">
                      Your message has been received. I will review your details and be in touch shortly.
                    </p>
                    <button
                      onClick={handleClose}
                      className="px-8 py-3 rounded-xl bg-zinc-900 border border-zinc-800 text-zinc-100 font-medium hover:border-zinc-600 transition-colors"
                    >
                      Close
                    </button>
                  </motion.div>
                )}
              </AnimatePresence>
            </div>
          </motion.div>
        </div>
      )}
    </AnimatePresence>
  );
};
