import React from 'react';
import styles from './Footer.module.css';

const Footer = () => {
    return (
        <footer className={styles.footer}>
            <div className="focused-container">
                <div className={styles.grid}>
                    <div className={styles.companyInfo}>
                        <h2 className="text-gradient">KritiJob</h2>
                        <p>Your gateway to premium career opportunities. Connect with top employers and showcase your professional journey with confidence.</p>
                        <div className={styles.socials}>
                            <a href="#" aria-label="Instagram"><i className="fab fa-instagram"></i></a>
                            <a href="#" aria-label="LinkedIn"><i className="fab fa-linkedin-in"></i></a>
                            <a href="#" aria-label="Twitter"><i className="fab fa-twitter"></i></a>
                            <a href="#" aria-label="YouTube"><i className="fab fa-youtube"></i></a>
                        </div>
                    </div>

                    <div className={styles.column}>
                        <h3>For Candidates</h3>
                        <ul>
                            <li><a href="/jobs">Browse Jobs</a></li>
                            <li><a href="/companies">Top Companies</a></li>
                            <li><a href="#">Career Advice</a></li>
                            <li><a href="#">Salary Guide</a></li>
                        </ul>
                    </div>

                    <div className={styles.column}>
                        <h3>For Employers</h3>
                        <ul>
                            <li><a href="#">Post a Job</a></li>
                            <li><a href="#">Talent Solutions</a></li>
                            <li><a href="#">Pricing Plans</a></li>
                            <li><a href="#">Success Stories</a></li>
                        </ul>
                    </div>

                    <div className={styles.column}>
                        <h3>Support</h3>
                        <ul>
                            <li><a href="#">Help Center</a></li>
                            <li><a href="#">Contact Us</a></li>
                            <li><a href="#">Privacy Policy</a></li>
                            <li><a href="#">Terms of Service</a></li>
                        </ul>
                    </div>
                </div>
                
                <div className={styles.bottomBar}>
                    <p>&copy; {new Date().getFullYear()} KritiJob. Designed & Developed By <span className={styles.credit}><a href="https://www.onlyusmedia.in" target="_blank" rel="noopener noreferrer">OnlyUsMedia</a></span></p>
                    <div className={styles.legalLinks}>
                        <a href="#">Privacy</a>
                        <a href="#">Terms</a>
                        <a href="#">Sitemap</a>
                    </div>
                </div>
            </div>
        </footer>
    );
};

export default Footer;
