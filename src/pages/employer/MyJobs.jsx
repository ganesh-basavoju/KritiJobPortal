import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import styles from './Employer.module.css'; 
import JobCard from '../../components/jobs/JobCard'; 
import api from '../../utils/api';
import { useToast } from '../../context/ToastContext';

const MyJobs = () => {
    const [jobs, setJobs] = useState([]);
    const [loading, setLoading] = useState(true);
    const navigate = useNavigate();
    const { addToast } = useToast();

    const handleEdit = (id) => {
        navigate(`/dashboard/employer/jobs/edit/${id}`);
    };

    useEffect(() => {
        fetchMyJobs();
    }, []);

    const fetchMyJobs = async () => {
        try {
            const { data } = await api.get('/jobs/my-jobs');
            if (data.success) {
                setJobs(data.data);
            }
            setLoading(false);
        } catch (err) {
            console.error(err);
            addToast('Failed to load jobs', 'error');
            setLoading(false);
        }
    };

    const handleDelete = async (jobId) => {
        if (!window.confirm("Are you sure you want to delete this job?")) return;
        
        try {
            await api.delete(`/jobs/${jobId}`);
            setJobs(jobs.filter(j => j._id !== jobId));
            addToast('Job deleted', 'success');
        } catch (err) {
            console.error(err);
            addToast('Failed to delete job', 'error');
        }
    };

    if (loading) return <div style={{padding: '2rem', textAlign: 'center'}}>Loading...</div>;

    return (
        <div className={styles.pageContainer}>
            <div className={styles.headerRow}>
                 <h1 className="text-gradient" style={{fontSize: '2rem', margin: 0}}>My Jobs</h1>
                 <button 
                    className={styles.filterBtn} 
                    style={{background: '#fbbf24', color: '#1a1a1a', border: 'none'}}
                    onClick={() => navigate('/dashboard/employer/post-job')}
                >
                    <i className="fas fa-plus"></i> Post a Job
                </button>
            </div>

            <div className={styles.grid}>
                 {jobs.map(job => (
                    <JobCard 
                        key={job._id}
                        job={job} 
                        hidePostedDate={true} 
                        actionSlot={(
                            <div className={styles.jobActionButtons}>
                                <button 
                                    className={styles.jobActionBtn} 
                                    onClick={(e) => { e.stopPropagation(); handleEdit(job._id); }}
                                    title="Edit Job"
                                >
                                    <i className="fas fa-edit"></i>
                                </button>
                                <button 
                                    className={styles.jobActionBtn} 
                                    onClick={(e) => { e.stopPropagation(); navigate(`/dashboard/employer/jobs/${job._id}/applicants`); }}
                                    title="View Applicants"
                                >
                                    <i className="fas fa-users"></i>
                                </button>
                                <button 
                                    className={`${styles.jobActionBtn} ${styles.jobDeleteBtn}`}
                                    onClick={(e) => {
                                        e.stopPropagation();
                                        handleDelete(job._id);
                                    }}
                                    title="Delete Job"
                                >
                                    <i className="fas fa-trash"></i>
                                </button>
                            </div>
                        )}
                    />
                 ))}
                 
                 {jobs.length === 0 && (
                     <div style={{gridColumn: '1/-1', textAlign: 'center', padding: '40px', color: '#9ca3af', background: 'rgba(255,255,255,0.05)', borderRadius: '12px'}}>
                         <p>You haven't posted any jobs yet.</p>
                         <button 
                            style={{marginTop: '10px', background: 'none', border:'1px solid #fbbf24', color: '#fbbf24', padding:'8px 16px', borderRadius:'8px', cursor:'pointer'}}
                            onClick={() => navigate('/dashboard/employer/post-job')}
                         >
                             Create your first job
                         </button>
                     </div>
                 )}
            </div>
        </div>
    );
};

export default MyJobs;
