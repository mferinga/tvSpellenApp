import React from 'react';

interface NavBarProps {
    title?: string;
}

export const NavBarComponent: React.FC<NavBarProps> = ({ title = 'My App' }) => {
    return (
        <nav style={{ backgroundColor: '#333', padding: '1rem' }}>
            <div style={{ color: '#fff', fontSize: '1.5rem', fontWeight: 'bold' }}>
                {title}
            </div>
            <ul style={{ listStyle: 'none', display: 'flex', gap: '2rem', margin: 0, padding: 0 }}>
                <li><a href="/" style={{ color: '#fff', textDecoration: 'none' }}>Home</a></li>
                <li><a href="/about" style={{ color: '#fff', textDecoration: 'none' }}>About</a></li>
                <li><a href="/contact" style={{ color: '#fff', textDecoration: 'none' }}>Contact</a></li>
            </ul>
        </nav>
    );
};