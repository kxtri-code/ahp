import { useEffect, useState } from 'react';

const CONTENT_KEY = 'ahp-site-content-v3';
const RECORDS_KEY = 'ahp-site-records-v2';
const CHANGE_EVENT = 'ahp-content-change';

export const defaultContent = {
  general: {
    heroEyebrow: 'Locally led mission · Across Asia',
    heroTitle: 'Hope for the unreached.',
    heroIntro: 'Equipping local missionaries across Asia.',
    contactEmail: 'asiahighlandpartners@gmail.com',
    heroImage: '/media/reach-map.jpg',
    logoRevealVideo: '/media/ahp-logo-reveal-web.mp4',
    logoRevealMobileVideo: '/media/ahp-logo-reveal-landscape.mp4',
    logoRevealSpeed: 1.7,
  },
  homepage: {
    storyEyebrow: 'Making His name known',
    storyTitle: 'A mission born in the mountains—moving beyond them.',
    storyLead: 'Asia Highland Partners recruits, trains and disciples Asian missionaries to reach unreached people groups across Asia through locally driven, sustainable mission movements.',
    storyBody: 'Our story began with a calling spoken over a thirteen-year-old boy in Nagaland. Today, that calling has become an indigenous missions network—rooted in local churches, shaped by language and culture, and carried by people who already belong to the communities they serve.',
    storyImage: '/media/missionary-journey.jpg',
    missionMapImage: '/media/ahp-global-missions-map.jpg',
    founderImage: '/media/founder-portrait-web.jpg',
    founderName: 'Husezo Rhakho',
    founderRole: 'Founder & President',
    founderQuote: 'It is time for Highlanders to take up the mantle of the Great Commission—to reach the lost sheep in Asia.',
    visionBody: 'To reach the unreached people groups of Asia and make the name of Jesus Christ known among every tribe, tongue and nation.',
    visionDetails: 'AHP is a non-denominational, evangelical mission-sending organization aligned with the Lausanne Covenant. We recruit, train and disciple Asian missionaries through locally driven, sustainable and indigenous mission movements.',
  },
  ourStory: {
    driveLead: 'Reaching the unreached through locally cultivated, sustainable missions.',
    driveBody: 'There are 4.2 million full-time Christian workers, and 95% are working in places where the Gospel has already been shared, often in cities. However, less than 1% of all these missionaries are deployed to mountains and islands—geographies where the Gospel has never been heard and where there are no local Christians.',
    driveClose: 'These communities can be difficult for foreign missionaries to reach because of geographic isolation and political or religious restrictions. Their languages and cultures also call for local understanding. AHP trains and sends missionaries who can meet people where they are, communicate the Gospel with cultural awareness and help local churches grow toward long-term self-sustainability.',
    beliefs: [
      { title: 'The Lausanne Covenant', copy: 'We uphold the Lausanne Covenant as a guiding expression of Christian mission.' },
      { title: 'The Holy Nicene Creed', copy: 'We believe in the historic confession of the Christian church expressed in the Nicene Creed.' },
      { title: 'The Triune God', copy: 'We believe in the Triune God (Matthew 28:19; Ephesians 4:4–6), and in the incarnation and resurrection of Jesus Christ.' },
      { title: 'The Word of God', copy: 'We believe in the inspiration and authority of the Word of God (1 Thessalonians 2:13; 2 Timothy 3:15–17).' },
      { title: 'Salvation by grace', copy: 'We believe in salvation by faith and grace alone (John 3:16; Ephesians 2:8–9).' },
      { title: 'The Holy Spirit', copy: 'We believe the Holy Spirit continues to work, indwelling and enabling Christians to live a godly life (Acts 1:8; 4:31; Romans 8:9).' },
    ],
  },
  arise: {
    title: 'Arise Nagaland',
    heroKicker: 'Asia Highland Partners presents',
    heroHeading: 'Arise Nagaland',
    heroDuration: 'A multi-day gathering',
    whyEyebrow: 'Why Arise',
    whyHeading: 'Not another conference. A response.',
    whyLead: 'A generation is asking what faithful mission looks like now. Arise Nagaland creates space to worship, listen, learn and answer.',
    whyBody: 'Rooted in Nagaland’s own story of receiving the Gospel and becoming a sending people, this gathering looks forward—to the communities, cultures and nations still waiting to hear.',
    registrationHeading: 'Take your place.',
    registrationBody: 'Complete the full delegate registration or join the update list while final event details are being confirmed.',
    date: 'Dates to be announced',
    venue: 'Nagaland, India',
    registrationOpen: true,
    registrationNote: 'Complete the delegate form and the organising team will follow up with confirmed dates, passes and venue details.',
    heroVideo: '/media/arise-nagaland-film.mp4',
    logoRevealVideo: '/media/arise-logo-reveal-web.mp4',
  },
  missionSteps: [
    { id: 'mission-recruit', title: 'Recruit', copy: 'We identify new Christians in unreached areas and pastors in local churches who are called to missions.', image: '/media/mission-recruit.jpg' },
    { id: 'mission-train', title: 'Train', copy: 'We provide cross-cultural, theological and practical training rooted in the local context.', image: '/media/mission-train-web.jpg' },
    { id: 'mission-send', title: 'Send', copy: 'We prayerfully send local missionaries in small teams to places where the Gospel has not been heard.', image: '/media/mission-send-web.jpg' },
    { id: 'mission-partner', title: 'Partner', copy: 'We partner with local churches to sustain missions and cultivate communities of faith for generations.', image: '/media/mission-partner.jpg' },
  ],
  countries: [
    { id: 'country-india', name: 'India', label: 'Communities across India', image: '/media/country-india.jpg', position: '50% 45%' },
    { id: 'country-nepal', name: 'Nepal', label: 'Mountain communities across Nepal', image: '/media/country-nepal.jpg', position: '50% 50%' },
    { id: 'country-bhutan', name: 'Bhutan', label: 'Remote communities in the Himalayas', image: '/media/country-bhutan-web.jpg', position: '50% 50%' },
    { id: 'country-myanmar', name: 'Myanmar', label: 'Communities throughout Myanmar', image: '/media/country-myanmar.jpg', position: '50% 48%' },
  ],
  team: [
    { id: 'team-founder', name: 'Husezo Rhakho', role: 'Founder & President', location: 'Nagaland, India', bio: 'Husezo carries a vision to equip highland believers for locally led, sustainable mission among unreached communities across Asia.', portrait: '/media/founder-portrait-web.jpg', position: 'center 28%' },
    { id: 'team-2', name: 'Kezhasezo Rhakho', role: 'Mission Training Lead', location: 'Northeast India', bio: 'Kezhasezo equips emerging missionaries through contextual discipleship, practical preparation and pastoral care.', portrait: '/media/team-portraits-demo.png', position: '50% 0%' },
    { id: 'team-3', name: 'Mhonbeni Kikon', role: 'Community Engagement', location: 'Nagaland, India', bio: 'Mhonbeni works alongside local churches to create welcoming pathways into prayer, service and mission.', portrait: '/media/team-portraits-demo.png', position: '100% 0%' },
    { id: 'team-4', name: 'Neikuo Zhale', role: 'Field Mobilisation', location: 'Asia', bio: 'Neikuo supports locally led teams as they discern calling, prepare for the field and build resilient communities.', portrait: '/media/team-portraits-demo.png', position: '0% 100%' },
    { id: 'team-5', name: 'Visakhonuo Nagi', role: 'Communications & Stories', location: 'Kohima, India', bio: 'Visakhonuo helps tell stories with dignity, connecting supporters to the people and purpose behind the mission.', portrait: '/media/team-portraits-demo.png', position: '50% 100%' },
    { id: 'team-6', name: 'Akum Longkumer', role: 'Operations Coordinator', location: 'Dimapur, India', bio: 'Akum brings clarity to logistics, administration and events so mission teams can focus on people and ministry.', portrait: '/media/team-portraits-demo.png', position: '100% 100%' },
  ],
  blogs: [
    { id: 'blog-1', title: 'When the mountains become a sending place', date: '2026-03-18', category: 'Mission Stories', author: 'AHP Editorial Team', excerpt: 'A new generation of highland believers is discovering that a history of receiving the Gospel can become a future of carrying it.', body: 'For generations, communities in the highlands prayed for workers who would cross difficult terrain and cultural boundaries with the hope of Jesus. Today, many of those same communities are asking a new question: where are we being sent?\n\nThat change is more than a strategy. It is a story of gratitude becoming obedience—local churches identifying people, nurturing their calling and remaining beside them for the long journey.', image: '/media/missionary-journey.jpg', published: true },
    { id: 'blog-2', title: 'Why locally cultivated mission lasts', date: '2026-02-26', category: 'Field Notes', author: 'Mission Training Team', excerpt: 'Language, culture and trust are not side details. They are part of how the Gospel is heard, understood and lived.', body: 'Locally cultivated mission begins with the conviction that God is already at work in local churches and communities. Leaders who know the language, customs and questions of a place can listen with depth and serve with patience.\n\nAHP invests in formation, practical preparation and long-term relationships so that ministry grows from within rather than being imposed from outside.', image: '/media/country-nepal.jpg', published: true },
    { id: 'blog-3', title: 'Preparing a generation to arise', date: '2026-01-30', category: 'Arise Nagaland', author: 'Arise Team', excerpt: 'Arise Nagaland is being shaped as a space for worship, honest questions and a clear response to God’s mission.', body: 'The gathering is designed around a simple movement: encounter, listen, equip and respond. Large-room moments will be paired with smaller conversations where participants can ask practical questions about calling and service.\n\nThe aim is not a temporary emotional high. It is to help people take a faithful next step with the support of their churches and mentors.', image: '/media/mission-train-web.jpg', published: true },
    { id: 'blog-4', title: 'The quiet work behind every journey', date: '2026-01-12', category: 'Behind the Mission', author: 'AHP Operations', excerpt: 'Every sent worker is surrounded by people who pray, organise, give, communicate and make the path possible.', body: 'Mission is visible in those who go, but it is sustained by an entire community. Administrators, intercessors, hosts, designers, pastors and generous partners all take part.\n\nThe work may be quiet, yet it creates the conditions for teams to serve with health, accountability and endurance.', image: '/media/mission-recruit.jpg', published: true },
  ],
  stories: [
    { id: 'story-1', month: 'January 2026', title: 'A year begins in prayer', summary: 'Local pastors and emerging leaders gathered to listen, pray and discern the communities God may be calling them to serve.', image: '/media/founder-speaking-web.jpg' },
    { id: 'story-2', month: 'February 2026', title: 'Training close to home', summary: 'A contextual training intensive explored Scripture, culture, team health and the everyday practices of cross-cultural mission.', image: '/media/mission-train-web.jpg' },
    { id: 'story-3', month: 'March 2026', title: 'Churches learning to send together', summary: 'Partner churches began a shared conversation about prayer, care and sustainable support for locally sent missionaries.', image: '/media/mission-partner.jpg' },
    { id: 'story-4', month: 'April 2026', title: 'Stories crossing borders', summary: 'Field updates helped communities see how local obedience can carry hope across languages, valleys and national borders.', image: '/media/country-nepal.jpg' },
    { id: 'story-5', month: 'May 2026', title: 'Preparing for Arise', summary: 'Young leaders contributed questions, prayers and ideas that are shaping the Arise Nagaland gathering.', image: '/media/mission-send-web.jpg' },
  ],
};

function mergeContent(saved) {
  if (!saved) return defaultContent;
  return {
    ...defaultContent,
    ...saved,
    general: { ...defaultContent.general, ...(saved.general || {}) },
    homepage: { ...defaultContent.homepage, ...(saved.homepage || {}) },
    ourStory: { ...defaultContent.ourStory, ...(saved.ourStory || {}), beliefs: Array.isArray(saved.ourStory?.beliefs) ? saved.ourStory.beliefs : defaultContent.ourStory.beliefs },
    arise: { ...defaultContent.arise, ...(saved.arise || {}) },
    missionSteps: Array.isArray(saved.missionSteps) ? saved.missionSteps : defaultContent.missionSteps,
    countries: Array.isArray(saved.countries) ? saved.countries : defaultContent.countries,
    team: Array.isArray(saved.team) ? saved.team : defaultContent.team,
    blogs: Array.isArray(saved.blogs) ? saved.blogs : defaultContent.blogs,
    stories: Array.isArray(saved.stories) ? saved.stories : defaultContent.stories,
  };
}

export function getSiteContent() {
  try { return mergeContent(JSON.parse(localStorage.getItem(CONTENT_KEY))); }
  catch { return defaultContent; }
}

export function saveSiteContent(content) {
  localStorage.setItem(CONTENT_KEY, JSON.stringify(content));
  window.dispatchEvent(new Event(CHANGE_EVENT));
}

export function resetSiteContent() {
  localStorage.removeItem(CONTENT_KEY);
  window.dispatchEvent(new Event(CHANGE_EVENT));
}

export function useSiteContent() {
  const [content, setContent] = useState(getSiteContent);
  useEffect(() => {
    const refresh = () => setContent(getSiteContent());
    window.addEventListener(CHANGE_EVENT, refresh);
    window.addEventListener('storage', refresh);
    return () => { window.removeEventListener(CHANGE_EVENT, refresh); window.removeEventListener('storage', refresh); };
  }, []);
  return content;
}

export function getRecords() {
  try { return JSON.parse(localStorage.getItem(RECORDS_KEY)) || { volunteers: [], ariseRegistrations: [] }; }
  catch { return { volunteers: [], ariseRegistrations: [] }; }
}

export function addRecord(collection, record) {
  const records = getRecords();
  records[collection] = [record, ...(records[collection] || [])];
  localStorage.setItem(RECORDS_KEY, JSON.stringify(records));
  window.dispatchEvent(new Event('ahp-records-change'));
  return record;
}

export function deleteRecord(collection, id) {
  const records = getRecords();
  records[collection] = (records[collection] || []).filter((item) => item.id !== id);
  localStorage.setItem(RECORDS_KEY, JSON.stringify(records));
  window.dispatchEvent(new Event('ahp-records-change'));
}

export function updateRecord(collection, id, patch) {
  const records = getRecords();
  records[collection] = (records[collection] || []).map((item) => item.id === id ? { ...item, ...patch } : item);
  localStorage.setItem(RECORDS_KEY, JSON.stringify(records));
  window.dispatchEvent(new Event('ahp-records-change'));
  return records[collection].find((item) => item.id === id);
}

export function makeId(prefix) {
  return `${prefix}-${new Date().getFullYear()}-${Math.random().toString(36).slice(2, 7).toUpperCase()}`;
}
