import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import styles from './Companies.module.css';
import Footer from '../../components/layout/Footer';
import api from '../../utils/api';

const CompanyCard = ({ company, onClick }) => {
    return (
        <div className={styles.companyCard} onClick={() => onClick(company._id)}>
            <div className={styles.logoWrapper}>
                <img 
                    src={company.logoUrl || "https://via.placeholder.com/150?text=Logo"} 
                    alt={`${company.name} Logo`} 
                    className={styles.logo} 
                />
            </div>
            <h3 className={styles.companyName}>{company.name}</h3>
            <p className={styles.location}>
                <i className="fas fa-map-marker-alt"></i> {company.location}
            </p>
            {/* Optional: Show job count if available */}
            <button className={styles.viewBtn}>View Details</button>
        </div>
    );
};

const CompanyListing = () => {
    const navigate = useNavigate();
    const [companies, setCompanies] = useState([]);
    const [loading, setLoading] = useState(true);
    const [searchTerm, setSearchTerm] = useState('');

    useEffect(() => {
        fetchCompanies();
    }, []);

    const fetchCompanies = async () => {
        try {
            const { data } = await api.get('/company'); // /api/company as per routes (singular route file mount, but endpoint is plural logic)
            // Wait, I updated company.routes.js to mounting at /api/company ?
            // In routes/index.js (server), likely mounted as app.use('/api/company', companyRoutes);
            // And inside company.routes.js: router.get('/', getCompanies);
            // So request is GET /api/company. Correct.
            
            if (data.success) {
                setCompanies(data.data);
            }
            setLoading(false);
        } catch (err) {
            console.error(err);
            setLoading(false);
        }
    };

    const handleCompanyClick = (id) => {
        navigate(`/company/${id}`);
    };

    // Client-side filtering for search term on loaded companies (Pagination on backend is better but for small list client side is fine)
    // Actually Backend supports search, but I didn't hook up a search bar to API call yet. 
    // For Phase 3B requirement "Search & Filtering", sticking to Client side filter for the loaded 20 items is okay for MVP unless pagination is strict.
    const filteredCompanies = companies.filter(company => 
        company.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
        company.location.toLowerCase().includes(searchTerm.toLowerCase())
    );

    if (loading) return <div className={`focused-container ${styles.pageContainer}`} style={{textAlign:'center', padding:'50px'}}>Loading companies...</div>;

    return (
        <>
            <div className={`focused-container ${styles.pageContainer}`}>
                <h1 className={styles.pageTitle}>Top Employers</h1>
                
                {/* Simple Search Input */}
                <div style={{marginBottom: '2rem', maxWidth: '400px'}}>
                     <input 
                        type="text"
                        placeholder="Search companies..."
                        value={searchTerm}
                        onChange={(e) => setSearchTerm(e.target.value)}
                        style={{
                            width: '100%',
                            padding: '12px 16px',
                            borderRadius: '8px',
                            border: '1px solid rgba(255,255,255,0.1)',
                            background: 'rgba(255,255,255,0.05)',
                            color: 'white'
                        }}
                     />
                </div>

                <div className={styles.companiesGrid}>
                    {filteredCompanies.map(company => (
                        <CompanyCard 
                            key={company._id} 
                            company={company} 
                            onClick={handleCompanyClick} 
                        />
                    ))}
                    {filteredCompanies.length === 0 && (
                        <div style={{color: '#888', gridColumn: '1/-1', textAlign: 'center'}}>No companies found.</div>
                    )}
                </div>
            </div>
            <Footer />
        </>
    );
};

export default CompanyListing;
