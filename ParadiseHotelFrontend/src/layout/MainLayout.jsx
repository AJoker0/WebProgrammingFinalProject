import React from 'react';
import { Outlet, Link } from 'react-router-dom';

function MainLayout() {
    return (
        <div>
            <header>
                <nav style={{ padding: '1rem', background: '#f5f5f5', display: 'flex', gap: '1rem' }}>
                    <Link to="/">Home</Link>
                    <Link to="/about">About</Link>
                    <Link to="/login">Login</Link>
                    <Link to="/register">Register</Link>
                </nav>
            </header>

            <main style={{ padding: '2rem' }}>
                <Outlet />
            </main>
        </div>
    );
}

export default MainLayout;