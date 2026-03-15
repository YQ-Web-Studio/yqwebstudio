"use client";

import dynamic from "next/dynamic";
import { useState, useEffect, useRef } from "react";

const ServicesSection = dynamic(() => import('@/components/ServicesSection'), { ssr: false });
const BackgroundSection = dynamic(() => import('@/components/BackgroundSection'), { ssr: false });
const WorkSection = dynamic(() => import('@/components/WorkSection'), { ssr: false });
const LabsSection = dynamic(() => import('@/components/LabsSection'), { ssr: false });
const QuestionsSection = dynamic(() => import('@/components/QuestionsSection'), { ssr: false });
const Footer = dynamic(() => import('@/components/Footer'), { ssr: false });

export const BelowTheFold = () => {
    const [shouldRender, setShouldRender] = useState(false);
    const sentinelRef = useRef<HTMLDivElement>(null);

    useEffect(() => {
        const observer = new IntersectionObserver(
            ([entry]) => {
                if (entry.isIntersecting) {
                    setShouldRender(true);
                    if (sentinelRef.current) observer.unobserve(sentinelRef.current);
                }
            },
            { rootMargin: "0px 0px 200px 0px" } // Only trigger when user is specifically approaching 200px from the boundary
        );

        if (sentinelRef.current) {
            observer.observe(sentinelRef.current);
        }

        return () => {
            if (sentinelRef.current) observer.unobserve(sentinelRef.current);
        };
    }, []);

    return (
        <>
            <div ref={sentinelRef} className="h-1 w-full opacity-0 pointer-events-none absolute top-[90vh]" aria-hidden="true" />
            {shouldRender && (
            <div 
                className="w-full"
                style={{ contentVisibility: 'auto', containIntrinsicSize: '0 3000px' } as any}
            >
                <ServicesSection />
                <BackgroundSection />
                <WorkSection />
                <LabsSection />
                <QuestionsSection />
                <Footer />
            </div>
            )}
        </>
    );
};
