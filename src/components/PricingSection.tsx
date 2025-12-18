import { SUBSCRIPTION_PLANS } from "~/lib/plans";
import { authClient } from "~/lib/auth-client";
import {
  useUserPlan,
  useCreateCheckoutSession,
} from "~/hooks/useSubscription";
import { useRouter } from "@tanstack/react-router";
import { toast } from "sonner";
import { useState } from "react";
import { PricingCard } from "./PricingCard";
import type { SubscriptionPlan } from "~/db/schema";
import { FadeIn } from "~/components/ui/fade-in";

interface PricingSectionProps {
  showTitle?: boolean;
}

export function PricingSection({ showTitle = true }: PricingSectionProps) {
  const { data: session, isPending: sessionLoading } = authClient.useSession();
  const router = useRouter();
  const [loadingPlan, setLoadingPlan] = useState<string | null>(null);

  // Fetch user's current subscription plan
  const { data: userPlan, isLoading: planLoading } = useUserPlan();

  // Create checkout session mutation
  const checkoutMutation = useCreateCheckoutSession();

  const handlePlanSelect = (priceId: string) => {
    if (sessionLoading) return;

    // If not logged in, redirect to sign up with pricing anchor
    if (!session) {
      router.navigate({ to: "/sign-up", search: { redirect: "/#pricing" } });
      return;
    }

    // Start checkout process
    const plan = Object.values(SUBSCRIPTION_PLANS).find(
      (p) => p.priceId === priceId
    );
    if (plan) {
      setLoadingPlan(plan.plan);
    }
    checkoutMutation.mutate({ data: { priceId } }, {
      onSettled: () => setLoadingPlan(null),
    });
  };

  // Get current plan, defaulting to 'free' for logged out users or loading state
  const currentPlan = (userPlan?.data?.plan || "free") as SubscriptionPlan;
  const isLoadingState = sessionLoading || planLoading;

  const handleManagePlans = () => {
    router.navigate({ to: "/dashboard/settings" });
  };

  return (
    <section id="pricing" className="w-full py-24 relative">
      <div className="container mx-auto px-4 relative z-10">
        {showTitle && (
          <FadeIn>
            <div className="text-center mb-16">
              <h2 className="text-3xl font-bold tracking-tight sm:text-4xl lg:text-5xl mb-6 text-white">
                Invest in Your <span className="text-gradient-primary">Future</span>
              </h2>
              <p className="text-lg text-slate-400 sm:text-xl max-w-3xl mx-auto leading-relaxed">
                Start your journey to becoming a full stack engineer. With average salaries of $130k+, 
                this investment pays for itself in months. Choose the plan that fits your learning style.
              </p>
            </div>
          </FadeIn>
        )}

        <div className="grid grid-cols-1 md:grid-cols-3 gap-8 max-w-6xl mx-auto items-center">
          <FadeIn delay={100} className="h-full">
            <PricingCard
              plan={SUBSCRIPTION_PLANS.FREE}
              currentPlan={currentPlan}
              isLoading={isLoadingState}
              onUpgrade={() => {
                if (!session) {
                  authClient.signIn.social({
                    provider: "google",
                  });
                }
              }}
              onManagePlans={handleManagePlans}
            />
          </FadeIn>

          <FadeIn delay={200} className="h-full">
            <PricingCard
              plan={SUBSCRIPTION_PLANS.BASIC}
              currentPlan={currentPlan}
              isLoading={isLoadingState}
              onUpgrade={handlePlanSelect}
              onManagePlans={handleManagePlans}
              isPopular={true}
            />
          </FadeIn>

          <FadeIn delay={300} className="h-full">
            <PricingCard
              plan={SUBSCRIPTION_PLANS.PRO}
              currentPlan={currentPlan}
              isLoading={isLoadingState}
              onUpgrade={handlePlanSelect}
              onManagePlans={handleManagePlans}
            />
          </FadeIn>
        </div>

        {/* ROI Calculator */}
        <FadeIn delay={400}>
          <div className="mt-16 max-w-2xl mx-auto">
            <div className="glass-card p-8 rounded-2xl text-center">
              <h3 className="text-xl font-bold text-white mb-3">ROI Calculator</h3>
              <p className="text-slate-400 mb-4 text-lg">
                If you increase your salary by just $30k (from $50k to $80k), 
                a $99/month plan pays for itself in <span className="font-bold text-primary">3.3 months</span>.
              </p>
              <p className="text-sm text-slate-500 font-medium">
                Average full stack engineer salary: $130k. Most members see salary increases of $40k-$80k+.
              </p>
            </div>
          </div>
        </FadeIn>

        {/* Additional Info */}
        <FadeIn delay={500}>
          <div className="text-center mt-12">
            <p className="text-sm text-muted-foreground mb-6">
              All plans include a 14-day free trial. No setup fees. Cancel anytime.
            </p>
            <div className="flex flex-wrap justify-center gap-x-8 gap-y-4 text-sm text-muted-foreground font-medium">
              <span className="flex items-center gap-2 text-green-600 dark:text-green-400">✓ Secure payments</span>
              <span className="flex items-center gap-2 text-green-600 dark:text-green-400">✓ Cancel anytime</span>
              <span className="flex items-center gap-2 text-green-600 dark:text-green-400">✓ 24/7 community support</span>
              <span className="flex items-center gap-2 text-green-600 dark:text-green-400">✓ Money-back guarantee</span>
            </div>
          </div>
        </FadeIn>
      </div>
    </section>
  );
}
