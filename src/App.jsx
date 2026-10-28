import { useEffect, useRef, useState } from 'react';
import { AnimatePresence, motion, useScroll, useSpring } from 'framer-motion';
import AriseNagaland from './AriseNagaland';
import AriseRegister from './AriseRegister';
import JoinMovement from './JoinMovement';
import AdminCMS from './AdminCMS';
import { BlogPage, StoryPage, TeamPage } from './EditorialPages';
import { useSiteContent } from './contentStore';
import {
  ArrowDown, ArrowRight, BookOpen, ChevronRight,
  Globe2, Handshake, Heart, Mail, MapPin, Menu, Quote,
  Send, Sprout, Users, Volume2, VolumeX, X,
} from 'lucide-react';
import MobileDock from './MobileDock';

const CURRENT_YEAR = 2026;
const GIVE_URL = 'https://actswaco.churchcenter.com/giving/to/asia-highland-partners';

const navItems = [
  ['Our story', '/our-story'],
  ['What we do', '/#work'],
  ['Our team', '/team'],
  ['Blog', '/blog'],
];

const missionIcons = [Users, BookOpen, Send, Handshake];

const reveal = {
  hidden: { opacity: 0, y: 32 },
  visible: { opacity: 1, y: 0, transition: { duration: 0.75, ease: [0.22, 1, 0.36, 1] } },
};

function BrandMark() {
  return (
    <a className="brand-mark" href="#home" aria-label="Asia Highland Partners home">
      <span className="brand-mark__symbol"><img src="/media/ahp-logo.png" alt="" /></span>
      <span className="brand-mark__type">Asia Highland<br />Partners</span>
    </a>
  );
}

function SiteIntro() {
  const { general } = useSiteContent();
  const videoRef = useRef(null);
  const [sound, setSound] = useState(false);
  const [mobileReveal, setMobileReveal] = useState(() => window.matchMedia('(max-width: 560px)').matches);
  const [visible, setVisible] = useState(() => sessionStorage.getItem('ahp-intro-seen') !== 'yes');
  const dismiss = () => {
    sessionStorage.setItem('ahp-intro-seen', 'yes');
    setVisible(false);
  };
  useEffect(() => {
    if (!visible) return undefined;
    document.body.classList.add('intro-open');
    const fallback = window.setTimeout(dismiss, 6800);
    return () => { document.body.classList.remove('intro-open'); window.clearTimeout(fallback); };
  }, [visible]);
  useEffect(() => {
    const query = window.matchMedia('(max-width: 560px)');
    const sync = () => setMobileReveal(query.matches);
    query.addEventListener('change', sync);
    return () => query.removeEventListener('change', sync);
  }, []);
  const toggleSound = () => {
    const video = videoRef.current;
    if (!video) return;
    video.muted = sound;
    setSound(!sound);
    video.play().catch(() => {});
  };
  return <AnimatePresence>{visible && <motion.div className="site-intro" initial={{ opacity: 1 }} exit={{ opacity: 0, scale: 1.025 }} transition={{ duration: .8 }}>
    <video ref={videoRef} autoPlay muted playsInline onEnded={dismiss} onLoadedMetadata={(event) => { event.currentTarget.playbackRate = Number(general.logoRevealSpeed) || 1.7; }}><source src={mobileReveal ? general.logoRevealMobileVideo : general.logoRevealVideo} type="video/mp4" /></video>
    <div className="site-intro__controls"><button onClick={toggleSound} aria-pressed={sound}>{sound ? <Volume2 /> : <VolumeX />}{sound ? 'Sound on' : 'Tap for sound'}</button><button onClick={dismiss}>Enter website <ArrowRight /></button></div>
  </motion.div>}</AnimatePresence>;
}

function Navigation() {
  const [open, setOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);
  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 40);
    onScroll();
    window.addEventListener('scroll', onScroll, { passive: true });
    return () => window.removeEventListener('scroll', onScroll);
  }, []);

  return (
    <>
      <header className={`site-header ${scrolled ? 'is-scrolled' : ''}`}>
        <BrandMark />
        <nav className="desktop-nav" aria-label="Primary navigation">
          {navItems.map(([label, href]) => <a key={href} href={href}>{label}</a>)}
          <a className="event-link" href="/arise-nagaland">Arise Nagaland</a>
        </nav>
        <a className="nav-cta" href={GIVE_URL} target="_blank" rel="noreferrer">Give now <Heart size={16} /></a>
        <button className="menu-toggle" onClick={() => setOpen(true)} aria-label="Open menu"><Menu /></button>
      </header>
      <AnimatePresence>
        {open && (
          <motion.div className="mobile-menu" initial={{ opacity: 0, y: -20 }} animate={{ opacity: 1, y: 0 }} exit={{ opacity: 0, y: -20 }}>
            <div className="mobile-menu__top"><BrandMark /><button onClick={() => setOpen(false)} aria-label="Close menu"><X /></button></div>
            <nav>
              {navItems.map(([label, href], index) => (
                <motion.a key={href} href={href} onClick={() => setOpen(false)} initial={{ opacity: 0, x: -20 }} animate={{ opacity: 1, x: 0 }} transition={{ delay: index * 0.07 }}>
                  <span>0{index + 1}</span>{label}<ChevronRight />
                </motion.a>
              ))}
              <a href="/arise-nagaland"><span>✦</span>Arise Nagaland<ChevronRight /></a>
              <a className="mobile-menu__cta" href={GIVE_URL} target="_blank" rel="noreferrer" onClick={() => setOpen(false)}>Give now <Heart /></a>
            </nav>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
}

function Hero() {
  const { general } = useSiteContent();
  const frameRef = useRef(null);
  const [sound, setSound] = useState(false);
  const toggleSound = () => {
    frameRef.current?.contentWindow?.postMessage(JSON.stringify({ event: 'command', func: sound ? 'mute' : 'unMute', args: [] }), '*');
    setSound(!sound);
  };
  return (
    <section id="home" className="hero hero--map">
      <div className="hero__media"><iframe ref={frameRef} title="Asia Highland Partners mission film" src="https://www.youtube.com/embed/GvZNVkmBvos?autoplay=1&mute=1&controls=0&loop=1&playlist=GvZNVkmBvos&playsinline=1&modestbranding=1&rel=0&enablejsapi=1" allow="autoplay; encrypted-media; picture-in-picture" /></div>
      <div className="hero__wash" /><div className="hero__grain" /><span className="hero__pulse hero__pulse--one" /><span className="hero__pulse hero__pulse--two" />
      <div className="hero__content page-shell">
        <motion.p className="eyebrow eyebrow--light" initial={{ opacity: 0, y: 16 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.45 }}>{general.heroEyebrow}</motion.p>
        <motion.h1 initial={{ opacity: 0, y: 55 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.15, duration: 1, ease: [0.22, 1, 0.36, 1] }}>{general.heroTitle}</motion.h1>
        <motion.p className="hero__intro" initial={{ opacity: 0, y: 22 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.65, duration: 0.7 }}>{general.heroIntro}</motion.p>
        <motion.div className="hero__actions" initial={{ opacity: 0 }} animate={{ opacity: 1 }} transition={{ delay: 0.9 }}>
          <a className="button button--orange" href="#story">Discover our mission <ArrowDown size={17} /></a>
          <button className="hero__secondary hero__sound" onClick={toggleSound}>{sound ? <Volume2 size={16} /> : <VolumeX size={16} />}{sound ? 'Sound on' : 'Tap for sound'}</button>
        </motion.div>
      </div>
      <div className="hero__side-note"><span>India</span><span>Nepal</span><span>Bhutan</span><span>Myanmar</span></div>
      <div className="hero__scroll"><span>Scroll to explore</span><div /></div>
    </section>
  );
}

function IntroStory() {
  const { homepage } = useSiteContent();
  return (
    <section id="story" className="story section-pad"><div className="page-shell">
      <motion.div className="story__headline" variants={reveal} initial="hidden" whileInView="visible" viewport={{ once: true, amount: 0.3 }}>
        <p className="eyebrow">{homepage.storyEyebrow}</p><h2>{homepage.storyTitle}</h2>
      </motion.div>
      <div className="story__grid">
        <motion.figure className="story__image" initial={{ clipPath: 'inset(0 100% 0 0)' }} whileInView={{ clipPath: 'inset(0 0% 0 0)' }} viewport={{ once: true }} transition={{ duration: 1.1, ease: [0.22, 1, 0.36, 1] }}>
          <img src={homepage.storyImage} alt="A missionary walking toward a highland village" /><figcaption><MapPin size={15} /> From the highlands</figcaption>
        </motion.figure>
        <motion.div className="story__copy" variants={reveal} initial="hidden" whileInView="visible" viewport={{ once: true, amount: 0.25 }}>
          <p className="lead">{homepage.storyLead}</p>
          <p>{homepage.storyBody}</p>
          <a className="text-link" href="/our-story">Explore our story archive <ArrowRight size={17} /></a>
        </motion.div>
        <motion.div className="story__stat" variants={reveal} initial="hidden" whileInView="visible" viewport={{ once: true }}>
        <span className="story__stat-number">3,600<sup>+</sup></span><p>unreached people groups across Asia are still waiting to hear.</p>
        </motion.div>
      </div>
    </div></section>
  );
}

function MissionSection() {
  const { missionSteps } = useSiteContent();
  return (
    <section id="work" className="mission section-pad"><div className="page-shell">
      <div className="section-heading section-heading--light">
        <div><p className="eyebrow eyebrow--light">Our model</p><h2>Local roots.<br />Lasting impact.</h2></div>
        <p>Our approach is simple and sustainable: invest in local leaders who understand the language, culture and spiritual landscape of the communities they serve.</p>
      </div>
      <div className="mission-grid">
        {missionSteps.map((step, index) => { const Icon = missionIcons[index % missionIcons.length]; return (
          <motion.article className="mission-card" key={step.title} variants={reveal} initial="hidden" whileInView="visible" viewport={{ once: true, amount: 0.22 }}>
            <img src={step.image} alt="" /><div className="mission-card__shade" />
            <div className="mission-card__top"><span>0{index + 1}</span><Icon /></div>
            <div className="mission-card__content"><h3>{step.title}</h3><p>{step.copy}</p></div>
          </motion.article>
        ); })}
      </div>
    </div></section>
  );
}

function ScriptureBand() {
  return <section className="scripture"><div className="scripture__image" /><div className="scripture__overlay" /><motion.div className="scripture__content page-shell" variants={reveal} initial="hidden" whileInView="visible" viewport={{ once: true, amount: 0.3 }}><Quote /><blockquote>How beautiful upon the mountains are the feet of him who brings good news.</blockquote><cite>Isaiah 52:7</cite></motion.div></section>;
}

function VisionSection() {
  const { homepage } = useSiteContent();
  return (
    <section id="vision" className="vision section-pad"><div className="page-shell vision__grid">
      <motion.div className="vision__portrait" initial={{ opacity: 0, x: -40 }} whileInView={{ opacity: 1, x: 0 }} viewport={{ once: true }} transition={{ duration: 0.85 }}><img src={homepage.founderImage} alt={`${homepage.founderName}, ${homepage.founderRole} of Asia Highland Partners`} /><div className="vision__prism"><img src="/media/ahp-logo.png" alt="" /></div></motion.div>
      <motion.div className="vision__copy" variants={reveal} initial="hidden" whileInView="visible" viewport={{ once: true, amount: 0.2 }}>
        <p className="eyebrow">Our vision</p><h2>Highlanders carrying hope.</h2>
        <p className="lead">“{homepage.founderQuote}”</p>
        <p>{homepage.visionBody}</p>
        <p>{homepage.visionDetails}</p>
        <div className="signature"><span>In Christ,</span><strong>{homepage.founderName}</strong><small>{homepage.founderRole}</small></div>
      </motion.div>
    </div></section>
  );
}

function PartnerSection() {
  return (
    <section id="partner" className="partner"><div className="partner__rays" aria-hidden="true"><i /><i /><i /><i /><i /></div><div className="page-shell partner__content">
      <motion.div variants={reveal} initial="hidden" whileInView="visible" viewport={{ once: true, amount: 0.3 }}><p className="eyebrow">Take your place in the story</p><h2>Small efforts.<br /><em>Kingdom change.</em></h2></motion.div>
      <motion.div className="partner__actions" variants={reveal} initial="hidden" whileInView="visible" viewport={{ once: true }}><p>Your prayer, generosity and partnership help equip local missionaries to go where few others can.</p><div><a className="button button--navy" href="/join">Volunteer with us <Users size={17} /></a><a className="button button--outline-dark partner__give" href={GIVE_URL} target="_blank" rel="noreferrer">Give now <Heart size={17} /></a></div></motion.div>
    </div></section>
  );
}

function Footer() {
  return (
    <footer className="footer"><div className="page-shell">
      <div className="footer__top"><BrandMark /><p>Reaching the unreached through locally cultivated, sustainable missions.</p><a href="mailto:asiahighlandpartners@gmail.com"><Mail /> asiahighlandpartners@gmail.com</a></div>
      <div className="footer__grid"><div><span>India</span><p>Nagaland, India</p></div><div><span>United States</span><p>300 S 13th Street<br />Waco, TX 76701</p></div><div className="footer__nav"><span>Explore</span>{navItems.map(([label, href]) => <a href={href} key={href}>{label}</a>)}<a href={GIVE_URL} target="_blank" rel="noreferrer">Give now</a><a href="/arise-nagaland">Arise Nagaland</a><a href="/cms">Site manager</a></div><div className="footer__social"><span>Follow</span><div><a href="https://www.facebook.com/profile.php?id=100079909465858" aria-label="Facebook">f</a><a href="https://www.youtube.com/@asiahighlandpartners4143" aria-label="YouTube">▶</a><a href="mailto:asiahighlandpartners@gmail.com" aria-label="Email Asia Highland Partners">@</a></div></div></div>
      <div className="footer__bottom"><span>© {CURRENT_YEAR} Asia Highland Partners</span><span>From the highlands, to the highlands.</span></div>
    </div></footer>
  );
}

function App() {
  const { scrollYProgress } = useScroll();
  const progress = useSpring(scrollYProgress, { stiffness: 100, damping: 30, restDelta: 0.001 });
  if (window.location.pathname.startsWith('/cms')) return <AdminCMS />;
  if (window.location.pathname.startsWith('/arise-register')) return <AriseRegister />;
  if (window.location.pathname.startsWith('/arise-nagaland')) return <AriseNagaland />;
  if (window.location.pathname.startsWith('/join')) return <JoinMovement />;
  if (window.location.pathname.startsWith('/team')) return <TeamPage />;
  if (window.location.pathname.startsWith('/blog')) return <BlogPage />;
  if (window.location.pathname.startsWith('/our-story')) return <StoryPage />;
  return <><SiteIntro /><motion.div className="scroll-progress" style={{ scaleX: progress }} /><Navigation /><main><Hero /><div className="mission-strip"><span>Making the name of Jesus Christ known</span><Sprout /><span>Locally cultivated missions</span><Globe2 /><span>Asia</span></div><IntroStory /><MissionSection /><ScriptureBand /><VisionSection /><PartnerSection /></main><Footer /><MobileDock active="Home" /></>;
}

export default App;
