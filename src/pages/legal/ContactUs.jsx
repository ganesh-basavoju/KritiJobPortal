import React from 'react';

const ContactUs = () => {
    return (
        <div className="focused-container" style={{ padding: '6rem 15px', minHeight: '60vh' }}>
            <h1 className="text-gradient" style={{ textAlign: 'center', marginBottom: '2rem' }}>Contact Us</h1>
            <div style={{ maxWidth: '600px', margin: '0 auto', background: 'var(--color-surface)', padding: '2rem', borderRadius: '15px', boxShadow: 'var(--shadow-md)' }}>
                <p style={{ color: 'var(--color-text-muted)', marginBottom: '1.5rem', textAlign: 'center' }}>We'd love to hear from you. Please send us your inquiries or feedback.</p>
                <form style={{ display: 'flex', flexDirection: 'column', gap: '1rem' }}>
                    <input type="text" placeholder="Your Name" style={{ padding: '1rem', borderRadius: '8px', border: '1px solid var(--color-border)' }} />
                    <input type="email" placeholder="Your Email" style={{ padding: '1rem', borderRadius: '8px', border: '1px solid var(--color-border)' }} />
                    <textarea placeholder="Your Message" rows="5" style={{ padding: '1rem', borderRadius: '8px', border: '1px solid var(--color-border)' }}></textarea>
                    <button type="button" style={{ background: 'var(--color-primary)', color: '#fff', padding: '1rem', borderRadius: '8px', border: 'none', fontWeight: 'bold', cursor: 'pointer' }}>Send Message</button>
                </form>
            </div>
        </div>
    );
};

export default ContactUs;
