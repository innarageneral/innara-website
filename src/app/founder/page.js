"use client";

import { motion } from "framer-motion";
import Image from "next/image";
import Link from "next/link";

export default function FounderPage() {
  return (
    <main className="bg-transparent">

      {/* HERO */}
      <section className="relative bg-[var(--innara-footer)] text-white px-6 py-20 overflow-hidden">
        <div className="max-w-6xl mx-auto grid md:grid-cols-2 gap-12 items-center">

          {/* Text */}
          <div className="animate-fade-up">
            <p className="uppercase text-xs tracking-wide mb-3 text-white/80">
              Behind the brand
            </p>

            <h1 className="font-serif text-4xl md:text-5xl leading-tight">
              The <span className="italic text-[var(--innara-primary)]">Founders</span> behind <br />
              Mealistik
            </h1>

            <div className="mt-6 flex gap-4">
              <Link
                href="#meet"
                className="rounded-2xl bg-[var(--innara-primary)] text-white px-6 py-2 text-sm font-semibold hover:opacity-90 transition"
              >
                Meet the Founders
              </Link>
            </div>
          </div>

          {/* Image */}
          <motion.div
            initial={{ y: 12, opacity: 0 }}
            animate={{ y: 0, opacity: 1 }}
            transition={{ duration: 0.8 }}
            className="relative w-[260px] mx-auto animate-float"
          >
            <Image
              src="/founder/founder-hero.jpg"
              alt="Founder portrait"
              width={260}
              height={340}
              className="rounded-xl border-4 border-white shadow-xl"
            />
          </motion.div>
        </div>

        {/* Wave */}
        <div className="absolute bottom-0 left-0 right-0 bg-[var(--innara-surface)]">
          <svg viewBox="0 0 1440 120" className="w-full h-24" preserveAspectRatio="none">
            <path
              fill="var(--innara-footer)"
              d="M0,64L80,74.7C160,85,320,107,480,101.3C640,96,800,64,960,58.7C1120,53,1280,75,1360,85.3L1440,96L1440,0L0,0Z"
            />
          </svg>
        </div>
      </section>

      {/* MEET */}
      <section
        id="meet"
        className="max-w-6xl mx-auto px-6 py-24 bg-[var(--innara-surface)]"
      >
        <h2 className="font-serif text-5xl text-center mb-4 animate-fade-up">
          Meet the Founders
        </h2>

        <p className="text-center text-sm text-slate-600 max-w-xl mx-auto mb-16 animate-fade-up">
          Two women building a calmer, more realistic way to eat.
        </p>

        {/* Three column founders layout */}
        <div className="grid md:grid-cols-3 gap-12 items-center mx-auto animate-fade-up">

          {/* Sowmiya */}
          <div className="flex flex-col items-center">
            <div className="bg-[var(--innara-primary)]/20 p-4 rounded-3xl">
              <Image
                src="/founder/sowmiya.jpg"
                alt="Sowmiya Yoganathan"
                width={220}
                height={280}
                className="rounded-xl"
              />
            </div>
            <p className="text-center text-xs mt-2 text-slate-600">
              Sowmiya
            </p>
          </div>

          {/* TEXT */}
          <div className="text-center max-w-md mx-auto">
            <h3 className="font-serif text-3xl mb-4">
              We traded <span className="line-through opacity-60">rigid tracking</span>{" "}
              for{" "}
              <span className="bg-[var(--innara-primary)]/30 px-2 rounded">
                emotionally safe systems
              </span>.
            </h3>

            <p className="text-slate-700 leading-relaxed mb-4">
              After trying countless nutrition apps and systems, we realised none of them
              worked for real life, especially on low energy days.
            </p>

            <p className="text-slate-700 leading-relaxed">
              We wanted to build something that supported people between appointments,
              not something that demanded perfection.
            </p>

            <p className="mt-6 italic font-medium text-[var(--innara-footer)]">
              That’s when we started building Mealistik.
            </p>
          </div>

          {/* Sneha */}
          <div className="flex flex-col items-center">
            <div className="bg-[var(--innara-primary)]/20 p-4 rounded-3xl">
              <Image
                src="/founder/sneha.jpg"
                alt="Sneha Sivakumar"
                width={220}
                height={280}
                className="rounded-xl"
              />
            </div>
            <p className="text-center text-xs mt-2 text-slate-600">
              Sneha
            </p>
          </div>

        </div>

      </section>

      {/* JOURNEY */}
      <section className="bg-[var(--innara-surface)] px-6 py-24">
        <h2 className="font-serif text-4xl text-center mb-16 animate-fade-up">
          My Journey <span className="italic text-base">(so far)</span>
        </h2>

        <div className="max-w-5xl mx-auto relative">

          {/* Line */}
          <div className="absolute left-1/2 top-0 bottom-0 w-px bg-[var(--innara-footer)]/30" />

          {[
            {
              year: "2023",
              title: "Graduated college",
              text: "Most of my friends were chasing 9–5s. I knew I wanted something different.",
              image: "/founder/grad.jpg",
            },
            {
              year: "2024",
              title: "Launched my business",
              text: "Built my own social media business. It felt like freedom — until it didn’t.",
              image: "/founder/work.jpg",
            },
            {
              year: "2025",
              title: "Burnt it down",
              text: "I walked away from work that wasn’t aligned — even if it looked successful.",
              image: "/founder/rebuild.jpg",
            },
          ].map((item, i) => (
            <motion.div
              key={item.year}
              initial={{ opacity: 0, y: 16 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.6, delay: i * 0.1 }}
              className={`relative mb-20 grid md:grid-cols-2 gap-12 ${
                i % 2 === 0 ? "md:text-right" : ""
              }`}
            >
              {i % 2 === 0 ? null : <div />}

              <div>
                <p className="font-serif text-xl mb-1">
                  {item.year}{" "}
                  <span className="italic text-[var(--innara-primary)]">
                    {item.title}
                  </span>
                </p>
                <p className="text-sm text-slate-700">{item.text}</p>
              </div>

              <Image
                src={item.image}
                alt={item.title}
                width={180}
                height={180}
                className="rounded-xl border-4 border-white shadow-lg mx-auto"
              />
            </motion.div>
          ))}
        </div>
      </section>
    </main>
  );
}
