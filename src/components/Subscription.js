"use client";

import { useState } from "react";
import { Button } from "@/components/ui/button"; 
import { Check } from "lucide-react";

export default function Subscription() {
  const [selectedPlan, setSelectedPlan] = useState("free"); // Track selected plan
  const [billingCycle, setBillingCycle] = useState("monthly"); // Track monthly or annual billing cycle

  const freePlan = {
    name: "Free Plan",
    description: "Start with basic features",
    features: [
      "Limited recipe access",
      "Limited meal swaps",
      "Basic planning and AI Q&A",
    ],
    price: 0,
    popular: false,
  };

  const premiumPlan = {
    name: "Premium Plan",
    description: "Unlock the full potential",
    features: [
      "Unlimited smart swaps",
      "Adaptive, personalized meal plans",
      "Symptom-aware AI coaching",
      "Budget and location-based suggestions",
    ],
    priceMonthly: 22.99,
    priceAnnual: 229.99,
    popular: true,
  };

  // Dynamically calculate price and features based on selected plan and billing cycle
  const currentPlan = selectedPlan === "free" ? freePlan : premiumPlan;
  const price = billingCycle === "monthly" ? currentPlan.priceMonthly : currentPlan.priceAnnual;
  const period = billingCycle === "monthly" ? "/month" : "/year";
  const savings = billingCycle === "annual" ? Math.round(((premiumPlan.priceMonthly * 12 - premiumPlan.priceAnnual) / (premiumPlan.priceMonthly * 12)) * 100) : 0;

  return (
    <section className="py-24 md:py-32 bg-white px-6 lg:px-12 bg-gradient-to-l from-[#ECEFFC] to-[#FFFFFF]">
      <div className="container mx-auto text-center">
        <h2 className="text-4xl md:text-5xl font-bold text-[var(--innara-footer)] mb-6">
          Choose Your Hormone Health Journey
        </h2>
        <p className="text-lg text-[var(--innara-footer)]/70 max-w-2xl mx-auto mb-12">
          Start with a plan that fits your needs. Upgrade or downgrade anytime.
        </p>

        {/* Billing Cycle Toggle */}
        <div className="inline-flex items-center bg-white/60 backdrop-blur-md rounded-full p-1 mt-8 shadow-sm mb-16">
          <button
            onClick={() => setBillingCycle("monthly")}
            className={`px-6 py-2 rounded-full text-sm font-medium transition-all ${
              billingCycle === "monthly"
                ? "bg-[var(--innara-primary)] text-white shadow-md"
                : "text-[var(--innara-footer)]/70 hover:text-[var(--innara-footer)]"
            }`}
          >
            Monthly
          </button>
          <button
            onClick={() => setBillingCycle("annual")}
            className={`px-6 py-2 rounded-full text-sm font-medium transition-all relative ${
              billingCycle === "annual"
                ? "bg-[var(--innara-primary)] text-white shadow-md"
                : "text-[var(--innara-footer)]/70 hover:text-[var(--innara-footer)]"
            }`}
          >
            Annual
            {billingCycle === "annual" && (
              <span className="absolute -top-2 -right-1 bg-[var(--innara-primary)] text-white text-xs px-2 py-0.5 rounded-full">
                Save {savings}%
              </span>
            )}
          </button>
        </div>

        {/* Pricing Cards */}
        <div className="grid md:grid-cols-2 gap-8 max-w-4xl mx-auto">
          {/* Free Plan Card */}
          <div
            onClick={() => setSelectedPlan("free")}
            className={`relative rounded-3xl border-2 p-10 bg-white shadow-lg hover:shadow-2xl transition-all duration-300 cursor-pointer ${
              selectedPlan === "free" ? "border-[var(--innara-primary)] scale-105" : "border-transparent"
            }`}
          >
            <div className="text-center mb-6">
              <h3 className="text-2xl font-bold text-[var(--innara-footer)] mb-2">{freePlan.name}</h3>
              <p className="text-sm text-[var(--innara-footer)]/70">{freePlan.description}</p>
            </div>

            {/* Price */}
            <div className="text-center mb-6">
              <div className="flex items-baseline justify-center gap-1">
                <span className="text-4xl font-bold text-[var(--innara-footer)]">${freePlan.price}</span>
                <span className="text-[var(--innara-footer)]/70">{"/month"}</span>
              </div>
            </div>

            {/* Features */}
            <ul className="space-y-3 mb-8">
              {freePlan.features.map((feature, i) => (
                <li key={i} className="flex items-start gap-3">
                  <Check className="w-5 h-5 text-[var(--innara-primary)] flex-shrink-0 mt-0.5" />
                  <span className="text-sm text-[var(--innara-footer)]">{feature}</span>
                </li>
              ))}
            </ul>

            {/* CTA Button */}
            <Button
              className={`w-full rounded-full ${
                selectedPlan === "free"
                  ? "bg-[var(--innara-primary)]/90 text-[#FFFFFF] hover:bg-[var(--innara-footer)]/40"
                  : "bg-[var(--innara-footer)]/10 text-[var(--innara-footer)] hover:bg-[var(--innara-footer)]/20"
              }`}
            >
              {freePlan.popular ? "Get Started" : "Choose Plan"}
            </Button>
          </div>

          {/* Premium Plan Card */}
          <div
            onClick={() => setSelectedPlan("premium")}
            className={`relative rounded-3xl border-2 p-10 bg-white shadow-lg hover:shadow-2xl transition-all duration-300 cursor-pointer ${
              selectedPlan === "premium" ? "border-[var(--innara-primary)] scale-105" : "border-transparent"
            }`}
          >
            {premiumPlan.popular && (
              <div className="absolute -top-4 left-1/2 transform -translate-x-1/2">
                <div className="bg-[var(--innara-primary)] text-white px-4 py-1.5 rounded-full text-sm font-semibold shadow-md">
                  Most Popular
                </div>
              </div>
            )}

            <div className="text-center mb-6">
              <h3 className="text-2xl font-bold text-[var(--innara-footer)] mb-2">{premiumPlan.name}</h3>
              <p className="text-sm text-[var(--innara-footer)]/70">{premiumPlan.description}</p>
            </div>

            {/* Always visible Price */}
            <div className="text-center mb-6">
              <div className="flex items-baseline justify-center gap-1">
                <span className="text-4xl font-bold text-[var(--innara-footer)]">${price}</span>
                <span className="text-[var(--innara-footer)]/70">{period}</span>
              </div>
              {billingCycle === "annual" && savings > 0 && (
                <p className="text-sm text-[var(--innara-primary)] font-medium mt-1">
                  Save {savings}% annually
                </p>
              )}
            </div>

            {/* Features */}
            <ul className="space-y-3 mb-8">
              {premiumPlan.features.map((feature, i) => (
                <li key={i} className="flex items-start gap-3">
                  <Check className="w-5 h-5 text-[var(--innara-primary)] flex-shrink-0 mt-0.5" />
                  <span className="text-sm text-[var(--innara-footer)]">{feature}</span>
                </li>
              ))}
            </ul>

            {/* CTA Button */}
            <Button
              className={`w-full rounded-full ${
                selectedPlan === "premium"
                  ? "bg-[var(--innara-primary)] hover:opacity-90 text-white"
                  : "bg-[var(--innara-footer)]/10 text-[var(--innara-footer)] hover:bg-[var(--innara-footer)]/20"
              }`}
            >
              {premiumPlan.popular ? "Get Started" : "Choose Plan"}
            </Button>
          </div>
        </div>
      </div>
    </section>
  );
}

export {Subscription};