import {
  UserPlus,
  BookOpen,
  Code,
  Briefcase,
  CheckCircle2,
} from "lucide-react";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "~/components/ui/card";
import { FadeIn } from "~/components/ui/fade-in";

const steps = [
  {
    number: "01",
    icon: UserPlus,
    title: "Sign Up & Join",
    description:
      "Create your account and join our community. Get instant access to resources, forums, and learning materials.",
    timeline: "Day 1",
  },
  {
    number: "02",
    icon: BookOpen,
    title: "Follow the Learning Path",
    description:
      "Work through our structured curriculum at your own pace. Learn frontend, backend, and full stack integration.",
    timeline: "Weeks 1-6",
  },
  {
    number: "03",
    icon: Code,
    title: "Build Real Projects",
    description:
      "Apply what you learn by building portfolio projects. Get code reviews and feedback from mentors and peers.",
    timeline: "Weeks 7-12",
  },
  {
    number: "04",
    icon: Briefcase,
    title: "Land Your Dream Job",
    description:
      "Get career support with resume reviews, interview prep, and job search guidance. Connect with hiring managers.",
    timeline: "Weeks 13+",
  },
];

export function HowItWorksSection() {
  return (
    <section id="how-it-works" className="w-full py-24 relative overflow-hidden">
      <div className="absolute inset-0 bg-gradient-to-b from-transparent via-primary/5 to-transparent pointer-events-none"></div>
      
      <div className="container mx-auto px-4 relative z-10">
        <FadeIn>
          <div className="text-center mb-16">
            <h2 className="text-3xl font-bold tracking-tight sm:text-4xl lg:text-5xl mb-6 text-foreground">
              How It <span className="text-gradient-primary">Works</span>
            </h2>
            <p className="text-lg text-muted-foreground sm:text-xl max-w-3xl mx-auto leading-relaxed">
              A clear, proven path from beginner to full stack engineer. No
              confusion, no guesswork.
            </p>
          </div>
        </FadeIn>

        <div className="max-w-6xl mx-auto">
          <div className="relative">
             {/* Connector Line (Desktop) */}
            <div className="hidden md:block absolute top-12 left-0 w-full h-0.5 bg-gradient-to-r from-transparent via-primary/30 to-transparent -z-10"></div>
            
            <div className="grid grid-cols-1 md:grid-cols-4 gap-8">
              {steps.map((step, index) => {
                const Icon = step.icon;
                return (
                  <FadeIn key={index} delay={index * 150} className="h-full">
                    <div className="flex flex-col items-center text-center group">
                      <div className="w-24 h-24 rounded-full bg-card border-2 border-primary/30 flex items-center justify-center mb-6 shadow-[0_0_20px_rgba(var(--primary),0.2)] group-hover:scale-110 transition-transform z-10 relative overflow-hidden">
                        <span className="font-mono font-bold text-3xl text-foreground relative z-10">{step.number}</span>
                         <div className="absolute inset-0 rounded-full border border-dashed border-primary/50 animate-spin-slow"></div>
                         <div className="absolute inset-0 bg-primary/10 rounded-full blur-xl group-hover:bg-primary/20 transition-colors"></div>
                      </div>
                      
                      <div className="glass-card p-6 rounded-2xl w-full flex-1 hover:-translate-y-1 transition-transform border-t-4 border-t-primary/50">
                        <div className="mb-4 inline-flex items-center gap-2 px-3 py-1 rounded-full bg-accent/50 border border-border text-xs text-primary font-medium">
                          <Icon className="h-3 w-3" />
                          {step.timeline}
                        </div>
                        <h3 className="text-lg font-bold text-foreground mb-2">
                          {step.title}
                        </h3>
                        <p className="text-muted-foreground text-sm leading-relaxed">
                          {step.description}
                        </p>
                      </div>
                    </div>
                  </FadeIn>
                );
              })}
            </div>
          </div>

          <FadeIn delay={600}>
            <div className="mt-20 text-center">
              <div className="inline-flex items-center gap-3 px-6 py-3 rounded-full bg-green-500/10 border border-green-500/20 text-green-600 dark:text-green-400">
                  <CheckCircle2 className="h-5 w-5" />
                  <span className="font-semibold">Average Time to Job: 6-12 Months</span>
              </div>
            </div>
          </FadeIn>
        </div>
      </div>
    </section>
  );
}
