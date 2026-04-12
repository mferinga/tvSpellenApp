import React from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { useAuth } from '../../../../../libs/frontend/frontfeatures/src/lib/auth/auth.check';

interface NavBarProps {
  title?: string;
}

export const NavBarComponent: React.FC<NavBarProps> = ({
  title = 'TV Spellen Avond',
}) => {
  const navigate = useNavigate();
  const { logout, isLoggedIn } = useAuth();

  const handleLogout = async () => {
    try {
      await logout();
      navigate('/');
    } catch (error) {
      console.error('Logout failed:', error);
    }
  };

  return (
    <nav
      className="d-flex flex-row justify-content-between w-100"
      style={{ backgroundColor: '#333', padding: '1rem' }}
    >
      <div style={{ color: '#fff', fontSize: '1.5rem', fontWeight: 'bold' }}>
        {title}
      </div>

      <div className="d-flex flex-row ms-2 mt-2">
        <ul
          style={{
            listStyle: 'none',
            display: 'flex',
            gap: '2rem',
            margin: 0,
            padding: 0,
          }}
        >
          <li>
            <Link to="/" style={{ color: '#fff', textDecoration: 'none' }}>
              Home
            </Link>
          </li>
          <li>
            <Link
              to="/spellijsten"
              style={{ color: '#fff', textDecoration: 'none' }}
            >
              Spellijsten
            </Link>
          </li>
          <li>
            <Link
              to="/spellen"
              style={{ color: '#fff', textDecoration: 'none' }}
            >
              Spellen
            </Link>
          </li>
          <li>
            <Link to="/about" style={{ color: '#fff', textDecoration: 'none' }}>
              About
            </Link>
          </li>
        </ul>
      </div>

      <div className="ms-auto mt-2">
        <ul
          style={{
            listStyle: 'none',
            display: 'flex',
            gap: '2rem',
            margin: 0,
            padding: 0,
          }}
        >
          {isLoggedIn() && (
            <li>
              <button
                type="button"
                onClick={handleLogout}
                style={{
                  color: '#fff',
                  textDecoration: 'none',
                  background: 'none',
                  border: 'none',
                  padding: 0,
                  cursor: 'pointer',
                }}
              >
                Logout
              </button>
            </li>
          )}
        </ul>
      </div>
    </nav>
  );
};