import { Button } from "~/components/ui/button";
import { Link } from "@tanstack/react-router";
import { Rocket, Shield, Clock, CheckCircle2 } from "lucide-react";
import { Card, CardContent } from "~/components/ui/card";
import { FadeIn } from "~/components/ui/fade-in";

export function FinalCTASection() {
  return (
    <section className="w-full py-32 relative overflow-hidden bg-primary/90">
      <div className="absolute inset-0 bg-gradient-to-br from-primary via-primary to-purple-800 opacity-90"></div>
      
      {/* Background Pattern */}
      <div className="absolute inset-0 z-0">
          <div className="absolute inset-0 bg-[linear-gradient(to_right,#ffffff0a_1px,transparent_1px),linear-gradient(to_bottom,#ffffff0a_1px,transparent_1px)] bg-[size:32px_32px] opacity-20"></div>
          <div className="absolute top-0 right-0 w-[800px] h-[800px] bg-white/10 rounded-full blur-[120px] pointer-events-none -translate-y-1/2 translate-x-1/2"></div>
      </div>

      <div className="container mx-auto px-4 relative z-10 text-center">
        <FadeIn>
          <div className="max-w-4xl mx-auto">
             <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-white/10 text-white text-sm font-bold uppercase tracking-wide mb-8 border border-white/20 backdrop-blur-md">
               <Rocket className="h-4 w-4 animate-bounce" />
               Limited Time Offer
             </div>
             
             <h2 className="text-4xl md:text-6xl lg:text-7xl font-bold tracking-tight text-white mb-8">
               Start Your <br/>
               <span className="text-transparent bg-clip-text bg-gradient-to-r from-white to-purple-200">Engineering Journey</span>
             </h2>
             
             <p className="text-xl md:text-2xl text-purple-100 mb-12 max-w-2xl mx-auto leading-relaxed font-light">
               Join thousands of successful developers. Stop watching tutorials and start building real software today.
             </p>

             <div className="flex flex-col sm:flex-row gap-6 justify-center items-center mb-16">
               <Button size="lg" className="text-lg h-16 px-10 rounded-full bg-white text-primary font-bold hover:bg-slate-100 hover:scale-105 transition-all duration-300 shadow-2xl" asChild>
                 <Link to="/sign-up" search={{ redirect: undefined }}>
                   Get Started Now
                 </Link>
               </Button>
               <Button size="lg" variant="outline" className="text-lg h-16 px-10 rounded-full border-white/30 text-white hover:bg-white/10 backdrop-blur-sm" asChild>
                 <a href="#pricing">
                   View Pricing
                 </a>
               </Button>
             </div>

             <div className="grid grid-cols-1 md:grid-cols-3 gap-8 pt-12 border-t border-white/10 text-white/80">
                <div className="flex flex-col items-center gap-3">
                   <Shield className="h-8 w-8 text-white/60" />
                   <div className="font-semibold text-white">Money-Back Guarantee</div>
                   <div className="text-sm text-white/60">Risk-free for 30 days</div>
                </div>
                <div className="flex flex-col items-center gap-3">
                   <Clock className="h-8 w-8 text-white/60" />
                   <div className="font-semibold text-white">Instant Access</div>
                   <div className="text-sm text-white/60">Start learning immediately</div>
                </div>
                <div className="flex flex-col items-center gap-3">
                   <CheckCircle2 className="h-8 w-8 text-white/60" />
                   <div className="font-semibold text-white">Proven Curriculum</div>
                   <div className="text-sm text-white/60">Job-ready skills</div>
                </div>
             </div>
          </div>
        </FadeIn>
      </div>
    </section>
  );
}
