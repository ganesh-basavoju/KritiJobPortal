import React, { useState, useEffect } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import styles from './Employer.module.css';
import ApplicantCard from '../../components/employer/ApplicantCard';

import api from '../../utils/api';
import { useToast } from '../../context/ToastContext';

const ApplicantList = () => {
    const { jobId } = useParams();
    const navigate = useNavigate();
    const { addToast } = useToast();
    const [applicants, setApplicants] = useState([]);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        const fetchApplicants = async () => {
            try {
                let endpoint = jobId 
                    ? `/applications/job/${jobId}`
                    : `/applications/employer/all`;

                const { data } = await api.get(endpoint);
                
                if (data.success) {
                   const mapped = data.data.map(app => ({
                       id: app._id, 
                       applicationId: app._id,
                       userId: app.candidateId?._id, // User ID for profile lookup
                       jobTitle: app.jobId?.title, 
                       name: app.candidateId?.name || 'Unknown',
                       email: app.candidateId?.email,
                       avatar: app.candidateId?.avatarUrl,
                       status: app.status,
                       date: app.createdAt ? new Date(app.createdAt).toLocaleDateString() : '-',
                       title: 'Candidate', 
                       skills: [], 
                       resumeLink: app.resumeUrl,
                       // Mock data for card display to prevent crashes
                       company: '',
                       bio: '',
                       location: '',
                       salary: ''
                   }));
                   setApplicants(mapped);
                }
                setLoading(false);
            } catch (err) {
                console.error(err);
                addToast('Failed to load applicants', 'error');
                setLoading(false);
            }
        };

        fetchApplicants();
    }, [jobId]);

    const handleViewProfile = (applicant) => {
        if (applicant.userId) {
            navigate(`/dashboard/employer/candidate/${applicant.userId}`);
        } else {
            addToast('Candidate profile not found', 'error');
        }
    };

    if (loading) return <div style={{padding: '2rem', textAlign: 'center'}}>Loading Applicants...</div>;

    return (
        <div className={styles.pageContainer}>
            <div className={styles.headerRow}>
                <h2 className="text-gradient" style={{fontSize: '2rem', margin: 0}}>{jobId ? 'Job Applicants' : 'All Applicants'}</h2>
                <div style={{color: '#888', fontSize: '0.9rem'}}>{jobId && `Job ID: ${jobId}`}</div>
            </div>

            <div className={styles.grid}>
                 {applicants.map(applicant => (
                    <ApplicantCard 
                        key={applicant.id} 
                        applicant={applicant} 
                        showJobTitle={!jobId}
                        onProfileClick={() => handleViewProfile(applicant)} 
                    />
                ))}
                
                {applicants.length === 0 && (
                     <div style={{gridColumn: '1/-1', textAlign: 'center', padding: '40px', color: '#9ca3af', background: 'rgba(255,255,255,0.05)', borderRadius: '12px'}}>
                         <p>No applicants found.</p>
                     </div>
                 )}
            </div>
        </div>
    );
};

export default ApplicantList;
