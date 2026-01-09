import React, { useState } from 'react';
import styles from '../../pages/employer/Employer.module.css';

const ApplicantCard = ({ applicant, onProfileClick, showJobTitle }) => {
    const [status, setStatus] = useState(applicant.status || 'Applied');

    const handleStatusChange = (e) => {
        setStatus(e.target.value);
        // Note: Actual API call is handled in Modal for now, or we can add it here.
        // For uniformity with Modal, let's keep it visual-only here or implement API.
        // User requirements say "ApplicantProfileModal updated to ... provide status updates".
        // This card dropdown seems to be a quick-access. I will leave it visual-only for now or log it.
        console.log(`Updated status for ${applicant.name} to ${e.target.value}`);
    };

    return (
        <div className={styles.card}>
            <div className={styles.cardHeader}>
                <img src={applicant.avatar || `https://ui-avatars.com/api/?name=${applicant.name}`} alt={applicant.name} className={styles.avatar} />
                <div className={styles.info}>
                    <h3>{applicant.name}</h3>
                    <p>{applicant.title} {showJobTitle && `• Apply for: ${applicant.jobTitle}`}</p>
                </div>
            </div>

            <div className={styles.skills}>
                {applicant.skills.slice(0, 3).map((skill, index) => (
                    <span key={index} className={styles.skillTag}>{skill}</span>
                ))}
            </div>

            <p className={styles.bio}>
                {applicant.bio}
            </p>

            <div className={styles.detailsRow}>
                <div className={styles.salary}>
                    <strong>{applicant.salary}</strong>
                </div>
                <div className={styles.location}>
                    <i className="fas fa-map-marker-alt"></i> {applicant.location}
                </div>
            </div>

            <div className={styles.actions}>
                <button 
                    className={styles.actionBtn} 
                    onClick={() => onProfileClick(applicant)}
                >
                    Profile
                </button>
                <button className={`btn-primary ${styles.primaryBtn}`} style={{borderRadius:'8px', cursor:'pointer', border:'none', fontWeight:'600'}}>
                    Message
                </button>
            </div>

            <div className={styles.statusWrapper}>
                <select 
                    className={styles.statusSelect}
                    value={status}
                    onChange={handleStatusChange}
                    style={{
                        borderColor: status === 'Selected' ? '#2ecc71' : 
                                     status === 'Rejected' ? '#e74c3c' : 
                                     status === 'Interviewing' ? '#f1c40f' : 'rgba(255,255,255,0.1)'
                    }}
                >
                    <option value="Applied">Status: Applied</option>
                    <option value="Reviewing">Status: Reviewing</option>
                    <option value="Interviewing">Status: Interviewing</option>
                    <option value="Selected">Status: Selected</option>
                    <option value="Rejected">Status: Rejected</option>
                </select>
            </div>
        </div>
    );
};

export default ApplicantCard;
