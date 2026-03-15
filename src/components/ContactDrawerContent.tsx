"use client";

import { motion, AnimatePresence } from "framer-motion";
import { X, ChevronDown } from "lucide-react";
import { useState, useRef } from "react";
import { toast } from "sonner";
import { useMotionValue, useSpring } from "framer-motion";
import { sendContactEmail } from "../../app/actions/sendEmail";

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

export const ContactDrawerContent = ({ isOpen, closeContact }: { isOpen: boolean, closeContact: () => void }) => {
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [isSuccess, setIsSuccess] = useState(false);

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
    setTimeout(() => setIsSuccess(false), 500);
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
                  <motion.form
                    key="contact-form"
                    initial={{ opacity: 0, y: 10 }}
                    animate={{ opacity: 1, y: 0 }}
                    exit={{ opacity: 0, y: -10 }}
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
                        <label htmlFor="projectDetails" className="block text-[10px] font-mono uppercase tracking-widest text-zinc-500 mb-2 px-1">
                          Project Details
                        </label>
                        <textarea
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
