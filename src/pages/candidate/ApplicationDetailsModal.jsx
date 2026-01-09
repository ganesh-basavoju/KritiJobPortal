import React from 'react';
import Button from '../../components/ui/Button';

// Reusing styles from JobApplicationModal by inline or copying relevant parts 
// to ensure consistency sans complexity.
const modalOverlayStyle = {
    position: 'fixed',
    top: 0,
    left: 0,
    width: '100%',
    height: '100%',
    backgroundColor: 'rgba(0, 0, 0, 0.7)',
    display: 'flex',
    justifyContent: 'center',
    alignItems: 'center',
    zIndex: 1100,
    padding: '20px'
};

const modalContentStyle = {
    backgroundColor: '#1a1a1a',
    borderRadius: '12px',
    width: '100%',
    maxWidth: '600px',
    maxHeight: '90vh',
    overflowY: 'auto',
    border: '1px solid rgba(255, 255, 255, 0.1)',
    boxShadow: '0 20px 50px rgba(0,0,0,0.5)',
    display: 'flex',
    flexDirection: 'column'
};

const headerStyle = {
    padding: '20px 30px',
    borderBottom: '1px solid rgba(255, 255, 255, 0.1)',
    display: 'flex',
    justifyContent: 'space-between',
    alignItems: 'center',
    background: 'rgba(255, 255, 255, 0.02)'
};

const bodyStyle = {
    padding: '30px',
    overflowY: 'auto'
};

const sectionStyle = {
    marginBottom: '25px'
};

const labelStyle = {
    display: 'block',
    color: '#fbbf24', // Gold
    marginBottom: '8px',
    fontSize: '0.9rem',
    fontWeight: '600',
    textTransform: 'uppercase'
};

const valueStyle = {
    color: '#e5e7eb',
    fontSize: '1rem',
    lineHeight: '1.6'
};

const ApplicationDetailsModal = ({ application, onClose }) => {
    if (!application) return null;

    return (
        <div style={modalOverlayStyle} onClick={onClose}>
            <div style={modalContentStyle} onClick={e => e.stopPropagation()}>
                <div style={headerStyle}>
                    <div>
                        <h2 className="text-gradient" style={{fontSize: '1.5rem', margin: 0}}>{application.jobId?.title || 'Job Title'}</h2>
                        <p style={{color: '#9ca3af', margin: '5px 0 0 0'}}>{application.jobId?.companyId?.name || 'Company Name'}</p>
                    </div>
                    <button onClick={onClose} style={{background: 'none', border: 'none', color: '#9ca3af', fontSize: '1.2rem', cursor: 'pointer'}}>
                        <i className="fas fa-times"></i>
                    </button>
                </div>

                <div style={bodyStyle}>
                    <div style={sectionStyle}>
                         <h4 style={labelStyle}>Status</h4>
                         <span style={{
                             padding: '6px 12px',
                             borderRadius: '20px',
                             background: application.status === 'Applied' ? 'rgba(52, 152, 219, 0.15)' : 
                                         application.status === 'Interviewing' ? 'rgba(241, 196, 15, 0.15)' : 
                                         application.status === 'Rejected' ? 'rgba(231, 76, 60, 0.15)' : 'rgba(46, 204, 113, 0.15)',
                             color: application.status === 'Applied' ? '#3498db' : 
                                    application.status === 'Interviewing' ? '#f1c40f' : 
                                    application.status === 'Rejected' ? '#e74c3c' : '#2ecc71',
                             fontWeight: '500',
                             border: '1px solid currentColor'
                         }}>
                            {application.status}
                         </span>
                    </div>

                    <div style={{display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '20px', marginBottom: '25px'}}>
                        <div>
                             <h4 style={labelStyle}>Applied On</h4>
                             <p style={valueStyle}>{application.createdAt ? new Date(application.createdAt).toLocaleDateString() : 'N/A'}</p>
                        </div>
                        <div>
                             <h4 style={labelStyle}>Location</h4>
                             <p style={valueStyle}>{application.jobId?.location || 'Location'}</p>
                        </div>
                    </div>

                    {/* Cover Letter - Not in schema currently, hidden */}
                    
                    <div style={sectionStyle}>
                         <h4 style={labelStyle}>Resume / CV</h4>
                         {application.resumeUrl ? (
                             <div style={{display: 'flex', alignItems: 'center', gap: '15px'}}>
                                 <i className="fas fa-file-pdf" style={{fontSize: '2rem', color: '#e74c3c'}}></i>
                                 <div>
                                     <p style={{margin: 0, color: 'white', fontWeight: '500'}}>Resume Attached</p>
                                     <a 
                                        href={application.resumeUrl} 
                                        target="_blank" 
                                        rel="noopener noreferrer" 
                                        style={{color: '#fbbf24', fontSize: '0.9rem'}}
                                     >
                                         Download / View
                                     </a>
                                 </div>
                             </div>
                         ) : (
                             <p style={{color: '#666'}}>No resume attached.</p>
                         )}
                    </div>
                </div>

                <div style={{padding: '20px 30px', borderTop: '1px solid rgba(255,255,255,0.1)', textAlign: 'right'}}>
                    <Button variant="outline" onClick={onClose}>Close</Button>
                </div>
            </div>
        </div>
    );
};

export default ApplicationDetailsModal;
