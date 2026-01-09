import React from 'react';
import styles from './Home.module.css';

// Mock Logos (using text with specific styles to emulate logos or placeholders)
// In a real scenario, use <img> tags with src pointing to assets
const companies = [
    { name: 'Microsoft', icon: 'fab fa-microsoft', color: '#00a4ef' },
    { name: 'Google', icon: 'fab fa-google', color: '#4285f4' },
    { name: 'Amazon', icon: 'fab fa-aws', color: '#ff9900' },
    { name: 'Netflix', icon: 'fas fa-tv', color: '#e50914' }, // FontAwesome doesn't have a Netflix brand icon, using TV as placeholder
    { name: 'Meta', icon: 'fab fa-facebook', color: '#1877f2' },
    { name: 'Spotify', icon: 'fab fa-spotify', color: '#1db954' },
    { name: 'Slack', icon: 'fab fa-slack', color: '#4a154b' },
    { name: 'Adobe', icon: 'fab fa-adobe', color: '#ff0000' },
    { name: 'Figma', icon: 'fab fa-figma', color: '#f24e1e' },
    { name: 'Oracle', icon: 'fas fa-database', color: '#f80000' }, // Placeholder
];

const TrustedCompanies = () => {
    // Duplicate the list to ensure seamless infinite scroll
    const marqueeList = [...companies, ...companies, ...companies];

    return (
        <section className={styles.trustedSection}>
            <div className="full-width-container">
                <h2 className={styles.sectionTitle}>
                    Trusted By <span className={styles.highlight}>1000+</span> Companies
                </h2>
                
                <div className={styles.marqueeContainer}>
                    <div className={styles.marqueeTrack}>
                        {marqueeList.map((company, index) => (
                            <div key={index} className={styles.companyLogo} title={company.name}>
                                {/* Using FontAwesome for immediate visuals. 
                                    Replace with <img src="/assets/companies/example.png" /> for real logos. */}
                                <div style={{ display: 'flex', alignItems: 'center', gap: '10px', fontSize: '1.5rem', fontWeight: 'bold', color: '#fff' }}>
                                    <i className={company.icon} style={{ fontSize: '2rem' }}></i>
                                    <span>{company.name}</span>
                                </div>
                            </div>
                        ))}
                    </div>
                </div>
            </div>
        </section>
    );
};

export default TrustedCompanies;
