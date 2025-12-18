import { BookOpen, Users, Briefcase, Code, Target, Zap } from "lucide-react";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "~/components/ui/card";
import { FadeIn } from "~/components/ui/fade-in";

const benefits = [
  {
    icon: BookOpen,
    title: "Structured Learning Path",
    description: "Follow a proven curriculum designed by industry experts. No guesswork - just clear steps from beginner to full stack engineer.",
  },
  {
    icon: Users,
    title: "Active Community Support",
    description: "Join thousands of learners in our community. Get help, share projects, and network with peers and mentors.",
  },
  {
    icon: Briefcase,
    title: "Career Transition Support",
    description: "Get help with resumes, portfolios, and interview prep. Our community has helped hundreds land their first developer role.",
  },
  {
    icon: Code,
    title: "Real-World Projects",
    description: "Build portfolio projects that showcase your skills. Learn by doing, not just watching tutorials.",
  },
  {
    icon: Target,
    title: "Industry Connections",
    description: "Connect with experienced developers, hiring managers, and tech recruiters in our network.",
  },
  {
    icon: Zap,
    title: "Practical Experience",
    description: "Work on real applications using modern tools and technologies that employers actually use.",
  },
];

export function BenefitsSection() {
  return (
    <section id="benefits" className="w-full py-24 relative overflow-hidden">
      {/* Background blobs for this section */}
      <div className="absolute top-0 left-0 w-[500px] h-[500px] bg-primary/5 rounded-full blur-[100px] pointer-events-none -translate-x-1/2 -translate-y-1/2"></div>
      
      <div className="container mx-auto px-4 relative z-10">
        <FadeIn>
          <div className="text-center mb-16">
            <h2 className="text-3xl font-bold tracking-tight sm:text-4xl lg:text-5xl mb-6 text-foreground">
              Everything You Need to <span className="text-gradient-primary">Succeed</span>
            </h2>
            <p className="text-lg text-muted-foreground sm:text-xl max-w-3xl mx-auto leading-relaxed">
              We've built a comprehensive platform that addresses every aspect of
              becoming a full stack engineer.
            </p>
          </div>
        </FadeIn>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 max-w-7xl mx-auto auto-rows-[250px]">
          {/* Large Card 1 */}
          <div className="md:col-span-2 row-span-1 md:row-span-1 glass-card p-8 rounded-2xl relative overflow-hidden group">
             <div className="relative z-10 flex flex-col justify-between h-full">
               <div className="flex items-start justify-between">
                 <div className="rounded-lg bg-muted border border-border p-3">
                   <BookOpen className="h-6 w-6 text-primary" />
                 </div>
                 <div className="px-3 py-1 rounded-full bg-accent/50 border border-border text-xs text-muted-foreground">Step-by-step</div>
               </div>
               <div>
                 <h3 className="text-2xl font-bold text-foreground mb-2">Structured Learning Path</h3>
                 <p className="text-muted-foreground max-w-lg">Follow a proven curriculum designed by industry experts. No guesswork - just clear steps from beginner to full stack engineer.</p>
               </div>
             </div>
             <div className="absolute right-0 top-0 w-64 h-64 bg-primary/10 rounded-full blur-[80px] group-hover:bg-primary/20 transition-colors"></div>
          </div>

          {/* Tall Card */}
          <div className="md:col-span-1 md:row-span-2 glass-card gradient-border p-8 rounded-2xl relative overflow-hidden group">
            <div className="relative z-10 h-full flex flex-col">
               <div className="rounded-lg bg-muted border border-border p-3 w-fit mb-6">
                 <Code className="h-6 w-6 text-purple-600 dark:text-purple-400" />
               </div>
               <h3 className="text-2xl font-bold text-foreground mb-4">Real-World Projects</h3>
               <p className="text-muted-foreground mb-8">Build portfolio projects that showcase your skills. Learn by doing, not just watching tutorials.</p>
               
               <div className="mt-auto bg-slate-950 p-4 rounded-lg border border-border font-mono text-xs text-slate-300 overflow-hidden shadow-inner group-hover:border-primary/30 transition-colors">
                  <div className="opacity-70 select-none space-y-1">
                    <p><span className="text-purple-400">git</span> commit -m <span className="text-green-400">"feat: initial commit"</span></p>
                    <p><span className="text-purple-400">git</span> push origin main</p>
                    <p className="text-slate-500">Enumerating objects: 15, done.</p>
                    <p className="text-slate-500">Writing objects: 100% (15/15), 2.3 KiB.</p>
                    <p className="text-green-400">remote: Resolving deltas: 100% (4/4)</p>
                  </div>
               </div>
            </div>
          </div>

          {/* Regular Cards */}
          <div className="md:col-span-1 row-span-1 glass-card p-8 rounded-2xl group hover:bg-accent/5 transition-colors">
             <div className="rounded-lg bg-muted border border-border p-3 w-fit mb-4">
               <Users className="h-6 w-6 text-blue-600 dark:text-blue-400" />
             </div>
             <h3 className="text-xl font-bold text-foreground mb-2">Community Support</h3>
             <p className="text-muted-foreground text-sm">Join thousands of learners. Get help, share projects, and network.</p>
          </div>

          <div className="md:col-span-1 row-span-1 glass-card p-8 rounded-2xl group hover:bg-accent/5 transition-colors">
             <div className="rounded-lg bg-muted border border-border p-3 w-fit mb-4">
               <Briefcase className="h-6 w-6 text-green-600 dark:text-green-400" />
             </div>
             <h3 className="text-xl font-bold text-foreground mb-2">Career Support</h3>
             <p className="text-muted-foreground text-sm">Resume reviews, portfolios, and interview prep to land the job.</p>
          </div>

           {/* Wide Card */}
           <div className="md:col-span-2 row-span-1 glass-card p-8 rounded-2xl flex flex-col md:flex-row gap-6 items-center">
             <div className="flex-1">
               <div className="rounded-lg bg-muted border border-border p-3 w-fit mb-4">
                 <Zap className="h-6 w-6 text-yellow-600 dark:text-yellow-400" />
               </div>
               <h3 className="text-xl font-bold text-foreground mb-2">Practical Experience</h3>
               <p className="text-muted-foreground text-sm">Work on real applications using modern tools and technologies.</p>
             </div>
             <div className="flex-1 border-l border-border pl-6 hidden md:block">
               <div className="rounded-lg bg-muted border border-border p-3 w-fit mb-4">
                 <Target className="h-6 w-6 text-red-600 dark:text-red-400" />
               </div>
               <h3 className="text-xl font-bold text-foreground mb-2">Industry Connections</h3>
               <p className="text-muted-foreground text-sm">Connect with experienced developers and hiring managers.</p>
             </div>
           </div>

        </div>
      </div>
    </section>
  );
}
