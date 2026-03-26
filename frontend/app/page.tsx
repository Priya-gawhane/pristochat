import Link from "next/link";

const particles = Array.from({ length: 18 }, (_, i) => ({
  id: i,
  emoji: ["🌸", "✨", "💖", "🌙", "⭐", "🦋", "💫", "🌺"][i % 8],
  left: `${(i * 5.5 + 2)}%`,
  delay: `${(i * 0.35) % 6}s`,
  duration: `${6 + (i % 5)}s`,
  size: `${12 + (i % 4) * 4}px`,
}));

const features = [
  { icon: "🧠", title: "Hyper-Personalized AI", desc: "PristoChat remembers your preferences, adapts to your learning style, and grows smarter with every conversation. It's not just AI — it's YOUR AI.", color: "#fce7f3" },
  { icon: "💻", title: "Coding Companion", desc: "Stuck on a bug at 2AM? PristoChat explains errors, writes boilerplate, reviews your code, and teaches concepts in a way that actually clicks.", color: "#ede9fe" },
  { icon: "📚", title: "Aesthetic Study Sessions", desc: "Turn boring textbooks into cute, digestible summaries. Get quizzed, get explained, get smarter — without losing the vibe.", color: "#dbeafe" },
  { icon: "🎨", title: "Creative Brainstorms", desc: "Stuck on ideas? PristoChat helps you brainstorm stories, captions, project concepts, and creative sparks whenever inspiration goes quiet.", color: "#d1fae5" },
  { icon: "🌙", title: "Always Online", desc: "No office hours. No waiting. PristoChat is there at 3AM when you have a question, a crisis, or just need someone to talk to.", color: "#fef9c3" },
  { icon: "💬", title: "Talks Like a Human", desc: "No stiff robotic answers. PristoChat chats with warmth, personality, and just the right amount of emoji. It genuinely feels like a bestie.", color: "#fce7f3" },
];

const steps = [
  { num: "1", icon: "🌸", title: "Create Your Account", desc: "Sign up for free in seconds. No credit card needed, no hoops to jump through." },
  { num: "2", icon: "✨", title: "Tell Us About You", desc: "Share your interests, goals, and vibe. PristoChat customizes itself just for you." },
  { num: "3", icon: "💬", title: "Start Chatting", desc: "Ask anything — code, studies, ideas, or just chat. PristoChat is ready and waiting." },
  { num: "4", icon: "💖", title: "Level Up Together", desc: "The more you chat, the smarter and more personalized PristoChat becomes. It grows with you." },
];

const testimonials = [
  { name: "Aika S.", handle: "@aikacodes", avatar: "🐱", text: "I used PristoChat to prep for my DSA interviews and honestly? I passed because of it. The explanations are so clear and it never made me feel dumb 💖", tag: "Student Developer" },
  { name: "Riya M.", handle: "@riyavibes", avatar: "🌷", text: "I use this every single day — for journaling ideas, debugging React, and just talking when I'm stressed. It actually LISTENS. Obsessed fr.", tag: "Design Student" },
  { name: "Zara K.", handle: "@zarabuilds", avatar: "🦋", text: "Finally an AI that doesn't feel like filling out a government form. PristoChat is warm, funny, and genuinely helpful. 10/10 no notes.", tag: "Indie Hacker" },
];

const faqs = [
  { q: "Is PristoChat free to use?", a: "Yes! PristoChat has a generous free tier so you can start chatting right away. Pro plans unlock unlimited history, faster responses, and exclusive features." },
  { q: "How is PristoChat different from other AI chatbots?", a: "PristoChat is built around YOU — it learns your preferences, matches your vibe, and gives answers that feel personal, not generic. Plus, it's way cuter." },
  { q: "Can I use PristoChat for coding help?", a: "Absolutely! It's one of our most loved features. Paste your code, describe your error, and PristoChat will walk you through a fix like a patient senior dev." },
  { q: "Is my data safe?", a: "Your privacy matters to us. We don't sell your data, and conversations are encrypted. You're in control of your chat history at all times." },
];

const stats = [
  { value: "10K+", label: "Happy Users", icon: "👥" },
  { value: "99.9%", label: "Uptime", icon: "⚡" },
  { value: "50ms", label: "Avg Response", icon: "🚀" },
  { value: "∞", label: "Topics Covered", icon: "🌸" },
];

export default function Home() {
  return (
    <div style={{ minHeight: "100vh", fontFamily: "'Nunito', sans-serif", background: "#fdf4ff", overflowX: "hidden" }}>
      <style>{`
        @import url('https://fonts.googleapis.com/css2?family=Nunito:wght@400;600;700;800;900&family=Pacifico&display=swap');
        *, *::before, *::after { box-sizing: border-box; }

        .grad-bg {
          background: linear-gradient(135deg, #fce7f3 0%, #ede9fe 40%, #dbeafe 100%);
          background-size: 300% 300%;
          animation: gradShift 9s ease infinite;
        }
        @keyframes gradShift { 0%,100%{background-position:0% 50%;} 50%{background-position:100% 50%;} }

        .particle { position:fixed; pointer-events:none; user-select:none; z-index:1; animation:floatUp linear infinite; opacity:0; }
        @keyframes floatUp {
          0%   { transform:translateY(105vh) rotate(0deg); opacity:0; }
          8%   { opacity:0.7; }
          92%  { opacity:0.5; }
          100% { transform:translateY(-8vh) rotate(360deg); opacity:0; }
        }

        .blob { position:absolute; border-radius:50%; filter:blur(72px); opacity:0.38; pointer-events:none; }

        /* NAVBAR */
        .navbar {
          position:sticky; top:0; z-index:100;
          background:rgba(255,255,255,0.72); backdrop-filter:blur(24px);
          border-bottom:1.5px solid rgba(236,72,153,0.12);
          padding:0.85rem 4rem;
          display:flex; align-items:center; justify-content:space-between;
          animation:slideDown 0.6s cubic-bezier(0.22,1,0.36,1) both;
        }
        @keyframes slideDown { from{opacity:0;transform:translateY(-32px);} to{opacity:1;transform:translateY(0);} }
        .nav-logo { font-family:'Pacifico',cursive; font-size:1.4rem; color:#ec4899; text-decoration:none; display:flex; align-items:center; gap:0.5rem; }
        .nav-link { color:#7c3aed; font-weight:700; font-size:0.88rem; text-decoration:none; padding:0.35rem 0.85rem; border-radius:999px; transition:background 0.2s; }
        .nav-link:hover { background:rgba(236,72,153,0.1); }
        .nav-cta { background:linear-gradient(135deg,#f472b6,#ec4899); color:white; font-weight:800; font-size:0.88rem; text-decoration:none; padding:0.5rem 1.3rem; border-radius:999px; box-shadow:0 4px 14px rgba(236,72,153,0.35); transition:transform 0.2s,box-shadow 0.2s; }
        .nav-cta:hover { transform:translateY(-2px); box-shadow:0 6px 20px rgba(236,72,153,0.5); }

        /* BUTTONS */
        .btn-main {
          display:inline-flex; align-items:center; gap:0.5rem;
          padding:1rem 2.2rem; border-radius:18px;
          background:linear-gradient(135deg,#f472b6,#ec4899,#a855f7);
          background-size:200% 200%; animation:gradShift 4s ease infinite;
          color:white; font-weight:800; font-size:1rem; text-decoration:none; font-family:'Nunito',sans-serif;
          box-shadow:0 6px 28px rgba(236,72,153,0.42); transition:transform 0.2s,box-shadow 0.2s;
          position:relative; overflow:hidden;
        }
        .btn-main::after { content:''; position:absolute; top:-50%; left:-60%; width:35%; height:200%; background:rgba(255,255,255,0.22); transform:skewX(-20deg); animation:shimmer 3.5s infinite; }
        @keyframes shimmer { 0%{left:-60%;} 100%{left:130%;} }
        .btn-main:hover { transform:translateY(-3px) scale(1.03); box-shadow:0 10px 36px rgba(236,72,153,0.55); }

        .btn-outline {
          display:inline-flex; align-items:center; gap:0.5rem;
          padding:0.95rem 2rem; border-radius:18px; border:2px solid rgba(236,72,153,0.4);
          background:rgba(255,255,255,0.55); color:#ec4899; font-weight:800; font-size:1rem;
          text-decoration:none; font-family:'Nunito',sans-serif; transition:all 0.2s;
        }
        .btn-outline:hover { background:rgba(253,242,248,0.95); border-color:#ec4899; transform:translateY(-3px); box-shadow:0 8px 24px rgba(236,72,153,0.2); }

        /* GLASS */
        .glass { background:rgba(255,255,255,0.62); backdrop-filter:blur(18px); border:1.5px solid rgba(255,255,255,0.9); box-shadow:0 8px 32px rgba(236,72,153,0.09),0 2px 8px rgba(0,0,0,0.04); }

        /* HERO */
        .hero { position:relative; overflow:hidden; min-height:92vh; display:flex; align-items:center; padding:5rem 5rem 4rem; }
        .hero-grid { display:grid; grid-template-columns:1fr 1fr; gap:4rem; align-items:center; position:relative; z-index:2; width:100%; }

        .hero-badge { display:inline-flex; align-items:center; gap:0.4rem; background:rgba(255,255,255,0.78); border:1.5px solid rgba(255,255,255,0.95); box-shadow:0 2px 14px rgba(236,72,153,0.12); border-radius:999px; padding:0.35rem 1rem; font-size:0.78rem; font-weight:800; color:#ec4899; margin-bottom:1.3rem; }
        .dot { width:7px; height:7px; border-radius:50%; background:#22c55e; animation:blink 1.2s infinite; display:inline-block; }
        @keyframes blink { 0%,100%{opacity:1;} 50%{opacity:0.15;} }

        .hero-title { font-family:'Pacifico',cursive; font-size:clamp(2.8rem,5vw,4.6rem); color:#ec4899; line-height:1.08; margin-bottom:0.5rem; text-shadow:0 0 32px rgba(236,72,153,0.28),0 0 64px rgba(236,72,153,0.1); animation:heroIn 0.8s cubic-bezier(0.22,1,0.36,1) 0.15s both; }
        .hero-sub { font-size:1.25rem; font-weight:800; color:#7c3aed; margin-bottom:1rem; animation:heroIn 0.8s cubic-bezier(0.22,1,0.36,1) 0.25s both; }
        .hero-desc { font-size:1rem; color:#4b5563; line-height:1.78; margin-bottom:1.8rem; animation:heroIn 0.8s cubic-bezier(0.22,1,0.36,1) 0.35s both; }
        @keyframes heroIn { from{opacity:0;transform:translateY(28px);} to{opacity:1;transform:translateY(0);} }
        .hero-btns { display:flex; gap:1rem; flex-wrap:wrap; animation:heroIn 0.8s cubic-bezier(0.22,1,0.36,1) 0.45s both; }

        .hero-visual { position:relative; display:flex; justify-content:center; align-items:center; }
        .hero-ring { position:absolute; border-radius:50%; top:50%; left:50%; border:2px dashed; transform:translate(-50%,-50%); }
        .ring-a { width:370px; height:370px; border-color:rgba(236,72,153,0.18); animation:spin 24s linear infinite; }
        .ring-b { width:285px; height:285px; border-color:rgba(139,92,246,0.15); animation:spinR 18s linear infinite; }
        @keyframes spin  { to{transform:translate(-50%,-50%) rotate(360deg);} }
        @keyframes spinR { to{transform:translate(-50%,-50%) rotate(-360deg);} }

        .hero-img-card { position:relative; z-index:2; background:rgba(255,255,255,0.62); border:3px solid rgba(255,255,255,0.92); backdrop-filter:blur(16px); border-radius:26px; padding:12px; box-shadow:0 18px 56px rgba(236,72,153,0.22),0 6px 20px rgba(0,0,0,0.08); animation:catFloat 3s ease-in-out infinite; }
        @keyframes catFloat { 0%,100%{transform:translateY(0);} 50%{transform:translateY(-14px);} }

        .float-badge { position:absolute; z-index:3; background:rgba(255,255,255,0.78); backdrop-filter:blur(12px); border:1.5px solid rgba(255,255,255,0.95); border-radius:14px; padding:0.5rem 0.9rem; font-size:0.78rem; font-weight:800; box-shadow:0 4px 16px rgba(0,0,0,0.08); display:flex; align-items:center; gap:0.35rem; }

        /* MARQUEE */
        .stats-strip { background:linear-gradient(90deg,#ec4899,#8b5cf6,#3b82f6,#ec4899); background-size:300% 100%; animation:gradShift 6s linear infinite; overflow:hidden; }
        .marquee-track { display:flex; gap:3rem; width:max-content; animation:marquee 20s linear infinite; padding:0.8rem 0; }
        @keyframes marquee { from{transform:translateX(0);} to{transform:translateX(-50%);} }
        .marquee-item { color:white; font-weight:800; font-size:0.9rem; white-space:nowrap; display:flex; align-items:center; gap:0.5rem; }

        /* SECTIONS */
        .section { padding:5rem 5rem; }
        .section-label { display:inline-block; background:rgba(236,72,153,0.1); color:#ec4899; font-weight:800; font-size:0.75rem; padding:0.3rem 1rem; border-radius:999px; letter-spacing:0.08em; margin-bottom:0.8rem; }
        .section-title { font-family:'Pacifico',cursive; font-size:2.3rem; color:#7c3aed; margin-bottom:0.6rem; }
        .section-desc { color:#9ca3af; font-size:0.95rem; line-height:1.7; max-width:520px; }

        .feat-grid { display:grid; grid-template-columns:repeat(3,1fr); gap:1.4rem; margin-top:2.5rem; }
        .feat-card { border-radius:22px; padding:1.8rem; transition:transform 0.25s,box-shadow 0.25s; cursor:default; }
        .feat-card:hover { transform:translateY(-7px) scale(1.02); box-shadow:0 16px 48px rgba(236,72,153,0.18); }
        .feat-icon { width:52px; height:52px; border-radius:16px; display:flex; align-items:center; justify-content:center; font-size:1.6rem; margin-bottom:1rem; }

        .steps { display:grid; grid-template-columns:repeat(4,1fr); gap:1.4rem; margin-top:2.5rem; }
        .step-card { border-radius:20px; padding:1.6rem 1.4rem; text-align:center; position:relative; }
        .step-num { width:36px; height:36px; border-radius:50%; background:linear-gradient(135deg,#f472b6,#a855f7); color:white; font-weight:900; font-size:0.9rem; display:flex; align-items:center; justify-content:center; margin:0 auto 0.9rem; box-shadow:0 4px 12px rgba(236,72,153,0.35); }

        .testi-grid { display:grid; grid-template-columns:repeat(3,1fr); gap:1.4rem; margin-top:2.5rem; }
        .testi-card { border-radius:22px; padding:1.8rem; position:relative; overflow:hidden; transition:all 0.25s; }
        .testi-card:hover { transform:translateY(-5px); box-shadow:0 14px 40px rgba(236,72,153,0.16); }

        .faq-list { display:flex; flex-direction:column; gap:1rem; margin-top:2rem; }
        .faq-item { border-radius:16px; padding:1.4rem 1.6rem; transition:box-shadow 0.2s; }
        .faq-item:hover { box-shadow:0 8px 28px rgba(236,72,153,0.12); }

        .cta-section { background:linear-gradient(135deg,#ec4899 0%,#8b5cf6 50%,#3b82f6 100%); background-size:200% 200%; animation:gradShift 6s ease infinite; padding:6rem 4rem; text-align:center; position:relative; overflow:hidden; }

        .footer { background:rgba(255,255,255,0.88); border-top:1.5px solid rgba(236,72,153,0.12); padding:3.5rem 5rem 2rem; }
        .footer-grid { display:grid; grid-template-columns:2fr 1fr 1fr 1fr; gap:3rem; margin-bottom:2.5rem; }
        .footer-link { display:block; color:#6b7280; font-size:0.85rem; font-weight:600; text-decoration:none; margin-bottom:0.5rem; transition:color 0.2s; }
        .footer-link:hover { color:#ec4899; }
        .footer-bottom { border-top:1px solid rgba(236,72,153,0.12); padding-top:1.5rem; display:flex; justify-content:space-between; align-items:center; }

        .stat-pill { background:rgba(255,255,255,0.75); border:1.5px solid rgba(255,255,255,0.92); border-radius:14px; padding:0.6rem 1.1rem; text-align:center; box-shadow:0 4px 14px rgba(236,72,153,0.1); }

        .cat-float-fixed { position:fixed; bottom:1.8rem; right:2rem; z-index:50; animation:catFloat 3s ease-in-out infinite; }
        .social-icon { width:36px; height:36px; border-radius:10px; background:rgba(236,72,153,0.1); display:flex; align-items:center; justify-content:center; font-size:1rem; cursor:pointer; transition:background 0.2s; }
        .social-icon:hover { background:rgba(236,72,153,0.2); }
      `}</style>

      {/* Particles */}
      <div style={{ position:"fixed", inset:0, pointerEvents:"none", zIndex:1, overflow:"hidden" }}>
        {particles.map(p => (
          <span key={p.id} className="particle" style={{ left:p.left, fontSize:p.size, animationDuration:p.duration, animationDelay:p.delay }}>{p.emoji}</span>
        ))}
      </div>

      {/* ── NAVBAR ── */}
      <nav className="navbar">
        <a href="#" className="nav-logo">
          <span style={{ display:"inline-block", animation:"catFloat 2.5s ease-in-out infinite" }}>🌸</span>
          PristoChat
        </a>
        <div style={{ display:"flex", alignItems:"center", gap:"0.3rem" }}>
          {["Features", "How It Works", "Testimonials", "FAQ"].map(n => (
            <a key={n} href={`#${n.toLowerCase().replace(/ /g,"-")}`} className="nav-link">{n}</a>
          ))}
        </div>
        <div style={{ display:"flex", gap:"0.6rem", alignItems:"center" }}>
          <Link href="/auth/login" className="nav-link">Login 💖</Link>
          <Link href="/auth/register" className="nav-cta">Get Started ✨</Link>
        </div>
      </nav>

      {/* ── HERO ── */}
      <section className="hero grad-bg">
        <div className="blob" style={{ width:440, height:440, background:"#f9a8d4", top:"-100px", left:"-100px" }} />
        <div className="blob" style={{ width:320, height:320, background:"#c4b5fd", bottom:"-60px", right:"60px" }} />
        <div className="blob" style={{ width:240, height:240, background:"#93c5fd", top:"40%", left:"42%" }} />

        <div className="hero-grid">
          <div>
            <div className="hero-badge"><span className="dot" /> AI Online · Personalized · Always Cute</div>
            <h1 className="hero-title">🌸 PristoChat</h1>
            <p className="hero-sub">Your personalized AI bestie ✨</p>
            <p className="hero-desc">
              PristoChat is the AI chat companion that actually <strong style={{ color:"#ec4899" }}>gets you</strong> — your goals, your vibe, your aesthetic. Whether you're debugging code at midnight, studying for exams, or just need someone to brainstorm with, PristoChat is always there, always warm, always brilliant. 💖
            </p>
            <div className="hero-btns">
              <Link href="/auth/register" className="btn-main">Start Chatting Free ✨</Link>
              <Link href="/auth/login" className="btn-outline">Login 💖</Link>
            </div>
            <div style={{ display:"flex", gap:"1rem", flexWrap:"wrap", marginTop:"1.8rem" }}>
              {stats.map(s => (
                <div key={s.label} className="stat-pill">
                  <div style={{ fontSize:"1.05rem", fontWeight:900, color:"#ec4899" }}>{s.icon} {s.value}</div>
                  <div style={{ fontSize:"0.7rem", color:"#9ca3af", fontWeight:700 }}>{s.label}</div>
                </div>
              ))}
            </div>
          </div>

          <div className="hero-visual">
            <div className="hero-ring ring-a" />
            <div className="hero-ring ring-b" />
            <div className="hero-img-card">
              <img src="https://media.tenor.com/9G2F2z4FZbMAAAAC/anime-cat.gif" alt="PristoChat mascot" style={{ width:"270px", borderRadius:"18px", display:"block", filter:"drop-shadow(0 0 20px rgba(236,72,153,0.35))" }} />
            </div>
            <div className="float-badge" style={{ top:"8%", left:"-5%", color:"#7c3aed", animation:"catFloat 3.5s ease-in-out infinite" }}>🧠 AI-Powered</div>
            <div className="float-badge" style={{ bottom:"10%", right:"-4%", color:"#ec4899", animation:"catFloat 4s ease-in-out 1s infinite" }}>💖 Always Cute</div>
            <div className="float-badge" style={{ top:"2%", right:"2%", color:"#2563eb", animation:"catFloat 3s ease-in-out 0.5s infinite" }}>⚡ Super Fast</div>
            <div className="float-badge" style={{ bottom:"28%", left:"-8%", color:"#10b981", animation:"catFloat 4.5s ease-in-out 0.8s infinite" }}>🔒 Secure</div>
          </div>
        </div>
      </section>

      {/* ── MARQUEE ── */}
      <div className="stats-strip">
        <div className="marquee-track">
          {[...Array(2)].flatMap(() =>
            ["✨ Personalized AI", "🌸 Always Learning", "💖 Aesthetic Vibes", "🧠 Smart Responses", "💻 Coding Help", "🌙 24/7 Available", "🎨 Creative Mode", "⭐ Loved by Students", "🚀 Lightning Fast", "🔒 Secure & Private"].map((t, i) => (
              <span key={`${t}-${i}`} className="marquee-item">{t} <span style={{ opacity:0.4 }}>·</span></span>
            ))
          )}
        </div>
      </div>

      {/* ── FEATURES ── */}
      <section id="features" className="section" style={{ background:"#fdf4ff" }}>
        <div style={{ textAlign:"center" }}>
          <span className="section-label">EVERYTHING YOU NEED</span>
          <h2 className="section-title">Why PristoChat? 💕</h2>
          <p className="section-desc" style={{ margin:"0 auto" }}>Built for students, creators, and coders who deserve better than a cold, generic AI.</p>
        </div>
        <div className="feat-grid">
          {features.map(f => (
            <div key={f.title} className="glass feat-card">
              <div className="feat-icon" style={{ background:f.color }}>{f.icon}</div>
              <h3 style={{ fontWeight:800, color:"#1f2937", fontSize:"1rem", marginBottom:"0.5rem" }}>{f.title}</h3>
              <p style={{ color:"#6b7280", fontSize:"0.88rem", lineHeight:1.7 }}>{f.desc}</p>
            </div>
          ))}
        </div>
      </section>

      {/* ── HOW IT WORKS ── */}
      <section id="how-it-works" className="section grad-bg" style={{ position:"relative", overflow:"hidden" }}>
        <div className="blob" style={{ width:300, height:300, background:"#f9a8d4", top:"-60px", right:"-60px" }} />
        <div style={{ textAlign:"center", position:"relative", zIndex:2 }}>
          <span className="section-label">GETTING STARTED</span>
          <h2 className="section-title">Up & chatting in 30 seconds 🚀</h2>
          <p className="section-desc" style={{ margin:"0 auto" }}>No complicated setup. No confusing onboarding. Just sign up and meet your new AI bestie.</p>
        </div>
        <div className="steps" style={{ position:"relative", zIndex:2 }}>
          {steps.map((s, i) => (
            <div key={s.num} className="glass step-card">
              <div className="step-num">{s.num}</div>
              <div style={{ fontSize:"2rem", marginBottom:"0.7rem" }}>{s.icon}</div>
              <h3 style={{ fontWeight:800, color:"#1f2937", fontSize:"0.98rem", marginBottom:"0.5rem" }}>{s.title}</h3>
              <p style={{ color:"#6b7280", fontSize:"0.85rem", lineHeight:1.65 }}>{s.desc}</p>
              {i < 3 && <div style={{ position:"absolute", top:"2.8rem", right:"-18px", width:36, height:2, background:"linear-gradient(90deg,rgba(236,72,153,0.5),transparent)", zIndex:1 }} />}
            </div>
          ))}
        </div>
      </section>

      {/* ── TESTIMONIALS ── */}
      <section id="testimonials" className="section" style={{ background:"#fdf4ff" }}>
        <div style={{ textAlign:"center" }}>
          <span className="section-label">LOVED BY USERS</span>
          <h2 className="section-title">What they're saying 🌟</h2>
          <p className="section-desc" style={{ margin:"0 auto" }}>Real people, real chats, real glow-ups. Join thousands who've found their AI bestie.</p>
        </div>
        <div className="testi-grid">
          {testimonials.map(t => (
            <div key={t.name} className="glass testi-card">
              <div style={{ fontSize:"3rem", color:"rgba(236,72,153,0.15)", fontFamily:"'Pacifico',cursive", position:"absolute", top:"0.5rem", left:"1.2rem", lineHeight:1 }}>"</div>
              <p style={{ color:"#374151", lineHeight:1.75, fontStyle:"italic", marginBottom:"1.2rem", paddingTop:"0.8rem", position:"relative", zIndex:1 }}>"{t.text}"</p>
              <div style={{ display:"flex", alignItems:"center", gap:"0.75rem" }}>
                <div style={{ width:42, height:42, borderRadius:"50%", background:"linear-gradient(135deg,#fce7f3,#ede9fe)", display:"flex", alignItems:"center", justifyContent:"center", fontSize:"1.4rem", border:"2px solid rgba(255,255,255,0.9)" }}>{t.avatar}</div>
                <div>
                  <div style={{ fontWeight:800, color:"#ec4899", fontSize:"0.9rem" }}>{t.name}</div>
                  <div style={{ fontSize:"0.75rem", color:"#9ca3af", fontWeight:600 }}>{t.handle} · {t.tag}</div>
                </div>
              </div>
            </div>
          ))}
        </div>

        {/* second GIF accent */}
        <div style={{ display:"flex", justifyContent:"center", marginTop:"3rem" }}>
          <div style={{ textAlign:"center" }}>
            <div className="glass" style={{ borderRadius:"24px", padding:"12px", display:"inline-block", animation:"catFloat 3s ease-in-out infinite" }}>
              <img src="https://media.tenor.com/9G2F2z4FZbMAAAAC/anime-cat.gif" alt="happy cat" style={{ width:"150px", borderRadius:"16px", display:"block", filter:"hue-rotate(30deg) saturate(1.3)" }} />
            </div>
            <p style={{ marginTop:"1rem", fontWeight:800, color:"#ec4899", fontSize:"0.95rem" }}>This could be you after using PristoChat 💖</p>
          </div>
        </div>
      </section>

      {/* ── FAQ ── */}
      <section id="faq" className="section grad-bg" style={{ position:"relative", overflow:"hidden" }}>
        <div className="blob" style={{ width:280, height:280, background:"#c4b5fd", bottom:"-40px", left:"-60px" }} />
        <div style={{ display:"grid", gridTemplateColumns:"1fr 1fr", gap:"5rem", alignItems:"start", position:"relative", zIndex:2 }}>
          <div>
            <span className="section-label">GOT QUESTIONS?</span>
            <h2 className="section-title">FAQs 💬</h2>
            <p className="section-desc">Everything you want to know about PristoChat, answered with love. 🌸</p>
            <div style={{ marginTop:"2rem" }}>
              <Link href="/auth/register" className="btn-main" style={{ display:"inline-flex" }}>Try It Free ✨</Link>
            </div>
          </div>
          <div className="faq-list">
            {faqs.map((f, i) => (
              <div key={i} className="glass faq-item">
                <div style={{ fontWeight:800, color:"#1f2937", fontSize:"0.95rem", marginBottom:"0.5rem", display:"flex", gap:"0.6rem", alignItems:"flex-start" }}>
                  <span style={{ color:"#ec4899", flexShrink:0 }}>🌸</span>{f.q}
                </div>
                <p style={{ color:"#6b7280", fontSize:"0.87rem", lineHeight:1.7, paddingLeft:"1.7rem" }}>{f.a}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ── CTA ── */}
      <section className="cta-section">
        <div style={{ position:"absolute", width:400, height:400, background:"rgba(255,255,255,0.12)", top:"-80px", left:"-80px", borderRadius:"50%", filter:"blur(80px)" }} />
        <div style={{ position:"relative", zIndex:2 }}>
          <div style={{ fontSize:"3.5rem", marginBottom:"1rem", display:"inline-block", animation:"catFloat 2.5s ease-in-out infinite" }}>🌸</div>
          <h2 style={{ fontFamily:"'Pacifico',cursive", fontSize:"2.8rem", color:"white", marginBottom:"0.8rem", textShadow:"0 4px 20px rgba(0,0,0,0.15)" }}>Ready to meet your bestie?</h2>
          <p style={{ color:"rgba(255,255,255,0.88)", fontSize:"1.1rem", maxWidth:"500px", margin:"0 auto 2.2rem", lineHeight:1.75 }}>
            Join 10,000+ users who've upgraded their AI game. Free to start, impossible to quit. ✨
          </p>
          <div style={{ display:"flex", gap:"1rem", justifyContent:"center", flexWrap:"wrap" }}>
            <Link href="/auth/register" style={{ display:"inline-flex", alignItems:"center", gap:"0.5rem", background:"white", color:"#ec4899", padding:"1.05rem 2.5rem", borderRadius:"18px", fontWeight:800, fontSize:"1.05rem", textDecoration:"none", fontFamily:"'Nunito',sans-serif", boxShadow:"0 8px 28px rgba(0,0,0,0.15)", transition:"transform 0.2s" }}>
              Get Started Free ✨
            </Link>
            <Link href="/auth/login" style={{ display:"inline-flex", alignItems:"center", gap:"0.5rem", background:"rgba(255,255,255,0.18)", color:"white", border:"2px solid rgba(255,255,255,0.5)", padding:"1rem 2.2rem", borderRadius:"18px", fontWeight:800, fontSize:"1rem", textDecoration:"none", fontFamily:"'Nunito',sans-serif", backdropFilter:"blur(8px)" }}>
              Login 💖
            </Link>
          </div>
        </div>
      </section>

      {/* ── FOOTER ── */}
      <footer className="footer">
        <div className="footer-grid">
          <div>
            <div style={{ fontFamily:"'Pacifico',cursive", fontSize:"1.5rem", color:"#ec4899", marginBottom:"0.8rem" }}>🌸 PristoChat</div>
            <p style={{ color:"#6b7280", fontSize:"0.87rem", lineHeight:1.75, maxWidth:"280px", marginBottom:"1.2rem" }}>
              Your personalized AI bestie for coding, learning, creating, and everything in between. Built with love, powered by intelligence, delivered with cuteness. 💖
            </p>
            <div style={{ display:"flex", gap:"0.6rem" }}>
              {["🐦", "📸", "💬", "📧"].map((icon, i) => (
                <div key={i} className="social-icon">{icon}</div>
              ))}
            </div>
          </div>
          {[
            { heading:"Product", links:["Features", "How It Works", "Pricing", "Changelog", "Roadmap"] },
            { heading:"Resources", links:["Documentation", "API Reference", "Blog", "Community", "Support"] },
            { heading:"Company", links:["About Us", "Careers", "Privacy Policy", "Terms of Service", "Contact"] },
          ].map(col => (
            <div key={col.heading}>
              <h4 style={{ fontWeight:800, color:"#1f2937", fontSize:"0.9rem", marginBottom:"1rem" }}>{col.heading}</h4>
              {col.links.map(l => <a key={l} href="#" className="footer-link">{l}</a>)}
            </div>
          ))}
        </div>
        <div className="footer-bottom">
          <p style={{ color:"#9ca3af", fontSize:"0.82rem", fontWeight:600 }}>© 2025 PristoChat · Made with 💖 by PristoChat Team ✨</p>
          <div style={{ display:"flex", gap:"1.5rem" }}>
            {["Privacy", "Terms", "Cookies"].map(l => <a key={l} href="#" className="footer-link" style={{ marginBottom:0 }}>{l}</a>)}
          </div>
        </div>
      </footer>

      {/* Floating corner cat */}
      <div className="cat-float-fixed">
        <img src="https://media.tenor.com/9G2F2z4FZbMAAAAC/anime-cat.gif" alt="PristoChat cat" style={{ width:"70px", borderRadius:"14px", border:"2.5px solid rgba(255,255,255,0.9)", boxShadow:"0 6px 20px rgba(236,72,153,0.3)", display:"block" }} />
      </div>
    </div>
  );
}