import React from 'react';

const TermsOfService = () => {
    return (
        <div className="focused-container" style={{ padding: '6rem 15px', minHeight: '60vh', color: 'var(--color-text-main)' }}>
            <div style={{ maxWidth: '800px', margin: '0 auto', background: 'var(--color-surface)', padding: '3rem', borderRadius: '15px' }}>
                <h1 className="text-gradient" style={{ marginBottom: '2rem' }}>Terms of Service</h1>
                <p style={{ marginBottom: '1.5rem', lineHeight: '1.6' }}>Last updated: March 2026</p>
                
                <h3 style={{ marginTop: '2rem', marginBottom: '1rem' }}>1. Acceptance of Terms</h3>
                <p style={{ marginBottom: '1.5rem', lineHeight: '1.6', color: 'var(--color-text-muted)' }}>By accessing or using the KritiJob platform, you agree to be bound by these Terms. If you disagree with any part of the terms, then you may not access the service.</p>

                <h3 style={{ marginTop: '2rem', marginBottom: '1rem' }}>2. Accounts and Conduct</h3>
                <p style={{ marginBottom: '1.5rem', lineHeight: '1.6', color: 'var(--color-text-muted)' }}>You are responsible for safeguarding the password that you use to access the service and for any activities or actions under your password. You agree not to disclose your password to any third party.</p>

                <h3 style={{ marginTop: '2rem', marginBottom: '1rem' }}>3. Content Restrictions</h3>
                <p style={{ marginBottom: '1.5rem', lineHeight: '1.6', color: 'var(--color-text-muted)' }}>Job postings and candidate profiles must accurately reflect realistic opportunities and genuine skills. Spam, misleading information, or offensive content will result in immediate termination of the account.</p>

                <h3 style={{ marginTop: '2rem', marginBottom: '1rem' }}>4. Limitation of Liability</h3>
                <p style={{ marginBottom: '1.5rem', lineHeight: '1.6', color: 'var(--color-text-muted)' }}>In no event shall KritiJob, nor its directors, employees, partners, agents, suppliers, or affiliates, be liable for any indirect, incidental, special, consequential or punitive damages.</p>
            </div>
        </div>
    );
};

export default TermsOfService;
