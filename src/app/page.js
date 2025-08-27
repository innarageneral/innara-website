"use client";

import { motion, AnimatePresence } from "framer-motion";
import Image from "next/image";
import { useState } from "react";

const fadeIn = {
  hidden: { opacity: 0, y: 16 },
  show: { opacity: 1, y: 0, transition: { duration: 0.5, ease: "easeOut" } },
};

const slideFrom = (dir) => ({
  hidden: { opacity: 0, x: dir === "left" ? -100 : 100 },
  show: {
    opacity: 1,
    x: 0,
    transition: { type: "spring", stiffness: 120, damping: 18 },
  },
});

const cardSpring = (dir) => ({
  hidden: { opacity: 0, x: dir === "left" ? -100 : 100 },
  show: {
    opacity: 1,
    x: 0,
    transition: { type: "spring", stiffness: 120, damping: 18 },
  },
});

export default function Home() {
  const [hoveredStep, setHoveredStep] = useState(null);
  
  return (
    <div className="min-h-screen bg-white">

      {/* Navbar */}
      <header className="sticky top-0 z-30 bg-white/90 backdrop-blur border-b border-slate-100">
        <div className="mx-auto w-full max-w-7xl px-4 sm:px-6 lg:px-8 py-4">
          <div className="flex items-center justify-between">
            <div
              className="text-xl font-bold text-[var(--innara-primary)] animate-fade-up"
              style={{ animationDelay: "50ms" }}
            >
              Innara
            </div>
            <nav
              className="hidden md:flex items-center gap-6 text-sm text-slate-700 animate-fade-up"
              style={{ animationDelay: "120ms" }}
            >
              <a className="hover:text-[var(--innara-primary)] link-underline" href="#about">
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
              <a className="hover:text-[var(--innara-primary)] link-underline" href="#blog">
                Blog
          </a>
          <a
                className="hover:text-[var(--innara-primary)] link-underline"
                href="#contact"
              >
                Contact
              </a>
            </nav>
            <div className="flex items-center gap-3">
              <button
                className="inline-flex items-center justify-center rounded-2xl px-5 py-3 text-sm font-semibold text-white shadow-sm transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[color:var(--innara-primary)]/40 animate-fade-up animate-glow"
                style={{
                  backgroundColor: "var(--innara-primary)",
                  animationDelay: "180ms",
                }}
              >
                Download App
              </button>
            </div>
          </div>
        </div>
      </header>


      {/* Hero */}
      <section className="relative overflow-hidden mx-auto w-full max-w-7xl px-4 sm:px-6 lg:px-8 py-16 sm:py-20 bg-[var(--innara-surface)]">
        <div className="text-center max-w-3xl mx-auto">
          <p
            className="inline-block text-xs tracking-wide uppercase text-[var(--innara-primary)] bg-[var(--innara-surface)] rounded-full px-3 py-1 mb-5 animate-fade-up border border-[var(--innara-primary)]"
            style={{ animationDelay: "80ms" }}
          >
            New: Hormone-Smart Meal Planning App
          </p>
          <h1
            className="text-3xl sm:text-4xl md:text-5xl font-bold text-slate-900 animate-fade-up"
            style={{ animationDelay: "140ms" }}
          >
            Meal Prep with your Hormones in mind
          </h1>
          <p
            className="mt-4 text-slate-600 animate-fade-up"
            style={{ animationDelay: "200ms" }}
          >
            Innara helps you plan, prep, and balance meals that support hormonal
            health — one week at a time. Science-backed nutrition tailored to
            your unique cycle and goals.
          </p>
          <div
            className="mt-8 flex items-center justify-center gap-3 animate-fade-up"
            style={{ animationDelay: "260ms" }}
          >
            <a
              href="#download"
              className="inline-flex items-center justify-center rounded-2xl bg-[var(--innara-primary)] px-5 py-3 text-sm font-semibold text-white shadow-sm transition-transform hover:-translate-y-0.5 hover:brightness-90"
            >
              Download the App 
              <span className="ml-2">➜</span>
        </a>
        <a
              href="#how"
              className="inline-flex items-center justify-center rounded-2xl border border-[var(--innara-primary)] px-5 py-3 text-sm font-semibold text-[var(--innara-primary)] transition-colors hover:bg-[var(--innara-surface)]"
            >
              See How It Works
              <span className="ml-2">➜</span>
            </a>
          </div>
        </div>
      </section>

      {/* Stats / Metrics */}
      <section className="mx-auto w-full max-w-7xl px-4 sm:px-6 lg:px-8 py-16 sm:py-20 bg-white">
        <div className="h-0.5 w-full bg-[var(--innara-primary)]/50 mb-12" />
        <div className="grid sm:grid-cols-3 gap-10 text-center">
          {[
            { title: "Free", subtitle: "7 day trial", icon: "/icons/gift.png" },
            { title: "24 hr", subtitle: "Set up Support", icon: "/icons/clock.png" },
            { title: "2x", subtitle: "Energy Increase", icon: "/icons/lightning.png" },
          ].map((item) => (
            <div key={item.title} className="flex flex-col items-center">
              <div className="relative h-24 w-24 sm:h-28 sm:w-28 rounded-full bg-[var(--innara-surface)] grid place-content-center">
                <Image
                  src={item.icon}
                  alt={item.title}
                  width={40}
                  height={40}
                  className="object-contain"
                />
              </div>
              <div className="mt-6 text-xl sm:text-3xl font-bold text-slate-900">
                {item.title}
              </div>
              <div className="mt-2 text-base text-slate-700">{item.subtitle}</div>
            </div>
          ))}
        </div>
        <div className="h-0.5 w-full bg-[var(--innara-primary)]/50 mt-12" />
      </section>



      {/* About */}
      <section
        id="about"
        className="mx-auto w-full max-w-7xl px-4 sm:px-6 lg:px-8 py-16 sm:py-20"
      >
        <div className="grid md:grid-cols-2 gap-10 items-center">
          <motion.div
            initial={{ x: -50, opacity: 0 }}
            whileInView={{ x: 50, opacity: 1 }}
            transition={{ duration: 0.8, ease: "easeOut" }}
            viewport={{ once: true }}
          >
            <h2 className="text-2xl sm:text-3xl font-semibold text-slate-900">
              Why Innara? Your hormones deserve better
            </h2>
            <p className="mt-4 text-slate-600">
              Hormonal imbalances affect energy, mood, and metabolism. Traditional
              meal planning ignores these crucial signals. Innara aligns nutrition
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
            <div className="mt-6">
              <a
                href="#features"
                className="inline-flex items-center justify-center rounded-2xl border border-[var(--innara-primary)] px-5 py-3 text-sm font-semibold text-[var(--innara-primary)] transition-colors hover:bg-[var(--innara-surface)]"
              >
                Learn More about Innara
                <span className="ml-2">➜</span>
              </a>
            </div>
          </motion.div>
          <div className="flex justify-center">
            <div className="relative w-64 sm:w-72 md:w-80 aspect-[9/19] min-h-[500px] rounded-[2.5rem] border-8 border-slate-900/90 bg-slate-100 shadow-xl overflow-hidden">
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
      <section
        id="features"
        className="mx-auto w-full max-w-7xl px-4 sm:px-6 lg:px-8 py-16 sm:py-20"
      >
        <div className="text-center max-w-2xl mx-auto">
          <h2 className="text-2xl sm:text-3xl font-semibold">
            Features that support your journey
          </h2>
          <p className="mt-3 text-slate-600">
            Innara combines cutting-edge nutrition science with intuitive design
            to give you the tools you need for hormonal health success.
          </p>
        </div>

        <div className="mt-10 grid sm:grid-cols-2 lg:grid-cols-3 gap-6">
          {[
            {
              title: "Smart Meal Plans",
              desc: "Meals synced with your hormonal cycle for optimal energy and mood balance.",
              points: ["Cycle-aware recipes", "Grocery lists", "Prep reminders"],
            },
            {
              title: "Cycle Tracking",
              desc: "Understand your body better with personalized cycle logging and insights.",
              points: [
                "Phase-based guidance",
                "Mood + symptom logging",
                "Cycle predictions",
              ],
            },
            {
              title: "Nutrition Insights",
              desc: "Get science-backed tips tailored to your cycle phase.",
              points: [
                "Hormone-supportive foods",
                "Easy swaps & hacks",
                "Data-driven recommendations",
              ],
            },
            {
              title: "Mind-Body Wellness",
              desc: "Support your mental and emotional health alongside nutrition.",
              points: [
                "Guided relaxation",
                "Stress management tools",
                "Phase-specific workouts",
              ],
            },
            {
              title: "Recipe Library",
              desc: "Explore delicious, cycle-friendly recipes crafted by experts.",
              points: [
                "Quick & easy meals",
                "Ingredient-based search",
                "Personalized suggestions",
              ],
            },
            {
              title: "Community Support",
              desc: "Connect with others on the same journey, share and grow together.",
              points: ["Group discussions", "Expert advice", "Safe, supportive space"],
            },
          ].map((f, i) => (
            <div
              key={i}
              className="rounded-2xl border border-slate-200 bg-white p-6 shadow-sm transition-transform hover:-translate-y-1 hover:shadow-md animate-fade-up"
              style={{ animationDelay: `${i * 80}ms` }}
            >
              <div className="h-8 w-8 rounded-full bg-[#9999CC]/20 text-[#9999CC] grid place-content-center mb-4">
                ★
              </div>
              <h3 className="text-lg font-semibold">{f.title}</h3>
              <p className="mt-2 text-sm text-slate-600">{f.desc}</p>
              <ul className="mt-4 space-y-1 text-sm text-slate-600 list-disc pl-5">
                {f.points.map((p, j) => (
                  <li key={j}>{p}</li>
                ))}
              </ul>
            </div>
          ))}
        </div>
      </section>

      {/* Timeline */}
      <section
        id="plans"
        className="mx-auto w-full max-w-7xl px-4 sm:px-6 lg:px-8 py-16 sm:py-20 bg-[var(--innara-surface)]"
      >
        <div className="text-center mb-10">
          <h2 className="text-2xl sm:text-3xl font-semibold text-slate-900">
            How Innara Works for You
          </h2>
          <p className="mt-2 text-slate-600">
            Getting started is easier than you think. Here’s how Innara guides you every step of the way.
          </p>
        </div>

        {/* Desktop timeline */}
        <div className="hidden md:block">
          <div className="relative flex items-start justify-between">
            {/* Connector line across all steps */}
            <div className="absolute top-7 left-50 right-50 h-[2px] bg-[var(--innara-primary)] z-0" />

            {[
              { n: 1, t: "Tell Innara About You", bullets: ["Health profile", "Goals", "Preferences"] },
              { n: 2, t: "Get Your Smart Plan", bullets: ["Weekly plan", "Groceries", "Prep tips"] },
              { n: 3, t: "Track & Adapt", bullets: ["Log progress", "Insights", "Adjust easily"] },
            ].map((s) => (
              <div key={s.n} className="flex-1 flex flex-col items-center">
                {/* Circle sits on the line, above it */}
                <motion.div
                  whileHover={{ scale: 1.08 }}
                  className="relative z-10 h-14 w-14 rounded-full bg-white border border-slate-200 
                            grid place-content-center text-[var(--innara-primary)] font-semibold shadow-sm"
                >
                  {s.n}
                </motion.div>

                {/* Card directly under circle */}
                <div className="mt-6 w-full max-w-[220px] rounded-xl border border-slate-200 bg-white shadow-sm 
                                p-4 transform transition-transform duration-300 hover:scale-105">
                  <div className="font-semibold text-slate-900 text-center">{s.t}</div>
                  <ul className="mt-2 text-sm text-slate-600 space-y-1 text-left">
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
            { n: 1, t: "Tell Innara About You", bullets: ["Health profile", "Goals", "Preferences"] },
            { n: 2, t: "Get Your Smart Plan", bullets: ["Weekly plan", "Groceries", "Prep tips"] },
            { n: 3, t: "Track & Adapt", bullets: ["Log progress", "Insights", "Adjust easily"] },
          ].map((s) => (
            <div
              key={s.n}
              className="rounded-2xl border border-slate-200 bg-white p-4 shadow-sm"
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

      {/* Articles (Blog) */}
      <section id="blog" className="bg-[var(--innara-surface)]">
        <div className="mx-auto w-full max-w-7xl px-4 sm:px-6 lg:px-8 py-16 sm:py-20">
          <motion.div
            variants={fadeIn}
            initial="hidden"
            whileInView="show"
            viewport={{ once: true, amount: 0.3 }}
            className="text-center mb-12"
          >
            <h2 className="text-3xl sm:text-4xl font-bold tracking-tight text-[var(--innara-footer)]">
              Make Our Kitchen Your Own
            </h2>
            <p className="mt-3 max-w-3xl mx-auto text-slate-700">
              Dive into our collection of hormone-friendly recipes, nutrition insights, and meal
              planning strategies. Everything you need to nourish your body and support your wellness
              journey.
            </p>
          </motion.div>

          <div className="grid md:grid-cols-3 gap-6">
            {[
              {
                tag: "Hormonal Health",
                time: "6 min read",
                title: "Balancing Hormones Naturally With Everyday Foods",
                excerpt:
                  "From flaxseeds to leafy greens, discover how simple food choices can help you feel more energized and balanced throughout your cycle.",
                author: "Dr. Anika Rao",
                date: "August 2, 2024",
                img: "/blog/blog-1.jpg",
              },
              {
                tag: "Nutrition Insights",
                time: "4 min read",
                title: "The Science of Meal Timing for Better Energy",
                excerpt:
                  "Learn how syncing your meals with your body’s natural rhythms can curb cravings, stabilize mood, and supercharge your daily energy.",
                author: "Dr. Maya Lewis",
                date: "July 18, 2024",
                img: "/blog/blog-2.jpg",
              },
              {
                tag: "Wellness & Lifestyle",
                time: "5 min read",
                title: "Stress, Sleep & Hormones: The Hidden Connection",
                excerpt:
                  "Your bedtime routine may be the missing puzzle piece to balanced hormones. Explore simple strategies for restorative sleep.",
                author: "Coach Daniel Kim",
                date: "June 30, 2024",
                img: "/blog/blog-3.jpg",
              },
            ].map((item, i) => (
              <motion.article
                key={i}
                variants={cardSpring(i % 2 === 0 ? "left" : "right")}
                initial="hidden"
                whileInView="show"
                viewport={{ once: true, amount: 0.25 }}
                className="rounded-2xl border border-slate-200 bg-white shadow-sm flex flex-col overflow-hidden"
              >
                {/* Image / Thumbnail */}
                <div className="p-6 pb-0">
                  <div className="aspect-video w-full rounded-xl overflow-hidden">
                    <img
                      src={item.img}
                      alt={item.title}
                      className="h-full w-full object-cover"
                    />
                  </div>
                </div>

                {/* Content */}
                <div className="p-6 pt-4">
                  <div className="flex items-center justify-between text-xs text-slate-500">
                    <span className="inline-block rounded-full border border-[color:var(--innara-primary)] px-3 py-1 text-[color:var(--innara-primary)]">
                      {item.tag}
                    </span>
                    <span>{item.time}</span>
                  </div>
                  <h3 className="mt-4 text-xl font-bold text-[var(--innara-footer)] leading-snug">
                    {item.title}
                  </h3>
                  <p className="mt-3 text-sm text-slate-600">{item.excerpt}</p>
                </div>

                {/* Footer */}
                <div className="px-6 pb-4">
                  <div className="h-px w-full bg-slate-200 mb-3" />
                  <div className="flex items-center justify-between text-[13px] text-slate-600 flex-wrap gap-2">
                    <div className="flex items-center gap-2">
                      <span className="inline-grid place-content-center h-5 w-5 rounded-full bg-slate-200">
                        👤
                      </span>
                      <span>{item.author}</span>
                    </div>
                    <div className="flex items-center gap-2">
                      <span className="inline-grid place-content-center h-5 w-5 rounded bg-slate-200">
                        📅
                      </span>
                      <span>{item.date}</span>
                    </div>
                    <a
                      className="group inline-flex items-center gap-1 text-slate-700 hover:text-[var(--innara-primary)]"
                      href="#"
                    >
                      Read More
                      <span className="transition-transform group-hover:translate-x-0.5">↗</span>
                    </a>
                  </div>
                </div>
              </motion.article>
            ))}
          </div>

          {/* CTA */}
          <div className="mt-10 text-center">
            <a
              href="#blog"
              className="inline-flex items-center justify-center rounded-full bg-[var(--innara-primary)] text-white px-6 sm:px-8 py-3 text-sm font-semibold shadow-sm hover:brightness-90"
            >
              View all Articles
              <span className="ml-2">➜</span>
            </a>
          </div>
        </div>
      </section>

      {/* Community / Contact */}
      <section id="contact" className="mx-auto w-full max-w-7xl px-4 sm:px-6 lg:px-8 py-16 sm:py-20 bg-[var(--innara-surface)]">
        <div className="text-center mb-10">
          <h2 className="text-2xl sm:text-3xl font-semibold text-slate-900">Join the Innara Community</h2>
          <p className="mt-2 text-slate-600">Stay connected with the latest in hormone-friendly nutrition and app updates.</p>
        </div>
        <div className="grid md:grid-cols-2 gap-8">
          <div className="rounded-2xl border border-slate-200 bg-white p-6 shadow-sm">
            <h3 className="text-lg font-semibold text-slate-900">Get Connected</h3>
            <div className="mt-4 grid grid-cols-1 sm:grid-cols-3 gap-4">
              {[
                { title: "Early Access", desc: "Be first to try new features", icon: "/icons/gift.png" },
                { title: "Partnership", desc: "Collaborate with Innara", icon: "/icons/handshake.png" },
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
          <form className="rounded-2xl border border-slate-200 bg-white p-6 shadow-sm grid grid-cols-1 gap-4">
            <div>
              <label className="text-sm font-medium text-slate-700">Name</label>
              <input className="mt-1 w-full rounded-xl border border-slate-300 px-4 py-2 focus:outline-none focus:ring-2 focus:ring-[color:var(--innara-primary)]/30" placeholder="Your name" />
            </div>
            <div>
              <label className="text-sm font-medium text-slate-700">Email</label>
              <input type="email" className="mt-1 w-full rounded-xl border border-slate-300 px-4 py-2 focus:outline-none focus:ring-2 focus:ring-[color:var(--innara-primary)]/30" placeholder="you@example.com" />
            </div>
            <div>
              <label className="text-sm font-medium text-slate-700">I'm interested in</label>
              <select className="mt-1 w-full rounded-xl border border-slate-300 px-4 py-2 focus:outline-none focus:ring-2 focus:ring-[color:var(--innara-primary)]/30">
                <option>Meal Planning</option>
                <option>Nutrition Guides</option>
                <option>Community</option>
              </select>
            </div>
            <div className="pt-2">
              <button className="inline-flex items-center justify-center rounded-2xl bg-[var(--innara-primary)] px-5 py-3 text-sm font-semibold text-white shadow-sm transition-colors hover:brightness-90 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[color:var(--innara-primary)]/40 w-full md:w-auto">Join Innara Community</button>
            </div>
          </form>
        </div>
      </section>

      {/* Footer */}
      <footer className="bg-[var(--innara-footer)] text-slate-200">
        <div className="mx-auto w-full max-w-7xl px-4 sm:px-6 lg:px-8 py-16 sm:py-20">
          {/* Footer Columns */}
          <div className="grid md:grid-cols-4 gap-10">
            <div>
              <div className="text-xl font-bold text-white">Innara</div>
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
                <li>Download</li>
                <li>System Requirements</li>
                <li>Release Notes</li>
              </ul>
            </div>
            <div>
              <div className="font-semibold text-white">Company</div>
              <ul className="mt-3 space-y-2 text-sm text-slate-300">
                <li>About</li>
                <li>Our Science</li>
                <li>Healthcare Partners</li>
                <li>Careers</li>
                <li>Press Kit</li>
                <li>Contact</li>
              </ul>
            </div>
            <div>
              <div className="font-semibold text-white">Resources</div>
              <ul className="mt-3 space-y-2 text-sm text-slate-300">
                <li>Blog</li>
                <li>Nutrition Guides</li>
                <li>Support Center</li>
                <li>Privacy Policy</li>
                <li>Terms of Service</li>
              </ul>
            </div>
          </div>

          {/* Bottom Row */}
          <div className="mt-10 flex items-center justify-between flex-col sm:flex-row gap-4">
            <p className="text-xs text-slate-400">
              © {new Date().getFullYear()} Innara. All rights reserved.
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