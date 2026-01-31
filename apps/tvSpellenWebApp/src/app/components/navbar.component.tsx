import React from 'react';
import { Link } from 'react-router-dom';

interface NavBarProps {
  title?: string;
}

export const NavBarComponent: React.FC<NavBarProps> = ({
  title = 'TV Spellen Avond',
}) => {
  return (
    <nav style={{ backgroundColor: '#333', padding: '1rem' }}>
      <div style={{ color: '#fff', fontSize: '1.5rem', fontWeight: 'bold' }}>
        {title}
      </div>

      <ul
        style={{
          listStyle: 'none',
          display: 'flex',
          gap: '2rem',
          margin: 0,
          padding: 0,
        }}
      >
        {/*<li><a href="/" style={{ color: '#fff', textDecoration: 'none' }}>Home</a></li>
        <li><a href="/about" style={{ color: '#fff', textDecoration: 'none' }}>About</a></li>
        <li><a href="/contact" style={{ color: '#fff', textDecoration: 'none' }}>Contact</a></li>*/}
        <li>
          <Link to="/" style={{ color: '#fff', textDecoration: 'none' }}>
            Home
          </Link>
        </li>
        <li>
          <Link to="/spellen" style={{ color: '#fff', textDecoration: 'none' }}>
            Spellen
          </Link>
        </li>
        <li>
          <Link to="/about" style={{ color: '#fff', textDecoration: 'none' }}>
            About
          </Link>
        </li>
      </ul>
    </nav>
  );
};
