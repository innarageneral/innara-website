import React from "react";
import './styles.css';
import { useEffect } from "react";

function useActiveToc(ids) {
  useEffect(() => {
    const links = Array.from(document.querySelectorAll(".legal-toc a"));
    const map = new Map(ids.map(id => [id, document.getElementById(id)]));

    const io = new IntersectionObserver(
      (entries) => {
        const visible = entries
          .filter(e => e.isIntersecting)
          .sort((a, b) => a.boundingClientRect.top - b.boundingClientRect.top);
        if (!visible.length) return;

        const activeId = visible[0].target.id;
        links.forEach(a => a.classList.toggle("is-active", a.getAttribute("href") === `#${activeId}`));
      },
      { rootMargin: "-20% 0px -60% 0px", threshold: [0, 1] }
    );

    map.forEach(node => node && io.observe(node));
    return () => io.disconnect();
  }, [ids]);
}


const PrivacyPolicy = () => {
  useActiveToc([
    "info-we-collect","process-info","share-info","cookies","ai-products","social-logins",
    "retention","safety","minors","privacy-rights","dnt","regional-rights","health-disclaimer",
    "updates","contact","review-delete"
  ]);

  return (
    <div className="legal mx-auto w-full max-w-4xl px-4 sm:px-6 lg:px-8 py-12 sm:py-16 text-slate-600">
      <div className="legal-meta">
        <a href="/">Home</a> / <span>Privacy Policy</span>
      </div>
      <h1 className="text-3xl sm:text-4xl font-semibold text-slate-900">PRIVACY POLICY</h1>
      <p className="mt-2 text-sm text-slate-500">Last updated September 11, 2025</p>

      <div className="mt-6 space-y-6">
        <p>
          This Privacy Notice for <strong>INNARA AI NUTRITION LLP</strong> ("we", "us", or "our"),
          describes how and why we might access, collect, store, use, and/or share ("process")
          your personal information when you use our services ("Services"), including when you:
        </p>

        <ul className="list-disc pl-6 space-y-2">
          <li>Visit our website at <a href="https://mealistik.com" className="text-blue-600">https://mealistik.com</a> or any website of ours that links to this Privacy Notice;</li>
          <li>Download and use our mobile application (Mealistik), or any other application of ours that links to this Privacy Notice;</li>
          <li>Use Mealistik. Mealistik is a personalised meal planning application designed to support individuals in making healthier food choices that suit their lifestyle, health conditions, and preferences. The app provides customised meal plans that take into account factors such as dietary needs, activity levels, and health goals. Mealistik is intended to offer guidance, tools, and resources to make meal planning simpler and more convenient. It is not a substitute for medical advice, diagnosis, or treatment. Users are encouraged to consult qualified healthcare professionals before making any major dietary or lifestyle changes. The app may include features such as personalised meal suggestions and plans, recipe recommendations, options to adjust for dietary preferences, allergies, or dislikes, and basic educational content to support informed food choices. Mealistik is provided for general wellbeing and informational purposes only. While the app aims to provide accurate and helpful recommendations, results may vary depending on individual health, adherence, and other factors beyond the control of Mealistik;</li>
          <li>Engage with us in other related ways, including any sales, marketing, or events.</li>
        </ul>

        <p>
          Questions or concerns? Reading this Privacy Notice will help you understand your privacy rights and choices.
          We are responsible for making decisions about how your personal information is processed. If you do not agree with our
          policies and practices, please do not use our Services. If you still have any questions or concerns, please contact
          us at <a href="mailto:innara.general@gmail.com" className="text-blue-600">innara.general@gmail.com</a>.
        </p>

        <h2 className="text-2xl font-semibold text-slate-900 mt-6">SUMMARY OF KEY POINTS</h2>

        <p>
          This summary provides key points from our Privacy Notice, but you can find out more details about any of these topics
          by reading the full notice below.
        </p>

        <ul className="list-disc pl-6 space-y-2">
          <li>We may process personal information when you visit, use, or navigate our Services. The data we process depends on how you interact with the Services.</li>
          <li>We may process sensitive personal information (for example health-related data) when necessary with your consent or as permitted by law.</li>
          <li>We do not collect information from third parties.</li>
          <li>We process your information to provide and improve Services, for security, and to comply with law.</li>
          <li>We may share your information with certain categories of third parties (AI platforms, cloud providers, analytics providers, etc.).</li>
          <li>We maintain organisational and technical safeguards, but cannot guarantee 100% security.</li>
          <li>You may have rights to access, correct, delete, or withdraw consent for your data; procedures are provided below.</li>
        </ul>

        <h2 className="text-2xl font-semibold text-slate-900 mt-6">TABLE OF CONTENTS</h2>
        <nav className="legal-toc" aria-label="Table of contents">
          <ol className="list-decimal pl-6 space-y-1">
            <li><a href="#info-we-collect" className="hover:text-[var(--ml-primary)]">WHAT INFORMATION DO WE COLLECT?</a></li>
            <li><a href="#process-info" className="hover:text-[var(--ml-primary)]">HOW DO WE PROCESS YOUR INFORMATION?</a></li>
            <li><a href="#share-info" className="hover:text-[var(--ml-primary)]">WHEN AND WITH WHOM DO WE SHARE YOUR PERSONAL INFORMATION?</a></li>
            <li><a href="#cookies" className="hover:text-[var(--ml-primary)]">DO WE USE COOKIES AND OTHER TRACKING TECHNOLOGIES?</a></li>
            <li><a href="#ai-products" className="hover:text-[var(--ml-primary)]">DO WE OFFER ARTIFICIAL INTELLIGENCE-BASED PRODUCTS?</a></li>
            <li><a href="#social-logins" className="hover:text-[var(--ml-primary)]">HOW DO WE HANDLE YOUR SOCIAL LOGINS?</a></li>
            <li><a href="#retention" className="hover:text-[var(--ml-primary)]">HOW LONG DO WE KEEP YOUR INFORMATION?</a></li>
            <li><a href="#safety" className="hover:text-[var(--ml-primary)]">HOW DO WE KEEP YOUR INFORMATION SAFE?</a></li>
            <li><a href="#minors" className="hover:text-[var(--ml-primary)]">DO WE COLLECT INFORMATION FROM MINORS?</a></li>
            <li><a href="#privacy-rights" className="hover:text-[var(--ml-primary)]">WHAT ARE YOUR PRIVACY RIGHTS?</a></li>
            <li><a href="#dnt" className="hover:text-[var(--ml-primary)]">CONTROLS FOR DO-NOT-TRACK FEATURES</a></li>
            <li><a href="#regional-rights" className="hover:text-[var(--ml-primary)]">DO OTHER REGIONS HAVE SPECIFIC PRIVACY RIGHTS?</a></li>
            <li><a href="#health-disclaimer" className="hover:text-[var(--ml-primary)]">HEALTH DISCLAIMER</a></li>
            <li><a href="#updates" className="hover:text-[var(--ml-primary)]">DO WE MAKE UPDATES TO THIS NOTICE?</a></li>
            <li><a href="#contact" className="hover:text-[var(--ml-primary)]">HOW CAN YOU CONTACT US ABOUT THIS NOTICE?</a></li>
            <li><a href="#review-delete" className="hover:text-[var(--ml-primary)]">HOW CAN YOU REVIEW, UPDATE, OR DELETE THE DATA WE COLLECT FROM YOU?</a></li>
          </ol>
        </nav>

        <h3 id="info-we-collect" className="text-xl font-semibold text-slate-900 mt-6">1. WHAT INFORMATION DO WE COLLECT?</h3>
        <p>
          <strong>In Short:</strong> We collect the personal information you provide to us.
        </p>

        <p>
          We collect personal information that you voluntarily provide to us when you register on the Services,
          express an interest in obtaining information about us or our products and Services, participate in activities on
          the Services, or otherwise contact us.
        </p>

        <h4 className="text-lg font-semibold text-slate-900 mt-4">Personal Information Provided by You</h4>
        <p>
          The personal information that we collect depends on the context of your interactions with us and the Services,
          the choices you make, and the products and features you use. The personal information we collect may include:
        </p>

        <ul className="list-disc pl-6 space-y-1">
          <li>Names</li>
          <li>Phone numbers</li>
          <li>Email addresses</li>
          <li>Usernames</li>
          <li>Passwords</li>
          <li>Contact preferences</li>
          <li>Billing addresses</li>
          <li>Contact or authentication data</li>
          <li>Debit/credit card numbers (payment processing handled by our payment processors)</li>
        </ul>

        <h4 className="text-lg font-semibold text-slate-900 mt-4">Sensitive Information</h4>
        <p>
          When necessary, with your consent or as otherwise permitted by applicable law, we process categories of sensitive information,
          including health data required for personalised meal plans.
        </p>

        <h4 className="text-lg font-semibold text-slate-900 mt-4">Payment Data</h4>
        <p>
          We may collect data necessary to process your payment if you choose to make purchases, such as your payment instrument number and security code.
          All payment data is handled and stored by our third-party payment processors; we do not store full payment card details on our systems.
        </p>

        <h4 className="text-lg font-semibold text-slate-900 mt-4">Social Media Login Data</h4>
        <p>
          If you choose to register using a social media account (e.g., Facebook, X), we may collect profile information from the provider, such as name, email, friends list and profile picture.
        </p>

        <h4 className="text-lg font-semibold text-slate-900 mt-4">Application Data</h4>
        <p>
          If you use our application(s), we may collect information when you provide permissions on your device such as access to storage, calendar, health data, and other features.
        </p>

        <h3 id="process-info" className="text-xl font-semibold text-slate-900 mt-6">2. HOW DO WE PROCESS YOUR INFORMATION?</h3>
        <p>
          We process your information for purposes based on our legitimate business interests, to enter into or perform a contract with you, with your consent, and/or to comply with legal obligations.
        </p>

        <ul className="list-disc pl-6 space-y-2">
          <li>To provide, maintain, and improve the Services and features;</li>
          <li>To process transactions and send related information, including purchase confirmations and invoices;</li>
          <li>To respond to user requests and provide support;</li>
          <li>To detect, prevent, and address technical issues and security incidents;</li>
          <li>To communicate with you about promotions, updates, and changes (subject to your communication preferences);</li>
          <li>To evaluate and improve our products, marketing, and user experience;</li>
          <li>To comply with legal obligations and enforce our rights.</li>
        </ul>

        <h3 id="share-info" className="text-xl font-semibold text-slate-900 mt-6">3. WHEN AND WITH WHOM DO WE SHARE YOUR PERSONAL INFORMATION?</h3>
        <p><strong>In Short:</strong> We may share information in specific situations and with certain categories of third parties.</p>

        <p>
          We may share your data with third-party vendors, service providers, contractors, or agents who perform services for us or on our behalf and require access to such information to perform their work. We have contracts in place with these third parties which are designed to help safeguard your personal information.
        </p>

        <h4 className="text-lg font-semibold text-slate-900 mt-4">Categories of Third Parties</h4>
        <ul className="list-disc pl-6 space-y-1">
          <li>AI Platforms (e.g., AI service providers used to support features)</li>
          <li>Cloud Computing Services</li>
          <li>Data Analytics Services</li>
          <li>Data Storage Service Providers</li>
          <li>User Account Registration & Authentication Services</li>
          <li>Website Hosting Service Providers</li>
        </ul>

        <h4 className="text-lg font-semibold text-slate-900 mt-4">Other Situations We May Share Information</h4>
        <ul className="list-disc pl-6 space-y-1">
          <li>Business transfers: in connection with merger, sale of company assets, financing, or acquisition;</li>
          <li>Affiliates: we may share information with our affiliates who must honor this Privacy Notice;</li>
          <li>Business partners: to offer products, services, or promotions;</li>
          <li>To comply with legal obligations or respond to legal process;</li>
          <li>To protect our rights, property, or safety, or those of others.</li>
        </ul>

        <h3 if="cookies" className="text-xl font-semibold text-slate-900 mt-6">4. DO WE USE COOKIES AND OTHER TRACKING TECHNOLOGIES?</h3>
        <p><strong>In Short:</strong> Yes — we and our third parties may use cookies and similar tracking technologies.</p>

        <p>
          We may use cookies, web beacons, pixels, and other tracking technologies to gather information about your interactions with our Services.
          These technologies help with service functionality, security, saving your preferences, and analytics. Third parties may also set cookies for analytics and advertising purposes.
        </p>

        <p>
          Specific information about these technologies and how to refuse certain cookies is set out in our Cookie Notice.
        </p>

        <h3 id="ai-products" className="text-xl font-semibold text-slate-900 mt-6">5. DO WE OFFER ARTIFICIAL INTELLIGENCE-BASED PRODUCTS?</h3>
        <p><strong>In Short:</strong> Yes — we offer features powered by AI/ML as part of the Services.</p>

        <p>
          Our AI Products are provided via third-party AI Service Providers (examples named in the notice included OpenAI and Perplexity).
          When you use AI features, your inputs and outputs may be shared with these providers to enable functionality. You must not use AI Products in a way that violates provider terms.
        </p>

        <p>
          We handle personal information processed with AI in line with this Privacy Notice and agreements with third parties to maintain security and safeguard your data.
        </p>

        <h3 id="social-logins" className="text-xl font-semibold text-slate-900 mt-6">6. HOW DO WE HANDLE YOUR SOCIAL LOGINS?</h3>
        <p><strong>In Short:</strong> If you register or log in via social media, we may receive certain profile details from the provider.</p>

        <p>
          The profile information collected depends on the provider but may include name, email, friends list, and profile picture. We use such information to create and manage your account and to personalise your experience.
        </p>

        <h3 id="retention" className="text-xl font-semibold text-slate-900 mt-6">7. HOW LONG DO WE KEEP YOUR INFORMATION?</h3>
        <p>
          We retain your personal information for as long as necessary to fulfill the purposes outlined in this Privacy Notice,
          unless otherwise required by law. Retention periods vary by the type of information and the legal basis for processing.
        </p>

        <h3 id="safety" className="text-xl font-semibold text-slate-900 mt-6">8. HOW DO WE KEEP YOUR INFORMATION SAFE?</h3>
        <p>
          We implement organisational and technical measures designed to protect your personal information. However, no transmission or storage mechanism is 100% secure; we cannot guarantee absolute security.
        </p>

        <h3 id="minors" className="text-xl font-semibold text-slate-900 mt-6">9. DO WE COLLECT INFORMATION FROM MINORS?</h3>
        <p><strong>In Short:</strong> We do not knowingly collect data from or market to children under 18 years of age.</p>

        <p>
          If we learn that personal information from users under 18 has been collected, we will deactivate the account and take reasonable measures to delete such data. If you become aware of data we may have collected from children under 18, contact us at <a href="mailto:innara.general@gmail.com" className="text-blue-600">innara.general@gmail.com</a>.
        </p>

        <h3 id="privacy-rights" className="text-xl font-semibold text-slate-900 mt-6">10. WHAT ARE YOUR PRIVACY RIGHTS?</h3>
        <p>
          Depending on where you live, you may have rights to access, correct, or delete your personal information, or to withdraw consent. If we rely on consent to process data, you may withdraw consent at any time (which won’t affect processing before withdrawal).
        </p>

        <p>
          To exercise your rights, submit a data subject access request as described below or contact us using the details in the "How can you contact us?" section.
        </p>

        <h3 id="dnt" className="text-xl font-semibold text-slate-900 mt-6">11. CONTROLS FOR DO-NOT-TRACK FEATURES</h3>
        <p>
          Most browsers include a Do-Not-Track (DNT) feature. At present, no uniform standard for DNT signals has been finalised, and we do not currently respond to DNT signals. If a standard is adopted and we must follow it, we will update this Notice.
        </p>

        <h3 id="regional-rights" className="text-xl font-semibold text-slate-900 mt-6">12. DO OTHER REGIONS HAVE SPECIFIC PRIVACY RIGHTS?</h3>
        <p><strong>In Short:</strong> You may have additional rights depending on your country.</p>

        <h4 className="text-lg font-semibold text-slate-900 mt-4">Australia</h4>
        <p>
          We collect and process personal information in line with Australia's Privacy Act 1988. This Privacy Notice satisfies the notice requirements under that Act. If you believe we are unlawfully processing your information, you have the right to complain to the Office of the Australian Information Commissioner.
        </p>

        <p>
          In general, if you do not wish to provide personal information necessary to fulfil a purpose, it may affect our ability to provide Services. You may request access, correction, or deletion in accordance with applicable law.
        </p>

        <h3 id="health-disclaimer" className="text-xl font-semibold text-slate-900 mt-6">13. HEALTH DISCLAIMER</h3>
        <p>
          Mealistik provides general nutritional and meal planning information for educational and wellbeing purposes only. It is not medical advice, diagnosis or treatment. Consult a qualified healthcare professional before making significant dietary or lifestyle changes.
        </p>

        <h3 id="updates" className="text-xl font-semibold text-slate-900 mt-6">14. DO WE MAKE UPDATES TO THIS NOTICE?</h3>
        <p>
          Yes, we may update this Privacy Notice from time to time. We will indicate changes by updating the "Last updated" date. We may notify you by posting notice on the Services or by direct notification in material cases. Please review this Notice regularly.
        </p>

        <h3 id="contact" className="text-xl font-semibold text-slate-900 mt-6">15. HOW CAN YOU CONTACT US ABOUT THIS NOTICE?</h3>
        <p>
          If you have questions or comments about this Notice, email us at <a href="mailto:innara.general@gmail.com" className="text-blue-600">innara.general@gmail.com</a> or contact us by post at:
        </p>

        <address className="not-italic mt-2">
          INNARA AI NUTRITION LLP<br />
          164/7 Pethampalayam Road, Thiruvenkadam Palayam Puthur, Perundurai<br />
          Perundurai, Tamil Nadu 638052<br />
          India
        </address>

        <h3 id="review-delete" className="text-xl font-semibold text-slate-900 mt-6">16. HOW CAN YOU REVIEW, UPDATE, OR DELETE THE DATA WE COLLECT FROM YOU?</h3>
        <p>
          Subject to applicable laws, you may request access to the personal information we collect, ask for corrections, request deletion, or withdraw consent. To do so, submit a data subject access request or contact us using the details above. We will respond in accordance with applicable law.
        </p>
      </div>
    </div>
  );
};

export default PrivacyPolicy;
