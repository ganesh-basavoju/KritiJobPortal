import { AuthContext } from '../../context/AuthContext';
import styles from './JobListing.module.css';
import JobCard from '../../components/jobs/JobCard';
import JobFilterBar from '../../components/jobs/JobFilterBar';
import SortDropdown from '../../components/jobs/SortDropdown';
import Footer from '../../components/layout/Footer';
import api from '../../utils/api';
import { useLocation, useSearchParams } from 'react-router-dom';
import React, { useState, useEffect } from 'react';

const JobListing = () => {
  const [jobs, setJobs] = useState([]);
  const [loading, setLoading] = useState(true);
  const [searchParams, setSearchParams] = useSearchParams();
  const { user } = React.useContext(AuthContext); 
  const [savedJobIds, setSavedJobIds] = useState([]);
  
  const [pagination, setPagination] = useState({ page: 1, totalPages: 1, total: 0 });
  
  // Initial filter state from URL
  const initialFilters = {
      keyword: searchParams.get('keyword') || '',
      location: searchParams.get('location') ? searchParams.get('location').split(',') : [],
      experienceLevel: searchParams.get('experienceLevel') ? searchParams.get('experienceLevel').split(',') : [],
      type: searchParams.get('type') ? searchParams.get('type').split(',') : [],
      minSalary: searchParams.get('minSalary') ? Number(searchParams.get('minSalary')) : 0,
      maxSalary: searchParams.get('maxSalary') ? Number(searchParams.get('maxSalary')) : 5000000,
      page: searchParams.get('page') ? Number(searchParams.get('page')) : 1
  };

  const handleFilterChange = (newFilters) => {
      const params = {};
      
      // Reset page to 1 on filter change
      params.page = 1;
      
      // Keyword
      if (newFilters.keyword) params.keyword = newFilters.keyword;
      
      // Arrays
      if (newFilters.location && newFilters.location.length > 0) params.location = newFilters.location.join(',');
      if (newFilters.experienceLevel && newFilters.experienceLevel.length > 0) params.experienceLevel = newFilters.experienceLevel.join(',');
      if (newFilters.type && newFilters.type.length > 0) params.type = newFilters.type.join(',');
      
      // Salary (Only add if changed from defaults)
      if (newFilters.minSalary > 0 || newFilters.maxSalary < 5000000) {
          params.minSalary = newFilters.minSalary;
          params.maxSalary = newFilters.maxSalary;
      }
      
      setSearchParams(params);
  };

  const handlePageChange = (newPage) => {
      const currentParams = Object.fromEntries(searchParams.entries());
      setSearchParams({ ...currentParams, page: newPage });
      window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  useEffect(() => {
    const fetchJobsAndSavedState = async () => {
      try {
        setLoading(true);
        // Force limit = 12
        const query = searchParams.toString() + '&limit=12';
        const { data } = await api.get(`/jobs?${query}`);
        if (data.success) {
          setJobs(data.data);
          setPagination({
              page: data.page,
              totalPages: data.totalPages,
              total: data.total
          });
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
  }, [searchParams, user]);


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
        
        <JobFilterBar 
            filters={initialFilters} 
            onFilterChange={handleFilterChange} 
        /> 

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

        {/* Pagination Controls */}
        {pagination.totalPages > 1 && (
            <div className={styles.pagination}>
                <button 
                    className={styles.pageBtn}
                    onClick={() => handlePageChange(pagination.page - 1)}
                    disabled={pagination.page === 1}
                >
                    <i className="fas fa-chevron-left"></i> Previous
                </button>
                
                <span className={styles.pageInfo}>
                    Page {pagination.page} of {pagination.totalPages}
                </span>

                <button 
                    className={styles.pageBtn}
                    onClick={() => handlePageChange(pagination.page + 1)}
                    disabled={pagination.page === pagination.totalPages}
                >
                    Next <i className="fas fa-chevron-right"></i>
                </button>
            </div>
        )}
      </div>
      <Footer />
    </>
  );
};

export default JobListing;
