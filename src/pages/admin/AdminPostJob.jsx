import React from 'react';
import styles from './Admin.module.css';
import PostJob from '../employer/PostJob'; // Reusing Employer Form

const AdminPostJob = () => {
    return (
        <div className={styles.pageContainer}>
             <div className={styles.headerRow}>
                <h1 className={styles.pageTitle}>Post Job (Admin Mode)</h1>
            </div>
            {/* We will wrap or adapt PostJob to allow Company Selection */}
            <div style={{background: '#1a1a1a', borderRadius: '16px', padding: '20px'}}>
                <PostJob isAdmin={true} /> 
            </div>
        </div>
    );
};

export default AdminPostJob;
