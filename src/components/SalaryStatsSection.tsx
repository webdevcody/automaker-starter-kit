import { DollarSign, TrendingUp, Briefcase, Users } from "lucide-react";
import { Card, CardContent } from "~/components/ui/card";
import { FadeIn } from "~/components/ui/fade-in";

export function SalaryStatsSection() {
  const stats = [
    {
      icon: DollarSign,
      value: "$130k",
      label: "Average Salary",
      description: "Full Stack Engineer",
      trend: "+12%",
    },
    {
      icon: TrendingUp,
      value: "13%",
      label: "Job Growth",
      description: "Through 2030 (BLS)",
      trend: "High Growth",
    },
    {
      icon: Briefcase,
      value: "200k+",
      label: "Open Jobs",
      description: "Currently Available",
      trend: "High Demand",
    },
    {
      icon: Users,
      value: "85%",
      label: "Success Rate",
      description: "Career Transition",
      trend: "Proven",
    },
  ];

  return (
    <section className="w-full py-24 relative bg-muted/30 border-y border-border">
      <div className="container mx-auto px-4 relative z-[2]">
        <FadeIn>
          <div className="flex flex-col md:flex-row justify-between items-end mb-12">
            <div>
              <h2 className="text-primary font-mono text-sm font-semibold tracking-wide uppercase mb-2">Market Data</h2>
              <h3 className="text-3xl md:text-4xl font-bold text-foreground">Why Learn Full Stack?</h3>
            </div>
            <p className="text-muted-foreground mt-4 md:mt-0 max-w-md text-right">
              The data speaks for itself. It's one of the highest-paying and most secure careers in tech.
            </p>
          </div>
        </FadeIn>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
          {stats.map((stat, index) => {
            const Icon = stat.icon;
            return (
              <FadeIn key={index} delay={index * 100} className="h-full">
                <div className="p-6 rounded-2xl h-full flex flex-col border border-border bg-card/50 hover:bg-card transition-colors group">
                  <div className="flex items-center justify-between mb-8">
                    <div className="rounded-lg bg-primary/10 p-3 text-primary group-hover:text-primary-foreground group-hover:bg-primary transition-colors">
                      <Icon className="h-6 w-6" />
                    </div>
                    <span className="text-xs font-mono text-green-600 dark:text-green-400 bg-green-100 dark:bg-green-400/10 px-2 py-1 rounded-full">{stat.trend}</span>
                  </div>
                  
                  <div>
                    <div className="text-4xl font-bold text-foreground mb-1">{stat.value}</div>
                    <div className="text-lg font-semibold text-foreground/80 mb-2">{stat.label}</div>
                    <div className="text-sm text-muted-foreground">{stat.description}</div>
                  </div>
                </div>
              </FadeIn>
            );
          })}
        </div>
      </div>
    </section>
  );
}
