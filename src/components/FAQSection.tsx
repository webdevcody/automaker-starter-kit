import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "~/components/ui/accordion";
import { FadeIn } from "~/components/ui/fade-in";

const faqs = [
  {
    question: "How long does it take to become a full stack engineer?",
    answer: "Most members land their first full stack engineer role within 6-12 months of starting our program. The timeline depends on your prior experience, how much time you can dedicate weekly, and your learning pace. Our structured curriculum is designed to be completed in 6-9 months with consistent effort, but you can go at your own pace.",
  },
  {
    question: "What is the average salary of a full stack engineer?",
    answer: "According to Glassdoor, Indeed, and Payscale, the average full stack engineer salary in the United States ranges from $115,000 to $150,000 per year. Entry-level positions typically start around $80,000-$100,000, while senior full stack engineers can earn $150,000-$200,000+. Location, experience, and company size all factor into compensation.",
  },
  {
    question: "Do I need a computer science degree to become a full stack engineer?",
    answer: "No, you don't need a computer science degree to become a full stack engineer. Many successful full stack engineers are self-taught or have completed bootcamps and online courses. What matters most is your ability to code, build projects, and solve problems. Our community includes members from diverse backgrounds - teachers, marketers, retail workers - who successfully transitioned to full stack engineering careers.",
  },
  {
    question: "What programming languages do I need to learn to become a full stack engineer?",
    answer: "For full stack engineering, you'll need to learn JavaScript (or TypeScript) as your core language, since it's used for both frontend and backend. You'll also learn HTML and CSS for frontend development. For backend, you'll work with Node.js and potentially Python or other server-side languages. Additionally, you'll need to understand SQL for database work. Our curriculum covers all these technologies in a structured, practical way.",
  },
  {
    question: "Is full stack engineering a good career?",
    answer: "Yes, full stack engineering is an excellent career choice. The field offers high salaries (average $130k), strong job growth (13% projected growth through 2030), high demand (200k+ open positions), and excellent work-life balance opportunities. Full stack engineers can work remotely, have flexibility in their career paths, and enjoy solving diverse technical challenges. It's one of the most in-demand roles in tech today.",
  },
  {
    question: "What does a full stack engineer do?",
    answer: "A full stack engineer builds and maintains both the frontend (user-facing) and backend (server-side) of web applications. They work with databases, APIs, user interfaces, and server infrastructure. Full stack engineers can work on entire features from start to finish, making them valuable team members who understand how all parts of an application work together.",
  },
  {
    question: "How much do full stack engineers make?",
    answer: "Full stack engineer salaries vary by location and experience. Entry-level: $80k-$100k, Mid-level: $115k-$140k, Senior: $150k-$200k+. According to recent data from Glassdoor and Indeed, the national average is around $130,000 per year. Salaries are typically higher in tech hubs like San Francisco, New York, and Seattle.",
  },
  {
    question: "What is the full stack developer career path?",
    answer: "The typical full stack developer career path starts as a Junior Full Stack Developer, progresses to Mid-Level Full Stack Engineer, then Senior Full Stack Engineer. From there, you can specialize as a Tech Lead, Engineering Manager, or Solutions Architect. Some full stack engineers also become entrepreneurs, starting their own tech companies or working as freelancers.",
  },
  {
    question: "Can I learn full stack development online?",
    answer: "Absolutely! Many successful full stack engineers learned entirely online. Our community-based approach combines structured curriculum, hands-on projects, peer learning, and mentorship - all accessible online. You'll build real portfolio projects, get code reviews, and receive career guidance, all from your computer.",
  },
  {
    question: "What skills do I need to be a full stack engineer?",
    answer: "Full stack engineers need frontend skills (HTML, CSS, JavaScript/TypeScript, React), backend skills (Node.js, APIs, databases), version control (Git), deployment knowledge, and problem-solving abilities. Soft skills like communication, collaboration, and continuous learning are also crucial. Our curriculum covers all technical skills needed, and our community helps develop the professional skills.",
  },
  {
    question: "Is it hard to become a full stack engineer?",
    answer: "Becoming a full stack engineer requires dedication and consistent effort, but it's absolutely achievable with the right support and structure. The learning curve can be steep initially, but our community, mentors, and structured curriculum make the journey manageable. Most members find that having a clear learning path and supportive community significantly reduces the difficulty.",
  },
  {
    question: "What is the difference between a full stack engineer and a full stack developer?",
    answer: "The terms 'full stack engineer' and 'full stack developer' are often used interchangeably. Generally, 'engineer' may imply more seniority or a focus on architecture and system design, while 'developer' often refers to someone who writes code. In practice, both roles involve building full stack applications. Our program prepares you for both titles.",
  },
  {
    question: "How do I become a full stack engineer from scratch?",
    answer: "Start with fundamentals: HTML, CSS, and JavaScript. Then learn a frontend framework like React and a backend technology like Node.js. Build projects to practice, learn databases and APIs, and create a portfolio. Join a community for support and mentorship. Our structured curriculum guides you through this entire process step-by-step, from absolute beginner to job-ready full stack engineer.",
  },
  {
    question: "What is the job market like for full stack engineers?",
    answer: "The job market for full stack engineers is extremely strong. There are over 200,000 open full stack developer positions in the U.S. alone, with 13% projected growth through 2030 (much faster than average). Companies across all industries need full stack engineers, from startups to Fortune 500 companies. Remote opportunities are also abundant.",
  },
  {
    question: "Can I become a full stack engineer without a degree?",
    answer: "Yes, many full stack engineers don't have computer science degrees. What matters is your ability to code, build projects, and solve problems. Employers care more about your portfolio, technical skills, and problem-solving abilities than your degree. Our community has helped hundreds of non-CS graduates land full stack engineering roles.",
  },
  {
    question: "What technologies should I learn for full stack development?",
    answer: "For modern full stack development, learn React or Vue.js for frontend, Node.js for backend, TypeScript for type safety, PostgreSQL or MongoDB for databases, and Git for version control. You should also understand RESTful APIs, authentication, deployment (AWS, Vercel, etc.), and testing. Our curriculum covers all these technologies with hands-on projects.",
  },
  {
    question: "How much can I earn as a full stack engineer?",
    answer: "Full stack engineer earnings vary significantly by location, experience, and company. Entry-level positions typically pay $80k-$100k, mid-level $115k-$140k, and senior roles $150k-$200k+. The national average is around $130,000. Many full stack engineers also supplement income through freelancing, consulting, or building their own products.",
  },
  {
    question: "Is full stack engineering in demand?",
    answer: "Yes, full stack engineering is one of the most in-demand tech roles. With 200,000+ open positions and 13% projected growth, the demand far exceeds supply. Companies value full stack engineers because they can work across the entire application stack, making them versatile and cost-effective team members.",
  },
  {
    question: "What is the best way to learn full stack development?",
    answer: "The best way combines structured learning, hands-on practice, and community support. Follow a proven curriculum, build real projects (not just tutorials), get code reviews from experienced developers, join a community for peer learning, and work on portfolio projects. Our program provides all of this in one place.",
  },
  {
    question: "How do I get a job as a full stack engineer?",
    answer: "Build a strong portfolio with 3-5 real projects, contribute to open source, network with other developers, prepare for technical interviews (coding challenges, system design), optimize your resume and LinkedIn, and apply strategically. Our career support includes resume reviews, interview prep, mock interviews, and connections with hiring managers.",
  },
];

export function FAQSection() {
  return (
    <section id="faq" className="w-full py-16 sm:py-24">
      <div className="container mx-auto px-4 relative z-10">
        <FadeIn>
          <div className="text-center mb-16">
            <h2 className="text-3xl font-bold tracking-tight sm:text-4xl lg:text-5xl mb-6 text-foreground">
              Frequently Asked <span className="text-gradient-primary">Questions</span>
            </h2>
            <p className="text-lg text-muted-foreground sm:text-xl max-w-3xl mx-auto leading-relaxed">
              Everything you need to know about becoming a full stack engineer, 
              from career paths to salary expectations.
            </p>
          </div>
        </FadeIn>

        <FadeIn delay={200}>
          <div className="max-w-4xl mx-auto">
            <Accordion type="single" collapsible className="w-full glass-card rounded-2xl overflow-hidden">
              {faqs.map((faq, index) => (
                <AccordionItem key={index} value={`item-${index}`} className="px-6 border-b border-border last:border-0 data-[state=open]:bg-muted/50 transition-colors">
                  <AccordionTrigger className="text-left text-base text-foreground hover:text-primary transition-colors py-6 font-medium">
                    {faq.question}
                  </AccordionTrigger>
                  <AccordionContent className="text-muted-foreground text-base leading-relaxed pb-6">
                    {faq.answer}
                  </AccordionContent>
                </AccordionItem>
              ))}
            </Accordion>
          </div>
        </FadeIn>
      </div>
    </section>
  );
}
