import React from 'react';
import styles from './Footer.module.css';

const Footer = () => {
    return (
        <footer className={styles.footer}>
            <div className="focused-container">
                <div className={styles.grid}>
                    <div className={styles.companyInfo}>
                        <h2 className="text-gradient">KritiJob</h2>
                        <p>Job portal with user profiles, skill updates, certifications, work experience and admin job postings.</p>
                        <div className={styles.socials}>
                            <a href="#"><i className="fab fa-instagram"></i></a>
                            <a href="#"><i className="fab fa-telegram-plane"></i></a>
                            <a href="#"><i className="fab fa-youtube"></i></a>
                        </div>
                    </div>

                    <div className={styles.column}>
                        <h3>Product</h3>
                        <ul>
                            <li><a href="#">Find Job</a></li>
                            <li><a href="#">Find Company</a></li>
                            <li><a href="#">Find Employee</a></li>
                        </ul>
                    </div>

                    <div className={styles.column}>
                        <h3>Company</h3>
                        <ul>
                            <li><a href="#">About Us</a></li>
                            <li><a href="#">Contact Us</a></li>
                            <li><a href="#">Privacy Policy</a></li>
                            <li><a href="#">Terms & Conditions</a></li>
                        </ul>
                    </div>

                    <div className={styles.column}>
                        <h3>Support</h3>
                        <ul>
                            <li><a href="#">Help & Support</a></li>
                            <li><a href="#">Feedback</a></li>
                            <li><a href="#">FAQs</a></li>
                        </ul>
                    </div>
                </div>
                
                <div className={styles.bottomBar}>
                    <p>Designed & Developed By <span className={styles.credit}>OnlyUsMedia</span></p>
                </div>
            </div>
        </footer>
    );
};

export default Footer;
