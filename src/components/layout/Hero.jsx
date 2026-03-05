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
        <div className={styles.content}>
          <span className={styles.badge}>No. 1 Job Portal</span>
          <h1 className={styles.title}>
            Find Your <span className="text-gradient">Dream Job</span> <br />
            With <span className="text-gradient">Precision</span>
          </h1>
          <p className={styles.subtitle}>
            Connecting exceptional talent with premium opportunities. 
            Your future starts here.
          </p>
          
          <div className={`${styles.searchBox} glass-card`}>
            <div className={styles.inputGroup}>
              <i className="fas fa-search"></i>
              <input 
                type="text" 
                placeholder="Job title or keyword..." 
                value={keyword}
                onChange={(e) => setKeyword(e.target.value)}
                onKeyDown={handleKeyDown}
              />
            </div>
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
            <Button variant="cta" className={styles.searchBtn} onClick={handleSearch}>Search Jobs</Button>
          </div>

          <div className={styles.stats}>
            <div className={styles.statItem}>
              <h3>10k+</h3>
              <p>Active Jobs</p>
            </div>
            <div className={styles.statItem}>
              <h3>500+</h3>
              <p>Companies</p>
            </div>
            <div className={styles.statItem}>
              <h3>1M+</h3>
              <p>Candidates</p>
            </div>
          </div>
        </div>
        
        <div className={styles.visuals}>
          {/* Placeholder for hero image/illustration */}
          <div className={styles.circleGlow}></div>
          <div className={`${styles.card} glass-card ${styles.card1}`}>
            <h4>Software Engineer</h4>
            <p>Google Inc.</p>
            <span>$150k - $200k</span>
          </div>
          <div className={`${styles.card} glass-card ${styles.card2}`}>
            <h4>Product Designer</h4>
            <p>Airbnb</p>
            <span>$120k - $180k</span>
          </div>
        </div>
      </div>
    </section>
  );
};

export default Hero;
