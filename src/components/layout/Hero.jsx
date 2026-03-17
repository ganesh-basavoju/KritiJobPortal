import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import styles from './Hero.module.css';
import Button from '../ui/Button';

const Hero = () => {
  const navigate = useNavigate();
  const [keyword, setKeyword] = useState('');
  const [location, setLocation] = useState('');

  const handleSearch = () => {
    const params = new URLSearchParams();
    if (keyword.trim()) params.set('keyword', keyword.trim());
    if (location.trim()) params.set('location', location.trim());
    params.set('page', '1');
    navigate(`/jobs?${params.toString()}`);
  };

  const handleKeyDown = (e) => {
    if (e.key === 'Enter') handleSearch();
  };

  return (
    <section className={styles.hero}>
      <div className={`focused-container ${styles.heroContainer}`}>
        
        {/* NEW HERO BANNER */}
        <div className={styles.heroBanner}>
          <div className={styles.heroContent}>
            {/* Left Column */}
            <div className={styles.heroLeft}>
              <div className={styles.heroTag}>
                <i className="fas fa-chart-line"></i>
                <span className={styles.heroTagText}>Career Growth Platform</span>
              </div>
              <h1 className={styles.heroTitle}>
                Unlock Your Career <br />
                <span className={styles.heroSubtitle}>Potential Today</span>
              </h1>
              <p className={styles.heroDescription}>
                Join thousands of professionals who found their perfect role. Connecting exceptional talent with premium opportunities.
              </p>

              <div className={styles.searchBox}>
                <div className={styles.inputGroup}>
                  <i className="fas fa-search"></i>
                  <input 
                    type="text" 
                    placeholder="Job title, keywords..." 
                    value={keyword}
                    onChange={(e) => setKeyword(e.target.value)}
                    onKeyDown={handleKeyDown}
                  />
                </div>
                <div className={styles.divider}></div>
                <div className={styles.inputGroup}>
                  <i className="fas fa-map-marker-alt"></i>
                  <input 
                    type="text" 
                    placeholder="Location" 
                    value={location}
                    onChange={(e) => setLocation(e.target.value)}
                    onKeyDown={handleKeyDown}
                  />
                </div>
                <Button variant="primary" className={styles.searchBtn} onClick={handleSearch}>Search</Button>
              </div>
            </div>

            {/* Right Column / Features */}
            <div className={styles.heroRight}>
               <div className={styles.heroFeatures}>
                  <div className={styles.featureItem}>
                    <i className="fas fa-check-circle"></i>
                    <span className={styles.featureText}>Resume tips and guidance</span>
                  </div>
                  <div className={styles.featureItem}>
                    <i className="fas fa-check-circle"></i>
                    <span className={styles.featureText}>Plan your next career step</span>
                  </div>
                  <div className={styles.featureItem}>
                    <i className="fas fa-check-circle"></i>
                    <span className={styles.featureText}>Personalized job recommendations</span>
                  </div>
                  <div className={styles.featureItem}>
                    <i className="fas fa-check-circle"></i>
                    <span className={styles.featureText}>Direct contact with top employers</span>
                  </div>
                </div>
            </div>
          </div>
        </div>

        {/* STATS SECTION */}
        <div className={styles.statsSection}>
          <div className={styles.statCard}>
            <div className={styles.statIconWrapper}><i className="fas fa-briefcase"></i></div>
            <h3 className={styles.statNumber}>15,000+</h3>
            <p className={styles.statLabel}>Active Jobs</p>
          </div>
          <div className={styles.statCard}>
            <div className={styles.statIconWrapper}><i className="fas fa-building"></i></div>
            <h3 className={styles.statNumber}>2,500+</h3>
            <p className={styles.statLabel}>Top Companies</p>
          </div>
          <div className={styles.statCard}>
            <div className={styles.statIconWrapper}><i className="fas fa-users"></i></div>
            <h3 className={styles.statNumber}>50,000+</h3>
            <p className={styles.statLabel}>Success Stories</p>
          </div>
        </div>

      </div>
    </section>
  );
};

export default Hero;
