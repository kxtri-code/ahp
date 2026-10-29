import { useEffect, useRef, useState } from 'react';
import { AnimatePresence, motion, useScroll, useSpring } from 'framer-motion';
import {
  ArrowLeft, ArrowRight, ArrowUpRight, CalendarDays, Check,
  ChevronDown, Clock3, Flame, Globe2, Mail, MapPin, Menu, Mic2, Play,
  Sparkles, Users, Volume2, VolumeX, X,
} from 'lucide-react';
import { useSiteContent } from './contentStore';
import MobileDock from './MobileDock';
import './arise.css';

const navItems = [
  ['Why Arise', 'arise-why'],
  ['Experience', 'arise-experience'],
  ['Program', 'arise-program'],
  ['FAQ', 'arise-faq'],
];

const program = [
  { time: 'Moment 01', icon: Sparkles, title: 'Worship & Word', copy: 'Gather around Scripture, prayer and worship that recentres a generation on the heart of God.' },
  { time: 'Moment 02', icon: Globe2, title: 'Mission Labs', copy: 'Practical, honest sessions on culture, calling, evangelism and serving where the Gospel is not known.' },
  { time: 'Moment 03', icon: Users, title: 'Mentor Circles', copy: 'Smaller conversations with mission leaders who can help turn questions into faithful next steps.' },
  { time: 'Moment 04', icon: Flame, title: 'Commissioning', copy: 'A shared moment of prayer, commitment and response—because inspiration must become action.' },
];

const faqs = [
  ['Who is Arise Nagaland for?', 'Students, young adults, pastors, church leaders and anyone exploring how their life can take part in God’s mission.'],
  ['When and where will it happen?', 'The event will be hosted in Nagaland, India. Final dates and venue details will be announced by the organising team.'],
  ['Will registration be paid?', 'Pass types and fees will be shared when registration officially opens. You can join the early-interest list today.'],
  ['Can churches attend together?', 'Yes. Church, campus and youth groups will be able to register together when delegate registration opens.'],
];

const rise = {
  hidden: { opacity: 0, y: 34 },
  show: { opacity: 1, y: 0, transition: { duration: .75, ease: [0.22, 1, 0.36, 1] } },
};

function AriseLogo() {
  return <a className="arise-logo" href="/arise-nagaland" aria-label="Arise Nagaland home"><img src="/media/arise-nagaland-logo.png" alt="Arise Nagaland" /></a>;
}

function AriseIntro() {
  const { arise } = useSiteContent();
  const videoRef = useRef(null);
  const [sound, setSound] = useState(false);
  const [visible, setVisible] = useState(() => sessionStorage.getItem('arise-intro-seen') !== 'yes');
  const dismiss = () => { sessionStorage.setItem('arise-intro-seen', 'yes'); setVisible(false); };
  useEffect(() => {
    if (!visible) return undefined;
    document.body.classList.add('intro-open');
    const fallback = window.setTimeout(dismiss, 11000);
    return () => { document.body.classList.remove('intro-open'); window.clearTimeout(fallback); };
  }, [visible]);
  const toggleSound = () => {
    const video = videoRef.current;
    if (!video) return;
    video.muted = sound;
    setSound(!sound);
    video.play().catch(() => {});
  };
  return <AnimatePresence>{visible && <motion.div className="arise-intro" initial={{ opacity: 1 }} exit={{ opacity: 0, scale: 1.02 }} transition={{ duration: .8 }}>
    <video ref={videoRef} autoPlay muted playsInline onEnded={dismiss}><source src={arise.logoRevealVideo} type="video/mp4" /></video>
    <div className="arise-intro__controls"><button onClick={toggleSound} aria-pressed={sound}>{sound ? <Volume2 /> : <VolumeX />}{sound ? 'Sound on' : 'Tap for sound'}</button><button onClick={dismiss}>Enter Arise <ArrowRight /></button></div>
  </motion.div>}</AnimatePresence>;
}

function AriseHeader() {
  const [open, setOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);
  useEffect(() => {
    const handler = () => setScrolled(window.scrollY > 40);
    handler();
    window.addEventListener('scroll', handler, { passive: true });
    return () => window.removeEventListener('scroll', handler);
  }, []);
  return <>
    <header className={`arise-header ${scrolled ? 'is-scrolled' : ''}`}>
      <AriseLogo />
      <nav>{navItems.map(([label, id]) => <a key={id} href={`#${id}`}>{label}</a>)}</nav>
      <a className="arise-header__cta" href="/arise-register">Register now <ArrowUpRight /></a>
      <button className="arise-menu-button" onClick={() => setOpen(true)} aria-label="Open Arise menu"><Menu /></button>
    </header>
    <AnimatePresence>{open && <motion.div className="arise-mobile-menu" initial={{ opacity: 0, clipPath: 'inset(0 0 100% 0)' }} animate={{ opacity: 1, clipPath: 'inset(0)' }} exit={{ opacity: 0, clipPath: 'inset(0 0 100% 0)' }}>
      <div><AriseLogo /><button onClick={() => setOpen(false)} aria-label="Close Arise menu"><X /></button></div>
      <nav>{navItems.map(([label, id], index) => <a href={`#${id}`} onClick={() => setOpen(false)} key={id}><small>0{index + 1}</small>{label}<ArrowRight /></a>)}<a className="arise-mobile-menu__cta" href="/arise-register" onClick={() => setOpen(false)}>Register now <ArrowUpRight /></a></nav>
    </motion.div>}</AnimatePresence>
  </>;
}

function AriseVideo({ open, onClose }) {
  const { arise } = useSiteContent();
  useEffect(() => {
    if (!open) return undefined;
    const close = (event) => event.key === 'Escape' && onClose();
    window.addEventListener('keydown', close);
    return () => window.removeEventListener('keydown', close);
  }, [open, onClose]);
  return <AnimatePresence>{open && <motion.div className="arise-video-modal" role="dialog" aria-modal="true" aria-label="Arise Nagaland film" initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }} onClick={onClose}>
    <button onClick={onClose} aria-label="Close Arise video"><X /></button>
    <motion.div initial={{ scale: .94, y: 20 }} animate={{ scale: 1, y: 0 }} onClick={(event) => event.stopPropagation()}><video src={arise.heroVideo} controls autoPlay playsInline /></motion.div>
  </motion.div>}</AnimatePresence>;
}

function AriseHero({ onPlay }) {
  const { arise } = useSiteContent();
  const videoRef = useRef(null);
  const [sound, setSound] = useState(false);
  const toggleSound = () => {
    const video = videoRef.current;
    if (!video) return;
    video.muted = sound;
    setSound(!sound);
    video.play().catch(() => {});
  };
  return <section className="arise-hero">
    <div className="arise-hero__video"><video ref={videoRef} autoPlay muted loop playsInline preload="metadata" poster="/media/missionary-journey.jpg"><source src={arise.heroVideo} type="video/mp4" /></video></div>
    <div className="arise-hero__image" /><div className="arise-hero__overlay" /><div className="arise-noise" />
    <div className="arise-shell arise-hero__content">
      <motion.div className="arise-hero__minimal" initial={{ opacity: 0, y: 28 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: .45, duration: .85 }}>
        <div><p className="arise-kicker">Asia Highland Partners presents</p><h1><span>Arise</span><em>Nagaland</em></h1></div>
        <div className="arise-hero__actions"><a href="/arise-register">Register now <ArrowUpRight /></a><button onClick={toggleSound} aria-pressed={sound}><span>{sound ? <Volume2 /> : <VolumeX />}</span>{sound ? 'Sound on' : 'Tap for sound'}</button><button onClick={onPlay}><span><Play fill="currentColor" /></span>Full film</button></div>
      </motion.div>
    </div>
    <div className="arise-hero__meta"><span><CalendarDays />{arise.date}</span><span><MapPin />{arise.venue}</span><span><Clock3 />A multi-day gathering</span></div>
  </section>;
}

function WhyArise() {
  return <section id="arise-why" className="arise-why arise-section"><div className="arise-shell">
    <motion.div className="arise-heading" variants={rise} initial="hidden" whileInView="show" viewport={{ once: true, amount: .25 }}><p className="arise-eyebrow">Why Arise</p><h2>Not another<br />conference.<br /><em>A response.</em></h2></motion.div>
    <div className="arise-why__grid">
      <motion.div className="arise-why__copy" variants={rise} initial="hidden" whileInView="show" viewport={{ once: true }}><p className="arise-lead">A generation is asking what faithful mission looks like now. Arise Nagaland creates space to worship, listen, learn and answer.</p><p>Rooted in Nagaland’s own story of receiving the Gospel and becoming a sending people, this gathering looks forward—to the communities, cultures and nations still waiting to hear.</p><a href="#arise-program">Explore the experience <ArrowRight /></a></motion.div>
      <motion.div className="arise-why__visual" initial={{ clipPath: 'inset(0 0 100% 0)' }} whileInView={{ clipPath: 'inset(0)' }} viewport={{ once: true }} transition={{ duration: 1, ease: [0.22,1,.36,1] }}><img src="/media/mission-train-web.jpg" alt="A ministry leader equipping a gathered community" /><div><Flame /><strong>Rise.</strong><strong>Respond.</strong><strong>Go.</strong></div></motion.div>
    </div>
  </div></section>;
}

function Experience() {
  return <section id="arise-experience" className="arise-experience arise-section"><div className="arise-shell">
    <div className="arise-experience__top"><motion.div variants={rise} initial="hidden" whileInView="show" viewport={{ once: true }}><p className="arise-eyebrow">The experience</p><h2>Come ready<br />to encounter.</h2></motion.div><p>Every part of the gathering is designed to move from inspiration toward a clear, supported next step.</p></div>
    <div className="arise-bento">
      <motion.article className="arise-bento__feature" variants={rise} initial="hidden" whileInView="show" viewport={{ once: true }}><img src="/media/mission-send-web.jpg" alt="A ministry gathering focused on the gospel" /><div><span>01</span><h3>Gather</h3><p>One generation, one room, many stories—united in worship and prayer.</p></div></motion.article>
      <motion.article className="arise-bento__word" variants={rise} initial="hidden" whileInView="show" viewport={{ once: true }}><span>BE<br />STILL.</span><small>Listen before you move.</small></motion.article>
      <motion.article className="arise-bento__image" variants={rise} initial="hidden" whileInView="show" viewport={{ once: true }}><img src="/media/mission-partner.jpg" alt="A leader equipping ministry partners" /><div><span>02</span><h3>Equip</h3></div></motion.article>
      <motion.article className="arise-bento__call" variants={rise} initial="hidden" whileInView="show" viewport={{ once: true }}><Globe2 /><h3>Go where hope is not yet known.</h3><p>Turn a stirring into a practical commitment.</p></motion.article>
    </div>
  </div></section>;
}

function Program() {
  return <section id="arise-program" className="arise-program arise-section"><div className="arise-shell">
    <div className="arise-program__intro"><p className="arise-eyebrow">Program rhythm</p><h2>Four movements.<br />One invitation.</h2><p>A program shaped around formation—not information overload.</p></div>
    <div className="arise-program__list">{program.map((item, index) => { const Icon = item.icon; return <motion.article key={item.title} variants={rise} initial="hidden" whileInView="show" viewport={{ once: true, amount: .3 }}><span>{item.time}</span><div className="arise-program__icon"><Icon /></div><h3>{item.title}</h3><p>{item.copy}</p><strong>0{index + 1}</strong></motion.article>; })}</div>
  </div></section>;
}

function Voices() {
  return <section className="arise-voices"><div className="arise-voices__image" /><div className="arise-voices__overlay" /><motion.div className="arise-shell" variants={rise} initial="hidden" whileInView="show" viewport={{ once: true, amount: .35 }}><Mic2 /><p>“Here I am.<br /><em>Send me.”</em></p><span>Isaiah 6:8</span></motion.div></section>;
}

function Registration() {
  const [sent, setSent] = useState(false);
  const submit = (event) => {
    event.preventDefault();
    const form = new FormData(event.currentTarget);
    const subject = encodeURIComponent('Arise Nagaland early interest');
    const body = encodeURIComponent(`Name: ${form.get('name')}\nEmail: ${form.get('email')}\nChurch / organisation: ${form.get('church')}\nI am interested as: ${form.get('interest')}`);
    setSent(true);
    window.location.href = `mailto:asiahighlandpartners@gmail.com?subject=${subject}&body=${body}`;
  };
  return <section id="arise-register" className="arise-register arise-section"><div className="arise-shell arise-register__grid">
    <motion.div variants={rise} initial="hidden" whileInView="show" viewport={{ once: true }}><p className="arise-eyebrow">Registration</p><h2>Take your<br />place.</h2><p>Complete the full delegate registration or join the update list while final event details are being confirmed.</p><a className="arise-register__primary" href="/arise-register">Open registration form <ArrowUpRight /></a><div className="arise-register__facts"><span><Check />Delegate registration</span><span><Check />Program announcements</span><span><Check />Volunteer opportunities</span></div></motion.div>
    <motion.form onSubmit={submit} variants={rise} initial="hidden" whileInView="show" viewport={{ once: true }}>
      <label>Full name<input name="name" required autoComplete="name" /></label>
      <label>Email address<input name="email" type="email" required autoComplete="email" /></label>
      <label>Church / organisation<input name="church" required /></label>
      <label>I am interested as<select name="interest" defaultValue="" required><option value="" disabled>Choose one</option><option>Delegate</option><option>Volunteer</option><option>Church group</option><option>Mission partner</option></select></label>
      <button type="submit">Request event updates <ArrowUpRight /></button>
      <AnimatePresence>{sent && <motion.p className="arise-register__status" initial={{ opacity: 0 }} animate={{ opacity: 1 }}>Your email app is opening with your request ready to send.</motion.p>}</AnimatePresence>
    </motion.form>
  </div></section>;
}

function FAQ() {
  return <section id="arise-faq" className="arise-faq arise-section"><div className="arise-shell arise-faq__grid"><div><p className="arise-eyebrow">Good to know</p><h2>Questions,<br />answered.</h2><a href="mailto:asiahighlandpartners@gmail.com">Still curious? Write to us <Mail /></a></div><div>{faqs.map(([question, answer], index) => <motion.details key={question} variants={rise} initial="hidden" whileInView="show" viewport={{ once: true }}><summary><span>0{index + 1}</span>{question}<ChevronDown /></summary><p>{answer}</p></motion.details>)}</div></div></section>;
}

function AriseFooter() {
  return <footer className="arise-footer"><div className="arise-shell"><div className="arise-footer__top"><AriseLogo /><p>A missions gathering by Asia Highland Partners.</p><a href="/">Back to AHP <ArrowLeft /></a></div><div className="arise-footer__bottom"><span>© 2026 Arise Nagaland</span><span>Nagaland, India</span><a href="mailto:asiahighlandpartners@gmail.com">asiahighlandpartners@gmail.com</a></div></div></footer>;
}

export default function AriseNagaland() {
  const [videoOpen, setVideoOpen] = useState(false);
  const { scrollYProgress } = useScroll();
  const progress = useSpring(scrollYProgress, { stiffness: 100, damping: 30 });
  useEffect(() => { const previous = document.title; document.title = 'Arise Nagaland | A Missions Gathering'; document.body.classList.add('arise-body'); window.scrollTo(0, 0); return () => { document.title = previous; document.body.classList.remove('arise-body'); }; }, []);
  return <div className="arise-page"><AriseIntro /><motion.div className="arise-progress" style={{ scaleX: progress }} /><AriseHeader /><main><AriseHero onPlay={() => setVideoOpen(true)} /><div className="arise-marquee"><div>ARISE NAGALAND ✦ WORSHIP ✦ MISSION ✦ COMMUNITY ✦ RESPONSE ✦ ARISE NAGALAND ✦ WORSHIP ✦ MISSION ✦ COMMUNITY ✦ RESPONSE ✦</div></div><WhyArise /><Experience /><Program /><Voices /><Registration /><FAQ /></main><AriseFooter /><AriseVideo open={videoOpen} onClose={() => setVideoOpen(false)} /><MobileDock active="Arise" /></div>;
}
