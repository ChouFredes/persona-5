import { MotionConfig } from 'framer-motion';
import type { PropsWithChildren } from 'react';
import { Link, NavLink, useLocation } from 'react-router-dom';
import { fallbackBackground, routeBackgrounds } from '../content/backgrounds';
import { navItems, site } from '../content/site';
import { DateClimateWidget } from './DateClimateWidget';
import { MusicSlider } from './MusicSlider';

export function Layout({ children }: PropsWithChildren) {
  const location = useLocation();
  const backgroundImage = routeBackgrounds[location.pathname] ?? fallbackBackground;

  return (
    <MotionConfig transition={{ duration: 0.35, ease: 'easeOut' }}>
      <div
        className="app-shell"
        style={{
          backgroundImage: `url(${backgroundImage})`,
        }}
      >
        <DateClimateWidget />

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
