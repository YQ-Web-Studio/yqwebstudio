"use client";

import ServicesSection from "@/components/ServicesSection";
import WorkSection from "@/components/WorkSection";
import BackgroundSection from "@/components/BackgroundSection";
import LabsSection from "@/components/LabsSection";
import QuestionsSection from "@/components/QuestionsSection";
import Footer from "@/components/Footer";

export const BelowTheFold = () => {
    return (
        <div 
            className="w-full"
            style={{ contentVisibility: 'auto', containIntrinsicSize: '0 3000px' } as any}
        >
            <ServicesSection />
            <WorkSection />
            <BackgroundSection />
            <LabsSection />
            <QuestionsSection />
            <Footer />
        </div>
    );
};
