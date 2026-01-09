import React, { useContext } from 'react';
import { useNavigate } from 'react-router-dom';
import { AuthContext } from '../../context/AuthContext';
import { useToast } from '../../context/ToastContext';
import api from '../../utils/api';
import styles from './JobCard.module.css';
import { formatDistanceToNow } from 'date-fns';

const JobCard = ({ job, onUnsave, isSaved, onToggleSave }) => {
  const { user } = useContext(AuthContext);
  const { addToast } = useToast();
  const navigate = useNavigate();

  // We can manage 'saved' state locally or via props.
  // Ideally, parent passes 'isSaved' if we know it.
  // For 'SavedJobs' page, it is always saved.
  // For 'Jobs' listing, we need to know.
  // For Phase 1B, let's assume we handle 'unsave' callback for SavedJobs page,
  // and for general listing we might just simple-toggle or need to fetch saved list to check status.
  // To keep it simple: If 'onUnsave' is provided, we assume we are in SavedJobs view and clicking bookmark removes it.
  
  // MAPPING BACKEND DATA TO UI
  const displayJob = {
      id: job._id || job.id,
      title: job.title,
      company: job.companyId?.name || 'Company',
      logo: job.companyId?.logoUrl, // Backend field
      location: job.location,
      type: job.type,
      salary: job.salaryRange,
      postedTime: job.postedAt ? formatDistanceToNow(new Date(job.postedAt), { addSuffix: true }) : 'Recently',
      description: job.description || '',
      skills: job.skillsRequired || []
  };

  const toggleSave = async (e) => {
    e.stopPropagation();
    if (!user) {
        addToast('Please login to save jobs', 'info');
        return;
    }
    if (user.role !== 'candidate') {
        addToast('Only candidates can save jobs', 'warning');
        return;
    }

    try {
        if (onUnsave) {
            // "Saved Jobs" view: unsave
            await api.delete(`/candidate/saved-jobs/${displayJob.id}`);
            addToast('Job removed from saved items', 'success');
            onUnsave(displayJob.id);
        } else {
            // "All Jobs" view: toggle based on isSaved prop
            if (isSaved) {
                await api.delete(`/candidate/saved-jobs/${displayJob.id}`);
                addToast('Job removed from saved items', 'default');
            } else {
                await api.post('/candidate/saved-jobs', { jobId: displayJob.id });
                addToast('Job saved successfully!', 'success');
            }
            if (onToggleSave) onToggleSave();
        }
    } catch (err) {
        console.error(err);
        const msg = err.response?.data?.message || 'Action failed';
        addToast(msg, 'error');
    }
  };

  const handleCardClick = (e) => {
    const isInteractive = e.target.closest('button') || e.target.closest('a') || e.target.closest('[role="button"]') || e.target.closest('.prevent-nav');
    if (isInteractive && isInteractive !== e.currentTarget) {
        return;
    }
    navigate(`/jobs/${displayJob.id}`);
  };

  return (
    <div className={styles.card} onClick={handleCardClick} role="button" tabIndex={0} style={{cursor: 'pointer'}}>
      <div className={styles.header}>
        <div className={styles.companyIcon} style={{backgroundColor: '#fff'}}>
           {displayJob.logo ? (
             <img src={displayJob.logo} alt={displayJob.company} style={{width:'100%', height:'100%', objectFit:'contain'}} />
           ) : (
             <i className="fas fa-building" style={{color: '#666'}}></i>
           )}
        </div>
        <div className={styles.jobInfo}>
            <h3 className={styles.title}>{displayJob.title}</h3>
            <p className={styles.company}>
                {displayJob.company} <span className={styles.dot}>•</span> <span>{displayJob.location}</span>
            </p>
        </div>
        <div className={styles.bookmark} onClick={toggleSave}>
            <i className={`${(onUnsave || isSaved) ? 'fas' : 'far'} fa-bookmark`} style={{color: (onUnsave || isSaved) ? '#fbbf24' : 'inherit'}}></i>
        </div>
      </div>

      <div className={styles.tags}>
        <span className={`${styles.tag} ${styles.fulltime}`}>{displayJob.type}</span>
        {displayJob.skills.slice(0, 2).map((skill, index) => (
            <span key={index} className={styles.tag}>{skill}</span>
        ))}
        {displayJob.skills.length > 2 && <span className={styles.tag}>+{displayJob.skills.length - 2}</span>}
      </div>

      <p className={styles.description} style={{ display: '-webkit-box', WebkitLineClamp: 2, WebkitBoxOrient: 'vertical', overflow: 'hidden' }}>
        {displayJob.description.replace(/<[^>]+>/g, '')}
      </p>

      <div className={styles.footer}>
        <div className={styles.salary}>
            {displayJob.salary}
        </div>
        <div className={styles.posted}>
            <i className="far fa-clock"></i> {displayJob.postedTime}
        </div>
      </div>
    </div>
  );
};

export default JobCard;
