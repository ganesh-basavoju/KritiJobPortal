import { AuthContext } from '../../context/AuthContext';
import styles from './JobListing.module.css';
import JobCard from '../../components/jobs/JobCard';
import JobFilterBar from '../../components/jobs/JobFilterBar';
import SortDropdown from '../../components/jobs/SortDropdown';
import Footer from '../../components/layout/Footer';
import api from '../../utils/api';
import { useLocation } from 'react-router-dom';
import React, { useState, useEffect } from 'react';

const JobListing = () => {
  const [jobs, setJobs] = useState([]);
  const [loading, setLoading] = useState(true);
  const location = useLocation();
  const { user } = React.useContext(AuthContext); 
  const [savedJobIds, setSavedJobIds] = useState([]);

  useEffect(() => {
    const fetchJobsAndSavedState = async () => {
      try {
        const query = new URLSearchParams(location.search).toString();
        const { data } = await api.get(`/jobs?${query}`);
        if (data.success) {
          setJobs(data.data);
        }
        
        // Fetch Saved Jobs if Candidate
        if (user && user.role === 'candidate') {
            const savedRes = await api.get('/candidate/saved-jobs');
            // Backend returns full objects or IDs? getSavedJobs populates.
            // We need ids for checking.
            if (savedRes.data.success) {
                const ids = savedRes.data.data.map(j => j._id);
                setSavedJobIds(ids);
            }
        }
        
        setLoading(false);
      } catch (err) {
        console.error(err);
        setLoading(false);
      }
    };

    fetchJobsAndSavedState();
  }, [location.search, user]);

  const handleToggleSave = async (id) => {
      // Optimistic update
      const isSaved = savedJobIds.includes(id);
      const newSavedIds = isSaved 
        ? savedJobIds.filter(sid => sid !== id)
        : [...savedJobIds, id];
      
      setSavedJobIds(newSavedIds); // Update UI immediately
  }

  if (loading) return <div className={`focused-container ${styles.pageContainer}`} style={{textAlign:'center', padding:'50px'}}>Loading jobs...</div>;

  return (
    <>
      <div className={`focused-container ${styles.pageContainer}`}>
        <h1 className={styles.pageTitle}>Let's Find You a Job</h1>
        
        <JobFilterBar /> 

        <div className={styles.resultsHeader}>
          <h2 className={styles.sectionTitle}>
             {jobs.length > 0 ? `Showing ${jobs.length} Jobs` : 'No Jobs Found'}
          </h2>
          <SortDropdown />
        </div>

        <div className={styles.jobsGrid}>
          {jobs.map(job => (
              <JobCard 
                key={job._id} 
                job={job} 
                isSaved={savedJobIds.includes(job._id)}
                onToggleSave={() => handleToggleSave(job._id)}
              />
          ))}
          {jobs.length === 0 && !loading && (
              <div style={{color: '#888', gridColumn: '1/-1', textAlign: 'center', padding: '40px'}}>
                  No jobs found matching your criteria.
              </div>
          )}
        </div>
      </div>
      <Footer />
    </>
  );
};

export default JobListing;
