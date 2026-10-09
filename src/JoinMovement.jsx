import { useEffect, useState } from 'react';
import { AnimatePresence, motion } from 'framer-motion';
import {
  ArrowRight, ArrowUpRight, Check, ChevronRight, Church,
  Globe2, HandHeart, Mail, MapPin, Menu, MessageCircle,
  Send, Sparkles, Users, X,
} from 'lucide-react';
import './join.css';

const opportunities = [
  { icon: HandHeart, title: 'Prayer & care', copy: 'Stand with missionaries and communities through faithful prayer and practical encouragement.' },
  { icon: Users, title: 'Events & hospitality', copy: 'Help gatherings feel welcoming, organised and ready for meaningful connection.' },
  { icon: MessageCircle, title: 'Stories & media', copy: 'Use writing, photography, design or digital skills to help mission stories travel further.' },
  { icon: Church, title: 'Church partnerships', copy: 'Help local churches discover practical ways to pray, give, send and stay connected.' },
  { icon: Globe2, title: 'Mission support', copy: 'Offer administration, research, logistics or professional skills behind the scenes.' },
];

function JoinLogo() {
  return <a className="join-logo" href="/" aria-label="Asia Highland Partners home"><img src="/media/ahp-logo.png" alt="" /><span>Asia Highland<br />Partners</span></a>;
}

function JoinHeader() {
  const [open, setOpen] = useState(false);
  return <>
    <header className="join-header">
      <JoinLogo />
      <nav aria-label="Volunteer page navigation"><a href="/#story">Our story</a><a href="/#work">What we do</a><a href="/arise-nagaland">Arise Nagaland</a></nav>
      <a className="join-header__action" href="#volunteer-form">Apply to volunteer <ArrowUpRight /></a>
      <button className="join-menu-button" onClick={() => setOpen(true)} aria-label="Open menu"><Menu /></button>
    </header>
    <AnimatePresence>{open && <motion.div className="join-mobile-menu" initial={{ opacity: 0, x: '100%' }} animate={{ opacity: 1, x: 0 }} exit={{ opacity: 0, x: '100%' }}>
      <div><JoinLogo /><button onClick={() => setOpen(false)} aria-label="Close menu"><X /></button></div>
      <nav><a href="/" onClick={() => setOpen(false)}>AHP home <ChevronRight /></a><a href="/#work" onClick={() => setOpen(false)}>What we do <ChevronRight /></a><a href="/arise-nagaland" onClick={() => setOpen(false)}>Arise Nagaland <ChevronRight /></a><a href="#volunteer-form" onClick={() => setOpen(false)}>Apply to volunteer <ChevronRight /></a></nav>
    </motion.div>}</AnimatePresence>
  </>;
}

function VolunteerForm() {
  const [submitted, setSubmitted] = useState(false);
  const submit = (event) => {
    event.preventDefault();
    const data = new FormData(event.currentTarget);
    const roles = data.getAll('roles').join(', ');
    const subject = encodeURIComponent(`Volunteer interest — ${data.get('name')}`);
    const body = encodeURIComponent([
      `Name: ${data.get('name')}`,
      `Email: ${data.get('email')}`,
      `Phone / WhatsApp: ${data.get('phone') || 'Not provided'}`,
      `Location: ${data.get('location')}`,
      `Church / organisation: ${data.get('church') || 'Not provided'}`,
      `Areas of interest: ${roles || 'Open to any area'}`,
      `Availability: ${data.get('availability')}`,
      '',
      'Why I would like to serve:',
      data.get('message'),
    ].join('\n'));
    setSubmitted(true);
    window.setTimeout(() => { window.location.href = `mailto:asiahighlandpartners@gmail.com?subject=${subject}&body=${body}`; }, 450);
  };

  if (submitted) return <motion.div className="join-success" role="status" initial={{ opacity: 0, y: 18 }} animate={{ opacity: 1, y: 0 }}>
    <span><Check /></span><p className="join-kicker">Application prepared</p><h2>Thank you for stepping forward.</h2><p>Your email app is opening with your volunteer application ready to send to Asia Highland Partners.</p><button onClick={() => setSubmitted(false)}>Review my details</button>
  </motion.div>;

  return <form className="join-form" onSubmit={submit}>
    <div className="join-form__heading"><p className="join-kicker">Volunteer interest form</p><h2>Tell us how you’d like to serve.</h2><p>Share a little about yourself. The AHP team can then follow up about suitable opportunities and next steps.</p></div>
    <div className="join-form__fields">
      <label>Full name <input name="name" required autoComplete="name" placeholder="Your name" /></label>
      <label>Email address <input name="email" type="email" required autoComplete="email" placeholder="you@example.com" /></label>
      <label>Phone / WhatsApp <input name="phone" type="tel" autoComplete="tel" placeholder="Optional" /></label>
      <label>City and country <input name="location" required autoComplete="address-level2" placeholder="Where are you based?" /></label>
      <label className="join-form__wide">Church / organisation <input name="church" autoComplete="organization" placeholder="Optional" /></label>
      <fieldset className="join-form__wide"><legend>I’m interested in</legend><div className="join-checks">
        {['Prayer & care', 'Events & hospitality', 'Stories & media', 'Church partnerships', 'Mission support'].map((role) => <label key={role}><input type="checkbox" name="roles" value={role} /><span><Check /></span>{role}</label>)}
      </div></fieldset>
      <label className="join-form__wide">My availability <select name="availability" required defaultValue=""><option value="" disabled>Choose what fits best</option><option>One-time event or project</option><option>A few hours each month</option><option>Regular weekly support</option><option>Short-term mission opportunity</option><option>I am flexible</option></select></label>
      <label className="join-form__wide">Why would you like to serve? <textarea name="message" required rows="5" placeholder="Tell us about your heart, experience or skills." /></label>
      <label className="join-consent join-form__wide"><input type="checkbox" required /><span><Check /></span><small>I consent to AHP contacting me about volunteer opportunities. My information will only be used for this enquiry.</small></label>
      <button className="join-submit join-form__wide" type="submit">Prepare my application <Send /></button>
    </div>
  </form>;
}

export default function JoinMovement() {
  useEffect(() => {
    const previous = document.title;
    document.title = 'Join the Movement | Asia Highland Partners';
    window.scrollTo(0, 0);
    return () => { document.title = previous; };
  }, []);

  return <div className="join-page">
    <JoinHeader />
    <main>
      <section className="join-hero">
        <div className="join-hero__media"><img src="/media/team.jpg" alt="A team of young leaders serving together" /></div><div className="join-hero__overlay" />
        <div className="join-shell join-hero__content"><motion.p className="join-kicker" initial={{ opacity: 0, y: 12 }} animate={{ opacity: 1, y: 0 }}>Your yes can carry hope further</motion.p><motion.h1 initial={{ opacity: 0, y: 45 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: .8 }}>Join the<br /><em>movement.</em></motion.h1><motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} transition={{ delay: .5 }}><p>Bring your time, skills and heart alongside a locally led mission reaching the unreached people groups of South Asia.</p><a href="#volunteer-form">Start your application <ArrowRight /></a></motion.div></div>
        <div className="join-hero__note"><MapPin /> Serving from wherever you are</div>
      </section>

      <section className="join-intro"><div className="join-shell join-intro__grid"><div><p className="join-kicker">There is a place for you</p><h2>Mission moves through ordinary people offering what they already carry.</h2></div><div><p>You do not need to have every answer or live in the highlands to contribute. AHP volunteers strengthen the people, gatherings and partnerships that make locally cultivated mission possible.</p><a href="mailto:asiahighlandpartners@gmail.com">Ask the team a question <Mail /></a></div></div></section>

      <section className="join-roles"><div className="join-shell"><p className="join-kicker">Ways to serve</p><div className="join-roles__top"><h2>Use what’s<br />in your hands.</h2><p>Choose one area or several. The team will help identify the most useful next step.</p></div><div className="join-role-grid">{opportunities.map(({ icon: Icon, title, copy }, index) => <motion.article key={title} initial={{ opacity: 0, y: 28 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }}><span>0{index + 1}</span><Icon /><h3>{title}</h3><p>{copy}</p></motion.article>)}</div></div></section>

      <section className="join-path"><div className="join-shell"><div className="join-path__image"><img src="/media/woman-outdoors.jpg" alt="A woman from a highland community" /></div><div className="join-path__content"><p className="join-kicker">What happens next</p><h2>A thoughtful path into service.</h2>{[['01', 'Share your interest', 'Tell us where you are, what you care about and how you may be able to help.'], ['02', 'Start a conversation', 'The AHP team will respond personally and explore a fitting opportunity with you.'], ['03', 'Serve with purpose', 'Receive the context, guidance and support needed to contribute well.']].map(([number, title, copy]) => <div className="join-step" key={number}><strong>{number}</strong><div><h3>{title}</h3><p>{copy}</p></div></div>)}</div></div></section>

      <section id="volunteer-form" className="join-apply"><div className="join-shell"><VolunteerForm /></div></section>

      <section className="join-contact"><div className="join-shell"><Sparkles /><div><p className="join-kicker">Prefer a conversation?</p><h2>We’d be glad to hear your story.</h2></div><a href="mailto:asiahighlandpartners@gmail.com">Email AHP <ArrowUpRight /></a></div></section>
    </main>
    <footer className="join-footer"><div className="join-shell"><JoinLogo /><p>Reaching the unreached through locally cultivated, sustainable missions.</p><div><a href="/">AHP home</a><a href="/arise-nagaland">Arise Nagaland</a><a href="https://actswaco.churchcenter.com/giving/to/asia-highland-partners" target="_blank" rel="noreferrer">Give</a></div></div><div className="join-shell join-footer__bottom"><span>© 2026 Asia Highland Partners</span><a href="mailto:asiahighlandpartners@gmail.com">asiahighlandpartners@gmail.com</a></div></footer>
  </div>;
}
