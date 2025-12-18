import { Globe, Layers, Server } from "lucide-react";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "~/components/ui/card";
import { Badge } from "~/components/ui/badge";
import { FadeIn } from "~/components/ui/fade-in";

const frontendTech = [
  "React",
  "TypeScript",
  "Next.js",
  "HTML5 & CSS3",
  "Tailwind CSS",
  "JavaScript ES6+",
];

const backendTech = [
  "Node.js",
  "Express.js",
  "RESTful APIs",
  "GraphQL",
  "PostgreSQL",
  "MongoDB",
];

const fullStackSkills = [
  "Authentication & Authorization",
  "Database Design",
  "API Integration",
  "Deployment & DevOps",
  "Testing & Debugging",
  "Version Control (Git)",
];

const categories = [
  {
    icon: Globe,
    title: "Frontend Development",
    technologies: frontendTech,
    description: "Build modern, responsive user interfaces",
  },
  {
    icon: Server,
    title: "Backend Development",
    technologies: backendTech,
    description: "Create robust server-side applications",
  },
  {
    icon: Layers,
    title: "Full Stack Integration",
    technologies: fullStackSkills,
    description: "Connect frontend and backend seamlessly",
  },
];

export function CurriculumSection() {
  return (
    <section id="curriculum" className="w-full py-24 bg-muted/20 relative border-y border-border">
      {/* Technical Grid Background */}
      <div className="absolute inset-0 bg-[linear-gradient(to_right,rgba(var(--foreground),0.03)_1px,transparent_1px),linear-gradient(to_bottom,rgba(var(--foreground),0.03)_1px,transparent_1px)] bg-[size:14px_14px] opacity-20"></div>
      
      <div className="container mx-auto px-4 relative z-10">
        <FadeIn>
          <div className="flex flex-col md:flex-row justify-between items-end mb-16">
             <div className="max-w-2xl">
               <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-blue-500/10 text-blue-600 dark:text-blue-400 text-xs font-mono mb-4 border border-blue-500/20">
                 <span className="w-2 h-2 rounded-full bg-blue-500 animate-pulse"></span>
                 SYSTEM_ARCHITECTURE
               </div>
               <h2 className="text-3xl font-bold tracking-tight sm:text-4xl lg:text-5xl text-foreground mb-4">
                 Full Stack <span className="text-blue-600 dark:text-blue-400">Curriculum</span>
               </h2>
               <p className="text-lg text-muted-foreground leading-relaxed">
                 Master the complete stack. From pixel-perfect frontends to scalable backend infrastructure.
               </p>
             </div>
             
             <div className="hidden md:block">
               <div className="text-right font-mono text-xs text-muted-foreground">
                 <p>v4.2.0 Updated</p>
                 <p>Latest Standards</p>
               </div>
             </div>
          </div>
        </FadeIn>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8 max-w-7xl mx-auto">
          {categories.map((category, index) => {
            const Icon = category.icon;
            return (
              <FadeIn key={index} delay={index * 150} className="h-full">
                <div className="bg-card/40 border border-border p-1 rounded-2xl h-full hover:border-blue-500/30 transition-colors group">
                  <div className="bg-card/80 rounded-xl p-8 h-full flex flex-col relative overflow-hidden">
                    {/* Top Accent Line */}
                    <div className="absolute top-0 left-0 w-full h-1 bg-gradient-to-r from-blue-500/0 via-blue-500/50 to-blue-500/0 opacity-0 group-hover:opacity-100 transition-opacity"></div>
                    
                    <div className="flex items-center justify-between mb-8">
                      <div className="rounded-lg bg-muted p-3 group-hover:bg-blue-500/20 group-hover:text-blue-600 dark:group-hover:text-blue-400 transition-colors">
                        <Icon className="h-6 w-6 text-muted-foreground" />
                      </div>
                      <div className="font-mono text-xs text-muted-foreground">0{index + 1}</div>
                    </div>
                    
                    <h3 className="text-xl font-bold text-foreground mb-3 group-hover:text-blue-600 dark:group-hover:text-blue-400 transition-colors">{category.title}</h3>
                    <p className="text-muted-foreground text-sm mb-8 leading-relaxed">
                      {category.description}
                    </p>
                    
                    <div className="mt-auto space-y-3">
                      <div className="text-xs font-mono text-muted-foreground uppercase tracking-wider mb-2">Stack:</div>
                      <div className="flex flex-wrap gap-2">
                        {category.technologies.map((tech) => (
                          <span key={tech} className="text-xs font-mono py-1 px-2 rounded bg-muted text-muted-foreground border border-border">
                            {tech}
                          </span>
                        ))}
                      </div>
                    </div>
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
