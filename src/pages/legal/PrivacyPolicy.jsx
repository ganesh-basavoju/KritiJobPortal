import React from 'react';

const PrivacyPolicy = () => {
    return (
        <div className="focused-container" style={{ padding: '6rem 15px', minHeight: '60vh', color: 'var(--color-text-main)' }}>
            <div style={{ maxWidth: '800px', margin: '0 auto', background: 'var(--color-surface)', padding: '3rem', borderRadius: '15px' }}>
                <h1 className="text-gradient" style={{ marginBottom: '2rem' }}>Privacy Policy</h1>
                <p style={{ marginBottom: '1.5rem', lineHeight: '1.6' }}>Last updated: March 2026</p>
                
                <h3 style={{ marginTop: '2rem', marginBottom: '1rem' }}>1. Information We Collect</h3>
                <p style={{ marginBottom: '1.5rem', lineHeight: '1.6', color: 'var(--color-text-muted)' }}>We collect information you provide directly to us when you create an account, build your profile, apply for jobs, or communicate with us. This includes contact details, resumes, and employment history.</p>

                <h3 style={{ marginTop: '2rem', marginBottom: '1rem' }}>2. How We Use Your Information</h3>
                <p style={{ marginBottom: '1.5rem', lineHeight: '1.6', color: 'var(--color-text-muted)' }}>We use the information we collect to provide, maintain, and improve our services. Specifically, to connect candidates with employers, send platform notifications, and ensure platform security.</p>

                <h3 style={{ marginTop: '2rem', marginBottom: '1rem' }}>3. Data Security</h3>
                <p style={{ marginBottom: '1.5rem', lineHeight: '1.6', color: 'var(--color-text-muted)' }}>We take reasonable measures to help protect information about you from loss, theft, misuse, unauthorized access, disclosure, alteration, and destruction.</p>

                <h3 style={{ marginTop: '2rem', marginBottom: '1rem' }}>4. Contact Us</h3>
                <p style={{ marginBottom: '1.5rem', lineHeight: '1.6', color: 'var(--color-text-muted)' }}>If you have any questions about this Privacy Policy, please contact us at support@kritijob.com.</p>
            </div>
        </div>
    );
};

export default PrivacyPolicy;
