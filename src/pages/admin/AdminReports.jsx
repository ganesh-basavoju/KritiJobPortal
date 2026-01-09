import React, { useState, useEffect } from 'react';
import styles from './Admin.module.css';
import {
    LineChart, Line, BarChart, Bar, PieChart, Pie, Cell,
    XAxis, YAxis, CartesianGrid, Tooltip, Legend, ResponsiveContainer
} from 'recharts';
import api from '../../utils/api';

const ROLE_COLORS = ['#34d399', '#818cf8', '#f59e0b'];

// Custom Tooltip for dark theme
const CustomTooltip = ({ active, payload, label }) => {
    if (active && payload && payload.length) {
        return (
            <div style={{ background: '#1f2937', border: '1px solid #374151', padding: '10px', borderRadius: '8px' }}>
                <p style={{ margin: 0, fontWeight: 'bold', color: '#fff' }}>{label}</p>
                {payload.map((entry, index) => (
                    <p key={index} style={{ margin: 0, color: entry.color }}>
                        {entry.name}: {entry.value}
                    </p>
                ))}
            </div>
        );
    }
    return null;
};

const AdminReports = () => {
    const [userGrowth, setUserGrowth] = useState([]);
    const [jobStats, setJobStats] = useState([]);
    const [roleData, setRoleData] = useState([]);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        const fetchReports = async () => {
             try {
                 const [statsRes, growthRes] = await Promise.all([
                     api.get('/reports/stats'),
                     api.get('/reports/growth')
                 ]);

                 if (statsRes.data.success) {
                     const d = statsRes.data.data;
                     
                     // Helper to handle role data safely
                     const roleCounts = d.users.byRole || [];
                     setRoleData(roleCounts.map(r => ({
                         name: r._id.charAt(0).toUpperCase() + r._id.slice(1),
                         value: r.count
                     })));

                     // Helper for job stats (assuming byType exists, if not, empty)
                     const jobCounts = d.jobs.byType || [];
                     setJobStats(jobCounts.map(j => ({
                         name: j._id || 'Uncategorized',
                         count: j.count // Using 'count' as key for BarChart
                     })));
                 }

                 if (growthRes.data.success) {
                     setUserGrowth(growthRes.data.data);
                 }

                 setLoading(false);
             } catch (err) {
                 console.error("Failed to load reports", err);
                 setLoading(false);
             }
        };

        fetchReports();
    }, []);

    if (loading) return <div style={{padding:'20px', color:'white'}}>Loading Reports...</div>;

    return (
        <div className={styles.pageContainer}>
            <div className={styles.headerRow}>
                <h1 className={styles.pageTitle}>Reports & Analytics</h1>
                <div style={{ display: 'flex', gap: '10px' }}>
                     <select className={styles.actionBtn} style={{ background: '#1a1a1a', border: '1px solid rgba(255,255,255,0.1)', padding: '8px 12px', borderRadius: '8px' }}>
                        <option>Last 6 Months</option>
                        <option>Last Year</option>
                        <option>All Time</option>
                     </select>
                     <button className={styles.primaryBtn} disabled>Export CSV</button>
                </div>
            </div>

            <div className={styles.chartsGrid}>
                {/* User Growth Chart */}
                <div className={styles.chartContainer}>
                    <div className={styles.chartHeader}>
                        <h3 className={styles.chartTitle}>User Growth</h3>
                    </div>
                    <ResponsiveContainer width="100%" height={300}>
                        <LineChart data={userGrowth}>
                            <CartesianGrid strokeDasharray="3 3" stroke="#374151" />
                            <XAxis dataKey="name" stroke="#9ca3af" />
                            <YAxis stroke="#9ca3af" />
                            <Tooltip content={<CustomTooltip />} />
                            <Legend />
                            <Line type="monotone" dataKey="users" stroke="#fbbf24" strokeWidth={2} activeDot={{ r: 8 }} />
                        </LineChart>
                    </ResponsiveContainer>
                </div>

                {/* Job Stats Chart */}
                <div className={styles.chartContainer}>
                    <div className={styles.chartHeader}>
                        <h3 className={styles.chartTitle}>Jobs by Type</h3>
                    </div>
                    <ResponsiveContainer width="100%" height={300}>
                        <BarChart data={jobStats}>
                            <CartesianGrid strokeDasharray="3 3" stroke="#374151" />
                            <XAxis dataKey="name" stroke="#9ca3af" />
                            <YAxis stroke="#9ca3af" />
                            <Tooltip content={<CustomTooltip />} />
                            <Legend />
                            {/* Simplified to single bar as backend aggregation is simple type count */}
                            <Bar dataKey="count" fill="#34d399" />
                        </BarChart>
                    </ResponsiveContainer>
                </div>

                {/* User Roles Pie Chart */}
                <div className={styles.chartContainer} style={{ gridColumn: 'span 1' }}> 
                    <div className={styles.chartHeader}>
                        <h3 className={styles.chartTitle}>User Distribution</h3>
                    </div>
                    <ResponsiveContainer width="100%" height={300}>
                        <PieChart>
                            <Pie
                                data={roleData}
                                cx="50%"
                                cy="50%"
                                innerRadius={60}
                                outerRadius={80}
                                paddingAngle={5}
                                dataKey="value"
                            >
                                {roleData.map((entry, index) => (
                                    <Cell key={`cell-${index}`} fill={ROLE_COLORS[index % ROLE_COLORS.length]} />
                                ))}
                            </Pie>
                            <Tooltip content={<CustomTooltip />} />
                            <Legend verticalAlign="bottom" height={36} />
                        </PieChart>
                    </ResponsiveContainer>
                </div>
            </div>
        </div>
    );
};

export default AdminReports;
