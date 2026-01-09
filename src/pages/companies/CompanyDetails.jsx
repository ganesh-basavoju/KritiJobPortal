import React, { useEffect, useState } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import styles from './Companies.module.css';
import Footer from '../../components/layout/Footer';
import api from '../../utils/api';
import DOMPurify from 'dompurify';

const CompanyDetails = () => {
    const { id } = useParams();
    const navigate = useNavigate();
    const [company, setCompany] = useState(null);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        const fetchCompany = async () => {
            try {
                const { data } = await api.get(`/company/${id}`);
                if (data.success) {
                    setCompany(data.data);
                }
                setLoading(false);
            } catch (err) {
                console.error(err);
                setLoading(false);
            }
        };
        fetchCompany();
    }, [id]);

    if (loading) return <div className={`focused-container ${styles.detailsContainer}`} style={{textAlign:'center', padding:'50px'}}>Loading...</div>;

    if (!company) return <div className={`focused-container ${styles.detailsContainer}`} style={{textAlign:'center', padding:'50px'}}>Company not found.</div>;

    // Sanitize Description
    const sanitizedDesc = DOMPurify.sanitize(company.description || '');

    return (
        <>
            <div className={`focused-container ${styles.detailsContainer}`}>
                <button onClick={() => navigate('/companies')} className={styles.backBtn}>
                    <i className="fas fa-arrow-left"></i> Back to Companies
                </button>

                <div className={styles.banner}>
                    {/* If we had a banner field, use it. Currently using CSS/Gradient */}
                </div>
                
                <div className={styles.profileHeader}>
                        <div className={styles.detailLogoWrapper}>
                            <img 
                                src={company.logoUrl || "https://via.placeholder.com/150?text=Logo"} 
                                alt={company.name} 
                                className={styles.logo} 
                            />
                        </div>
                        <div className={styles.headerInfo}>
                            <h1>{company.name}</h1>
                            <div className={styles.headerMeta}>
                                <span><i className="fas fa-map-marker-alt"></i> {company.location}</span>
                                {company.website && (
                                    <span><i className="fas fa-globe"></i> <a href={company.website} target="_blank" rel="noreferrer" style={{color: '#9ca3af', textDecoration: 'none'}}>Website</a></span>
                                )}
                            </div>
                        </div>
                </div>

                <div className={styles.headerContent} style={{marginTop: '2rem'}}>
                    <div className={styles.detailsSection}>
                        <h2 className={styles.sectionTitle}>About Us</h2>
                         <div 
                            className={styles.richTextContent}
                            dangerouslySetInnerHTML={{ __html: sanitizedDesc }}
                        />
                    </div>

                    <div className={styles.detailsSection}>
                        <h2 className={styles.sectionTitle}>Company Details</h2>
                        <div className={styles.infoGrid}>
                            <div className={styles.infoItem}>
                                <label>Location</label>
                                <p>{company.location}</p>
                            </div>
                            {/* Add more fields if schema supports them later (e.g. Industry, Size) */}
                            <div className={styles.infoItem}>
                                <label>Date Joined</label>
                                <p>{new Date(company.createdAt).toLocaleDateString()}</p>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
            <Footer />
        </>
    );
};

export default CompanyDetails;
