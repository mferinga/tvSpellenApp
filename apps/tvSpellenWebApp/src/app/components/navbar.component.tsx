import React from 'react';
import { Link } from 'react-router-dom';

interface NavBarProps {
  title?: string;
}

export const NavBarComponent: React.FC<NavBarProps> = ({
  title = 'TV Spellen Avond',
}) => {
  return (

    <nav className='d-flex flex-row justify-content-between w-100' style={{ backgroundColor: '#333', padding: '1rem' }}>
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
      </div>
      <div className="ms-auto mt-2">
        <ul
        style={{
          listStyle: 'none',
          display: 'flex',
          gap: '2rem',
          margin: 0,
          padding: 0,
        }}>
          <li>
            <Link to="/logout" style={{ color: '#fff', textDecoration: 'none' }}>
              Logout
            </Link>
          </li>
        </ul>
      </div>
      
    </nav>
  );
};
