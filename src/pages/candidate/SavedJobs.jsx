import React, { useState, useEffect } from 'react';
import JobCard from '../../components/jobs/JobCard';
import api from '../../utils/api';
import styles from './Candidate.module.css'; // Reusing candidate styles

const SavedJobs = () => {
    const [savedJobs, setSavedJobs] = useState([]);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        fetchSavedJobs();
    }, []);

    const fetchSavedJobs = async () => {
        try {
            const { data } = await api.get('/candidate/saved-jobs');
            if (data.success) {
                setSavedJobs(data.data);
            }
            setLoading(false);
        } catch (err) {
            console.error('Failed to fetch saved jobs', err);
            setLoading(false);
        }
    };

    const handleUnsave = (id) => {
        setSavedJobs(prev => prev.filter(job => job._id !== id));
    };

    if (loading) return <div style={{padding: '2rem', textAlign: 'center'}}>Loading...</div>;

    return (
        <div style={{ padding: '2rem' }}>
            {savedJobs.length === 0 ? (
                <div style={{ textAlign: 'center', color: '#6b7280', marginTop: '3rem' }}>
                    <i className="far fa-bookmark" style={{ fontSize: '3rem', marginBottom: '1rem' }}></i>
                    <p>No saved jobs yet.</p>
                </div>
            ) : (
                <>
                    <h2 className="text-gradient" style={{ marginBottom: '1.5rem' }}>Saved Jobs</h2>
                    <div className="jobs-grid" style={{ 
                        display: 'grid', 
                        gridTemplateColumns: 'repeat(auto-fill, minmax(300px, 1fr))', 
                        gap: '20px' 
                    }}>
                        {savedJobs.map(job => (
                            <JobCard key={job._id} job={job} onUnsave={handleUnsave} />
                        ))}
                    </div>
                </>
            )}
        </div>
    );
};

export default SavedJobs;
