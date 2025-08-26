export default function Home() {
  return (
    <div className="min-h-screen bg-white">
      {/* Navbar */}
      <header className="sticky top-0 z-30 bg-white/90 backdrop-blur supports-[backdrop-filter]:bg-white/70 border-b border-slate-100">
        <div className="mx-auto w-full max-w-7xl px-4 sm:px-6 lg:px-8 py-4">
          <div className="flex items-center justify-between">
            <div className="text-xl font-bold text-purple-700">Innara</div>
            <nav className="hidden md:flex items-center gap-6 text-sm text-slate-700">
              <a className="hover:text-purple-700" href="#about">About</a>
              <a className="hover:text-purple-700" href="#features">Features</a>
              <a className="hover:text-purple-700" href="#pricing">Pricing</a>
              <a className="hover:text-purple-700" href="#blog">Blog</a>
              <a className="hover:text-purple-700" href="#contact">Contact</a>
            </nav>
            <div className="flex items-center gap-3">
              <button className="inline-flex items-center justify-center rounded-2xl bg-purple-600 px-5 py-3 text-sm font-semibold text-white shadow-sm transition-colors hover:bg-purple-700 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-purple-600/40">Download App</button>
            </div>
          </div>
          {/* mobile nav */}
          <div className="md:hidden mt-3">
            <div className="flex overflow-x-auto gap-4 text-sm text-slate-700">
              <a className="shrink-0 hover:text-purple-700" href="#about">About</a>
              <a className="shrink-0 hover:text-purple-700" href="#features">Features</a>
              <a className="shrink-0 hover:text-purple-700" href="#pricing">Pricing</a>
              <a className="shrink-0 hover:text-purple-700" href="#blog">Blog</a>
              <a className="shrink-0 hover:text-purple-700" href="#contact">Contact</a>
            </div>
          </div>
        </div>
      </header>

      {/* Hero */}
      <section className="mx-auto w-full max-w-7xl px-4 sm:px-6 lg:px-8 py-16 sm:py-20 bg-[var(--lavender)]">
        <div className="text-center max-w-3xl mx-auto">
          <p className="inline-block text-xs tracking-wide uppercase text-purple-700 bg-purple-100 rounded-full px-3 py-1 mb-5">New: Hormone-Smart Meal Planning App</p>
          <h1 className="text-3xl sm:text-4xl md:text-5xl font-bold text-slate-900">
            Meal Prep with your Hormones in mind
          </h1>
          <p className="mt-4 text-slate-600">
            Innara helps you plan, prep, and balance meals that support hormonal health — one week at a time. Science-backed nutrition tailored to your unique cycle and goals.
          </p>
          <div className="mt-8 flex items-center justify-center gap-3">
            <a href="#download" className="btn-primary">Download the App</a>
            <a href="#how" className="btn-secondary">See How It Works</a>
          </div>
        </div>
      </section>

      {/* Why Innara */}
      <section id="about" className="mx-auto w-full max-w-7xl px-4 sm:px-6 lg:px-8 py-16 sm:py-20">
        <div className="grid md:grid-cols-2 gap-10 items-center">
          <div>
            <h2 className="text-2xl sm:text-3xl font-semibold text-slate-900">Why Innara? Your hormones deserve better</h2>
            <p className="mt-4 text-slate-600">Hormonal imbalances affect energy, mood, and metabolism. Traditional meal planning ignores these crucial signals. Innara aligns nutrition with your hormonal patterns.</p>
            <ul className="mt-6 space-y-3 text-slate-700">
              <li className="flex items-start gap-3"><span className="mt-1 h-2.5 w-2.5 rounded-full bg-purple-600"></span>Personalized to your hormonal cycle</li>
              <li className="flex items-start gap-3"><span className="mt-1 h-2.5 w-2.5 rounded-full bg-purple-600"></span>Science-backed + dietitian-guided</li>
              <li className="flex items-start gap-3"><span className="mt-1 h-2.5 w-2.5 rounded-full bg-purple-600"></span>Easy prep guidance</li>
              <li className="flex items-start gap-3"><span className="mt-1 h-2.5 w-2.5 rounded-full bg-purple-600"></span>Track progress & wellness</li>
            </ul>
            <div className="mt-6">
              <a href="#features" className="inline-flex items-center justify-center rounded-2xl border border-purple-600 px-5 py-3 text-sm font-semibold text-purple-700 transition-colors hover:bg-purple-50">Learn More about Innara</a>
            </div>
          </div>
          <div className="flex justify-center">
            <div className="relative w-64 sm:w-72 md:w-80 aspect-[9/19] rounded-[2.5rem] border-8 border-slate-900/90 bg-slate-100 shadow-xl overflow-hidden">
              {/* placeholder phone screen */}
              <div className="h-full w-full bg-gradient-to-b from-purple-200 via-white to-purple-100 flex items-center justify-center text-sm text-purple-700">App Screen</div>
            </div>
          </div>
        </div>
      </section>

      {/* Stats */}
      <section className="mx-auto w-full max-w-7xl px-4 sm:px-6 lg:px-8 py-16 sm:py-20 bg-[var(--lavender)]">
        <div className="grid sm:grid-cols-3 gap-6 text-center">
          {["Free\n7 day trial","24 hr\nSetup Support","2x\nEnergy Increase"].map((t, i) => (
            <div key={i} className="flex items-center justify-center">
              <div className="h-24 w-24 rounded-full bg-white shadow-sm border border-slate-200 flex items-center justify-center">
                <span className="text-sm font-semibold whitespace-pre-line text-slate-800">{t}</span>
              </div>
            </div>
          ))}
        </div>
      </section>

      {/* Features */}
      <section id="features" className="mx-auto w-full max-w-7xl px-4 sm:px-6 lg:px-8 py-16 sm:py-20">
        <div className="text-center max-w-2xl mx-auto">
          <h2 className="text-2xl sm:text-3xl font-semibold text-slate-900">Features that support your journey</h2>
          <p className="mt-3 text-slate-600">Innara combines cutting-edge nutrition science with intuitive design to give you the tools you need for hormonal health success.</p>
        </div>
        <div className="mt-10 grid sm:grid-cols-2 lg:grid-cols-3 gap-6">
          {Array.from({ length: 6 }).map((_, i) => (
            <div key={i} className="rounded-2xl border border-slate-200 bg-white p-6 shadow-sm">
              <div className="h-8 w-8 rounded-full bg-purple-100 text-purple-700 grid place-content-center mb-4">★</div>
              <h3 className="text-lg font-semibold text-slate-900">Smart Meal Plans</h3>
              <p className="mt-2 text-sm text-slate-600">Meals synced with your hormonal cycle for optimal energy and mood balance.</p>
              <ul className="mt-4 space-y-1 text-sm text-slate-600 list-disc pl-5">
                <li>Cycle-aware recipes</li>
                <li>Grocery lists</li>
                <li>Prep reminders</li>
              </ul>
            </div>
          ))}
        </div>
        <div className="mt-8 text-center">
          <a href="#features" className="inline-flex items-center justify-center rounded-2xl border border-purple-600 px-5 py-3 text-sm font-semibold text-purple-700 transition-colors hover:bg-purple-50">Explore All Features</a>
        </div>
      </section>

      {/* How it works */}
      <section id="how" className="mx-auto w-full max-w-7xl px-4 sm:px-6 lg:px-8 py-16 sm:py-20 bg-[var(--lavender)]">
        <div className="text-center mb-10">
          <h2 className="text-2xl sm:text-3xl font-semibold text-slate-900">How Innara Works for You</h2>
          <p className="mt-2 text-slate-600">Getting started is easier than you think. Here’s how Innara guides you every step of the way.</p>
        </div>
        <div className="grid md:grid-cols-3 gap-8">
          {[1,2,3].map((num) => (
            <div key={num} className="text-center">
              <div className="mx-auto mb-4 h-14 w-14 rounded-full bg-white border border-slate-200 shadow-sm grid place-content-center text-purple-700 font-semibold">{num}</div>
              <h3 className="font-semibold text-slate-900">Tell Innara About You</h3>
              <p className="mt-2 text-sm text-slate-600">Share your health profile, goals, and dietary preferences to get started.</p>
            </div>
          ))}
        </div>
      </section>

      {/* Articles */}
      <section id="blog" className="mx-auto w-full max-w-7xl px-4 sm:px-6 lg:px-8 py-16 sm:py-20">
        <div className="text-center mb-8">
          <h2 className="text-2xl sm:text-3xl font-semibold text-slate-900">Make Our Kitchen Your Own</h2>
          <p className="mt-2 text-slate-600">Recipes, cycle insights, and planning strategies to nourish your body.</p>
        </div>
        <div className="grid md:grid-cols-3 gap-6">
          {Array.from({ length: 3 }).map((_, i) => (
            <article key={i} className="rounded-2xl border border-slate-200 bg-white p-6 shadow-sm flex flex-col">
              <div className="aspect-video w-full rounded-xl bg-purple-100" />
              <div className="mt-4 text-xs text-slate-500">Nutrition • 6 min read</div>
              <h3 className="mt-1 text-lg font-semibold text-slate-900">Understanding Your Cycle Through Nutrition</h3>
              <p className="mt-2 text-sm text-slate-600">Explore how to sync meals with your hormonal phases to maximize energy and mood.</p>
            </article>
          ))}
        </div>
        <div className="mt-8 text-center">
          <a href="#blog" className="inline-flex items-center justify-center rounded-2xl border border-purple-600 px-5 py-3 text-sm font-semibold text-purple-700 transition-colors hover:bg-purple-50">View all Articles</a>
        </div>
      </section>

      {/* Community */}
      <section id="contact" className="mx-auto w-full max-w-7xl px-4 sm:px-6 lg:px-8 py-16 sm:py-20 bg-[var(--lavender)]">
        <div className="text-center mb-10">
          <h2 className="text-2xl sm:text-3xl font-semibold text-slate-900">Join the Innara Community</h2>
          <p className="mt-2 text-slate-600">Stay connected with the latest in hormone-friendly nutrition and app updates.</p>
        </div>
        <div className="grid md:grid-cols-2 gap-8">
          <div className="rounded-2xl border border-slate-200 bg-white p-6 shadow-sm">
            <h3 className="text-lg font-semibold text-slate-900">Get Connected</h3>
            <ul className="mt-4 space-y-3 text-slate-700">
              {['Early Access','Partnership','Newsletter'].map((label) => (
                <li key={label} className="flex items-start gap-3">
                  <input type="checkbox" className="mt-1 h-4 w-4 rounded border-slate-300 text-purple-600" />
                  <div>
                    <div className="font-medium">{label}</div>
                    <div className="text-sm text-slate-600">Stay in the loop with updates.</div>
                  </div>
          </li>
              ))}
            </ul>
          </div>
          <form className="rounded-2xl border border-slate-200 bg-white p-6 shadow-sm grid grid-cols-1 gap-4">
            <div>
              <label className="text-sm font-medium text-slate-700">Name</label>
              <input className="mt-1 w-full rounded-xl border border-slate-300 px-4 py-2 focus:outline-none focus:ring-2 focus:ring-purple-200" placeholder="Your name" />
            </div>
            <div>
              <label className="text-sm font-medium text-slate-700">Email</label>
              <input type="email" className="mt-1 w-full rounded-xl border border-slate-300 px-4 py-2 focus:outline-none focus:ring-2 focus:ring-purple-200" placeholder="you@example.com" />
            </div>
            <div>
              <label className="text-sm font-medium text-slate-700">I'm interested in</label>
              <select className="mt-1 w-full rounded-xl border border-slate-300 px-4 py-2 focus:outline-none focus:ring-2 focus:ring-purple-200">
                <option>Meal Planning</option>
                <option>Nutrition Guides</option>
                <option>Community</option>
              </select>
            </div>
            <div className="pt-2">
              <button className="inline-flex items-center justify-center rounded-2xl bg-purple-600 px-5 py-3 text-sm font-semibold text-white shadow-sm transition-colors hover:bg-purple-700 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-purple-600/40 w-full md:w-auto">Join Innara Community</button>
            </div>
          </form>
        </div>
      </section>

      {/* Footer */}
      <footer className="bg-slate-900 text-slate-200">
        <div className="mx-auto w-full max-w-7xl px-4 sm:px-6 lg:px-8 py-16 sm:py-20">
          <div className="grid md:grid-cols-4 gap-10">
            <div>
              <div className="text-xl font-bold text-white">Innara</div>
              <p className="mt-3 text-sm text-slate-400">Empowering women to thrive through hormone-smart nutrition.</p>
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
          <div className="mt-10 flex items-center justify-between flex-col sm:flex-row gap-4">
            <p className="text-xs text-slate-400">© {new Date().getFullYear()} Innara. All rights reserved.</p>
            <div className="flex items-center gap-3 text-slate-300">
              <span className="h-8 w-8 grid place-content-center rounded-full bg-slate-800">IG</span>
              <span className="h-8 w-8 grid place-content-center rounded-full bg-slate-800">FB</span>
              <span className="h-8 w-8 grid place-content-center rounded-full bg-slate-800">IN</span>
            </div>
          </div>
        </div>
      </footer>
    </div>
  );
}
