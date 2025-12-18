import { Users, Calendar, MessageSquare, TrendingUp, Award, Network } from "lucide-react";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "~/components/ui/card";
import { FadeIn } from "~/components/ui/fade-in";

const communityFeatures = [
  {
    icon: Users,
    stat: "10,000+",
    label: "Active Members",
    description: "Join a thriving community of learners and developers",
  },
  {
    icon: MessageSquare,
    stat: "50+",
    label: "Daily Discussions",
    description: "Get help and share knowledge in our active forums",
  },
  {
    icon: Calendar,
    stat: "Weekly",
    label: "Workshops & Events",
    description: "Live coding sessions, Q&As, and networking events",
  },
  {
    icon: Network,
    stat: "500+",
    label: "Mentors",
    description: "Connect with experienced developers and industry experts",
  },
  {
    icon: TrendingUp,
    stat: "85%",
    label: "Job Placement Rate",
    description: "Members successfully transition to developer roles",
  },
  {
    icon: Award,
    stat: "1,000+",
    label: "Projects Built",
    description: "Real portfolio projects created by our community",
  },
];

export function CommunitySection() {
  return (
    <section id="community" className="w-full py-24 relative overflow-hidden bg-background">
      {/* Map Background (Simulated with radial gradients) */}
      <div className="absolute inset-0 opacity-20 pointer-events-none">
          <div className="absolute top-[20%] left-[20%] w-96 h-96 bg-primary/20 rounded-full blur-[120px]"></div>
          <div className="absolute bottom-[20%] right-[20%] w-96 h-96 bg-purple-500/20 rounded-full blur-[120px]"></div>
      </div>

      <div className="container mx-auto px-4 relative z-10">
        <FadeIn>
          <div className="text-center mb-20">
            <h2 className="text-3xl font-bold tracking-tight sm:text-4xl lg:text-6xl mb-6 text-foreground">
              Global <span className="text-primary">Community</span>
            </h2>
            <p className="text-lg text-muted-foreground sm:text-xl max-w-2xl mx-auto">
              Join a network of developers who are building the future.
            </p>
          </div>
        </FadeIn>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-x-8 gap-y-16 max-w-6xl mx-auto">
          {communityFeatures.map((feature, index) => {
            const Icon = feature.icon;
            return (
              <FadeIn key={index} delay={index * 100} className="h-full">
                <div className="flex flex-col items-center text-center group">
                  <div className="mb-6 relative">
                    <div className="absolute inset-0 bg-primary/20 blur-xl rounded-full opacity-0 group-hover:opacity-100 transition-opacity duration-500"></div>
                    <Icon className="h-10 w-10 text-muted-foreground group-hover:text-primary transition-colors relative z-10" />
                  </div>
                  
                  <h3 className="text-5xl md:text-6xl font-bold mb-4 tracking-tighter text-foreground group-hover:scale-110 transition-transform duration-300">
                    {feature.stat}
                  </h3>
                  
                  <div className="text-lg font-bold text-primary mb-2 uppercase tracking-widest text-xs">
                    {feature.label}
                  </div>
                  
                  <p className="text-muted-foreground text-sm max-w-xs leading-relaxed">
                    {feature.description}
                  </p>
                </div>
              </FadeIn>
            );
          })}
        </div>

        <FadeIn delay={400}>
           <div className="mt-24 pt-12 border-t border-border flex flex-wrap justify-center gap-12 opacity-50 grayscale hover:grayscale-0 transition-all duration-500">
              {/* Fake Logos for "Hired By" */}
              <div className="text-xl font-bold text-foreground flex items-center gap-2"><div className="w-6 h-6 bg-foreground rounded-full"></div> COMPANY A</div>
              <div className="text-xl font-bold text-foreground flex items-center gap-2"><div className="w-6 h-6 bg-foreground rounded-md"></div> STARTUP B</div>
              <div className="text-xl font-bold text-foreground flex items-center gap-2"><div className="w-6 h-6 bg-foreground rounded-sm rotate-45"></div> TECH CORP</div>
              <div className="text-xl font-bold text-foreground flex items-center gap-2"><div className="w-6 h-6 bg-foreground rounded-full border-2 border-black dark:border-white"></div> STUDIO</div>
           </div>
           <p className="text-center text-xs text-muted-foreground mt-4 uppercase tracking-widest">Graduates Hired By</p>
        </FadeIn>
      </div>
    </section>
  );
}
