import React from 'react';
import { Link } from 'react-router-dom';
import './Home.css';

const Home = () => {
    return (
        <div className="home">
            <section className="hero">
                <div className="hero-content">
                    <h1>Create Your Professional CV</h1>
                    <p>Build a stunning resume in minutes with our easy-to-use CV generator</p>
                    <Link to="/create" className="cta-button">
                        Get Started
                    </Link>
                </div>
            </section>

            <section className="features">
                <h2>Why Choose Our CV Generator?</h2>
                <div className="features-grid">
                    <div className="feature-card">
                        <div className="feature-icon">⚡</div>
                        <h3>Quick & Easy</h3>
                        <p>Create your CV in minutes with our intuitive interface</p>
                    </div>
                    <div className="feature-card">
                        <div className="feature-icon">📱</div>
                        <h3>Responsive Design</h3>
                        <p>Your CV looks great on any device or screen size</p>
                    </div>
                    <div className="feature-card">
                        <div className="feature-icon">💾</div>
                        <h3>Instant Download</h3>
                        <p>Download your CV as PDF instantly</p>
                    </div>
                </div>
            </section>

            <section className="how-it-works">
                <h2>How It Works</h2>
                <div className="steps">
                    <div className="step">
                        <div className="step-number">1</div>
                        <h3>Fill in Your Details</h3>
                        <p>Enter your personal and professional information</p>
                    </div>
                    <div className="step">
                        <div className="step-number">2</div>
                        <h3>Preview & Edit</h3>
                        <p>See your CV in real-time as you make changes</p>
                    </div>
                    <div className="step">
                        <div className="step-number">3</div>
                        <h3>Download</h3>
                        <p>Get your professional CV as a PDF file</p>
                    </div>
                </div>
            </section>
        </div>
    );
};

export default Home; 