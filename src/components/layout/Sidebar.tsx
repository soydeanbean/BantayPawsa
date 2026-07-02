import { NavLink } from 'react-router-dom';
import { motion } from 'framer-motion';
import { Home, PawPrint, QrCode, FileText, MapPin, User, Heart } from 'lucide-react';
import PWAInstallButton from '@/components/ui/PWAInstallButton';

const navItems = [
  { to: '/', icon: Home, label: 'Home' },
  { to: '/pets', icon: PawPrint, label: 'Pets' },
  { to: '/scanner', icon: QrCode, label: 'QR Scanner' },
  { to: '/report', icon: FileText, label: 'Report' },
  { to: '/map', icon: MapPin, label: 'Map' },
  { to: '/community', icon: Heart, label: 'Community' },
  { to: '/profile', icon: User, label: 'Profile' },
];

export default function Sidebar() {
  return (
    <motion.aside
      initial={{ x: -80, opacity: 0 }}
      animate={{ x: 0, opacity: 1 }}
      transition={{ duration: 0.3, ease: 'easeOut' }}
      className="sidebar"
    >
      <div className="sidebar-header">
        <div className="sidebar-logo">
          <div className="sidebar-logo-icon">
            <PawPrint />
          </div>
          <div>
            <div className="sidebar-title">BantayPawsa</div>
            <div className="sidebar-subtitle">Bantay Aso at Pusa</div>
          </div>
        </div>
      </div>

      <nav className="sidebar-nav">
        {navItems.map((item) => (
          <NavLink
            key={item.to}
            to={item.to}
            end={item.to === '/'}
            className={({ isActive }) => `sidebar-link ${isActive ? 'active' : ''}`}
          >
            {({ isActive }) => (
              <>
                <item.icon />
                <span>{item.label}</span>
                {isActive && <span className="active-dot" />}
              </>
            )}
          </NavLink>
        ))}
      </nav>

      <div className="sidebar-footer" style={{ display: 'flex', flexDirection: 'column', gap: '8px' }}>
        <PWAInstallButton />
        <div className="sidebar-badge">
          <p>Together, we can</p>
          <p>Protect every paw.</p>
        </div>
      </div>
    </motion.aside>
  );
}