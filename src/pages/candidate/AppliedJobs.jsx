import React from 'react';
import styles from './Candidate.module.css';

const AppliedJobs = () => {
    return (
        <div className={styles.container}>
            <h2 style={{color: 'var(--color-text-main)', marginBottom: '1.5rem'}}>My Applications</h2>
            <div className={styles.sectionCard} style={{padding: '2rem'}}>
                <p style={{color: 'var(--color-text-muted)'}}>You haven't applied to any jobs yet.</p>
                {/* List of applied jobs will go here */}
            </div>
        </div>
    );
};

export default AppliedJobs;
