import { BookOpen, Home, Sparkles, Users } from 'lucide-react';

const items = [
  ['Home', '/', Home],
  ['Stories', '/blog', BookOpen],
  ['Arise', '/arise-nagaland', Sparkles],
  ['Join', '/join', Users],
];

export default function MobileDock({ active = '' }) {
  return <nav className="mobile-dock" aria-label="Mobile navigation">
    {items.map(([label, href, Icon]) => <a className={active === label ? 'is-active' : ''} href={href} key={href}><Icon /><span>{label}</span></a>)}
  </nav>;
}
