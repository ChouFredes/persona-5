import { Link } from 'react-router-dom';
import { PageFrame } from '../components/PageFrame';
import { navItems } from '../content/site';

export function HomePage() {
  return (
    <PageFrame title="Take your time" subtitle="Welcome">
      <p>
        Persona-inspired portfolio shell is ready. Add your own videos, tracks, and profile content next.
      </p>
      <div className="card-grid">
        {navItems.map((item) => (
          <Link key={item.path} className="menu-card" to={item.path}>
            {item.label}
          </Link>
        ))}
      </div>
    </PageFrame>
  );
}
