import { NavLink, useNavigate } from 'react-router-dom';
import { useAuth } from '../context/AuthContext';

const navItems = [
  { label: 'Dashboard',  path: '/dashboard', icon: '🏠' },
  { label: 'Customers',  path: '/customers',  icon: '👥' },
  { label: 'Invoices',   path: '/invoices',   icon: '🧾' },
  { label: 'Payments',   path: '/payments',   icon: '💳' },
  { label: 'Reminders',  path: '/reminders',  icon: '🔔' },
  { label: 'Reports',    path: '/reports',    icon: '📊' },
];

const adminItems = [
  { label: 'Team',     path: '/team',     icon: '👨‍👩‍👧' },
  { label: 'Settings', path: '/settings', icon: '⚙️' },
];

const Sidebar = () => {
  const { user, logout, isAdmin } = useAuth();
  const navigate = useNavigate();

  const handleLogout = () => {
    logout();
    navigate('/login');
  };

  return (
    <aside className="sidebar">
      <div className="sidebar-logo">
        <div className="logo-mark">₹</div>
        <span className="logo-text">
          CredFlow
          <span className="logo-badge">BETA</span>
        </span>
      </div>

      <nav className="nav-section" style={{ flex: 1, overflowY: 'auto' }}>
        <p className="nav-label">Main</p>
        {navItems.map((item) => (
          <NavLink
            key={item.path}
            to={item.path}
            className={({ isActive }) =>
              `nav-item${isActive ? ' active' : ''}`
            }
          >
            <span>{item.icon}</span>
            {item.label}
          </NavLink>
        ))}

        {isAdmin() && (
          <>
            <p className="nav-label" style={{ marginTop: 16 }}>Settings</p>
            {adminItems.map((item) => (
              <NavLink
                key={item.path}
                to={item.path}
                className={({ isActive }) =>
                  `nav-item${isActive ? ' active' : ''}`
                }
              >
                <span>{item.icon}</span>
                {item.label}
              </NavLink>
            ))}
          </>
        )}
      </nav>

      <div className="sidebar-footer">
        <div className="user-row">
          <div className="avatar">
            {user?.name?.charAt(0).toUpperCase()}
          </div>
          <div style={{ flex: 1, minWidth: 0 }}>
            <p style={{ fontSize: 12, fontWeight: 500, overflow: 'hidden', textOverflow: 'ellipsis', whiteSpace: 'nowrap' }}>
              {user?.name}
            </p>
            <p style={{ fontSize: 11, color: 'var(--text3)', overflow: 'hidden', textOverflow: 'ellipsis', whiteSpace: 'nowrap' }}>
              {user?.role} · {user?.companyName}
            </p>
          </div>
          <button
            onClick={handleLogout}
            style={{ background: 'none', border: 'none', cursor: 'pointer', color: 'var(--text3)', fontSize: 14 }}
            title="Logout"
          >
            ⏏
          </button>
        </div>
      </div>
    </aside>
  );
};

export default Sidebar;