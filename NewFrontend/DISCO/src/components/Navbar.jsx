import { Link, useLocation } from 'react-router-dom';
import { Package, LayoutDashboard, Navigation, BarChart3 } from 'lucide-react';
import './Navbar.css';

export default function Navbar() {
  const location = useLocation();

  const navItems = [
    { path: '/', label: 'Dashboard', icon: LayoutDashboard },
    { path: '/order', label: 'Order', icon: Package },
    { path: '/tracking', label: 'Tracking', icon: Navigation },
    { path: '/analytics', label: 'Analytics', icon: BarChart3 },
  ];

  return (
    <nav className="navbar glass">
      <div className="navbar-brand">
        <h2 className="gradient-text">DISCO</h2>
      </div>
      <div className="navbar-links">
        {navItems.map(({ path, label, icon: Icon }) => (
          <Link
            key={path}
            to={path}
            className={`nav-link ${location.pathname === path ? 'active' : ''}`}
          >
            <Icon size={20} />
            <span>{label}</span>
          </Link>
        ))}
      </div>
    </nav>
  );
}
