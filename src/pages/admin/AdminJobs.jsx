import React, { useState, useEffect } from 'react';
import styles from './Admin.module.css';
import api from '../../utils/api';
import { useToast } from '../../context/ToastContext';
import { format } from 'date-fns';

const AdminJobs = () => {
    const { addToast } = useToast();
    const [jobs, setJobs] = useState([]);
    const [loading, setLoading] = useState(true);
    const [filter, setFilter] = useState('all');

    useEffect(() => {
        fetchJobs();
    }, []);

    const fetchJobs = async () => {
        try {
            // Admin should ideally see all jobs. 
            // If public getJobs filters by status=Open, we might need a specific Admin route or query param?
            // The generic getJobs in controller uses req.query directly.
            // If I don't pass status, it finds all.
            const { data } = await api.get('/jobs?limit=100&sort=-createdAt');
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

    const handleAction = async (action, jobId) => {
        try {
            if (action === 'delete') {
                if (window.confirm('Are you sure you want to delete this job?')) {
                    await api.delete(`/jobs/${jobId}`);
                    setJobs(jobs.filter(j => j._id !== jobId));
                    addToast('Job deleted successfully', 'success');
                }
            } else if (action === 'toggleStatus') {
                const job = jobs.find(j => j._id === jobId);
                const newStatus = job.status === 'Open' ? 'Closed' : 'Open';
                
                await api.put(`/jobs/${jobId}`, { status: newStatus });
                
                setJobs(jobs.map(j => j._id === jobId ? { ...j, status: newStatus } : j));
                addToast(`Job marked as ${newStatus}`, 'success');
            }
        } catch (err) {
            console.error(err);
            addToast('Action failed', 'error');
        }
    };

    const filteredJobs = filter === 'all' 
        ? jobs 
        : jobs.filter(j => j.status === (filter === 'active' ? 'Open' : 'Closed'));

    if (loading) return <div style={{padding:'20px', color:'white'}}>Loading Jobs...</div>;

    return (
        <div className={styles.pageContainer}>
             <div className={styles.headerRow}>
                <h1 className={styles.pageTitle}>Job Management</h1>
                <select 
                    className={styles.actionBtn} 
                    style={{background: '#1f2937', border: '1px solid #374151', padding: '6px 12px', borderRadius: '6px', color: 'white'}}
                    value={filter}
                    onChange={(e) => setFilter(e.target.value)}
                >
                    <option value="all">All Status</option>
                    <option value="active">Active (Open)</option>
                    <option value="closed">Closed</option>
                </select>
            </div>
             <div className={styles.tableContainer}>
                <table className={styles.table}>
                    <thead>
                        <tr>
                            <th>Job Title</th>
                            <th>Company</th>
                            <th>Posted Date</th>
                            <th>Status</th>
                            <th>Actions</th>
                        </tr>
                    </thead>
                    <tbody>
                        {filteredJobs.map(job => (
                            <tr key={job._id}>
                                <td style={{fontWeight: 500, color: 'white'}}>{job.title}</td>
                                <td>{job.companyId?.name || 'Company'}</td>
                                <td style={{color: '#9ca3af', fontSize: '0.9rem'}}>{job.createdAt ? format(new Date(job.createdAt), 'yyyy-MM-dd') : '-'}</td>
                                <td>
                                    <span className={`${styles.badge} ${job.status === 'Open' ? styles.badgeActive : styles.badgeBlocked}`}>
                                        {job.status}
                                    </span>
                                </td>
                                <td>
                                    <div style={{display: 'flex'}}>
                                        <button className={`${styles.actionBtn} ${styles.edit}`} title={job.status === 'Open' ? "Close Job" : "Reopen Job"} onClick={() => handleAction('toggleStatus', job._id)}>
                                            <i className={`fas ${job.status === 'Open' ? 'fa-ban' : 'fa-check-circle'}`}></i>
                                        </button>
                                        <button className={`${styles.actionBtn} ${styles.delete}`} title="Delete Job" onClick={() => handleAction('delete', job._id)}>
                                            <i className="fas fa-trash"></i>
                                        </button>
                                    </div>
                                </td>
                            </tr>
                        ))}
                    </tbody>
                </table>
            </div>
        </div>
    );
};

export default AdminJobs;
