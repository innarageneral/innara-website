"use client";

import Image from "next/image";
import Link from "next/link";

/* ---------------- DATA ---------------- */

const founders = [
  {
    name: "Sowmiya Yoganathan",
    role: "Co-founder, Product",
    location: "Brisbane-based",
    image: "/founder/sowmiya.jpg",
    linkedin: "https://www.linkedin.com/in/sowmiya-yoganathan",
    email: "mailto:sowmiya@mealistik.com",
    points: [
      "Built Mealistik from lived experience",
      "Focus: systems, not restriction",
    ],
  },
  {
    name: "Sneha Sivakumar",
    role: "Co-founder",
    location: "Brisbane-based",
    image: "/founder/sneha.jpg",
    linkedin: "https://www.linkedin.com/in/snehas1632/",
    email: "mailto:snehasivakumar1632@gmail.com",
    points: [
      "Implemented 100+ food systems",
      "Focus: consistency + sustainability",
    ],
  },
];

const journey = [
  {
    year: "2022",
    title: "Living it",
    text: "Managing PCOS, hormonal imbalances, and low energy while juggling studies, work, and everyday responsibilities.",
  },
  {
    year: "2023",
    title: "Trying everything",
    text: "Calorie trackers, rigid plans, and routines that never truly stuck in real life.",
  },
  {
    year: "2024",
    title: "Building Mealistik",
    text: "Developed through the iLab cohort accelerator at UQ Ventures, grounded in customer discovery and validation.",
  },
  {
    year: "2025",
    title: "Testing with users",
    text: "Refining flows and features based on real feedback from people living busy, low-energy lives.",
  },
];

/* ---------------- PAGE ---------------- */

export default function FounderPage() {
  return (
    <main className="bg-[var(--innara-surface)]">

      {/* ---------- HERO ---------- */}
      <section className="relative overflow-hidden rounded-b-[40px] bg-gradient-to-r from-[#4B2A77] to-[#7A69AF] px-6 py-20 text-white">
        <div className="max-w-6xl mx-auto grid md:grid-cols-2 gap-10 items-center">

          <div>
            <h1 className="font-serif text-4xl md:text-5xl mb-4">
              The Founders behind <br /> Mealistik
            </h1>
            <p className="text-white/80 max-w-md mb-6">
              We’re building a calmer food companion for real life, not perfect life.
            </p>

            <div className="flex gap-3">
              <Link
                href="#meet"
                className="rounded-full bg-white text-[var(--innara-footer)] px-5 py-2 text-sm font-semibold"
              >
                Meet the Founders
              </Link>
              <Link
                href="/"
                className="rounded-full bg-white/20 px-5 py-2 text-sm font-semibold"
              >
                Try Mealistik
              </Link>
            </div>
          </div>

          <Image
            src="/founder/founders-hero.jpg"
            alt="Mealistik founders"
            width={420}
            height={320}
            className="rounded-3xl shadow-xl mx-auto"
          />
        </div>
      </section>

      {/* ---------- INTRO ---------- */}
      <section id="meet" className="max-w-6xl mx-auto px-6 py-24 text-center">
        <h2 className="font-serif text-4xl mb-2">Meet the Founders</h2>
        <p className="text-slate-600 mb-12">
          Building a calmer way to eat, for real life.
        </p>

        <p className="font-serif text-2xl mb-3">A calmer way to eat.</p>
        <p className="text-slate-600 max-w-xl mx-auto">
          We built Mealistik for low energy days, busy weeks, and real life.
          Mealistik turns meal planning into follow-through, without guilt.
        </p>
      </section>

      {/* ---------- FOUNDER CARDS ---------- */}
      <section className="max-w-5xl mx-auto px-6 pb-20 grid md:grid-cols-2 gap-8">
        {founders.map((f) => (
          <div key={f.name} className="bg-white rounded-2xl p-6 shadow-sm">

            <div className="flex items-center gap-4 mb-4">
              <Image
                src={f.image}
                alt={f.name}
                width={56}
                height={56}
                className="rounded-full"
              />
              <div>
                <p className="font-semibold">{f.name}</p>
                <p className="text-xs text-slate-500">{f.role}</p>
                <p className="text-xs text-green-600 flex items-center gap-1">
                  ● {f.location}
                </p>
              </div>
            </div>

            <ul className="text-sm text-slate-600 space-y-2 mb-4">
              {f.points.map((p) => (
                <li key={p} className="flex gap-2 items-start">
                  {p}
                </li>
              ))}
            </ul>

            <div className="flex gap-6 text-sm text-[var(--innara-primary)]">
              <a
                href={f.linkedin}
                target="_blank"
                rel="noopener noreferrer"
                className="flex items-center gap-2 hover:underline"
              >
                <Image src="/icons/linkedin.svg" alt="LinkedIn" width={16} height={16} />
                LinkedIn
              </a>

              <a
                href={f.email}
                className="flex items-center gap-2 hover:underline"
              >
                <Image src="/icons/email.png" alt="Email" width={16} height={16} />
                Email
              </a>
            </div>
          </div>
        ))}
      </section>

      {/* ---------- BELIEFS ---------- */}
      <section className="max-w-5xl mx-auto px-6 py-12 text-center">
        <h3 className="font-serif text-2xl mb-6">What we believe</h3>
        <div className="flex flex-wrap justify-center gap-4">
          {[
            "Balance over restriction",
            "Support on low energy days",
            "Food should feel safe",
          ].map((b) => (
            <span key={b} className="bg-white px-4 py-2 rounded-full text-sm shadow-sm">
              {b}
            </span>
          ))}
        </div>
      </section>

      {/* ---------- HELPS WITH ---------- */}
      <section className="max-w-6xl mx-auto px-6 py-16">
        <h3 className="font-serif text-2xl text-center mb-10">
          What Mealistik helps with
        </h3>

        <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-6">
          {[
            "Meal plans that fit your week",
            "Grocery lists that actually match meals",
            "Pantry-aware suggestions",
            "A kind chat companion when it’s hard",
          ].map((t) => (
            <div key={t} className="bg-white p-6 rounded-2xl shadow-sm flex items-start gap-3">
              <Image src="/icons/tick.png" alt="" width={18} height={18} />
              <p className="text-sm text-slate-600">{t}</p>
            </div>
          ))}
        </div>
      </section>

      {/* ---------- JOURNEY ---------- */}
      <section className="px-6 py-28">
        <h2 className="font-serif text-4xl text-center mb-20">
          Our Journey <span className="italic text-base">(so far)</span>
        </h2>

        <div className="relative max-w-6xl mx-auto">

          {/* Center line */}
          <div className="absolute left-1/2 top-0 bottom-0 w-px bg-[var(--innara-primary)]/30 hidden md:block" />

          <div className="space-y-20">
            {journey.map((item, i) => (
              <div
                key={item.year}
                className={`relative grid md:grid-cols-2 gap-12 ${
                  i % 2 === 0 ? "" : "md:text-right"
                }`}
              >
                {i % 2 !== 0 && <div />}

                <div className="bg-white rounded-2xl px-8 py-7 shadow-sm">
                  <p className="font-serif text-lg mb-1">
                    {item.year} ·{" "}
                    <span className="italic text-[var(--innara-footer)]">
                      {item.title}
                    </span>
                  </p>
                  <p className="text-sm text-slate-600 leading-relaxed">
                    {item.text}
                  </p>
                </div>

                {/* Timeline dot */}
                <div className="absolute left-1/2 -translate-x-1/2 top-6 hidden md:block">
                  <Image
                    src="/icons/timeline.png"
                    alt=""
                    width={28}
                    height={28}
                  />
                </div>

                {i % 2 === 0 && <div />}
              </div>
            ))}
          </div>
        </div>
      </section>

    </main>
  );
}
