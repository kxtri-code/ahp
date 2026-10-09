import { useEffect, useState } from 'react';
import { AnimatePresence, motion, useScroll, useSpring } from 'framer-motion';
import AriseNagaland from './AriseNagaland';
import JoinMovement from './JoinMovement';
import {
  ArrowDown, ArrowRight, ArrowUpRight, BookOpen, ChevronRight,
  Globe2, Handshake, Heart, Mail, MapPin, Menu, Play, Quote,
  Send, Sprout, Users, X,
} from 'lucide-react';

const CURRENT_YEAR = 2026;

const navItems = [
  ['Our story', 'story'],
  ['What we do', 'work'],
  ['Where we serve', 'countries'],
  ['Our vision', 'vision'],
];

const missionSteps = [
  { number: '01', icon: Users, title: 'Recruit', copy: 'We identify new Christians in unreached areas and pastors in local churches who are called to missions.', image: '/media/portrait-nepal.jpg' },
  { number: '02', icon: BookOpen, title: 'Train', copy: 'We provide cross-cultural, theological and practical training rooted in the local context.', image: '/media/mission-field.jpg' },
  { number: '03', icon: Send, title: 'Send', copy: 'We prayerfully send local missionaries in small teams to places where the Gospel has not been heard.', image: '/media/mountains.jpg' },
  { number: '04', icon: Handshake, title: 'Partner', copy: 'We partner with local churches to sustain missions and cultivate communities of faith for generations.', image: '/media/team.jpg' },
];

const countries = [
  { name: 'India', label: 'The highlands of Northeast India', image: '/media/highlands.jpg', position: '50% 52%' },
  { name: 'Nepal', label: 'Mountain communities across Nepal', image: '/media/portrait-nepal.jpg', position: '50% 45%' },
  { name: 'Bhutan', label: 'Remote communities in the Himalayas', image: '/media/mountains.jpg', position: '50% 45%' },
  { name: 'Myanmar', label: 'Communities throughout Myanmar', image: '/media/tea-picker.jpg', position: '50% 42%' },
];

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
          {navItems.map(([label, id]) => <a key={id} href={`#${id}`}>{label}</a>)}
          <a className="event-link" href="/arise-nagaland">Arise Nagaland</a>
        </nav>
        <a className="nav-cta" href="/join">Join the movement <ArrowUpRight size={16} /></a>
        <button className="menu-toggle" onClick={() => setOpen(true)} aria-label="Open menu"><Menu /></button>
      </header>
      <AnimatePresence>
        {open && (
          <motion.div className="mobile-menu" initial={{ opacity: 0, y: -20 }} animate={{ opacity: 1, y: 0 }} exit={{ opacity: 0, y: -20 }}>
            <div className="mobile-menu__top"><BrandMark /><button onClick={() => setOpen(false)} aria-label="Close menu"><X /></button></div>
            <nav>
              {navItems.map(([label, id], index) => (
                <motion.a key={id} href={`#${id}`} onClick={() => setOpen(false)} initial={{ opacity: 0, x: -20 }} animate={{ opacity: 1, x: 0 }} transition={{ delay: index * 0.07 }}>
                  <span>0{index + 1}</span>{label}<ChevronRight />
                </motion.a>
              ))}
              <a href="/arise-nagaland"><span>✦</span>Arise Nagaland<ChevronRight /></a>
              <a className="mobile-menu__cta" href="/join" onClick={() => setOpen(false)}>Join the movement <ArrowUpRight /></a>
            </nav>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
}

function VideoModal({ open, onClose }) {
  useEffect(() => {
    if (!open) return undefined;
    const onKey = (event) => event.key === 'Escape' && onClose();
    window.addEventListener('keydown', onKey);
    document.body.classList.add('modal-open');
    return () => { window.removeEventListener('keydown', onKey); document.body.classList.remove('modal-open'); };
  }, [open, onClose]);

  return (
    <AnimatePresence>
      {open && (
        <motion.div className="video-modal" initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }} onClick={onClose}>
          <button className="video-modal__close" onClick={onClose} aria-label="Close video"><X /></button>
          <motion.div className="video-modal__frame" initial={{ scale: 0.92, y: 30 }} animate={{ scale: 1, y: 0 }} exit={{ scale: 0.96 }} onClick={(event) => event.stopPropagation()}>
            <iframe src="https://www.youtube.com/embed/GvZNVkmBvos?autoplay=1&rel=0" title="Asia Highland Partners - Reaching the Unreached" allow="autoplay; encrypted-media; picture-in-picture" allowFullScreen />
          </motion.div>
        </motion.div>
      )}
    </AnimatePresence>
  );
}

function Hero({ onPlay }) {
  return (
    <section id="home" className="hero">
      <div className="hero__media" aria-hidden="true"><iframe src="https://www.youtube.com/embed/GvZNVkmBvos?autoplay=1&mute=1&controls=0&loop=1&playlist=GvZNVkmBvos&playsinline=1&rel=0&modestbranding=1" tabIndex="-1" title="" /></div>
      <div className="hero__fallback" /><div className="hero__wash" /><div className="hero__grain" />
      <div className="hero__content page-shell">
        <motion.p className="eyebrow eyebrow--light" initial={{ opacity: 0, y: 16 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.45 }}>From the highlands · To the nations</motion.p>
        <motion.h1 initial={{ opacity: 0, y: 55 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.15, duration: 1, ease: [0.22, 1, 0.36, 1] }}>Reaching the<br /><em>unreached.</em></motion.h1>
        <motion.p className="hero__intro" initial={{ opacity: 0, y: 22 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.65, duration: 0.7 }}>Equipping South Asian missionaries to carry the hope of Jesus to communities where His name has never been heard.</motion.p>
        <motion.div className="hero__actions" initial={{ opacity: 0 }} animate={{ opacity: 1 }} transition={{ delay: 0.9 }}>
          <a className="button button--orange" href="#story">Discover our mission <ArrowDown size={17} /></a>
          <button className="play-button" onClick={onPlay}><span><Play fill="currentColor" size={16} /></span> Watch our story</button>
        </motion.div>
      </div>
      <div className="hero__side-note"><span>India</span><span>Nepal</span><span>Bhutan</span><span>Myanmar</span></div>
      <div className="hero__scroll"><span>Scroll to explore</span><div /></div>
    </section>
  );
}

function IntroStory() {
  return (
    <section id="story" className="story section-pad"><div className="page-shell">
      <motion.div className="story__headline" variants={reveal} initial="hidden" whileInView="visible" viewport={{ once: true, amount: 0.3 }}>
        <p className="eyebrow">Making His name known</p><h2>A mission born in the mountains—<span>moving beyond them.</span></h2>
      </motion.div>
      <div className="story__grid">
        <motion.figure className="story__image" initial={{ clipPath: 'inset(0 100% 0 0)' }} whileInView={{ clipPath: 'inset(0 0% 0 0)' }} viewport={{ once: true }} transition={{ duration: 1.1, ease: [0.22, 1, 0.36, 1] }}>
          <img src="/media/mountains.jpg" alt="A man overlooking the highland mountains" /><figcaption><MapPin size={15} /> From the highlands</figcaption>
        </motion.figure>
        <motion.div className="story__copy" variants={reveal} initial="hidden" whileInView="visible" viewport={{ once: true, amount: 0.25 }}>
          <p className="lead">Asia Highland Partners recruits, trains and disciples South Asian missionaries to reach the unreached people groups of South Asia.</p>
          <p>Once, highlanders called for the Gospel. Today, those same mountain communities are being equipped to carry the Good News to valleys, islands and the ends of the earth.</p>
          <a className="text-link" href="#vision">Read the founder’s vision <ArrowRight size={17} /></a>
        </motion.div>
        <motion.div className="story__stat" variants={reveal} initial="hidden" whileInView="visible" viewport={{ once: true }}>
          <span className="story__stat-number">88<sup>%</sup></span><p>of people groups across our four focus countries remain unreached.</p>
        </motion.div>
      </div>
    </div></section>
  );
}

function MissionSection() {
  return (
    <section id="work" className="mission section-pad"><div className="page-shell">
      <div className="section-heading section-heading--light">
        <div><p className="eyebrow eyebrow--light">Our model</p><h2>Local roots.<br />Lasting impact.</h2></div>
        <p>Our approach is simple and sustainable: invest in local leaders who understand the language, culture and spiritual landscape of the communities they serve.</p>
      </div>
      <div className="mission-grid">
        {missionSteps.map((step) => { const Icon = step.icon; return (
          <motion.article className="mission-card" key={step.title} variants={reveal} initial="hidden" whileInView="visible" viewport={{ once: true, amount: 0.22 }}>
            <img src={step.image} alt="" /><div className="mission-card__shade" />
            <div className="mission-card__top"><span>{step.number}</span><Icon /></div>
            <div className="mission-card__content"><h3>{step.title}</h3><p>{step.copy}</p></div>
          </motion.article>
        ); })}
      </div>
    </div></section>
  );
}

function CountriesSection() {
  const [active, setActive] = useState(0);
  const country = countries[active];
  return (
    <section id="countries" className="countries section-pad"><div className="page-shell">
      <div className="section-heading"><div><p className="eyebrow">Where we serve</p><h2>Four nations.<br />One calling.</h2></div><p>Across these four countries are 2,461 distinct people groups. Geography, language and restrictions keep many beyond the reach of traditional missions.</p></div>
      <div className="countries__experience">
        <div className="countries__list" role="tablist" aria-label="AHP focus countries">
          {countries.map((item, index) => <button key={item.name} className={index === active ? 'is-active' : ''} onMouseEnter={() => setActive(index)} onFocus={() => setActive(index)} onClick={() => setActive(index)} role="tab" aria-selected={index === active}><span>0{index + 1}</span><strong>{item.name}</strong><ArrowUpRight /></button>)}
        </div>
        <div className="countries__visual">
          <AnimatePresence mode="wait"><motion.img key={country.name} src={country.image} alt={country.label} style={{ objectPosition: country.position }} initial={{ opacity: 0, scale: 1.05 }} animate={{ opacity: 1, scale: 1 }} exit={{ opacity: 0 }} transition={{ duration: 0.6 }} /></AnimatePresence>
          <div className="countries__label"><MapPin size={18} /><span>{country.label}</span></div>
          <div className="countries__badge"><Globe2 /><strong>2,461</strong><span>people groups</span></div>
        </div>
      </div>
    </div></section>
  );
}

function ScriptureBand() {
  return <section className="scripture"><div className="scripture__image" /><div className="scripture__overlay" /><motion.div className="scripture__content page-shell" variants={reveal} initial="hidden" whileInView="visible" viewport={{ once: true, amount: 0.3 }}><Quote /><blockquote>How beautiful upon the mountains are the feet of him who brings good news.</blockquote><cite>Isaiah 52:7</cite></motion.div></section>;
}

function VisionSection() {
  return (
    <section id="vision" className="vision section-pad"><div className="page-shell vision__grid">
      <motion.div className="vision__portrait" initial={{ opacity: 0, x: -40 }} whileInView={{ opacity: 1, x: 0 }} viewport={{ once: true }} transition={{ duration: 0.85 }}><img src="/media/woman-outdoors.jpg" alt="A woman in a highland community" /><div className="vision__prism"><img src="/media/ahp-logo.png" alt="" /></div></motion.div>
      <motion.div className="vision__copy" variants={reveal} initial="hidden" whileInView="visible" viewport={{ once: true, amount: 0.2 }}>
        <p className="eyebrow">Our vision</p><h2>Highlanders carrying hope.</h2>
        <p className="lead">“It is time for Highlanders to take up the mantle of the Great Commission—to reach the lost sheep in South Asia.”</p>
        <p>God has given us a burden for the most unreached people groups of South Asia. We invite you to pray and partner with us in equipping local believers to go and make disciples of Jesus Christ.</p>
        <div className="signature"><span>In Christ,</span><strong>Husezo Rhakho</strong><small>Founder &amp; President</small></div>
      </motion.div>
    </div></section>
  );
}

function MapSection() {
  return (
    <section className="map-section section-pad"><div className="page-shell">
      <div className="map-section__intro"><div><p className="eyebrow eyebrow--light">The unfinished task</p><h2>Look beyond<br />the familiar.</h2></div><div><p>The red points represent people groups where access to the Gospel is limited or unavailable.</p><span className="map-key"><i /> Unreached people groups</span></div></div>
      <motion.div className="map-frame" initial={{ opacity: 0, y: 30 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} transition={{ duration: 0.9 }}><img src="/media/unreached-world-map.jpg" alt="World map showing the global distribution of reached and unreached people groups" /><span className="map-pulse map-pulse--one" /><span className="map-pulse map-pulse--two" /></motion.div>
      <p className="map-source">Map source: Joshua Project · July 2020</p>
    </div></section>
  );
}

function PartnerSection() {
  return (
    <section id="partner" className="partner"><div className="partner__rays" aria-hidden="true"><i /><i /><i /><i /><i /></div><div className="page-shell partner__content">
      <motion.div variants={reveal} initial="hidden" whileInView="visible" viewport={{ once: true, amount: 0.3 }}><p className="eyebrow">Take your place in the story</p><h2>Small efforts.<br /><em>Kingdom change.</em></h2></motion.div>
      <motion.div className="partner__actions" variants={reveal} initial="hidden" whileInView="visible" viewport={{ once: true }}><p>Your prayer, generosity and partnership help equip local missionaries to go where few others can.</p><div><a className="button button--navy" href="/join">Volunteer with us <Users size={17} /></a><a className="button button--outline-dark" href="https://actswaco.churchcenter.com/giving/to/asia-highland-partners" target="_blank" rel="noreferrer">Give now <Heart size={17} /></a></div></motion.div>
    </div></section>
  );
}

function Footer() {
  return (
    <footer className="footer"><div className="page-shell">
      <div className="footer__top"><BrandMark /><p>Reaching the unreached through locally cultivated, sustainable missions.</p><a href="mailto:asiahighlandpartners@gmail.com"><Mail /> asiahighlandpartners@gmail.com</a></div>
      <div className="footer__grid"><div><span>India</span><p>Nagaland, India</p></div><div><span>United States</span><p>300 S 13th Street<br />Waco, TX 76701</p></div><div className="footer__nav"><span>Explore</span>{navItems.map(([label, id]) => <a href={`#${id}`} key={id}>{label}</a>)}<a href="/join">Join the movement</a><a href="/arise-nagaland">Arise Nagaland</a></div><div className="footer__social"><span>Follow</span><div><a href="https://www.facebook.com/profile.php?id=100079909465858" aria-label="Facebook">f</a><a href="https://www.youtube.com/@asiahighlandpartners4143" aria-label="YouTube">▶</a><a href="mailto:asiahighlandpartners@gmail.com" aria-label="Email Asia Highland Partners">@</a></div></div></div>
      <div className="footer__bottom"><span>© {CURRENT_YEAR} Asia Highland Partners</span><span>From the highlands, to the highlands.</span></div>
    </div></footer>
  );
}

function App() {
  const [videoOpen, setVideoOpen] = useState(false);
  const { scrollYProgress } = useScroll();
  const progress = useSpring(scrollYProgress, { stiffness: 100, damping: 30, restDelta: 0.001 });
  if (window.location.pathname.startsWith('/arise-nagaland')) return <AriseNagaland />;
  if (window.location.pathname.startsWith('/join')) return <JoinMovement />;
  return <><motion.div className="scroll-progress" style={{ scaleX: progress }} /><Navigation /><main><Hero onPlay={() => setVideoOpen(true)} /><div className="mission-strip"><span>Making the name of Jesus Christ known</span><Sprout /><span>Locally cultivated missions</span><Globe2 /><span>South Asia</span></div><IntroStory /><MissionSection /><CountriesSection /><ScriptureBand /><VisionSection /><MapSection /><PartnerSection /></main><Footer /><VideoModal open={videoOpen} onClose={() => setVideoOpen(false)} /></>;
}

export default App;
