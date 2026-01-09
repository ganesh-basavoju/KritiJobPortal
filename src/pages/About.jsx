import React from 'react';
import styles from './About.module.css';

const About = () => {
    return (
        <div className={styles.container}>
            <div className={`focused-container`}>
                <div className={styles.heroSection}>
                    <h1 className="text-gradient">About JobConnect</h1>
                    <p className={styles.tagline}>Empowering Careers, Connecting Futures.</p>
                </div>

                <div className={styles.contentGrid}>
                    <div className={`glass-card ${styles.card}`}>
                        <div className={styles.iconBox}><i className="fas fa-rocket"></i></div>
                        <h3>Our Mission</h3>
                        <p>To bridge the gap between top-tier talent and world-class organizations through seamless, intelligent technology.</p>
                    </div>

                    <div className={`glass-card ${styles.card}`}>
                        <div className={styles.iconBox}><i className="fas fa-users"></i></div>
                        <h3>For Candidates</h3>
                        <p>We provide a premium platform to showcase your skills, track applications, and find roles that truly match your expertise.</p>
                    </div>

                    <div className={`glass-card ${styles.card}`}>
                        <div className={styles.iconBox}><i className="fas fa-building"></i></div>
                        <h3>For Employers</h3>
                        <p>Streamline your hiring process with our advanced applicant tracking system and reach thousands of qualified professionals.</p>
                    </div>
                </div>

                <div className={styles.storySection}>
                    <h2>Our Story</h2>
                    <p>
                        Founded in 2024, JobConnect started with a simple idea: job hunting shouldn't be stressful. 
                        We believe in a transparent, efficient, and beautiful hiring experience. 
                        By combining modern design with powerful functionality, we've created a space where careers take flight.
                    </p>
                </div>
            </div>
        </div>
    );
};

export default About;
