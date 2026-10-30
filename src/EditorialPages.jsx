import { useEffect, useState } from 'react';
import { AnimatePresence, motion } from 'framer-motion';
import { ArrowLeft, ArrowRight, ArrowUpRight, Calendar, Mail, MapPin, Menu, Quote, X } from 'lucide-react';
import { useSiteContent } from './contentStore';
import MobileDock from './MobileDock';
import './editorial.css';
import './header-consistency.css';

const GIVE_URL = 'https://actswaco.churchcenter.com/giving/to/asia-highland-partners';

function EditorialLogo() {
  return <a className="editorial-logo" href="/"><img src="/media/ahp-logo.png" alt="" /><span>Asia Highland<br />Partners</span></a>;
}

function EditorialHeader({ active }) {
  const [open, setOpen] = useState(false);
  const links = [['Our Story', '/our-story'], ['Team', '/team'], ['Blog', '/blog'], ['Arise Nagaland', '/arise-nagaland']];
  return <><header className="editorial-header"><EditorialLogo /><nav>{links.map(([label, href]) => <a className={active === label ? 'is-active' : ''} href={href} key={href}>{label}</a>)}</nav><div className="editorial-header__actions"><a className="editorial-header__cta editorial-header__cta--join" href="/join">Join the movement <ArrowUpRight /></a><a className="editorial-header__cta" href={GIVE_URL} target="_blank" rel="noreferrer">Give now <ArrowUpRight /></a></div><button onClick={() => setOpen(true)} aria-label="Open menu"><Menu /></button></header><AnimatePresence>{open && <motion.div className="editorial-mobile" initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }}><div><EditorialLogo /><button onClick={() => setOpen(false)}><X /></button></div><nav>{links.map(([label, href]) => <a href={href} key={href}>{label}<ArrowRight /></a>)}<a className="editorial-mobile__join" href="/join">Join the movement <ArrowRight /></a><a className="editorial-mobile__give" href={GIVE_URL} target="_blank" rel="noreferrer">Give now <ArrowUpRight /></a></nav></motion.div>}</AnimatePresence></>;
}

function EditorialFooter() {
  return <footer className="editorial-footer"><div className="editorial-shell"><EditorialLogo /><p>Locally cultivated, sustainable mission across Asia.</p><div><a href="/our-story">Our Story</a><a href="/team">Team</a><a href="/blog">Blog</a><a href="/cms">Site manager</a></div></div><div className="editorial-shell editorial-footer__bottom"><span>© 2026 Asia Highland Partners</span><a href="mailto:asiahighlandpartners@gmail.com"><Mail /> asiahighlandpartners@gmail.com</a></div></footer>;
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
  useEffect(() => { document.title = 'Our Story | Asia Highland Partners'; }, []);
  return <PageShell active="Our Story" className="story-page"><section className="editorial-hero editorial-hero--story"><div className="editorial-shell"><p className="editorial-eyebrow">Our story</p><h1>From the mountains.<br /><em>To the nations.</em></h1><p>A story of calling, formation and indigenous mission—carried by believers who know the language, culture and people they are sent to serve.</p></div></section><section className="story-manifesto"><div className="editorial-shell story-manifesto__grid"><div><p className="editorial-eyebrow">The beginning</p><h2>A calling spoken<br />over a young boy.</h2></div><div><p>Our story begins in a small church in Nagaland, where a thirteen-year-old boy heard the words that would shape his life: God had chosen him, and would send him to the nations.</p><p>Husezo Rhakho grew up in a land once known for head-hunters and later transformed by the Gospel. The story of Nagaland became a story of receiving—and then a story of sending. After theological training, graduate studies in the United States and years of listening to churches across Asia, Asia Highland Partners was formally established in 2022.</p></div></div></section><section className="story-feature"><div className="editorial-shell story-feature__grid"><img src="/media/founder-portrait-web.jpg" alt="Husezo Rhakho, founder of Asia Highland Partners" /><div><p className="editorial-eyebrow">Our conviction</p><h2>Those who have received can become a sending people.</h2><p>We believe the most sustainable mission movements are cultivated from within. Local believers already understand the language, customs, questions and relationships of their communities. They can cross barriers outsiders may never see.</p><p>So AHP recruits, trains and disciples Asian missionaries to reach unreached people groups across Asia through locally led, sustainable and indigenous movements.</p></div></div></section><section className="story-pillars"><div className="editorial-shell"><div className="editorial-section-head"><div><p className="editorial-eyebrow">What we believe</p><h2>A clear vision.<br />A faithful practice.</h2></div><p>Asia Highland Partners is a non-denominational evangelical mission-sending organisation aligned with the Lausanne Covenant and the historic confession of the Christian church.</p></div><div className="story-pillars__grid"><article><span>01</span><h3>Our vision</h3><p>To reach the unreached people groups of Asia and make the name of Jesus Christ known among every tribe, tongue and nation.</p></article><article><span>02</span><h3>Our mission</h3><p>To recruit, train and disciple Asian missionaries through locally driven, sustainable mission movements.</p></article><article><span>03</span><h3>Our long-term goal</h3><p>To see 100 unreached people groups reached in 20 years through trained indigenous missionaries, prayer and generous partners.</p></article></div></div></section><section className="story-rhythm"><div className="editorial-shell"><p className="editorial-eyebrow">The AHP way</p><h2>Recruit. Train. Send.<br /><em>Sustain.</em></h2><div className="story-rhythm__steps"><div><strong>Recruit</strong><p>Recognise people already rooted in communities beyond the reach of the Gospel.</p></div><div><strong>Train</strong><p>Form missionaries through Scripture, theology, practical skills and contextual wisdom.</p></div><div><strong>Send</strong><p>Support small teams as they carry the hope of Jesus into new places.</p></div><div><strong>Sustain</strong><p>Walk with local churches and leaders for the long journey of faithful ministry.</p></div></div></div></section><section className="story-impact"><div className="editorial-shell"><div className="editorial-section-head"><div><p className="editorial-eyebrow">Since 2022</p><h2>Signs of grace<br />across Asia.</h2></div><p>Every number represents a person, a church, a prayer and a community taking a next step toward the good news.</p></div><div className="story-impact__stats"><strong>46<small>baptisms</small></strong><strong>12<small>missionaries deployed</small></strong><strong>5<small>unreached tribal groups reached</small></strong><strong>100<small>people reached in 2025</small></strong></div></div></section><section className="story-origin"><div className="editorial-shell"><p className="editorial-eyebrow">The invitation</p><h2>Pray. Give. Go.</h2><p>There are more than 3,600 unreached people groups across Asia. We are asking churches, leaders and friends to take their place in the story—to pray with us, give generously and consider where God may be sending them.</p><a href="/join">Take your place in the story <ArrowUpRight /></a><a className="story-origin__journal" href="/blog">Read the AHP Journal <ArrowRight /></a></div></section></PageShell>;
}

export function DetailedStoryPage() {
  useEffect(() => { document.title = 'Our Story | Asia Highland Partners'; }, []);
  const { ourStory, homepage } = useSiteContent();
  return <PageShell active="Our Story" className="story-page story-page--detailed">
    <section className="editorial-hero editorial-hero--story">
      <div className="editorial-shell">
        <p className="editorial-eyebrow">Asia Highland Partners · Our story</p>
        <h1>From the mountains.<br /><em>To the nations.</em></h1>
        <p>Asia Highland Partners is an indigenous, evangelical mission-sending organisation equipping Asian believers to reach the unreached people groups of Asia.</p>
      </div>
    </section>
    <section className="story-long-intro">
      <div className="editorial-shell story-long-intro__grid">
        <div><p className="editorial-eyebrow">Who we are</p><h2>A mission shaped by the people who are already there.</h2></div>
        <div>
          <p>Asia Highland Partners is a non-denominational Christian mission-sending organisation based in Nagaland, India, and the United States. We formed to reach places where there is no access to the Gospel and the name of Jesus Christ has never been heard.</p>
          <p>Our leadership brings together people from the United States and Asia who are committed to sharing the Good News of Jesus Christ and fulfilling the Great Commission (Matthew 28:18–20). We recruit, train and disciple Asian missionaries through locally driven, sustainable and indigenous mission movements.</p>
          <p>We believe mission is strongest when it grows from within. Local believers understand the language, culture, history and relationships of their communities. They can listen with humility, build trust over time and help local churches take root with dignity.</p>
        </div>
      </div>
    </section>
    <section className="story-founder-detail">
      <div className="editorial-shell story-founder-detail__grid">
        <img src={homepage.founderImage || '/media/founder-portrait-web.jpg'} alt="Husezo Rhakho, founder and president of Asia Highland Partners" />
        <div>
          <p className="editorial-eyebrow">The story behind the mission</p>
          <h2>“God had chosen him, and would send him to the nations.”</h2>
          <p>Husezo Rhakho grew up in Nagaland, a place whose story moved from head-hunters to church planters. As a thirteen-year-old boy in a small church, he began to sense a call beyond his own hills. That call was not an escape from his people; it was an invitation to see the highlands become a sending place.</p>
          <p>After theological training beginning in 2014, Husezo pursued a master’s degree at Gordon-Conwell Theological Seminary and studied World Christianity at Baylor University. Those years deepened a conviction: the next great movement to the unreached will be carried by Asian believers who are close enough to understand the people they serve.</p>
          <p>Asia Highland Partners was formally established in 2022. From the beginning, AHP has sought to serve local churches rather than replace them—to help identify, form, send and sustain workers who can remain accountable to the communities that raised them.</p>
        </div>
      </div>
    </section>
    <section className="story-numbers">
      <div className="editorial-shell">
        <p className="editorial-eyebrow">The need that drives us</p>
        <h2>The Gospel has travelled far.<br /><em>There is still further to go.</em></h2>
        <div className="story-numbers__grid">
          <article><strong>4.2M</strong><p>full-time Christian workers serve around the world.</p></article>
          <article><strong>95%</strong><p>are working where the Gospel has already been shared, often in cities.</p></article>
          <article><strong>&lt;1%</strong><p>of these workers are deployed to mountains and islands where the Gospel has not been heard and no local Christians are present.</p></article>
        </div>
        <p className="story-numbers__note">These figures are drawn from AHP’s “Who We Are” materials. They point to the need for faithful, locally cultivated mission among communities that remain hard to reach.</p>
      </div>
    </section>
    <section className="story-work-detail">
      <div className="editorial-shell">
        <div className="editorial-section-head">
          <div><p className="editorial-eyebrow">What we do</p><h2>Four movements.<br />One faithful rhythm.</h2></div>
          <p>Our model is simple enough to remember and deep enough to sustain a lifetime of ministry.</p>
        </div>
        <div className="story-work-detail__grid">
          <article><span>01</span><h3>Recruit</h3><p>We listen for calling in local churches and identify believers already connected to communities beyond the reach of the Gospel. Recruitment begins with prayer, character and the affirmation of pastors and trusted leaders.</p></article>
          <article><span>02</span><h3>Train</h3><p>We provide theological, cross-cultural and practical preparation. Missionaries learn to study Scripture, understand culture, build healthy teams, care for their own souls and serve without imposing an outside model.</p></article>
          <article><span>03</span><h3>Send</h3><p>We prayerfully send local missionaries in small teams to places where Jesus is not yet known. They go with the support of churches, mentors and partners who understand that presence takes patience.</p></article>
          <article><span>04</span><h3>Sustain</h3><p>We remain with workers for the long road through pastoral care, prayer, financial partnership, leadership development and honest accountability. Sustainable mission is not a short campaign; it is a community walking together.</p></article>
        </div>
      </div>
    </section>
    <section className="story-drivers">
      <div className="editorial-shell story-drivers__grid">
        <div className="story-drivers__heading"><p className="editorial-eyebrow">What drives us</p><h2>Local understanding.<br /><em>Lasting witness.</em></h2><span className="story-drivers__rule" /></div>
        <div className="story-drivers__copy"><p className="story-drivers__lead">{ourStory.driveLead}</p><p>{ourStory.driveBody}</p><p>{ourStory.driveClose}</p></div>
      </div>
    </section>
    <section className="story-beliefs">
      <div className="editorial-shell">
        <div className="editorial-section-head">
          <div><p className="editorial-eyebrow">What we believe</p><h2>Rooted in faith.<br />Sent in love.</h2></div>
          <p>These shared convictions shape AHP’s mission, guide our service and keep Jesus Christ at the centre of every journey.</p>
        </div>
        <div className="story-beliefs__grid">
          {ourStory.beliefs.map((belief, index) => <article key={belief.title}><span>{String(index + 1).padStart(2, '0')}</span><div><h3>{belief.title}</h3><p>{belief.copy}</p></div></article>)}
        </div>
      </div>
    </section>
    <section className="story-origin"><div className="editorial-shell">
      <p className="editorial-eyebrow">The invitation</p><h2>Pray. Give. Go.</h2>
      <p>Since 2022, 46 people have been baptised, 12 missionaries deployed, five unreached tribal groups reached and more than 100 people reached in 2025. The next chapter will require a whole community around the work.</p>
      <p>Pray for workers and open doors. Give so local missionaries can remain where they are needed. Go if God is inviting you to carry the Gospel across a language, a valley or a border.</p>
      <a href="/join">Take your place in the story <ArrowUpRight /></a><a className="story-origin__journal" href="/blog">Read the AHP Journal <ArrowRight /></a>
    </div></section>
  </PageShell>;
}
