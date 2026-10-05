/* ES es el idioma base (vive en el HTML: SEO y funciona sin JS). Aquí solo está EN. */
(function () {
  var EN = {
    "meta.title": "TestingVibe — Bank-grade QA for apps built with AI",
    "meta.desc": "QA review for apps built with Lovable, Bolt or Cursor + Supabase: what works, what fails and how to fix it. Bank-grade rigor, designed for Latin America.",
    "meta.ogdesc": "Launch with confidence. A clear report: what works, what fails and how to fix it.",
    "a11y.skip": "Skip to content",
    "nav.label": "Main", "nav.problem": "The problem", "nav.how": "How it works", "nav.pricing": "Packages", "nav.receive": "What you get", "nav.faq": "FAQ", "nav.blog": "Blog",
    "lang.label": "Language",

    "hero.eyebrow": "For apps built with Lovable, Bolt, Cursor + Supabase",
    "hero.h1a": "Bank-grade QA for apps built with AI.",
    "hero.h1b": "Launch with confidence.",
    "hero.lead": "I review your app before your customers use it and deliver a clear report: what works, what fails and how to fix it, with banking-grade rigor and designed for Latin America.",
    "hero.cta1": "Request your review",
    "hero.cta2": "Book 30 minutes",
    "hero.pointsLabel": "What's included",
    "hero.p1": "Sign-up, login and payment tested end to end",
    "hero.p2": "Exposed keys and Supabase RLS rules reviewed",
    "hero.p3": "Findings by severity, with prompts to fix them",

    "problem.h2": "Building fast with AI doesn't mean building safe",
    "problem.sub": "This is what recent studies and press report. These aren't my numbers; each one links to its source.",
    "problem.s1": "of 1,072 apps built with AI had at least one security flaw, according to a Symbiotic Security scan (Jun 2026).",
    "problem.s2": "of reachable Supabase-backed apps in a Reeve scan (2,096 of 3,680) allowed unauthenticated table reads, according to Vibe-Eval's monthly report (Aug 2026).",
    "problem.s3": "databases hosted on Supabase with some degree of personal data exposed, according to UpGuard as reported by TechCrunch (Sep 25, 2026).",
    "problem.src": "View source",
    "problem.note": "Each study uses a different method and sample. My job is to review your app before it becomes part of a statistic.",

    "how.h2": "How it works",
    "how.t1": "You pay", "how.d1": "Pick your package and pay through a secure Stripe link. No accounts or sign-ups.",
    "how.t2": "Fill in a short form", "how.d2": "Your app URL, test access, critical flows and your confirmation of permission.",
    "how.t3": "Get your report", "how.d3": "With prioritized findings, steps to reproduce them and how to fix them, within your package's timeframe.",

    "pricing.h2": "Packages",
    "pricing.sub": "Prices in US dollars (USD); the peso equivalent is approximate (≈18.16 MXN per USD).",
    "pricing.notice": "<strong>First 3 clients:</strong> $49 (Express Review) and $249 (Complete Audit) with a launch code.",
    "pricing.free": "Free",
    "pricing.launch": "First 3 clients: $49 with a launch code.",
    "pricing.launch2": "First 3 clients: $249 with a launch code.",
    "pricing.ch.badge": "No cost", "pricing.ch.name": "Quick check", "pricing.ch.cta": "Request a check",
    "pricing.ch.l1": "Automated review of what is visible from outside your app: HTTPS, security headers, keys exposed in the browser, console errors, broken links and mobile performance.",
    "pricing.ch.l2": "One-page summary within 24 business hours.",
    "pricing.ch.l3": "Does not include logged-in testing.",
    "pricing.fl.badge": "One flow", "pricing.fl.name": "Single-flow review",
    "pricing.fl.unit": "USD · ≈ $1,070 MXN",
    "pricing.fl.l1": "One critical flow (sign-up, login or payment) tested in depth within 24 to 48 hours.",
    "pricing.fl.l2": "Short PDF with findings, evidence and fix prompts.",
    "pricing.fl.l3": "Does not include the full score, a call or a re-test.",
    "pricing.fl.cta": "Order review — $59",
    "pricing.ex.badge": "Start here", "pricing.ex.name": "Express Review",
    "pricing.ex.unit": "USD · ≈ $1,800 MXN · 48 h",
    "pricing.ex.l1": "Critical flows: sign-up, login and payment",
    "pricing.ex.l2": "Exposed keys and Supabase RLS review",
    "pricing.ex.l3": "Basic accessibility",
    "pricing.ex.l4": "Findings prioritized by severity",
    "pricing.ex.guar": "<strong>Guarantee:</strong> if I don't find at least 5 useful findings, you don't pay.",
    "pricing.ex.cta": "Order Express Review — $99",
    "pricing.au.badge": "Full coverage", "pricing.au.name": "Complete Audit",
    "pricing.au.unit": "USD · ≈ $8,150 MXN · 5 business days",
    "pricing.au.l1": "Everything in the Express Review",
    "pricing.au.l2": "Functional testing of the whole app, mobile and desktop",
    "pricing.au.l3": "Performance and ES/EN copy",
    "pricing.au.l4": "Launch and rollback plan",
    "pricing.au.l5": "Playwright test package",
    "pricing.au.l6": "30-min call and a re-test within 7 days",
    "pricing.au.cta": "Order Audit — $449",
    "pricing.me.badge": "Ongoing", "pricing.me.name": "Monthly support",
    "pricing.me.unit": "USD / month · ≈ $6,340 MXN",
    "pricing.me.l1": "Review of every release before you publish (up to 4 per month)",
    "pricing.me.l2": "Regression testing",
    "pricing.me.l3": "A report per release",
    "pricing.me.cta": "Subscribe — $349/mo",
    "pricing.ck.badge": "Do it yourself", "pricing.ck.name": "Pre-launch checklist",
    "pricing.ck.unit": "USD · ≈ $350 MXN",
    "pricing.ck.cta": "Buy checklist — $19",
    "pricing.sample": "Download sample report (PDF)",

    "testi.h2": "What people who already launched say",

    "rec.h2": "What you get",
    "rec.sub": "A report designed to help you decide and act, not to impress.",
    "rec.verdict.h": "Launch verdict",
    "rec.verdict.p": "A direct answer: <strong>Yes</strong>, <strong>No</strong> or <strong>With conditions</strong>.",
    "rec.score.h": "A 0–100 score per area",
    "rec.a1": "Functionality", "rec.a2": "Basic security", "rec.a3": "Accessibility", "rec.a4": "Performance", "rec.a5": "Privacy", "rec.a6": "Payments",
    "rec.find.h": "Findings by severity",
    "rec.find.p": "Each finding includes steps to reproduce it and a fix prompt you can paste into your AI tool.",
    "rec.id.h": "Verifiable report ID",
    "rec.id.p": "Every report carries an ID anyone can check on",
    "rec.id.link": "the verification page",
    "rec.diff.h": "What sets it apart",
    "rec.la.h": "Review for Latin America",
    "rec.la.p": "Local payments, local data (RFC, CURP, CPF, RUT, DNI) and a country-specific privacy notice, with the most depth on Mexico. Not legal advice.",
    "rec.plan.h": "Launch and rollback plan + Playwright tests",
    "rec.plan.p": "Included in the Complete Audit: how to release and how to go back if something goes wrong, plus a set of automated tests your team can keep running.",
    "rec.seal.h": "Verifiable seal",
    "rec.seal.p": "[COMPLETAR: seal description]",
    "rec.fw.h": "Reference frameworks",
    "rec.fw.p": "My review is aligned with these frameworks. It is not a formal compliance assessment.",
    "rec.fw.c1": "Area", "rec.fw.c2": "Reference",
    "rec.fw.r1a": "Software quality",
    "rec.fw.r2a": "Security", "rec.fw.r2b": "OWASP Top 10:2025 and ASVS 5.0.0",
    "rec.fw.r3a": "Accessibility",
    "rec.fw.r4a": "Performance",
    "rec.fw.r5a": "Privacy (Mexico)", "rec.fw.r5b": "LFPDPPP (not legal advice)",
    "rec.fw.r6a": "Payments", "rec.fw.r6b": "Hosted checkout (not a PCI assessment)",

    "about.h2": "Who's behind this",
    "about.alt": "Claudia Acosta",
    "about.p1": "I'm Claudia Acosta, a QA engineer. I've spent years testing software where a bug costs real money, and now I bring that same rigor to apps built with AI.",
    "about.f1": "<strong>14+ years</strong> in QA in banking and fintech",
    "about.f2": "<strong>25+ releases</strong> with no major rollbacks",
    "about.link": "Learn more at dragonflaiqa.com →",

    "faq.h2": "Frequently asked questions",
    "faq.q1": "Do I need to give you permission to test my app?",
    "faq.a1": "Yes. I only review apps with the owner's written authorization. In the form you confirm you have it, and if the app belongs to someone else (for example, your client), I'll ask for their written approval.",
    "faq.q2": "What access do you need?",
    "faq.a2": "Your app's URL and test accounts (ideally one per role). I don't need your code or real production passwords: use test accounts, never real customer data.",
    "faq.q3": "What does it NOT cover?",
    "faq.a3": "It is not a pentest or a formal security or compliance opinion, and it doesn't guarantee the absence of flaws. It's a QA review focused on what's most common in AI-built apps; it reduces risk, it doesn't eliminate it. It is not legal advice either.",
    "faq.q4": "What language is the report in?",
    "faq.a4": "Spanish or English, your choice. You pick it in the form.",

    "intake.h2": "Intake form",
    "intake.sub": "After paying, tell me about your app: URL, test access, critical flows, stack and confirmation that you have permission. It takes about 5 minutes.",
    "intake.cta": "Open the form",

    "verify.title": "Verify a report — TestingVibe",
    "verify.h1": "Verify a report",
    "verify.p": "Enter the ID shown on your report to confirm that it was issued by TestingVibe.",
    "verify.label": "Report ID",
    "verify.btn": "Verify",
    "verify.note": "Only the ID, date, package and verdict are shown. Report contents are confidential.",

    "foot.by": "by Claudia Acosta",
    "foot.terms": "Terms",
    "foot.verify": "Verify report",

    "terms.title": "Terms of service — TestingVibe",
    "terms.h1": "Terms of service",
    "terms.draft": "Draft: legal text pending; requires legal review.",
    "terms.back": "← Back to home",
    "terms.scope": "Scope", "terms.scopeHint": "What the services include and exclude, and that this is not a pentest.",
    "terms.permission": "Permission", "terms.permissionHint": "Testing happens only with the app owner's written authorization.",
    "terms.liability": "Limitation of liability", "terms.liabilityHint": "No guarantee of the absence of flaws; liability cap.",
    "terms.confidentiality": "Confidentiality", "terms.confidentialityHint": "Handling of access credentials, data and findings.",
    "terms.refund": "Refunds", "terms.refundHint": "Express Review guarantee (fewer than 5 useful findings) and other cases.",
    "terms.todo": "[COMPLETAR: legal text]",

    "blog.back": "← All posts", "blog.h1": "Blog", "blog.empty": "No posts yet."
  };

  var KEY = "tv-lang";
  var current = "es";
  function dsKey(attr) { return ("es" + (attr ? "-" + attr : "")).replace(/-(\w)/g, function (_, c) { return c.toUpperCase(); }); }
  function saveOrig(el, attr) {
    var k = dsKey(attr);
    if (el.dataset[k] === undefined) el.dataset[k] = attr ? el.getAttribute(attr) : el.innerHTML;
  }

  function apply(lang) {
    current = lang;
    document.documentElement.lang = lang;
    var i, els = document.querySelectorAll("[data-i18n]");
    for (i = 0; i < els.length; i++) {
      var el = els[i], key = el.getAttribute("data-i18n");
      saveOrig(el);
      var val = lang === "en" ? EN[key] : el.dataset[dsKey()];
      if (val !== undefined) { if (el.tagName === "TITLE") document.title = val; else el.innerHTML = val; }
    }
    var ae = document.querySelectorAll("[data-i18n-attr]");
    for (i = 0; i < ae.length; i++) {
      var node = ae[i], pairs = node.getAttribute("data-i18n-attr").split(",");
      for (var j = 0; j < pairs.length; j++) {
        var p = pairs[j].split(":"), attr = p[0].trim(), k2 = p[1].trim();
        saveOrig(node, attr);
        var v2 = lang === "en" ? EN[k2] : node.dataset[dsKey(attr)];
        if (v2 !== undefined) node.setAttribute(attr, v2);
      }
    }
    var btns = document.querySelectorAll(".lang button");
    for (i = 0; i < btns.length; i++) btns[i].setAttribute("aria-pressed", String(btns[i].dataset.lang === lang));
    try { localStorage.setItem(KEY, lang); } catch (e) {}
    document.dispatchEvent(new CustomEvent("tv-lang", { detail: lang }));
  }

  function initial() {
    var q = /[?&]lang=(es|en)/.exec(location.search);
    if (q) return q[1];
    try { var s = localStorage.getItem(KEY); if (s === "es" || s === "en") return s; } catch (e) {}
    return "es";
  }

  window.TV_I18N = {
    lang: function () { return current; },
    /* Devuelve la cadena en el idioma activo: EN del diccionario o el texto ES recibido. */
    msg: function (key, es) { return current === "en" && EN[key] ? EN[key] : es; }
  };

  document.addEventListener("click", function (e) {
    var b = e.target.closest && e.target.closest(".lang button");
    if (b) apply(b.dataset.lang);
  });
  var start = initial();
  if (start !== "es") apply(start);
})();
