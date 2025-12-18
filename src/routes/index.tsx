import { ClientOnly, createFileRoute } from "@tanstack/react-router";
import { useEffect } from "react";
import * as React from "react";
import { Hero } from "~/components/Hero";
import { SalaryStatsSection } from "~/components/SalaryStatsSection";
import { BenefitsSection } from "~/components/BenefitsSection";
import { CurriculumSection } from "~/components/CurriculumSection";
import { TestimonialsSection } from "~/components/TestimonialsSection";
import { CommunitySection } from "~/components/CommunitySection";
import { HowItWorksSection } from "~/components/HowItWorksSection";
import { PricingSection } from "~/components/PricingSection";
import { FAQSection } from "~/components/FAQSection";
import { FinalCTASection } from "~/components/FinalCTASection";
import { SectionDivider } from "~/components/SectionDivider";

export const Route = createFileRoute("/")({
  component: Home,
});

function Home() {
  useEffect(() => {
    // Add structured data for SEO
    const structuredData = {
      "@context": "https://schema.org",
      "@type": "EducationalOrganization",
      name: "Full Stack Campus",
      description:
        "Online community and training platform for aspiring full stack engineers",
      url: typeof window !== "undefined" ? window.location.origin : "",
    };

    const courseStructuredData = {
      "@context": "https://schema.org",
      "@type": "Course",
      name: "Full Stack Engineer Training Program",
      description:
        "Comprehensive training program to become a full stack engineer, covering frontend and backend technologies",
      provider: {
        "@type": "Organization",
        name: "Full Stack Campus",
      },
      teaches: [
        "Full Stack Development",
        "Frontend Development",
        "Backend Development",
        "Web Development",
        "Software Engineering",
      ],
    };

    const faqStructuredData = {
      "@context": "https://schema.org",
      "@type": "FAQPage",
      mainEntity: [
        {
          "@type": "Question",
          name: "How long does it take to become a full stack engineer?",
          acceptedAnswer: {
            "@type": "Answer",
            text: "Most members land their first full stack engineer role within 6-12 months of starting our program.",
          },
        },
        {
          "@type": "Question",
          name: "What is the average salary of a full stack engineer?",
          acceptedAnswer: {
            "@type": "Answer",
            text: "According to Glassdoor, Indeed, and Payscale, the average full stack engineer salary in the United States ranges from $115,000 to $150,000 per year.",
          },
        },
        {
          "@type": "Question",
          name: "Do I need a computer science degree to become a full stack engineer?",
          acceptedAnswer: {
            "@type": "Answer",
            text: "No, you don't need a computer science degree to become a full stack engineer. Many successful full stack engineers are self-taught or have completed bootcamps and online courses.",
          },
        },
      ],
    };

    // Remove existing structured data scripts if any
    const existingScripts = document.querySelectorAll(
      'script[type="application/ld+json"]'
    );
    existingScripts.forEach((script) => script.remove());

    // Add new structured data
    const addScript = (data: object) => {
      const script = document.createElement("script");
      script.type = "application/ld+json";
      script.textContent = JSON.stringify(data);
      document.head.appendChild(script);
    };

    addScript(structuredData);
    addScript(courseStructuredData);
    addScript(faqStructuredData);

    return () => {
      // Cleanup on unmount
      const scripts = document.querySelectorAll(
        'script[type="application/ld+json"]'
      );
      scripts.forEach((script) => script.remove());
    };
  }, []);

  return (
    <div className="flex flex-col min-h-[calc(100vh-3.5rem)] relative">
      {/* Noise Texture */}
      <div className="noise-overlay"></div>

      {/* Background Ambience */}
      <div className="fixed inset-0 z-[-1] pointer-events-none overflow-hidden bg-background">
        <div className="absolute inset-0 bg-[linear-gradient(to_right,rgba(var(--foreground),0.03)_1px,transparent_1px),linear-gradient(to_bottom,rgba(var(--foreground),0.03)_1px,transparent_1px)] bg-[length:40px_40px] [mask-image:radial-gradient(ellipse_at_center,black_40%,transparent_100%)] opacity-20"></div>
        <div className="absolute top-[-10%] left-[-10%] w-[600px] h-[600px] bg-primary/20 rounded-full blur-[128px] animate-blob"></div>
        <div className="absolute bottom-[-10%] right-[-10%] w-[600px] h-[600px] bg-purple-500/15 rounded-full blur-[128px] animate-blob animation-delay-2000"></div>
        <div className="absolute top-[40%] left-[30%] w-[300px] h-[300px] bg-teal-400/10 rounded-full blur-[100px] animate-pulse-slow"></div>
      </div>

      <main className="flex-1 relative z-10">
        <Hero />
        <SectionDivider />
        <SalaryStatsSection />
        <SectionDivider />
        <BenefitsSection />
        <SectionDivider />
        <CurriculumSection />
        <SectionDivider />
        <TestimonialsSection />
        <SectionDivider />
        <CommunitySection />
        <SectionDivider />
        <HowItWorksSection />
        <SectionDivider />
        <ClientOnly>
          <PricingSection />
        </ClientOnly>
        <SectionDivider />
        <FAQSection />
        <SectionDivider />
        <FinalCTASection />
      </main>
    </div>
  );
}
