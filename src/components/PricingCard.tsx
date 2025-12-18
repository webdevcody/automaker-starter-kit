import { Button } from "~/components/ui/button";
import { Check } from "lucide-react";
import { SUBSCRIPTION_PLANS } from "~/lib/plans";
import type { SubscriptionPlan } from "~/db/schema";
import { authClient } from "~/lib/auth-client";
import { Panel } from "~/components/ui/panel";
import { cn } from "~/lib/utils";

interface PricingCardProps {
  plan: (typeof SUBSCRIPTION_PLANS)[keyof typeof SUBSCRIPTION_PLANS];
  currentPlan: SubscriptionPlan;
  isLoading?: boolean;
  onUpgrade?: (priceId: string) => void;
  onManagePlans?: () => void;
  isPopular?: boolean;
}

export function PricingCard({
  plan,
  currentPlan,
  isLoading = false,
  onUpgrade,
  onManagePlans,
  isPopular = false,
}: PricingCardProps) {
  const { data: session } = authClient.useSession();
  const isCurrentPlan = currentPlan === plan.plan;
  const isLoggedOut = !session;
  const hasPaidPlan = currentPlan === "basic" || currentPlan === "pro";

  const formatPrice = (price: number) => {
    return (price / 100).toFixed(2);
  };

  const handleButtonClick = () => {
    if (isLoggedOut) {
      // For logged out users, onUpgrade should redirect to sign-in/sign-up
      if (onUpgrade) {
        onUpgrade(plan.priceId || "");
      }
    } else if (hasPaidPlan && plan.plan !== "free") {
      // For users with paid plans, manage plans for paid subscription buttons
      if (onManagePlans) {
        onManagePlans();
      }
    } else if (!hasPaidPlan && plan.plan !== "free") {
      // For free users on paid plan buttons, upgrade
      if (onUpgrade && plan.priceId) {
        onUpgrade(plan.priceId);
      }
    } else if (plan.plan === "free" && !hasPaidPlan) {
      // For free users on free plan button, get started
      if (onUpgrade) {
        onUpgrade("");
      }
    }
  };

  const getButtonText = () => {
    if (isLoggedOut) {
      return "Login Now";
    }

    if (hasPaidPlan && plan.plan !== "free") {
      return "Manage Plan";
    }

    if (!hasPaidPlan && plan.plan === "free") {
      return "Get Started";
    }

    if (!hasPaidPlan && plan.plan !== "free") {
      return "Upgrade Now";
    }

    return "Get Started";
  };

  return (
    <Panel
      className={cn(
        "relative p-8 rounded-2xl transition-all duration-300 flex flex-col h-full hover:bg-slate-800/50",
        isPopular &&
          "gradient-border bg-slate-900/50 shadow-2xl scale-105 z-10",
        isCurrentPlan && "ring-2 ring-primary"
      )}
    >
      {isPopular && (
        <div className="absolute top-0 left-1/2 -translate-x-1/2 -translate-y-1/2">
          <span className="bg-gradient-to-r from-primary to-purple-600 text-white px-4 py-1 rounded-full text-xs font-bold uppercase tracking-wide shadow-lg">
            Most Popular
          </span>
        </div>
      )}

      <div className="flex flex-col h-full">
        <h3 className="text-xl font-bold text-white mb-2">{plan.name}</h3>

        <div className="my-6">
          <span className="text-4xl font-bold text-white">
            ${plan.price === 0 ? "0" : formatPrice(plan.price)}
          </span>
          {plan.price > 0 && (
            <span className="text-slate-400 font-medium">/month</span>
          )}
        </div>

        {!isLoading && !isLoggedOut && isCurrentPlan && (
          <div className="mb-6">
            <span className="inline-flex items-center gap-2 bg-primary/20 text-primary px-3 py-1 rounded-full text-sm font-medium border border-primary/20">
              <Check className="h-4 w-4" />
              Current Plan
            </span>
          </div>
        )}

        <ul className="space-y-4 mb-8 flex-1">
          {plan.features.map((feature, index) => (
            <li key={index} className="flex items-start gap-3">
              <div className="flex-shrink-0 w-6 h-6 rounded-full bg-primary/20 flex items-center justify-center mt-0.5">
                <Check className="h-3.5 w-3.5 text-primary" />
              </div>
              <span className="text-slate-300 text-sm leading-relaxed">
                {feature}
              </span>
            </li>
          ))}
        </ul>

        <Button
          onClick={handleButtonClick}
          className={`w-full py-6 rounded-xl font-bold text-base transition-all duration-300 ${
            isPopular
              ? "bg-primary hover:bg-primary/90 text-white shadow-[0_0_20px_rgba(var(--primary),0.3)] hover:shadow-[0_0_30px_rgba(var(--primary),0.5)] hover:-translate-y-0.5"
              : "bg-white/10 hover:bg-white/20 text-white border border-white/5 backdrop-blur-sm"
          }`}
          variant="ghost"
        >
          {getButtonText()}
        </Button>
      </div>
    </Panel>
  );
}
