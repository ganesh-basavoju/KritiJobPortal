import React from 'react';
import styles from './Candidate.module.css';

const AppliedJobs = () => {
    return (
        <div className={styles.container}>
            <h2 className="text-gradient">My Applications</h2>
            <div className={`glass-card ${styles.profileCard}`}>
                <p>You haven't applied to any jobs yet.</p>
                {/* List of applied jobs will go here */}
            </div>
        </div>
    );
};

export default AppliedJobs;
