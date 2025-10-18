// app/page.js
"use client";

import Image from 'next/image';
import { motion, useScroll } from "framer-motion";
import { useState, useCallback, useEffect, useRef } from "react";
import { Send, MessageCircle, X } from "lucide-react";
import { Heart, Crown, Check } from "lucide-react";

// 🔹 Firebase (Firestore)
import { db } from "../lib/firebase"; // path: src/lib/firebase.js
import { collection, addDoc, serverTimestamp } from "firebase/firestore";

/* ===== Helpers ===== */
// Scroll progress bar at the top
function ScrollProgress() {
  const { scrollYProgress } = useScroll();
  return (
    <motion.div
      style={{ scaleX: scrollYProgress, transformOrigin: "0 0" }}
      className="fixed left-0 top-0 h-1 w-full bg-[var(--ml-primary)] z-50"
    />
  );
}

// Animated number that counts up when scrolled into view
function AnimatedNumber({ value, duration = 1400, suffix = "", className = "" }) {
  const elRef = useRef(null);
  const [inView, setInView] = useState(false);
  const [display, setDisplay] = useState(0);

  useEffect(() => {
    const el = elRef.current;
    if (!el) return;
    const io = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setInView(true);
          io.disconnect();
        }
      },
      { threshold: 0.35 }
    );
    io.observe(el);
    return () => io.disconnect();
  }, []);

  useEffect(() => {
    if (!inView) return;
    let start = 0;
    const startTs = performance.now();
    function tick(now) {
      const p = Math.min((now - startTs) / duration, 1);
      const eased = 1 - Math.pow(1 - p, 3); // easeOutCubic
      const next = Math.floor(eased * value);
      if (next !== start) {
        setDisplay(next);
        start = next;
      }
      if (p < 1) requestAnimationFrame(tick);
    }
    requestAnimationFrame(tick);
  }, [inView, value, duration]);

  return (
    <span ref={elRef} className={className}>
      {display.toLocaleString()} {suffix}
    </span>
  );
}

function StatCard({ icon, number, suffix = "", subtitle, description }) {
  return (
    <div className="group flex flex-col items-center text-center max-w-sm mx-auto rounded-2xl">
      <div className="relative h-24 w-24 rounded-full bg-[var(--ml-accent)]/60 grid place-content-center shadow-sm group-hover:scale-105 transition">
        <Image src={icon} alt={subtitle} width={56} height={56} className="object-contain" />
      </div>
      {typeof number === 'number' ? (
        <AnimatedNumber value={number} suffix={suffix} className="mt-5 text-3xl sm:text-4xl font-bold text-slate-900" />
      ) : (
        <div className="text-3xl font-bold text-slate-900">{number}</div>
      )}
      <p className="mt-4 text-l font-semibold text-slate-900">{subtitle}</p>
      <p className="mt-2 text-sm text-slate-600">{description}</p>
    </div>
  );
}

export default function Page() {
  const howItWorksRef = useRef(null);
  const [hoveredStep, setHoveredStep] = useState(null);

  const scrollToSection = useCallback((id) => {
    const headerOffset = 80;
    const el = document.getElementById(id);
    if (el) {
      const y = el.getBoundingClientRect().top + window.scrollY - headerOffset;
      window.scrollTo({ top: y, behavior: "smooth" });
    }
  }, []);

  // 🔹 Waitlist form state
  const [wlName, setWlName] = useState("");
  const [wlEmail, setWlEmail] = useState("");
  const [wlLoading, setWlLoading] = useState(false);
  const [wlSuccess, setWlSuccess] = useState(false);
  const [wlError, setWlError] = useState("");
  const [wlCondition, setWlCondition] = useState("");

  async function handleJoinWaitlist(e) {
    e.preventDefault();
    setWlLoading(true);
    setWlError("");
    setWlSuccess(false);

    try {
      if (!wlEmail || !/^\S+@\S+\.\S+$/.test(wlEmail)) {
        throw new Error("Please enter a valid email address.");
      }

      await addDoc(collection(db, "waitlist"), {
        name: wlName?.trim(),
        email: wlEmail.toLowerCase(),
        condition: wlCondition || null,
        createdAt: serverTimestamp(),
      });

      setWlSuccess(true);
      setWlName("");
      setWlEmail("");
      setWlCondition("");
    } catch (err) {
      setWlError(err?.message || "Something went wrong. Please try again.");
    } finally {
      setWlLoading(false);
    }
  }

  const [hippoOpen, setHippoOpen] = useState(false);
  const [hippoMessages, setHippoMessages] = useState([
    {
      id: 'init',
      text: "Hi, I'm Hippo. I help with hormone-smart meal planning. Tell me what you eat, your goals, or what phase of your cycle you're in, and I’ll give step-by-step guidance.",
      sender: 'bot',
      timestamp: new Date().toISOString(),
    },
  ]);
  const [hippoInput, setHippoInput] = useState('');
  const [hippoTyping, setHippoTyping] = useState(false);
  const hippoEndRef = useRef(null);

  useEffect(() => {
    hippoEndRef.current?.scrollIntoView({ behavior: 'smooth' });
  }, [hippoMessages]);

  async function handleHippoSend() {
    const text = hippoInput?.trim();
    if (!text) return;
    const userMsg = {
      id: Date.now().toString(),
      text,
      sender: 'user',
      timestamp: new Date().toISOString(),
    };

    // add user message to UI immediately
    setHippoMessages(prev => [...prev, userMsg]);
    setHippoInput('');
    setHippoTyping(true);

    try {
      // Build messages payload for the server: convert UI messages to OpenAI roles
      const payloadMessages = [...hippoMessages, userMsg].map(m => ({
        role: m.sender === 'user' ? 'user' : 'assistant',
        content: m.text,
      }));

      const res = await fetch('/api/hippo', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ messages: payloadMessages }),
      });

      const data = await res.json();
      if (res.ok && data.reply) {
        const botMsg = {
          id: (Date.now() + 1).toString(),
          text: data.reply,
          sender: 'bot',
          timestamp: new Date().toISOString(),
        };
        setHippoMessages(prev => [...prev, botMsg]);
      } else {
        setHippoMessages(prev => [
          ...prev,
          {
            id: (Date.now() + 2).toString(),
            text: data?.error || 'Sorry — Hippo had a hiccup. Try again.',
            sender: 'bot',
            timestamp: new Date().toISOString(),
          },
        ]);
      }
    } catch (err) {
      console.error(err);
      setHippoMessages(prev => [
        ...prev,
        {
          id: (Date.now() + 3).toString(),
          text: 'Network error — please try again later.',
          sender: 'bot',
          timestamp: new Date().toISOString(),
        },
      ]);
    } finally {
      setHippoTyping(false);
    }
  }

  function handleHippoKey(e) {
    if (e.key === 'Enter' && !e.shiftKey) {
      e.preventDefault();
      handleHippoSend();
    }
  }

  return (
    <main className="bg-white min-h-screen">
      <ScrollProgress />

      {/* NAV */}
      <header className="sticky top-0 z-30 bg-white/90 backdrop-blur border-b border-[var(--ml-secondary)]/40">
        <div className="mx-auto max-w-7xl px-4 md:px-6 lg:px-8 py-4 flex items-center justify-between">
          <a href="/" className="flex items-center gap-2" aria-label="Mealistik home">
            <Image src="/word-logo.png" alt="Mealistik Logo" width={150} height={40} className="rounded-full"/>
          </a>

          <nav className="hidden md:flex items-center gap-6 text-sm animate-fade-up">
            <a href="#features" className="hover:text-[var(--ml-primary)] link-underline">Features</a>
            <a href="#how" className="hover:text-[var(--ml-primary)] link-underline">How it Works</a>
            <a href="#plans" className="hover:text-[var(--ml-primary)] link-underline">Plans</a>
            <a href="#newsletter" className="hover:text-[var(--ml-primary)] link-underline">Newsletter</a>
          </nav>

          <div className="flex items-center gap-3">
            <a
              href="#waitlist"
              className="inline-flex items-center justify-center rounded-2xl px-5 py-3 text-sm font-semibold text-white shadow-sm transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[color:var(--ml-primary)]/40 animate-fade-up animate-glow pointer-events-auto" style={{ backgroundColor: "var(--ml-primary)", animationDelay: "180ms"}}
            >
              Join the Waitlist
            </a>
          </div>
        </div>
      </header>

      {/* Hero */}
      <section className="relative overflow-hidden mx-auto w-full max-w-7xl p-[40px] sm:p-[60px] lg:p-[75px] py-8 sm:py-10">
        {/* gradient accent */}
        <div className="gradient-blob" style={{ top: 10, right: 0 }} />
        <div className="grid md:grid-cols-2 gap-6 items-center">
          {/* Text column */}
          <div className="text-center md:text-left max-w-3xl md:max-w-xl mx-auto md:mx-0">
            <p className="inline-flex items-center gap-2 text-[var(--ml-primary)] bg-[var(--ml-accent)]/50 rounded-full px-3 py-1 text-xs font-medium mb-5">
              <Sparkles className="h-4 w-4" /> Supportive &amp; Simple • For Real Lives
            </p>
            <h1
              className="text-3xl sm:text-4xl md:text-5xl font-bold text-slate-900 animate-fade-up"
              style={{ animationDelay: "140ms" }}
            >
              Meal Prep with your Hormones in mind
            </h1>
            <p
              className="mt-4 text-slate-800 animate-fade-up"
              style={{ animationDelay: "200ms" }}
            >
              Mealistik helps you plan, prep, and balance meals that support
              hormonal health, one week at a time. Science-backed nutrition
              tailored to your unique cycle and goals.
            </p>
            <div
              className="mt-8 flex items-center justify-center md:justify-start gap-3 animate-fade-up"
              style={{ animationDelay: "260ms" }}
            >
             <a
                href="#waitlist"
                className="inline-flex items-center justify-center rounded-2xl px-5 py-3 text-sm font-semibold text-white shadow-sm" style={{ backgroundColor: "var(--ml-primary)", animationDelay: "180ms"}}
              >
                Join the Waitlist
              </a>
              <a
                href="#how"
                className="inline-flex items-center justify-center rounded-2xl border border-[var(--ml-secondary)] px-5 py-3 text-sm font-semibold hover:bg-[var(--ml-accent)]/30 transition"
              >
                <PlayIcon className="h-4 w-4" />
                See How It Works
              </a>
            </div>
            {/* Community Avatars Section with Custom Purple Tint */}
            <div className="mt-6 flex items-center space-x-4">
              {/* Avatars */}
              <div className="flex -space-x-3">
                {[
                  "/avatars/avatar-1.jpg",
                  "/avatars/avatar-2.jpg",
                  "/avatars/avatar-3.jpg",
                  "/avatars/avatar-4.jpg",
                ].map((src, idx) => (
                  <div key={idx} className="relative w-10 h-10 rounded-full border-2 border-white shadow-sm overflow-hidden">
                    <img
                      src={src}
                      alt="Community member"
                      className="w-10 h-10 rounded-full object-cover"
                    />
                    {/* Purple tint overlay */}
                    <div
                      className="absolute inset-0 rounded-full pointer-events-none"
                      style={{ backgroundColor: "#9999CC", opacity: 0.2 }}
                    ></div>
                  </div>
                ))}

                {/* The "+200" circle */}
                <div
                  className="relative w-10 h-10 rounded-full flex items-center justify-center text-xs font-medium border-2 border-white shadow-sm"
                  style={{ backgroundColor: "var(--ml-accent)", color: "var(--ml-primary)" }}
                >
                  +200
                  <div
                    className="absolute inset-0 rounded-full pointer-events-none"
                    style={{ backgroundColor: "#9999CC", opacity: 0.2 }}
                  ></div>
                </div>
              </div>

              {/* Caption */}
              <p className="text-sm text-slate-600 max-w-xs">
                Join <strong>200+ women</strong> embracing a hormone-smart approach to food and wellness.
              </p>
            </div>
          </div>

          {/* Illustration column */}
          <div className="flex justify-center md:justify-end">
            <motion.div
              aria-hidden="true"
              animate={{ y: [0, -10, 0] }}
              transition={{ duration: 4, repeat: Infinity, ease: "easeInOut" }}
              className="relative w-48 sm:w-56 md:w-72 lg:w-80 aspect-square"
            >
              <Image
                src="/icons/hippo-scooter.png"
                alt="Hippo on a scooter illustration"
                fill
                className="object-contain drop-shadow-xl"
                priority
                quality={100}
              />
            </motion.div>
          </div>
        </div>
      </section>

      {/* Stats */}
      <section className="relative mx-auto w-full max-w-7xl px-4 sm:px-6 lg:px-8 py-10 sm:py-12 bg-white">
        <div className="grid sm:grid-cols-3 gap-10 text-center">
          <StatCard
            icon="/icons/hippo-gift.png"
            number={200}
            suffix="+"
            subtitle="Early Signups"
            description={"Join the Growing Community"}
          />
          <StatCard
            icon="/icons/hippo-clock.png"
            number={280}
            suffix="+"
            subtitle="Members"
            description={"Growing Instagram Commmunity"}
          />
          <StatCard
            icon="/icons/hippo-speed.png"
            number={24}
            suffix="/ 7"
            subtitle="Support"
            description={"Always there when you need us"}
          />
        </div>
      </section>

      {/* About */}
      <section id="about" className="relative mx-auto w-full max-w-7xl p-[40px] sm:p-[60px] lg:p-[75px] py-8 sm:py-10">
        <div className="grid md:grid-cols-2 gap-6 items-center">
          <motion.div
            initial={{ x: -50, opacity: 0 }}
            whileInView={{ x: 0, opacity: 1 }}
            transition={{ duration: 0.8, ease: "easeOut" }}
            viewport={{ once: true }}
          >
            <h2 className="text-2xl sm:text-3xl font-semibold text-slate-900">
              Why Mealistik? Your hormones deserve better
            </h2>
            <p className="mt-4 text-slate-600">
              Hormonal imbalances affect energy, mood, and metabolism. Traditional
              meal planning ignores these crucial signals. Mealistik aligns nutrition
              with your hormonal patterns.
            </p>
            <ul className="mt-6 space-y-3 text-slate-700">
              <li className="flex items-start gap-3">
                <span className="mt-1 h-2.5 w-2.5 rounded-full bg-[#7A69AF]"></span>
                Personalized to your hormonal cycle
              </li>
              <li className="flex items-start gap-3">
                <span className="mt-1 h-2.5 w-2.5 rounded-full bg-[#7A69AF]"></span>
                Science-backed + dietitian-guided
              </li>
              <li className="flex items-start gap-3">
                <span className="mt-1 h-2.5 w-2.5 rounded-full bg-[#7A69AF]"></span>
                Easy prep guidance
              </li>
              <li className="flex items-start gap-3">
                <span className="mt-1 h-2.5 w-2.5 rounded-full bg-[#7A69AF]"></span>
                Track progress & wellness
              </li>
            </ul>
          </motion.div>
          <div className="flex justify-center">
            <div className="relative w-36 sm:w-40 md:w-44 lg:w-48 aspect-[9/19] rounded-[1.5rem] border-4 border-slate-900/90 bg-slate-100 shadow-lg overflow-hidden">
              <Image src="/home-screen.png" alt="Mealistik app screen" fill className="object-cover" priority />
            </div>
          </div>
        </div>
      </section>

      {/* REPLACE the entire How section block with this */}
      <section id="how" className="relative p-[40px] sm:p-[60px] lg:p-[75px] py-8 sm:py-10">
        <h2 className="text-2xl md:text-3xl font-semibold tracking-tight">How it works</h2>
        <p className="mt-2 text-slate-600 max-w-2xl">
          Three simple steps—guided by your hormones, preferences, and real life.
        </p>

        <div className="mt-8 grid md:grid-cols-3 gap-6">
          {/* Step 1 */}
          <div className="group glow-card rounded-2xl border border-[var(--ml-secondary)]/40 bg-[var(--ml-accent)]/40 p-6 min-h-[28rem] flex flex-col justify-between transition-transform duration-300 [transform:perspective(800px)] hover:[transform:rotateX(4deg)_rotateY(-4deg)_translateY(-2px)]">
            <div className="absolute -top-5 -left-3 h-10 w-10 rounded-full bg-white border border-[var(--ml-secondary)] grid place-content-center font-semibold text-[var(--ml-primary)] shadow-sm">1</div>
            <div>
              <div className="flex items-center space-x-2 mb-3">
                <ProfileIcon className="h-6 w-6" />
                <h3 className="text-lg font-semibold">Tell Us About You</h3>
              </div>
              <p className="text-slate-600 mb-4">Your health context, goals, cycle info, tastes, time & budget.</p>
            </div>
            <div className="w-full overflow-hidden rounded-lg">
              <div className="w-full h-full overflow-hidden rounded-lg">
                <img
                  src="/profile-survey.png"
                  alt="Profile Survey"
                  className="w-full h-full object-cover object-top"
                />
              </div>
            </div>
          </div>

          {/* Step 2 */}
          <div className="group glow-card rounded-2xl border border-[var(--ml-secondary)]/40 bg-[var(--ml-accent)]/40 p-6 min-h-[28rem] flex flex-col justify-between transition-transform duration-300 [transform:perspective(800px)] hover:[transform:rotateX(4deg)_rotateY(-4deg)_translateY(-2px)]">
            <div className="absolute -top-5 -left-3 h-10 w-10 rounded-full bg-white border border-[var(--ml-secondary)] grid place-content-center font-semibold text-[var(--ml-primary)] shadow-sm">2</div>
            <div>
              <div className="flex items-center space-x-2 mb-3">
                <CalendarIcon className="h-6 w-6" />
                <h3 className="text-lg font-semibold">Receive Your Smart Plan</h3>
              </div>
              <p className="text-slate-600 mb-4">A weekly plan with flexible swaps and culturally diverse recipes.</p>
            </div>
            <div className="w-full overflow-hidden rounded-lg">
              <div className="w-full h-full overflow-hidden rounded-lg">
                <img
                  src="/meal-plan.png"
                  alt="Meal Plan"
                  className="w-full h-full object-cover object-top"
                />
              </div>
            </div>
          </div>

          {/* Step 3 */}
          <div className="group glow-card rounded-2xl border border-[var(--ml-secondary)]/40 bg-[var(--ml-accent)]/40 p-6 min-h-[28rem] flex flex-col justify-between transition-transform duration-300 [transform:perspective(800px)] hover:[transform:rotateX(4deg)_rotateY(-4deg)_translateY(-2px)]">
            <div className="absolute -top-5 -left-3 h-10 w-10 rounded-full bg-white border border-[var(--ml-secondary)] grid place-content-center font-semibold text-[var(--ml-primary)] shadow-sm">3</div>
            <div>
              <div className="flex items-center space-x-2 mb-3">
                <PulseIcon className="h-6 w-6" />
                <h3 className="text-lg font-semibold">Track & Adapt</h3>
              </div>
              <p className="text-slate-600 mb-4">Daily check-ins, gentle feedback, and AI chat (Hippooo) when you need it.</p>
            </div>
            <div className="w-full overflow-hidden rounded-lg">
              <div className="w-full h-full overflow-hidden rounded-lg">
                <img
                  src="/track.png"
                  alt="Check-in"
                  className="w-full h-full object-cover object-top"
                />
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* FEATURES */}
      <section id="features" className="relative bg-[#FFFFFF] p-[40px] sm:p-[60px] lg:p-[75px] py-8 sm:py-10">
        <h2 className="text-2xl sm:text-3xl font-semibold">What you’ll get</h2>
        <p className="mt-2 text-slate-600">
          Practical tools designed for hormone-smart eating—no guilt, no guesswork.
        </p>

        <div className="mt-10 grid sm:grid-cols-2 lg:grid-cols-3 gap-6">
          <FeatureCard
            icon={<ChecklistIcon className="h-6 w-6" />}
            title="Smart Meal Plans"
            text="Weekly plans tailored to your cycle & goals—with simple swaps."
          />

          <FeatureCard
            icon={<BasketIcon className="h-6 w-6" />}
            title="Auto Grocery Lists"
            text="One-tap lists, ingredient swaps, and budget-friendly options."
          />

          <FeatureCard
            icon={<ChatIcon className="h-6 w-6" />}
            title="AI Nutrition Chat"
            text="Ask Hippooo anything—friendly guidance for real-life choices."
          />

          <FeatureCard
            icon={<Sparkles className="h-6 w-6" />}
            title="Daily Check-Ins"
            text="Log meals, energy, and mood; get gentle, helpful feedback."
          />

          <FeatureCard
            icon={<GlobeIcon className="h-6 w-6" />}
            title="Culturally Diverse"
            text="Recipe library that celebrates flavors you already love."
          />

          <FeatureCard
            icon={<ShieldIcon className="h-6 w-6" />}
            title="Science-Informed"
            text="Built with evidence-based nutrition guidance."
          />
        </div>
      </section>

      {/* PLANS TEASER */}
      <section id="plans" className="relative p-[40px] sm:p-[60px] lg:p-[75px] py-8 sm:py-10">
        <div className="flex items-center justify-between">
          <h2 className="text-2xl md:text-3xl font-semibold tracking-tight">Plans (coming soon)</h2>
          <span className="text-xs uppercase tracking-wide text-[var(--ml-primary)] bg-[var(--ml-accent)] px-2 py-1 rounded-full">
            Sneak peek
          </span>
        </div>

        <p className="mt-2 text-slate-600 max-w-2xl">
          Flexible pricing designed to get you started easily—then grow with you.
        </p>

        <div className="mt-8 grid md:grid-cols-3 gap-6">
          <PlanTeaser
            name="Free Trial"
            note="Try core features"
            bullets={["Onboarding survey", "1 smart plan", "Basic grocery list"]}
          />
          <PlanTeaser
            highlight
            name="Monthly"
            note="Balanced Plan"
            bullets={["Unlimited plans & swaps", "AI nutrition chat (Hippooo)", "Daily check-ins & insights"]}
          />
          <PlanTeaser
            name="Premium"
            note="Advanced insights"
            bullets={["Cycle-aware analytics", "Recipe packs & filters", "Priority updates"]}
          />
        </div>

        <div className="mt-6 text-sm text-slate-500">
          <strong>Coming Soon:</strong> Free trial + affordable monthly plan with advanced insights and recipe packs.
        </div>
      </section>

      {/* REPLACE the entire Waitlist section block with this */}
      <section id="newsletter" className="bg-[#FFFFFF] relative p-[40px] sm:p-[60px] lg:p-[75px] py-8 sm:py-10">
        <div className="text-center mb-10">
          <h2 className="text-2xl sm:text-3xl font-semibold text-slate-900">Join our Waitlist</h2>
          <p className="mt-2 text-slate-600">Stay connected with the latest in hormone-friendly nutrition and app updates.</p>
        </div>
        <div className="grid md:grid-cols-2 gap-8">
          {/* Left Column: Newsletter */}
          <div className="rounded-2xl border border-[var(--ml-secondary)]/40 bg-white p-6 shadow-sm">
            <h3 className="text-xl font-semibold">Get the newsletter</h3>
            <p className="mt-2 text-slate-600">
              Get hormone-friendly meal tips &amp; recipes delivered monthly.
            </p>
            <form
              onSubmit={(e) => {
                e.preventDefault();
                const form = e.currentTarget;
                const email = new FormData(form).get("email");
                alert(`Thanks! We'll keep you posted at: ${email}`);
                form.reset();
              }}
              className="mt-4 flex flex-col sm:flex-row gap-3"
            >
              <input
                type="email"
                required
                name="email"
                placeholder="you@example.com"
                className="flex-1 rounded-xl border border-[var(--ml-secondary)]/60 px-4 py-3 outline-none focus:ring-2 focus:ring-[var(--ml-secondary)]"
              />
              <button
                type="submit"
                className="rounded-xl bg-[var(--ml-primary)] text-white px-5 py-3 font-medium hover:bg-[var(--ml-secondary)] transition"
              >
                Subscribe
              </button>
            </form>
            <p className="mt-2 text-xs text-slate-500">No spam. Unsubscribe anytime.</p>
            {/* Hippo Image at the bottom of the Newsletter Card */}
            <div className="flex-1 mt-6">
              <img src="/hippo-peek.png" alt="Mealistik" className="w-20 h-auto rounded-xl ml-[-42]" />
            </div>
          </div>

          {/* Right Column: Waitlist */}
          <div id="waitlist" className="flex-1 rounded-2xl border border-[var(--ml-secondary)]/40 bg-white p-6 shadow-sm">
            <h3 className="text-xl font-semibold">Join the list</h3>
            <p className="mt-2 text-slate-600">
              Be among the first to try Mealistik and help shape the product.
            </p>
            <form
              onSubmit={(e) => {
                e.preventDefault();
                const form = e.currentTarget;
                const data = new FormData(form);
                alert(`You're in, ${data.get("name")}! We’ll reach out at ${data.get("email")}.`);
                form.reset();
              }}
              className="mt-4 grid sm:grid-cols-2 gap-3"
            >
              <input
                type="text"
                name="name"
                required
                placeholder="Full name"
                className="rounded-xl border border-[var(--ml-secondary)]/60 px-4 py-3 outline-none focus:ring-2 focus:ring-[var(--ml-secondary)]"
              />
              <input
                type="email"
                name="email"
                required
                placeholder="Email address"
                className="rounded-xl border border-[var(--ml-secondary)]/60 px-4 py-3 outline-none focus:ring-2 focus:ring-[var(--ml-secondary)]"
              />
              <select
                name="goal"
                className="sm:col-span-2 rounded-xl border border-[var(--ml-secondary)]/60 px-4 py-3 outline-none focus:ring-2 focus:ring-[var(--ml-secondary)]"
                defaultValue=""
              >
                <option value="" disabled>Primary goal (pick one)</option>
                <option>Hormone balance</option>
                <option>PCOS support</option>
                <option>Thyroid support</option>
                <option>Diabetes support</option>
                <option>Energy & mood</option>
                <option>General healthy eating</option>
              </select>
              <button
                type="submit"
                className="sm:col-span-2 rounded-xl bg-[var(--ml-primary)] text-white px-5 py-3 font-medium hover:bg-[var(--ml-secondary)] transition"
              >
                Join the Waitlist
              </button>
            </form>
            {/* Community Avatars Section with Custom Purple Tint */}
            <div className="mt-6 flex items-center space-x-4">
              {/* Avatars */}
              <div className="flex -space-x-3">
                {[
                  "/avatars/avatar-1.jpg",
                  "/avatars/avatar-2.jpg",
                  "/avatars/avatar-3.jpg",
                  "/avatars/avatar-4.jpg",
                ].map((src, idx) => (
                  <div key={idx} className="relative w-10 h-10 rounded-full border-2 border-white shadow-sm overflow-hidden">
                    <img
                      src={src}
                      alt="Community member"
                      className="w-10 h-10 rounded-full object-cover"
                    />
                    {/* Purple tint overlay */}
                    <div
                      className="absolute inset-0 rounded-full pointer-events-none"
                      style={{ backgroundColor: "#9999CC", opacity: 0.2 }}
                    ></div>
                  </div>
                ))}

                {/* The "+200" circle */}
                <div
                  className="relative w-10 h-10 rounded-full flex items-center justify-center text-xs font-medium border-2 border-white shadow-sm"
                  style={{ backgroundColor: "var(--ml-accent)", color: "var(--ml-primary)" }}
                >
                  +200
                  <div
                    className="absolute inset-0 rounded-full pointer-events-none"
                    style={{ backgroundColor: "#9999CC", opacity: 0.2 }}
                  ></div>
                </div>
              </div>

              {/* Caption */}
              <p className="text-sm text-slate-600 max-w-xs">
                Join <strong>200+ women</strong> embracing a hormone-smart approach to food and wellness.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* Footer */}
      <footer className="bg-[var(--ml-ink)] text-slate-200">
        <div className="mx-auto w-full max-w-7xl px-4 sm:px-6 lg:px-8 py-10 sm:py-12">
          <div className="grid md:grid-cols-4 gap-10">
            <div>
              <a href="/" className="flex items-center gap-2" aria-label="Mealistik home">
                <Image src="/logo-white.png" alt="Mealistik Logo" width={40} height={40} className="rounded-full"/>
                <span className="text-xl font-bold text-white">Mealistik</span>
              </a>
              <p className="mt-3 text-sm text-slate-300">Empowering women to thrive through hormone-smart nutrition.</p>
            </div>
            <div>
              <div className="font-semibold text-white">App</div>
              <ul className="mt-3 space-y-2 text-sm text-slate-300">
                <li><a href="#features" className="hover:text-[var(--ml-secondary)] transition">Features</a></li>
                <li><a href="#how" className="hover:text-[var(--ml-secondary)] transition">How it Works</a></li>
                <li><a href="#plans" className="hover:text-[var(--ml-secondary)] transition">Pricing</a></li>
              </ul>
            </div>
            <div>
              <div className="font-semibold text-white">Company</div>
              <ul className="mt-3 space-y-2 text-sm text-slate-300">
                <li><a href="#why" className="hover:text-[var(--ml-secondary)] transition">About</a></li>
                <li><a href="#newsletter" className="hover:text-[var(--ml-secondary)] transition">Contact</a></li>
              </ul>
            </div>
            <div>
              <div className="font-semibold text-white">Resources</div>
              <ul className="mt-3 space-y-2 text-sm text-slate-300">
                <li><a href="/privacy-policy" className="hover:text-[var(--ml-secondary)] transition">Privacy Policy</a></li>
                <li><a href="/terms-and-conditions" className="hover:text-[var(--ml-secondary)] transition">Terms and Conditions</a></li>
              </ul>
            </div>
          </div>

          <div className="mt-10 flex items-center justify-between flex-col sm:flex-row gap-4">
            <p className="text-xs text-slate-400">© {new Date().getFullYear()} Mealistik. All rights reserved.</p>

            <div className="flex items-center gap-3">
              {[
                { name: "Instagram", icon: "/icons/instagram.png", link: "https://www.instagram.com/mealistik/" },
                { name: "Medium", icon: "/icons/medium.png", link: "https://medium.com/@innara.general" },
                { name: "LinkedIn", icon: "/icons/linkedin.png", link: "https://www.linkedin.com/company/mealistik/" },
              ].map((social) => (
                <a key={social.name} href={social.link} target="_blank" rel="noopener noreferrer" className="h-8 w-8 grid place-content-center rounded-full bg-[#1B0F2B] hover:bg-[#2C1B45] transition-colors">
                  <Image src={social.icon} alt={social.name} width={20} height={20} className="object-contain" />
                </a>
              ))}
            </div>
          </div>
        </div>
      </footer>
    </main>
  );
}

/* ------------- Small Presentational Components ------------- */

function Dot({ className = "" }) {
  return <span className={`inline-block h-2 w-2 rounded-full ${className}`} />;
}

// REPLACE existing FeatureCard with this
function FeatureCard({ icon, title, text }) {
  return (
    <div className="group glow-card rounded-2xl border border-[var(--ml-secondary)]/40 bg-white p-6 shadow-sm hover:-translate-y-0.5 hover:shadow-md transition">
      <div className="flex items-center gap-3">
        <div className="h-10 w-10 rounded-xl bg-[var(--ml-accent)]/40 text-[var(--ml-primary)] grid place-items-center group-hover:scale-105 transition">
          {icon}
        </div>
        <h4 className="font-semibold">{title}</h4>
      </div>
      <p className="mt-2 text-slate-600 text-sm">{text}</p>
    </div>
  );
}

function PlanTeaser({ name, note, bullets, highlight = false }) {
  return (
    <div
      className={`group glow-card relative rounded-2xl p-6 border ${
        highlight
          ? "border-[var(--ml-secondary)]/40 bg-[var(--ml-accent)]/90"
          : "border-[var(--ml-secondary)]/40 bg-white"
      }`}
    >
      {highlight && (
        <span className="absolute -top-3 right-4 text-xs px-2 py-1 rounded-full bg-[var(--ml-primary)] text-white shadow-sm">
          ⭐ Most Popular
        </span>
      )}

      <div className="flex items-center justify-between">
        <h4 className="font-semibold">{name}</h4>
        <span
          className={`text-xs px-2 py-1 rounded-full ${
            highlight ? "bg-[var(--ml-white)] text-[var(--ml-primary)]" : "bg-[var(--ml-accent)] text-[var(--ml-primary)]"
          }`}
        >
          {note}
        </span>
      </div>

      <ul className="mt-4 space-y-2 text-sm text-slate-700">
        {bullets.map((b, i) => (
          <li key={i} className="flex gap-2">
            <CheckIcon className="h-4 w-4 mt-0.5 shrink-0" />
            <span>{b}</span>
          </li>
        ))}
      </ul>

      <div className="mt-5">
        <a
          href="#waitlist"
          className={`w-full inline-flex items-center justify-center rounded-xl px-4 py-2 text-sm font-medium transition ${
            highlight
              ? "bg-[var(--ml-primary)] text-white hover:bg-[var(--ml-ink)]/90"
              : "border border-[var(--ml-secondary)] hover:bg-[var(--ml-accent)]/30"
          }`}
        >
          Coming Soon – Notify Me
        </a>
      </div>
    </div>
  );
}


function SocialIcon({ children, href, label }) {
  return (
    <a
      href={href}
      aria-label={label}
      target="_blank"
      rel="noreferrer"
      className="inline-flex items-center gap-2 rounded-full border border-[var(--ml-secondary)] px-3 py-2 text-sm hover:bg-[var(--ml-accent)]/30 transition"
    >
      {children}
      <span className="hidden sm:inline">{label}</span>
    </a>
  );
}

/* ------------- Inline SVG Icons ------------- */

function HippoMark({ className = "" }) {
  return (
    <svg viewBox="0 0 64 64" className={className} xmlns="http://www.w3.org/2000/svg" aria-hidden="true">
      <path d="M10 28c0-9 8-18 22-18s22 9 22 18-6 16-22 16S10 37 10 28z" fill="#3e3e7a" opacity="0.25" />
      <circle cx="26" cy="28" r="3" fill="#0f172a" />
      <circle cx="38" cy="28" r="3" fill="#0f172a" />
      <rect x="28" y="36" width="8" height="4" rx="2" fill="#0f172a" />
    </svg>
  );
}
function Sparkles(props) {
  return (
    <svg viewBox="0 0 24 24" fill="currentColor" {...props} aria-hidden="true">
      <path d="M9 5l1.2 2.8L13 9l-2.8 1.2L9 13l-1.2-2.8L5 9l2.8-1.2L9 5zm8 2l.8 1.8L20 10l-2.2.9L17 13l-.8-1.9L14 10l2.2-.9L17 7zm-3 6l1 2.3 2.3 1-2.3 1L14 20l-1-2.7-2.3-1 2.3-1 1-2.3z" />
    </svg>
  );
}
function PlayIcon(props) {
  return (
    <svg viewBox="0 0 24 24" fill="currentColor" {...props} aria-hidden="true">
      <path d="M8 5v14l11-7L8 5z" />
    </svg>
  );
}
function ProfileIcon(props) {
  return (
    <svg viewBox="0 0 24 24" fill="currentColor" {...props} aria-hidden="true">
      <path d="M12 12a5 5 0 100-10 5 5 0 000 10zm-9 9a9 9 0 1118 0H3z" />
    </svg>
  );
}
function CalendarIcon(props) {
  return (
    <svg viewBox="0 0 24 24" fill="currentColor" {...props} aria-hidden="true">
      <path d="M7 2h2v2h6V2h2v2h3a2 2 0 012 2v3H2V6a2 2 0 012-2h3V2zm15 8v8a2 2 0 01-2 2H4a2 2 0 01-2-2v-8h20z" />
    </svg>
  );
}
function PulseIcon(props) {
  return (
    <svg viewBox="0 0 24 24" {...props} aria-hidden="true">
      <path d="M3 12h4l2-5 4 10 2-5h6" stroke="currentColor" strokeWidth="2" fill="none" />
    </svg>
  );
}
function ChecklistIcon(props) {
  return (
    <svg viewBox="0 0 24 24" fill="currentColor" {...props} aria-hidden="true">
      <path d="M3 5h14v2H3V5zm0 6h14v2H3v-2zm0 6h14v2H3v-2zM20.3 6.7l-3 3-1.4-1.4 1.6-1.6 1.4-1.4 1.4 1.4z" />
    </svg>
  );
}
function BasketIcon(props) {
  return (
    <svg viewBox="0 0 24 24" fill="currentColor" {...props} aria-hidden="true">
      <path d="M7 10l5-8 5 8h4l-2 10a2 2 0 01-2 2H7a2 2 0 01-2-2L3 10h4zm5-5l3 5H9l3-5z" />
    </svg>
  );
}
function ChatIcon(props) {
  return (
    <svg viewBox="0 0 24 24" fill="currentColor" {...props} aria-hidden="true">
      <path d="M4 4h16v10a2 2 0 01-2 2H8l-4 4V6a2 2 0 012-2z" />
    </svg>
  );
}
function GlobeIcon(props) {
  return (
    <svg viewBox="0 0 24 24" fill="currentColor" {...props} aria-hidden="true">
      <path d="M12 2a10 10 0 100 20 10 10 0 000-20zm2.5 17.3c.9-1.5 1.5-3.6 1.6-5.8h3.2a8.1 8.1 0 01-4.8 5.8zM4.7 13.5h3.2c.1 2.2.7 4.3 1.6 5.8a8.1 8.1 0 01-4.8-5.8zM8 11H4.7a8.1 8.1 0 014.8-5.8C8.4 6.7 8 8.8 8 11zm3 0c0-2.5.6-4.8 1.6-6.3 1 1.5 1.6 3.8 1.6 6.3s-.6 4.8-1.6 6.3C11.6 15.8 11 13.5 11 11zm6.3 0c0-2.2-.4-4.3-1.5-5.8a8.1 8.1 0 014.8 5.8H17.3z" />
    </svg>
  );
}
function ShieldIcon(props) {
  return (
    <svg viewBox="0 0 24 24" fill="currentColor" {...props} aria-hidden="true">
      <path d="M12 2l8 4v6c0 5-3.4 9.4-8 10-4.6-.6-8-5-8-10V6l8-4z" />
    </svg>
  );
}
function CheckIcon(props) {
  return (
    <svg viewBox="0 0 20 20" fill="currentColor" {...props} aria-hidden="true">
      <path fillRule="evenodd" d="M16.7 5.3a1 1 0 010 1.4l-8 8a1 1 0 01-1.4 0L3.3 11.7a1 1 0 011.4-1.4l3 3 7.3-7.3a1 1 0 011.4 0z" clipRule="evenodd" />
    </svg>
  );
}
function InstagramIcon(props) {
  return (
    <svg viewBox="0 0 24 24" fill="currentColor" {...props} aria-hidden="true">
      <path d="M7 2h10a5 5 0 015 5v10a5 5 0 01-5 5H7a5 5 0 01-5-5V7a5 5 0 015-5zm0 2a3 3 0 00-3 3v10a3 3 0 003 3h10a3 3 0 003-3V7a3 3 0 00-3-3H7zm5 3a5 5 0 110 10 5 5 0 010-10zm6.5-.8a1.2 1.2 0 110 2.4 1.2 1.2 0 010-2.4z" />
    </svg>
  );
}
function MediumIcon(props) {
  return (
    <svg viewBox="0 0 24 24" fill="currentColor" {...props} aria-hidden="true">
      <path d="M4 7.5A2.5 2.5 0 016.5 5h11A2.5 2.5 0 0120 7.5v9A2.5 2.5 0 0117.5 19h-11A2.5 2.5 0 014 16.5v-9zM8 9v6l4-3-4-3zm8 0h-2v6h2V9z" />
    </svg>
  );
}
function LinkedInIcon(props) {
  return (
    <svg viewBox="0 0 24 24" fill="currentColor" {...props} aria-hidden="true">
      <path d="M4 3a2 2 0 100 4 2 2 0 000-4zM3 8h3v13H3V8zm7 0h3v2h.1c.4-.7 1.4-1.6 2.9-1.6 3.1 0 3.7 2 3.7 4.6V21h-3v-6.1c0-1.5 0-3.4-2.1-3.4s-2.4 1.6-2.4 3.3V21h-3V8z" />
    </svg>
  );
}
