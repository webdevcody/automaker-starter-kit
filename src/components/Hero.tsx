import { Button } from "~/components/ui/button";
import { Link } from "@tanstack/react-router";
import { Rocket, Play } from "lucide-react";
import { FadeIn } from "~/components/ui/fade-in";

export function Hero() {
  return (
    <section className="w-full relative pt-32 pb-20 lg:pt-48 lg:pb-32 overflow-hidden">
      <div className="container mx-auto px-4 relative z-[2] flex flex-col">
        {/* Top notification banner */}
        <FadeIn delay={0} className="flex justify-center mb-8">
          <div className="inline-flex items-center gap-2 px-3 py-1.5 rounded-full border border-primary/30 bg-primary/10 text-primary text-xs font-semibold uppercase tracking-wide animate-fade-up backdrop-blur-sm">
            <span className="relative flex h-2 w-2">
              <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-primary opacity-75"></span>
              <span className="relative inline-flex rounded-full h-2 w-2 bg-primary"></span>
            </span>
            New Cohort Starting Soon
          </div>
        </FadeIn>

        {/* Main centered content */}
        <div className="flex-1 flex flex-col items-center justify-center text-center space-y-8 max-w-5xl mx-auto">
          <div className="space-y-6">
            <FadeIn delay={100}>
              <h1 className="text-5xl md:text-7xl lg:text-8xl font-bold tracking-tight text-foreground mb-6 leading-[1.1]">
                Transform Your Career: <br />
                Become a{" "}
                <span className="text-gradient-primary">
                  Full Stack Engineer
                </span>
              </h1>
            </FadeIn>
            <FadeIn delay={200}>
              <p className="mt-6 max-w-2xl mx-auto text-lg md:text-xl text-muted-foreground mb-10 font-light leading-relaxed">
                Master frontend and backend development, build real-world
                projects, and launch your software engineering career. Join
                thousands learning full stack development in our supportive
                community.
              </p>
            </FadeIn>
          </div>

          <FadeIn delay={300}>
            <div className="flex flex-col sm:flex-row justify-center items-center gap-4">
              <Button size="lg" className="w-full sm:w-auto h-14 px-8 rounded-full bg-gradient-to-r from-primary to-purple-600 text-white font-bold hover:shadow-[0_0_40px_-10px_rgba(var(--primary),0.5)] transition-all transform hover:-translate-y-1 text-base" asChild>
                <Link to="/sign-up" search={{ redirect: undefined }}>
                  <Rocket className="mr-2 h-4 w-4" />
                  Start for Free
                </Link>
              </Button>
              <Button
                size="lg"
                variant="outline"
                className="w-full sm:w-auto h-14 px-8 rounded-full border border-border bg-background/50 text-foreground font-medium hover:bg-accent hover:text-accent-foreground transition-all text-base backdrop-blur-sm"
                asChild
              >
                <a href="#curriculum">
                  <Play className="mr-2 h-4 w-4" />
                  See How it Works
                </a>
              </Button>
            </div>
          </FadeIn>
        </div>
      </div>
    </section>
  );
}
