"use client";

import { motion } from "framer-motion";
import Link from "next/link";
import { ArrowLeft } from "lucide-react";

export default function PrivacyPolicyPage() {
  return (
    <div className="min-h-screen bg-black text-zinc-300 py-20 px-6">
      <div className="max-w-4xl mx-auto">
        <motion.div
          initial={{ opacity: 0, x: -20 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ duration: 0.5 }}
          className="mb-12"
        >
          <Link 
            href="/" 
            className="inline-flex items-center gap-2 px-4 py-2 rounded-full border border-zinc-800 hover:bg-zinc-900 transition-colors text-zinc-400 hover:text-white group"
          >
            <ArrowLeft size={18} className="group-hover:-translate-x-1 transition-transform" />
            Back to Home
          </Link>
        </motion.div>

        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.2 }}
          className="prose prose-invert prose-purple max-w-none"
        >
          <div className="space-y-8 bg-zinc-950/50 border border-zinc-900 rounded-3xl p-8 md:p-12 shadow-2xl backdrop-blur-sm">
            <header className="border-b border-zinc-900 pb-8">
              <h1 className="text-4xl md:text-5xl font-bold text-white mb-4 tracking-tight">
                Privacy Policy
              </h1>
              <p className="text-zinc-500 font-medium">
                Last updated March 14, 2026
              </p>
            </header>

            <section className="space-y-6">
              <p>
                This Privacy Notice for <strong>YQ Web Studio</strong> describes how and why we might access, collect, store, use, and/or share ('process') your personal information when you use our services ('Services'), including when you:
              </p>
              <ul className="list-disc pl-6 space-y-2">
                <li>
                  Visit our website at <Link href="http://www.yqwebstudio.com" target="_blank" className="text-purple-400 hover:underline">http://www.yqwebstudio.com</Link> or any website of ours that links to this Privacy Notice
                </li>
                <li>
                  Engage with us in other related ways, including any marketing or events
                </li>
              </ul>
              <p>
                <strong>Questions or concerns?</strong> Reading this Privacy Notice will help you understand your privacy rights and choices. We are responsible for making decisions about how your personal information is processed. If you do not agree with our policies and practices, please do not use our Services. If you still have any questions or concerns, please contact us at <a href="mailto:support@yqwebstudio.com" className="text-purple-400 hover:underline">support@yqwebstudio.com</a>.
              </p>
            </section>

            <section className="space-y-4">
              <h2 className="text-2xl font-semibold text-white">SUMMARY OF KEY POINTS</h2>
              <p className="italic text-zinc-400 text-sm">
                This summary provides key points from our Privacy Notice, but you can find out more details about any of these topics by clicking the link following each key point or by using our table of contents below to find the section you are looking for.
              </p>
              <ul className="space-y-4">
                <li>
                  <strong>What personal information do we process?</strong> When you visit, use, or navigate our Services, we may process personal information depending on how you interact with us and the Services, the choices you make, and the products and features you use.
                </li>
                <li>
                  <strong>Do we process any sensitive personal information?</strong> We do not process sensitive personal information.
                </li>
                <li>
                  <strong>Do we collect any information from third parties?</strong> We do not collect any information from third parties.
                </li>
                <li>
                  <strong>How do we process your information?</strong> We process your information to provide, improve, and administer our Services, communicate with you, for security and fraud prevention, and to comply with law.
                </li>
                <li>
                  <strong>In what situations and with which parties do we share personal information?</strong> We may share information in specific situations and with specific third parties.
                </li>
                <li>
                  <strong>How do we keep your information safe?</strong> We have adequate organisational and technical processes and procedures in place to protect your personal information.
                </li>
              </ul>
            </section>

            <section className="space-y-4 pt-8 border-t border-zinc-900">
              <h2 className="text-2xl font-semibold text-white">1. WHAT INFORMATION DO WE COLLECT?</h2>
              <h3 className="text-xl font-medium text-white">Personal information you disclose to us</h3>
              <p>
                <em>In Short: We collect personal information that you provide to us.</em>
              </p>
              <p>
                We collect personal information that you voluntarily provide to us when you express an interest in obtaining information about us or our products and Services, when you participate in activities on the Services, or otherwise when you contact us.
              </p>
              <p>
                <strong>Personal Information Provided by You.</strong> The personal information that we collect depends on the context of your interactions with us and the Services, the choices you make, and the products and features you use. The personal information we collect may include the following:
              </p>
              <ul className="list-disc pl-6 space-y-2">
                <li>names</li>
                <li>email addresses</li>
                <li>company name</li>
              </ul>
              <p>
                <strong>Sensitive Information.</strong> We do not process sensitive information.
              </p>
            </section>

            <section className="space-y-4 pt-8 border-t border-zinc-900">
              <h2 className="text-2xl font-semibold text-white">2. HOW DO WE PROCESS YOUR INFORMATION?</h2>
              <p>
                <em>In Short: We process your information to provide, improve, and administer our Services, communicate with you, for security and fraud prevention, and to comply with law.</em>
              </p>
              <p>
                <strong>We process your personal information for a variety of reasons, depending on how you interact with our Services, including:</strong>
              </p>
              <ul className="list-disc pl-6 space-y-4">
                <li>
                  <strong>To deliver and facilitate delivery of services to the user.</strong> We may process your information to provide you with the requested service.
                </li>
                <li>
                  <strong>To respond to user inquiries/offer support to users.</strong> We may process your information to respond to your inquiries and solve any potential issues you might have with the requested service.
                </li>
                <li>
                  <strong>To send administrative information to you.</strong> We may process your information to send you details about our products and services, changes to our terms and policies, and other similar information.
                </li>
                <li>
                  <strong>To fulfil and manage your orders.</strong> We may process your information to fulfil and manage your orders, payments, returns, and exchanges made through the Services.
                </li>
                <li>
                  <strong>To save or protect an individual's vital interest.</strong> We may process your information when necessary to save or protect an individual’s vital interest, such as to prevent harm.
                </li>
              </ul>
            </section>

            <footer className="pt-12 mt-12 border-t border-zinc-900 text-zinc-500 text-sm italic">
              <p>
                This privacy policy was generated and adapted for YQ Web Studio on March 14, 2026.
              </p>
            </footer>
          </div>
        </motion.div>
      </div>
    </div>
  );
}
