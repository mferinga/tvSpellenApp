import React, { useState } from 'react';
// import './sidebar.component.css';

const SidebarComponent: React.FC = () => {
    const [isOpen, setIsOpen] = useState(true);

    const toggleSidebar = () => {
        setIsOpen(!isOpen);
    };

    return (
        <div className={`d-flex`}>
            <nav className={`sidebar ${isOpen ? 'open' : 'closed'} bg-dark text-light p-3`}>
                <button
                    className="btn btn-outline-light mb-3 w-100"
                    onClick={toggleSidebar}
                >
                    {isOpen ? '✕' : '☰'}
                </button>
                <ul className="nav flex-column">
                    <li className="nav-item">
                        <a href="#" className="nav-link text-light">
                            Home
                        </a>
                    </li>
                    <li className="nav-item">
                        <a href="#" className="nav-link text-light">
                            Games
                        </a>
                    </li>
                    <li className="nav-item">
                        <a href="#" className="nav-link text-light">
                            Settings
                        </a>
                    </li>
                    <li className="nav-item">
                        <a href="#" className="nav-link text-light">
                            About
                        </a>
                    </li>
                </ul>
            </nav>
        </div>
    );
};

export default SidebarComponent;