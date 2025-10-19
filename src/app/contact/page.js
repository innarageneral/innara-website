"use client";

import Link from "next/link";

export default function ContactPage() {
  const websiteHref = "https://mealistik.com";

  return (
    <main style={{ minHeight: '100vh', background: '#ffffff'}}>
      <style>{`
        :root { --primary:#9999cc; --accent:#c1c1f9; --deep:#3e3e7a; --white:#ffffff; --text-dark:#1d1a31; }
        * { box-sizing: border-box; }
        .wrap { display:grid; place-items:center; padding:24px; }
        .card { width:100%; max-width:480px; background:var(--white); border-radius:16px; padding:24px; box-shadow:0 10px 30px rgba(0,0,0,0.25); position:relative; }
        .logo-bar { display:flex; align-items:center; gap:8px; }
        .back-arrow { cursor:pointer; font-size:20px; color:var(--deep); border:none; background:none; line-height:1; }
        .back-arrow:focus { outline:3px solid var(--deep); outline-offset:2px; }
        .logo { font-weight:800; font-size:20px; color:var(--deep); }
        h1 { font-size:24px; margin:8px; color:var(--text-dark); }
        p { margin: 8px;}
        .sub { font-size:16px; color:#333; margin-bottom:16px; }
        .btns { display:grid; gap:12px; margin:18px 0 8px; }
        button.primary, a.primary { background:var(--primary); color:var(--text-dark); border:0; border-radius:12px; padding:14px 16px; font-size:16px; font-weight:700; text-align:center; text-decoration:none; cursor:pointer; width:100%; }
        button.primary:hover, a.primary:hover { background:var(--accent); }
        .contact-btn { background:var(--deep); color:var(--white); border:0; border-radius:8px; padding:10px 14px; font-size:14px; margin-top:20px; cursor:pointer; font-weight:600; width:100%; }
        .contact-card { margin-top:16px; background:#f8f8ff; border-radius:12px; padding:20px; text-align:center; color:#222; }
        .contact-card a { color:var(--deep); text-decoration:none; }
        .contact-card a:hover { text-decoration:underline; }
      `}</style>

      <div className="wrap">
        <section className="card" aria-labelledby="welcome-title">
          <div className="logo-bar">
            <Link href="/" aria-label="Back" className="back-arrow">←</Link>
            <div className="logo" aria-label="Mealistik logo">Mealistik</div>
          </div>

          <h1 id="welcome-title"><b>Welcome to Mealistik</b></h1>
          <p className="sub">We’d love to hear from you.</p>

          <div className="contact-card">
            <p><strong>Founder</strong></p>
            <p>Sowmiya Yoganathan</p>
            <p>
              LinkedIn:{" "}
              <a
                href="https://www.linkedin.com/in/sowmiya-yoganathan-668430136/"
                target="_blank"
                rel="noopener noreferrer"
              > 
                <b>
                  sowmiya-yoganathan
                </b>
              </a>
            </p>
            <p>
              Contact email:{" "}
              <a href="mailto:hello@innara.com"><b>hello@innara.com</b></a>
            </p>
          </div>

          <div className="contact-card">
            <p><strong>Founder</strong></p>
            <p>Sneha Sivakumar</p>
            <p>
              LinkedIn:{" "}
              <a
                href="https://www.linkedin.com/in/snehas1632"
                target="_blank"
                rel="noopener noreferrer"
              > 
                <b>
                  sneha-sivakumar
                </b>
              </a>
            </p>
            <p>
              Contact number: {" "}
              <a href="tel:+919876543210"><b>+91 9876543210</b></a>
            </p>
          </div>
        </section>
      </div>
    </main>
  );
}
