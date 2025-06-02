import React from 'react';
import './LoadingSpinner.css';

interface LoadingSpinnerProps {
    size?: 'small' | 'medium' | 'large';
    color?: string;
    text?: string;
}

const LoadingSpinner: React.FC<LoadingSpinnerProps> = ({
    size = 'medium',
    color = '#1db954',
    text = 'Loading...'
}) => {
    const sizeClass = `spinner-${size}`;

    return (
        <div className="loading-container">
            <div className={`spinner ${sizeClass}`} style={{ borderTopColor: color }}>
                <div className="spinner-inner" style={{ borderTopColor: color }}></div>
            </div>
            {text && <p className="loading-text">{text}</p>}
        </div>
    );
};

export default LoadingSpinner; 