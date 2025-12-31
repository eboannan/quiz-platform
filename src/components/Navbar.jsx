import React from 'react';
import { useNavigate } from 'react-router-dom';
import penguinFull from '../assets/penguin_full.png';

const Navbar = () => {
    const navigate = useNavigate();

    return (
        <nav style={{
            position: 'sticky',
            top: 0,
            zIndex: 50,
            backgroundColor: 'var(--color-bg)'
        }}>
            <div className="container" style={{
                display: 'flex',
                justifyContent: 'space-between',
                alignItems: 'center',
                height: '160px'
            }}>
                {/* Logo */}
                <div
                    onClick={() => navigate('/')}
                    style={{ display: 'flex', alignItems: 'center', cursor: 'pointer' }}
                >
                    <img
                        src={penguinFull}
                        alt="PenguinPrep"
                        style={{ height: '140px', width: 'auto', objectFit: 'contain' }}
                    />
                </div>

                <button
                    onClick={() => navigate('/parent/login')}
                    className="btn btn-secondary"
                    style={{ padding: '0.75rem 1.5rem', borderRadius: '12px', fontWeight: '600' }}
                >
                    Parent Login
                </button>
            </div>
        </nav>
    );
};

export default Navbar;
