import { Link, NavLink } from 'react-router-dom';
import { MotionConfig } from 'framer-motion';
import type { PropsWithChildren } from 'react';
import { site, navItems } from '../content/site';
import { MusicSlider } from './MusicSlider';

export function Layout({ children }: PropsWithChildren) {
  return (
    <MotionConfig transition={{ duration: 0.35, ease: 'easeOut' }}>
      <div className="app-shell">
        <header className="topbar">
          <Link to="/" className="brand">
            <span className="brand-tag">P5</span>
            <div>
              <p className="codename">{site.codename}</p>
              <h1>{site.name}</h1>
            </div>
          </Link>
          <nav className="menu">
            {navItems.map((item) => (
              <NavLink
                key={item.path}
                to={item.path}
                className={({ isActive }) =>
                  `menu-item ${isActive ? 'menu-item-active' : ''}`
                }
              >
                {item.label}
              </NavLink>
            ))}
          </nav>
        </header>

        <main>{children}</main>

        <footer className="footer">
          <MusicSlider />
          <p className="disclaimer">
            Fan-made and non-commercial. Persona is a trademark of its respective owners.
          </p>
        </footer>
      </div>
    </MotionConfig>
  );
}
