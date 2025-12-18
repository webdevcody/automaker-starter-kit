import { Card, CardContent } from "~/components/ui/card";
import { Avatar, AvatarFallback } from "~/components/ui/avatar";
import { Star, Quote } from "lucide-react";
import { FadeIn } from "~/components/ui/fade-in";

const testimonials = [
  {
    name: "Sarah Chen",
    role: "Full Stack Engineer at Google",
    before: "Marketing Manager",
    after: "$145k/year",
    image: "SC",
    quote: "I transitioned from marketing to full stack engineering in 8 months. The community support and structured curriculum made all the difference. Now I'm building products used by millions.",
    rating: 5,
  },
  {
    name: "Marcus Johnson",
    role: "Senior Full Stack Developer at Stripe",
    before: "Retail Worker",
    after: "$160k/year",
    image: "MJ",
    quote: "No CS degree, no problem. This community taught me everything I needed. The real-world projects gave me confidence, and the portfolio I built landed me multiple offers.",
    rating: 5,
  },
  {
    name: "Emily Rodriguez",
    role: "Full Stack Engineer at Airbnb",
    before: "Teacher",
    after: "$135k/year",
    image: "ER",
    quote: "Best career decision I ever made. The mentorship and peer learning accelerated my growth. I went from zero coding experience to a full stack engineer in less than a year.",
    rating: 5,
  },
  {
    name: "David Kim",
    role: "Full Stack Developer at Netflix",
    before: "Customer Service",
    after: "$150k/year",
    image: "DK",
    quote: "The structured learning path eliminated all the guesswork. I knew exactly what to learn and in what order. The community helped me through every challenge.",
    rating: 5,
  },
  {
    name: "Jessica Martinez",
    role: "Full Stack Engineer at Microsoft",
    before: "Graphic Designer",
    after: "$140k/year",
    image: "JM",
    quote: "I loved the practical approach. Instead of just watching tutorials, I built real applications. That experience was invaluable in interviews.",
    rating: 5,
  },
  {
    name: "Alex Thompson",
    role: "Full Stack Developer at Amazon",
    before: "Sales Rep",
    after: "$155k/year",
    image: "AT",
    quote: "The career support was incredible. Resume reviews, mock interviews, and networking events helped me land my dream job. Worth every penny.",
    rating: 5,
  },
];

export function TestimonialsSection() {
  return (
    <section id="testimonials" className="w-full py-24 relative overflow-hidden bg-background">
      {/* Background Elements */}
      <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-full h-full max-w-7xl opacity-50 pointer-events-none">
          <div className="absolute top-0 right-0 w-[600px] h-[600px] bg-gradient-to-b from-primary/10 to-transparent rounded-full blur-[120px]"></div>
          <div className="absolute bottom-0 left-0 w-[600px] h-[600px] bg-gradient-to-t from-purple-500/10 to-transparent rounded-full blur-[120px]"></div>
      </div>
      
      <div className="container mx-auto px-4 relative z-10">
        <FadeIn>
          <div className="flex flex-col items-center text-center mb-20">
            <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-yellow-500/10 text-yellow-600 dark:text-yellow-500 text-xs font-bold uppercase tracking-wide mb-6 border border-yellow-500/20">
              <Star className="h-3 w-3 fill-current" />
              Trusted by Developers
            </div>
            <h2 className="text-3xl font-bold tracking-tight sm:text-4xl lg:text-6xl mb-6 text-foreground">
              Success <span className="text-gradient-primary">Stories</span>
            </h2>
            <p className="text-lg text-muted-foreground sm:text-xl max-w-2xl leading-relaxed">
              Don't just take our word for it. Here's what our community has achieved.
            </p>
          </div>
        </FadeIn>

        {/* Masonry-ish Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 max-w-7xl mx-auto">
          {testimonials.map((testimonial, index) => (
            <FadeIn key={index} delay={index * 100} className={`h-full ${index === 1 || index === 4 ? 'lg:translate-y-8' : ''}`}>
              <div className="bg-card/40 backdrop-blur-sm border border-border p-8 rounded-2xl h-full flex flex-col relative group hover:bg-card/60 transition-colors">
                {/* Quote Icon Background */}
                <div className="absolute top-6 right-8 opacity-5 group-hover:opacity-10 transition-opacity">
                   <Quote className="h-16 w-16 text-primary rotate-12" />
                </div>
                
                <div className="flex gap-1 mb-6">
                  {[...Array(testimonial.rating)].map((_, i) => (
                    <Star
                      key={i}
                      className="h-4 w-4 fill-yellow-500 text-yellow-500"
                    />
                  ))}
                </div>

                <p className="text-foreground/90 mb-8 text-lg leading-relaxed relative z-10 font-medium">
                  "{testimonial.quote}"
                </p>

                <div className="mt-auto flex items-center gap-4 border-t border-border pt-6">
                  <div className="h-10 w-10 rounded-full bg-gradient-to-br from-primary to-purple-600 flex items-center justify-center font-bold text-white text-sm shadow-lg">
                    {testimonial.image}
                  </div>
                  <div>
                    <div className="font-bold text-foreground text-sm">{testimonial.name}</div>
                    <div className="text-xs text-muted-foreground font-medium uppercase tracking-wide mt-0.5">
                      {testimonial.role}
                    </div>
                  </div>
                </div>
                
                {/* Salary Badge */}
                 <div className="absolute -bottom-3 right-6 bg-green-500/10 border border-green-500/20 text-green-600 dark:text-green-400 text-xs font-bold px-3 py-1 rounded-full backdrop-blur-md">
                    Now: {testimonial.after}
                 </div>
              </div>
            </FadeIn>
          ))}
        </div>
      </div>
    </section>
  );
}
