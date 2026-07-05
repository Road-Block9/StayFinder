import { Link, NavLink } from 'react-router-dom';

export default function Header() {
  return (
    <header className="site-header">
      <nav className="nav-container" aria-label="Main navigation">
        <Link className="brand" to="/">
          <span className="brand-mark">S</span>
          <span>StayFinder</span>
        </Link>
        <div className="nav-links">
          <NavLink to="/">Hotels</NavLink>
          <a href="#filters">Search</a>
        </div>
      </nav>
    </header>
  );
}
