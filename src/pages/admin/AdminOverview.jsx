import React, { useState, useEffect } from 'react';
import styles from './Admin.module.css';
import api from '../../utils/api';
import { formatDistanceToNow } from 'date-fns';

const AdminOverview = () => {
    const [stats, setStats] = useState([
        { label: 'Total Users', value: '...', icon: 'fa-users', color: '#3b82f6' },
        { label: 'Active Jobs', value: '...', icon: 'fa-briefcase', color: '#10b981' },
        { label: 'Total Applicants', value: '...', icon: 'fa-file-alt', color: '#8b5cf6' },
        // Revenue not yet tracked in backend, keeping placeholder or specific
    ]);

    const [recentActivity, setRecentActivity] = useState([]);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        const fetchData = async () => {
            try {
                const [statsRes, activityRes] = await Promise.all([
                    api.get('/reports/stats'),
                    api.get('/reports/activity')
                ]);

                if (statsRes.data.success) {
                    const d = statsRes.data.data;
                    setStats([
                        { label: 'Total Users', value: d.users.total, icon: 'fa-users', color: '#3b82f6' },
                        { label: 'Active Jobs', value: d.jobs.active, icon: 'fa-briefcase', color: '#10b981' },
                        { label: 'Total Applications', value: d.applications.total, icon: 'fa-file-alt', color: '#8b5cf6' },
                        { label: 'Total Jobs', value: d.jobs.total, icon: 'fa-layer-group', color: '#f59e0b' },
                    ]);
                }

                if (activityRes.data.success) {
                    setRecentActivity(activityRes.data.data);
                }
                setLoading(false);
            } catch (err) {
                console.error("Failed to fetch admin stats", err);
                setLoading(false);
            }
        };

        fetchData();
    }, []);

    if (loading) return <div style={{padding: '50px', textAlign: 'center', color:'white'}}>Loading Dashboard...</div>;

    return (
        <div className={styles.pageContainer}>
            <div className={styles.headerRow}>
                <h1 className={styles.pageTitle}>Dashboard Overview</h1>
                <div style={{color: '#9ca3af', fontSize: '0.9rem'}}>
                    Real-time Data
                </div>
            </div>
            
            {/* KPI Cards */}
            <div className={styles.kpiGrid}>
                {stats.map((stat, index) => (
                    <div key={index} className={styles.kpiCard}>
                        <div>
                            <p className={styles.kpiLabel}>{stat.label}</p>
                            <h2 className={styles.kpiValue}>{stat.value}</h2>
                        </div>
                        <div className={styles.kpiIcon} style={{ color: stat.color, background: `${stat.color}20` }}>
                            <i className={`fas ${stat.icon}`}></i>
                        </div>
                    </div>
                ))}
            </div>

            <div className={styles.chartsGrid}>
                {/* Recent Activity Feed */}
                <div className={styles.chartContainer}>
                     <div className={styles.chartHeader}>
                        <h3 className={styles.chartTitle}>Recent Activity</h3>
                        <button className={styles.actionBtn}>Refresh</button>
                     </div>
                     <div className={styles.activityList}>
                         {recentActivity.length === 0 ? <p style={{color:'#666', padding:'20px'}}>No recent activity.</p> : recentActivity.map(item => (
                             <div key={item.id} className={styles.activityItem}>
                                 <div className={styles.activityIcon}>
                                     {item.type === 'user' && <i className="fas fa-user-plus" style={{color: '#3b82f6'}}></i>}
                                     {item.type === 'job' && <i className="fas fa-briefcase" style={{color: '#10b981'}}></i>}
                                     {item.type === 'application' && <i className="fas fa-file-alt" style={{color: '#f59e0b'}}></i>}
                                 </div>
                                 <div className={styles.activityContent}>
                                     <p className={styles.activityMessage}>{item.message}</p>
                                     <span className={styles.activityTime}>{item.time ? formatDistanceToNow(new Date(item.time), { addSuffix: true }) : 'Just now'}</span>
                                 </div>
                             </div>
                         ))}
                     </div>
                </div>

                {/* Quick Stats / Revenue Chart Placeholder */}
                <div className={styles.chartContainer}>
                     <div className={styles.chartHeader}>
                        <h3 className={styles.chartTitle}>Platform Growth</h3>
                        <div style={{fontSize:'0.8rem', color:'#aaa'}}>Visual only (Placeholder)</div>
                     </div>
                     <div style={{height: '250px', display: 'flex', alignItems: 'center', justifyContent: 'center', background: 'rgba(255,255,255,0.02)', borderRadius: '8px', border: '1px dashed #4b5563'}}>
                         <p style={{color: '#6b7280'}}>Growth Chart Visualization</p>
                     </div>
                </div>
            </div>
        </div>
    );
};

export default AdminOverview;
