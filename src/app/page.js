"use client";
import { motion, useScroll } from "framer-motion";
import Image from "next/image";
import { useState } from "react";
import { useCallback } from "react";

// Variants for fade-in
const fadeIn = {
  hidden: { opacity: 0, y: 16 },
  show: { opacity: 1, y: 0, transition: { duration: 0.5, ease: "easeOut" } },
};

// Variants for slide-in from left/right
const slideFrom = (dir) => ({
  hidden: { opacity: 0, x: dir === "left" ? -100 : 100 },
  show: {
    opacity: 1,
    x: 0,
    transition: { type: "spring", stiffness: 120, damping: 18 },
  },
});

// Scroll progress bar at the top
function ScrollProgress() {
  const { scrollYProgress } = useScroll();
  return (
    <motion.div
      style={{ scaleX: scrollYProgress, transformOrigin: "0 0" }}
      className="fixed left-0 top-0 h-1 w-full bg-[var(--innara-primary)] z-50"
    />
  );
}

export default function Home() {
  const [hoveredStep, setHoveredStep] = useState(null);

  const scrollToContact = () => {
    document.getElementById("contact")?.scrollIntoView({ behavior: "smooth" });
  };

  const scrollToPlans = () => {
    document.getElementById("plans")?.scrollIntoView({ behavior: "smooth" });
  };

  const scrollToSection = useCallback((id) => {
    const headerOffset = 80; // adjust based on your navbar height
    const el = document.getElementById(id);
    if (el) {
      const y = el.getBoundingClientRect().top + window.scrollY - headerOffset;
      window.scrollTo({ top: y, behavior: "smooth" });
    }
  }, []);
  
  return (
    <div className="min-h-screen bg-white">
      <ScrollProgress />

      {/* Navbar */}
      <header className="sticky top-0 z-30 bg-white/90 backdrop-blur border-b border-slate-100">
        <div className="mx-auto w-full max-w-7xl px-4 sm:px-6 lg:px-8 py-4">
          <div className="flex items-center justify-between">
            <div
              className="text-xl font-bold text-[var(--innara-primary)] animate-fade-up"
              style={{ animationDelay: "50ms" }}
            >
              Mealistik
            </div>
            <nav
              className="hidden md:flex items-center gap-6 text-sm text-slate-700 animate-fade-up"
              style={{ animationDelay: "120ms" }}
            >
              <a
                className="hover:text-[var(--innara-primary)] link-underline"
                href="#about"
              >
                About
              </a>
              <a
                className="hover:text-[var(--innara-primary)] link-underline"
                href="#features"
              >
                Features
              </a>
              <a
                className="hover:text-[var(--innara-primary)] link-underline"
                href="#plans"
              >
                Plans
              </a>
              <a
                className="hover:text-[var(--innara-primary)] link-underline"
                href="#contact"
              >
                Contact
              </a>
            </nav>
            <div className="flex items-center gap-3">
              {/* Join our Waitlist */}
              <button
                type="button"
                onClick={() => scrollToSection("contact")}
                className="inline-flex items-center justify-center rounded-2xl px-5 py-3 text-sm font-semibold text-white shadow-sm transition-colors
                          focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[color:var(--innara-primary)]/40
                          animate-fade-up animate-glow pointer-events-auto"
                style={{ backgroundColor: "var(--innara-footer)", animationDelay: "180ms" }}
              >
                Join our Waitlist
              </button>
            </div>
          </div>
        </div>
      </header>

      {/* Hero */}
      <section className="relative overflow-hidden mx-auto w-full max-w-7xl p-[40px] sm:p-[60px] lg:p-[75px] py-8 sm:py-10 bg-gradient-to-l from-[#CCCCFF] to-white">
        <div className="grid md:grid-cols-2 gap-6 items-center">
          {/* Text column */}
          <div className="text-center md:text-left max-w-3xl md:max-w-xl mx-auto md:mx-0">
            <p
              className="inline-block text-xs tracking-wide uppercase text-white bg-[linear-gradient(90deg,#7A69AF,#9B8BD1,#7A69AF)] rounded-full px-3 py-1 mb-5 animate-fade-up border border-[var(--innara-primary)]"
              style={{ animationDelay: "80ms" }}
            >
              New: Hormone-Smart Meal Planning App
            </p>
            <h1
              className="text-3xl sm:text-4xl md:text-5xl font-bold bg-clip-text text-transparent bg-[linear-gradient(90deg,#7A69AF,#9B8BD1,#7A69AF)] bg-[length:200%_100%] animate-[shine_6s_linear_infinite] animate-fade-up"
              style={{ animationDelay: "140ms" }}
            >
              Meal Prep with your Hormones in mind
            </h1>
            <p
              className="mt-4 text-slate-600 animate-fade-up"
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
              {/* Join our Waitlist */}
              <button
                type="button"
                onClick={() => scrollToSection("contact")}
                className="inline-flex items-center justify-center rounded-2xl px-5 py-3 text-sm font-semibold text-white shadow-sm transition-colors
                          focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[color:var(--innara-primary)]/40
                          animate-fade-up animate-glow pointer-events-auto"
                style={{ backgroundColor: "var(--innara-footer)", animationDelay: "180ms" }}
              >
                Join our Waitlist
              </button>

              <button
                onClick={() => scrollToSection("plans")}
                className="relative z-50 inline-flex items-center justify-center rounded-2xl border border-[var(--innara-primary)] 
                          px-5 py-3 text-sm font-semibold text-[var(--innara-primary)] transition-all duration-200 
                          hover:bg-[var(--innara-secondary)] hover:text-white hover:border-[var(--innara-secondary)]"
              >
                See How it Works <span className="ml-2">➜</span>
              </button>

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
                quality={90}
              />
            </motion.div>
          </div>
        </div>
        <div className="absolute bottom-0 left-0 right-0">
          <svg
            xmlns="http://www.w3.org/2000/svg"
            viewBox="0 0 1440 320"
            className="w-full h-20 sm:h-32 text-white"
            preserveAspectRatio="none"
          >
            <path
              fill="currentColor"
              fillOpacity="1"
              d="M0,224L48,213.3C96,203,192,181,288,176C384,171,480,181,576,202.7C672,224,768,256,864,256C960,256,1056,224,1152,197.3C1248,171,1344,149,1392,138.7L1440,128L1440,320L0,320Z"
            ></path>
          </svg>
        </div>
      </section>

      {/* Stats */}
      <section className="mx-auto w-full max-w-7xl px-4 sm:px-6 lg:px-8 py-16 sm:py-20 bg-white">
        <div className="h-0.5 w-full bg-[var(--innara-primary)]/50 mb-12" />
        <div className="grid sm:grid-cols-3 gap-10 text-center">
          {[
            {
              title: "100+",
              subtitle: "Early Access Members",
              description: "Be part of the first wave to experience Mealistik and help shape its journey.",
              icon: "/icons/hippo-gift.png",
            },
            {
              title: "280+ Members",
              subtitle: "Members",
              description: "Growing Instagram Community.",
              icon: "/icons/hippo-clock.png",
            },
            {
              title: "Supportive & Simple",
              subtitle: "For Real Lives",
              description: "Designed for everyday living, not restrictive diets.",
              icon: "/icons/hippo-speed.png",
            },
          ].map((item) => (
            <div key={item.title} className="flex flex-col items-center text-center max-w-sm">
              <Image
                src={item.icon}
                alt={item.title}
                width={96}
                height={96}
                className="object-contain mb-4"
              />
              <h3 className="text-2xl font-bold mb-5">{item.title}</h3>
              <p className="text-l text-gray-800">{item.subtitle}</p>
              <p className="text-sm text-gray-500 mt-2">{item.description}</p>
            </div>
          ))}
        </div>
        <div className="h-0.5 w-full bg-[var(--innara-primary)]/50 mt-12" />
      </section>

      {/* About */}
      <section
        id="about"
        className="mx-auto w-full max-w-7xl p-[40px] sm:px-[60px] lg:px-[75px] py-16 sm:py-20"
      >
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
              <Image
                src="/app-mock.png"
                alt="Innara app screen"
                fill
                className="object-cover"
                priority
              />
            </div>
          </div>
        </div>
      </section>

      {/* Features */}
      <section id="features" className="relative bg-white px-6 lg:px-12 py-20 bg-gradient-to-l from-white to-[#CCCCFF]">
        <div className="max-w-6xl mx-auto text-center">
          <h2 className="text-2xl sm:text-3xl font-semibold">
            Features that support your journey
          </h2>
          <p className="mt-3 text-slate-600">
            Mealistik combines cutting-edge nutrition science with intuitive design
            to give you the tools you need for hormonal health success.
          </p>
        </div>

        <div className="mt-10 grid sm:grid-cols-2 lg:grid-cols-3 gap-6">
          {[
            {
              title: "Smart Meal Plans",
              desc: "Personalized meals built for real life and real health specifically designed to support PCOS, thyroid, diabetes, and other chronic conditions.",
              points: [
                "Swap meals as often as you like", 
                "Recipes for every cooking skill level, whether you're a beginner or a pro", 
                "Condition-friendly options that fit your needs"
              ],
            },
            {
              title: "Recipe Library",
              desc: "Discover recipes that are simple, flexible, and tailored to your needs.",
              points: [
                "Quick & easy meals for busy days",
                "Personalized suggestions based on your health goals",
                "Recipes inspired by multiple cultures and cuisines",
              ],
            },
            {
              title: "Daily Check-Ins",
              desc: "Stay consistent with gentle, guilt-free guidance. We're always here, even when you need to bounce back.",
              points: [
                "Quick daily meal & mood check-ins",
                "Supportive reminders that keep you on track",
                "Encouragement without judgment",
              ],
            },
            {
              title: "Progress Dashboard",
              desc: "A simple way to see how your nutrition is supporting your health.",
              points: [
                "Track your meals and energy levels",
                "Notice trends across your cycle",
                "Celebrate small wins",
              ],
            },
            {
              title: "Grocery Planning",
              desc: "Turn your meal plan into a simple shopping experience.",
              points: [
                "Auto-generated grocery lists",
                "Ingredient swaps to match preferences",
                "Organized lists for easy shopping",
              ],
            },
            {
              title: "AI Nutrition Chatbot",
              desc: "Your 24/7 supportive food companion. We're always here to guide you without judgment.",
              points: [
                "Ask questions about meals & nutrients anytime",
                "Get body-synced advice instantly",
                "Receive reminders tailored to your goals",
                "Even ask “Can I eat KFC or Maccas today?”—our Hippooo will make it work for you"
              ],
            },
          ].map((f, i) => (
            <div key={i} className="group [perspective:800px] animate-fade-up" style={{ animationDelay: `${i * 80}ms` }}>
              <div className="h-full rounded-2xl border border-slate-200 bg-white p-6 shadow-sm transition-transform duration-300 group-hover:[transform:rotateX(6deg)_rotateY(-6deg)_translateY(-2px)] hover:shadow-md flex flex-col">
                <div className="h-8 w-8 rounded-full bg-[#9999CC]/20 text-[#9999CC] grid place-content-center mb-4">
                  ★
                </div>
                <h3 className="text-lg font-semibold">{f.title}</h3>
                <p className="mt-2 text-sm text-slate-600">{f.desc}</p>
                <ul className="mt-4 space-y-1 text-sm text-slate-600 list-disc pl-5 flex-1">
                  {f.points.map((p, j) => (
                    <li key={j}>{p}</li>
                  ))}
                </ul>
                <div className="pt-2" />
              </div>
            </div>
          ))}
        </div>
        {/* Wave divider at bottom (into Contact bg) */}
        <div className="absolute bottom-0 left-0 right-0">
          <svg
            xmlns="http://www.w3.org/2000/svg"
            viewBox="0 0 1440 320"
            className="w-full h-20 sm:h-32 text-[#ECECFF]"
            preserveAspectRatio="none"
          >
            <path
              fill="currentColor"
              d="M0,224L48,213.3C96,203,192,181,288,176C384,171,480,181,576,202.7C672,224,768,256,864,256C960,256,1056,224,1152,197.3C1248,171,1344,149,1392,138.7L1440,128L1440,320L0,320Z"
            />
          </svg>
        </div>
      </section>

      {/* Timeline */}
      <section
        id="plans"
        style={{ scrollMarginTop: '88px' }} 
        className="mx-auto w-full max-w-7xl px-4 sm:px-6 lg:px-8 py-16 sm:py-20 bg-[var(--innara-surface)]"
      >
        {/* Hippo mascot at top center */}
        <div className="flex justify-center mb-8">
        <Image
        src="/icons/hippo-mascot.png" 
        alt="Innara Mascot"
        width={300}   
        height={300}
        className="object-contain"
        />
        </div>
        <div className="text-center mb-10">
          <h2 className="text-2xl sm:text-3xl font-semibold text-slate-900">
            How Mealistik Works for You
          </h2>
          <p className="mt-2 text-slate-600">
            Getting started is easier than you think. Here&apos;s how Mealistik guides you every step of the way.
          </p>
        </div>

        {/* Desktop timeline */}
        <div className="hidden md:block">
          <div className="relative flex items-start justify-between">
            {/* Connector line across all steps */}
            <div className="absolute top-14 left-50 right-50 h-[2px] bg-[var(--innara-primary)] z-0" />

            {[
              { n: 1, t: "Tell Mealistik About You", bullets: ["Share your health details so Mealistik knows your needs.", "Set your personal health and fitness goals", "Tell us what foods and flavors you like"] },
              { n: 2, t: "Get Your Smart Plan", bullets: ["Get a weekly meal plan made just for you.", "See exactly what to shop for, stress-free", "Follow easy tips to cook and prep faster"] },
              { n: 3, t: "Track & Adapt", bullets: ["Track your meals and progress with ease", "Get simple AI assisted insights on what’s working for you", "Tweak your plan anytime to fit your life"] },
            ].map((s) => (
              <div key={s.n} className="flex-1 flex flex-col items-center">
                {/* Circle sits on the line, above it */}
                <motion.div
                    whileHover={{ scale: 1.08 }}
                    className="relative z-10 h-30 w-30 rounded-full bg-[#FFFFFF] 
                    grid place-content-center text-[#7A69AF] text-xl sm:text-2xl lg:text-3xl font-semibold shadow-sm"
                >
                {s.n}
                </motion.div>

                {/* Card directly under circle */}
                <div className="group [perspective:800px] mt-6 w-full max-w-[220px] rounded-xl border border-slate-200 bg-white shadow-sm 
                                p-4 transform transition-transform duration-300 hover:scale-105 hover:[transform:rotateX(6deg)_rotateY(-6deg)_translateY(-2px)]">
                  <div className="font-semibold text-slate-900 text-center">{s.t}</div>
                  <ul className="mt-2 text-l text-slate-600 space-y-2 text-left">
                    {s.bullets.map((b) => (
                      <li key={b}>• {b}</li>
                    ))}
                  </ul>
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Mobile cards */}
        <div className="md:hidden space-y-6">
          {[
            { n: 1, t: "Tell Mealistik About You", bullets: ["Share your health details so Mealistik knows your needs", "Set your personal health and fitness goals", "Tell us what foods and flavors you like"] },
            { n: 2, t: "Get Your Smart Plan", bullets: ["Get a weekly meal plan made just for you", "See exactly what to shop for, stress-free", "Follow easy tips to cook and prep faster"] },
            { n: 3, t: "Track & Adapt", bullets: ["Track your meals and progress with ease", "Get simple insights on what’s working for you", "Tweak your plan anytime to fit your life"] },
          ].map((s) => (
            <div
              key={s.n}
              className="group [perspective:800px] rounded-2xl border border-slate-200 bg-white p-4 shadow-sm transition-transform duration-300 hover:[transform:rotateX(6deg)_rotateY(-6deg)_translateY(-2px)]"
            >
              <div className="flex items-center gap-3">
                <div className="h-10 w-10 rounded-full bg-[var(--innara-surface)] text-[var(--innara-primary)] grid place-content-center font-semibold">
                  {s.n}
                </div>
                <div className="font-semibold text-slate-900">{s.t}</div>
              </div>
              <ul className="mt-2 text-sm text-slate-600 space-y-1">
                {s.bullets.map((b) => (
                  <li key={b}>• {b}</li>
                ))}
              </ul>
            </div>
          ))}
        </div>
      </section>
         
      {/* Community / Contact */}
      <section id="contact" className="relative bg-[#FFFFFF] px-6 lg:px-12 py-20 bg-gradient-to-l from-[#CCCCFF] to-white">
        {/* Wave at top (flipped from Features) */}
        <div className="absolute top-0 left-0 right-0 -translate-y-full rotate-180">
          <svg
            xmlns="http://www.w3.org/2000/svg"
            viewBox="0 0 1440 320"
            className="w-full h-20 sm:h-32 text-[#FFFFFF]"
            preserveAspectRatio="none"
          >
            <path
              fill="currentColor"
              d="M0,224L48,213.3C96,203,192,181,288,176C384,171,480,181,576,202.7C672,224,768,256,864,256C960,256,1056,224,1152,197.3C1248,171,1344,149,1392,138.7L1440,128L1440,0L0,0Z"
            />
          </svg>
        </div>
        <div className="text-center mb-10">
          <h2 className="text-2xl sm:text-3xl font-semibold text-slate-900">Join the Mealistik Community</h2>
          <p className="mt-2 text-slate-600">Stay connected with the latest in hormone-friendly nutrition and app updates.</p>
        </div>
        <div className="grid md:grid-cols-2 gap-8">
          <div className="rounded-2xl border border-slate-200 bg-white p-6 shadow-sm">
            <h3 className="text-lg font-semibold text-slate-900">Get Connected</h3>
            <div className="mt-4 grid grid-cols-1 sm:grid-cols-3 gap-4">
              {[
                { title: "Early Access", desc: "Be first to try new features", icon: "/icons/gift.png" },
                { title: "Partnership", desc: "Collaborate with Mealistik", icon: "/icons/handshake.png" },
                { title: "Newsletter", desc: "Monthly insights & recipes", icon: "/icons/newsletter.png" },
              ].map((card) => (
                <div
                  key={card.title}
                  className="rounded-xl border border-slate-200 p-4 hover:shadow-sm transition-shadow"
                >
                  <div className="h-9 w-9 rounded-lg bg-[var(--innara-surface)] grid place-content-center">
          <Image
                      src={card.icon}
                      alt={card.title}
                      width={20}
                      height={20}
                      className="object-contain"
                    />
                  </div>
                  <div className="mt-2 font-medium text-slate-900">{card.title}</div>
                  <div className="text-sm text-slate-600">{card.desc}</div>
                </div>
              ))}
            </div>
          </div>
          <div className="launchlist-widget" data-key-id="uUxEhu" data-height="180px"></div>
        </div>
        {/* Wave divider at bottom (into footer bg) */}
        <div className="absolute bottom-0 left-0 right-0">
          <svg
            xmlns="http://www.w3.org/2000/svg"
            viewBox="0 0 1440 320"
            className="w-full h-20 sm:h-32 text-[#2E1A47]"
            preserveAspectRatio="none"
          >
            <path
              fill="currentColor"
              d="M0,64L48,80C96,96,192,128,288,149.3C384,171,480,181,576,176C672,171,768,149,864,154.7C960,160,1056,192,1152,213.3C1248,235,1344,245,1392,250.7L1440,256V320H0Z"
            />
          </svg>
        </div>
      </section>

      {/* Footer */}
      <footer className="bg-[var(--innara-footer)] text-slate-200">
        <div className="mx-auto w-full max-w-7xl px-4 sm:px-6 lg:px-8 py-16 sm:py-20">
          {/* Footer Columns */}
          <div className="grid md:grid-cols-4 gap-10">
            <div>
              <div className="text-xl font-bold text-white">Mealistik</div>
              <p className="mt-3 text-sm text-slate-300">
                Empowering women to thrive through hormone-smart nutrition.
              </p>
            </div>
            <div>
              <div className="font-semibold text-white">App</div>
              <ul className="mt-3 space-y-2 text-sm text-slate-300">
                <li>Features</li>
                <li>How it Works</li>
                <li>Pricing</li>
              </ul>
            </div>
            <div>
              <div className="font-semibold text-white">Company</div>
              <ul className="mt-3 space-y-2 text-sm text-slate-300">
                <li>About</li>
                <li>Founders</li>
                <li>Contact</li>
              </ul>
            </div>
          </div>

          {/* Bottom Row */}
          <div className="mt-10 flex items-center justify-between flex-col sm:flex-row gap-4">
            <p className="text-xs text-slate-400">
              © {new Date().getFullYear()} Mealistik. All rights reserved.
            </p>

            {/* Social Icons */}
            <div className="flex items-center gap-3">
              {[
                { name: "Instagram", icon: "/icons/instagram.png", link: "https://www.instagram.com/innara.ai/" },
                { name: "Medium", icon: "/icons/medium.png", link: "https://medium.com/@innara.general" },
                { name: "LinkedIn", icon: "/icons/linkedin.png", link: "https://www.linkedin.com/company/innara-ai/" },
              ].map((social) => (
                <a
                  key={social.name}
                  href={social.link}
          target="_blank"
          rel="noopener noreferrer"
                  className="h-8 w-8 grid place-content-center rounded-full bg-[#1B0F2B] hover:bg-[#2C1B45] transition-colors"
        >
          <Image
                    src={social.icon}
                    alt={social.name}
                    width={20}
                    height={20}
                    className="object-contain"
                  />
                </a>
              ))}
            </div>
          </div>
        </div>
      </footer>
    </div>
  );
}