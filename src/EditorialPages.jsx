import { useEffect, useMemo, useState } from 'react';
import { AnimatePresence, motion } from 'framer-motion';
import { ArrowLeft, ArrowRight, ArrowUpRight, Calendar, ChevronDown, Mail, MapPin, Menu, Quote, X } from 'lucide-react';
import { useSiteContent } from './contentStore';
import MobileDock from './MobileDock';
import './editorial.css';

function EditorialLogo() {
  return <a className="editorial-logo" href="/"><img src="/media/ahp-logo.png" alt="" /><span>Asia Highland<br />Partners</span></a>;
}

function EditorialHeader({ active }) {
  const [open, setOpen] = useState(false);
  const links = [['Our Story', '/our-story'], ['Team', '/team'], ['Blog', '/blog'], ['Arise Nagaland', '/arise-nagaland']];
  return <><header className="editorial-header"><EditorialLogo /><nav>{links.map(([label, href]) => <a className={active === label ? 'is-active' : ''} href={href} key={href}>{label}</a>)}</nav><a className="editorial-header__cta" href="/join">Join the movement <ArrowUpRight /></a><button onClick={() => setOpen(true)} aria-label="Open menu"><Menu /></button></header><AnimatePresence>{open && <motion.div className="editorial-mobile" initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }}><div><EditorialLogo /><button onClick={() => setOpen(false)}><X /></button></div><nav>{links.map(([label, href]) => <a href={href} key={href}>{label}<ArrowRight /></a>)}<a href="/join">Join the movement <ArrowRight /></a></nav></motion.div>}</AnimatePresence></>;
}

function EditorialFooter() {
  return <footer className="editorial-footer"><div className="editorial-shell"><EditorialLogo /><p>Locally cultivated, sustainable mission across South Asia.</p><div><a href="/our-story">Our Story</a><a href="/team">Team</a><a href="/blog">Blog</a><a href="/cms">Site manager</a></div></div><div className="editorial-shell editorial-footer__bottom"><span>© 2026 Asia Highland Partners</span><a href="mailto:asiahighlandpartners@gmail.com"><Mail /> asiahighlandpartners@gmail.com</a></div></footer>;
}

function PageShell({ active, children, className = '' }) {
  useEffect(() => { window.scrollTo(0, 0); }, []);
  const dockActive = active === 'Blog' ? 'Stories' : '';
  return <div className={`editorial-page ${className}`}><EditorialHeader active={active} /><main>{children}</main><EditorialFooter /><MobileDock active={dockActive} /></div>;
}

export function TeamPage() {
  const { team } = useSiteContent();
  const [selected, setSelected] = useState(null);
  useEffect(() => { document.title = 'Our Team | Asia Highland Partners'; }, []);
  return <PageShell active="Team" className="team-page"><section className="editorial-hero editorial-hero--team"><div className="editorial-shell"><p className="editorial-eyebrow">People behind the mission</p><h1>Local leaders.<br /><em>Shared calling.</em></h1><p>Meet the people cultivating partnerships, equipping leaders and strengthening mission from the highlands to the nations.</p></div></section><section className="team-section"><div className="editorial-shell"><div className="editorial-section-head"><div><p className="editorial-eyebrow">Our people</p><h2>Serving together,<br />across every detail.</h2></div><p>These profiles are illustrative demo content and can be replaced by the client from the site manager.</p></div><div className="team-grid">{team.map((person, index) => <motion.button className="team-card" key={person.id} onClick={() => setSelected(person)} initial={{ opacity: 0, y: 24 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }}><div className="team-card__portrait" style={{ backgroundImage: `url(${person.portrait})`, backgroundPosition: person.position || 'center', backgroundSize: person.portrait.includes('team-portraits-demo') ? '300% 200%' : 'cover' }} /><div><span>0{index + 1}</span><h3>{person.name}</h3><p>{person.role}</p><small><MapPin />{person.location}</small></div><ArrowUpRight /></motion.button>)}</div></div></section><AnimatePresence>{selected && <motion.div className="profile-modal" initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }} onClick={() => setSelected(null)}><motion.article initial={{ y: 30, scale: .97 }} animate={{ y: 0, scale: 1 }} onClick={(event) => event.stopPropagation()}><button onClick={() => setSelected(null)} aria-label="Close profile"><X /></button><div className="profile-modal__portrait" style={{ backgroundImage: `url(${selected.portrait})`, backgroundPosition: selected.position || 'center', backgroundSize: selected.portrait.includes('team-portraits-demo') ? '300% 200%' : 'cover' }} /><div><p className="editorial-eyebrow">{selected.role}</p><h2>{selected.name}</h2><span><MapPin />{selected.location}</span><p>{selected.bio}</p><a href="mailto:asiahighlandpartners@gmail.com">Connect through AHP <Mail /></a></div></motion.article></motion.div>}</AnimatePresence></PageShell>;
}

export function BlogPage() {
  const { blogs } = useSiteContent();
  const published = blogs.filter((post) => post.published !== false);
  const [selected, setSelected] = useState(null);
  useEffect(() => { document.title = 'Journal | Asia Highland Partners'; }, []);
  const featured = published[0];
  return <PageShell active="Blog" className="blog-page"><section className="editorial-hero editorial-hero--blog"><div className="editorial-shell"><p className="editorial-eyebrow">Stories, reflections and field notes</p><h1>The AHP<br /><em>Journal.</em></h1><p>Thoughtful updates from a locally led mission—written to help churches pray, understand and participate.</p></div></section>{featured && <section className="blog-feature editorial-shell"><button onClick={() => setSelected(featured)}><img src={featured.image} alt="" /><div><span>{featured.category}</span><h2>{featured.title}</h2><p>{featured.excerpt}</p><small><Calendar />{new Date(`${featured.date}T00:00:00`).toLocaleDateString('en-IN', { day: 'numeric', month: 'long', year: 'numeric' })}</small></div></button></section>}<section className="blog-list"><div className="editorial-shell"><div className="editorial-section-head"><div><p className="editorial-eyebrow">Latest writing</p><h2>Read, reflect,<br />respond.</h2></div><p>Demo articles are ready to edit, publish or replace from the CMS.</p></div><div className="blog-grid">{published.slice(1).map((post) => <button key={post.id} onClick={() => setSelected(post)}><img src={post.image} alt="" /><span>{post.category}</span><h3>{post.title}</h3><p>{post.excerpt}</p><small>Read story <ArrowRight /></small></button>)}</div></div></section><AnimatePresence>{selected && <motion.div className="article-modal" initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }}><header><button onClick={() => setSelected(null)}><ArrowLeft /> Back to journal</button><EditorialLogo /></header><article><img src={selected.image} alt="" /><div className="article-modal__body"><p className="editorial-eyebrow">{selected.category}</p><h1>{selected.title}</h1><div className="article-byline"><span>{selected.author}</span><span>{new Date(`${selected.date}T00:00:00`).toLocaleDateString('en-IN', { day: 'numeric', month: 'long', year: 'numeric' })}</span></div>{selected.body.split('\n\n').map((paragraph) => <p key={paragraph}>{paragraph}</p>)}<blockquote><Quote />Every story is an invitation to pray, participate and carry hope further.</blockquote></div></article></motion.div>}</AnimatePresence></PageShell>;
}

export function StoryPage() {
  const { stories } = useSiteContent();
  const months = useMemo(() => ['All of 2026', ...new Set(stories.map((story) => story.month))], [stories]);
  const [month, setMonth] = useState('All of 2026');
  const visible = month === 'All of 2026' ? stories : stories.filter((story) => story.month === month);
  useEffect(() => { document.title = 'Our Story | Asia Highland Partners'; }, []);
  return <PageShell active="Our Story" className="story-page"><section className="editorial-hero editorial-hero--story"><div className="editorial-shell"><p className="editorial-eyebrow">Our story</p><h1>Faithful steps.<br /><em>Living history.</em></h1><p>Follow the unfolding story of churches, leaders and communities learning to carry the Gospel from the highlands to the nations.</p></div></section><section className="story-archive"><div className="editorial-shell"><div className="story-archive__controls"><div><p className="editorial-eyebrow">Story archive</p><h2>Explore the journey.</h2></div><label>Choose a month <span><select value={month} onChange={(event) => setMonth(event.target.value)}>{months.map((item) => <option key={item}>{item}</option>)}</select><ChevronDown /></span></label></div><div className="story-timeline">{visible.map((story, index) => <motion.article key={story.id} initial={{ opacity: 0, y: 26 }} animate={{ opacity: 1, y: 0 }}><div className="story-timeline__date"><span>{story.month}</span><strong>{String(index + 1).padStart(2, '0')}</strong></div><img src={story.image} alt="" /><div><h3>{story.title}</h3><p>{story.summary}</p><a href="/blog">Continue in the journal <ArrowRight /></a></div></motion.article>)}</div></div></section><section className="story-origin"><div className="editorial-shell"><p className="editorial-eyebrow">The thread beneath every chapter</p><h2>Received with gratitude.<br />Carried with courage.</h2><p>Asia Highland Partners exists to recruit, train and disciple South Asian missionaries to reach unreached people groups through locally cultivated, sustainable mission.</p><a href="/join">Take your place in the story <ArrowUpRight /></a></div></section></PageShell>;
}
