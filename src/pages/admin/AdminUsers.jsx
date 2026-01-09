import React, { useState, useEffect } from 'react';
import styles from './Admin.module.css';
import api from '../../utils/api';
import { useToast } from '../../context/ToastContext';
import { format } from 'date-fns';

const AdminUsers = () => {
    const { addToast } = useToast();
    const [users, setUsers] = useState([]);
    const [loading, setLoading] = useState(true);
    const [filter, setFilter] = useState('all');

    useEffect(() => {
        fetchUsers();
    }, []);

    const fetchUsers = async () => {
        try {
            // Fetching 100 to show reasonable list
            const { data } = await api.get('/users?limit=100&sort=-createdAt');
            if (data.success) {
                setUsers(data.data);
            }
            setLoading(false);
        } catch (err) {
            console.error(err);
            addToast('Failed to load users', 'error');
            setLoading(false);
        }
    };

    const handleAction = async (action, userId) => {
        try {
            if (action === 'delete') {
                if (window.confirm('Are you sure you want to delete this user? This action cannot be undone.')) {
                    await api.delete(`/users/${userId}`);
                    setUsers(users.filter(u => u._id !== userId));
                    addToast('User deleted successfully', 'success');
                }
            } else if (action === 'block' || action === 'active') { // 'active' checks for unblock
                // Determine new status based on current
                const user = users.find(u => u._id === userId);
                const newStatus = user.status === 'active' ? 'blocked' : 'active';
                
                await api.put(`/users/${userId}`, { status: newStatus });
                
                setUsers(users.map(u => u._id === userId ? { ...u, status: newStatus } : u));
                addToast(`User ${newStatus === 'active' ? 'unblocked' : 'blocked'} successfully`, 'success');
            }
        } catch (err) {
            console.error(err);
            addToast('Action failed', 'error');
        }
    };

    const filteredUsers = filter === 'all' 
        ? users 
        : users.filter(u => u.role === filter);

    if (loading) return <div style={{padding:'20px', color:'white'}}>Loading Users...</div>;

    return (
        <div className={styles.pageContainer}>
            <div className={styles.headerRow}>
                <h1 className={styles.pageTitle}>User Management</h1>
                <div style={{display: 'flex', gap: '10px'}}>
                    <select 
                        className={styles.actionBtn} 
                        style={{background: '#1f2937', border: '1px solid #374151', padding: '6px 12px', borderRadius: '6px', color: 'white'}}
                        value={filter}
                        onChange={(e) => setFilter(e.target.value)}
                    >
                        <option value="all">All Roles</option>
                        <option value="candidate">Candidates</option>
                        <option value="employer">Employers</option>
                        <option value="admin">Admins</option>
                    </select>
                </div>
            </div>

            <div className={styles.tableContainer}>
                <table className={styles.table}>
                    <thead>
                        <tr>
                            <th>Name</th>
                            <th>Email</th>
                            <th>Role</th>
                            <th>Status</th>
                            <th>Joined</th>
                            <th>Actions</th>
                        </tr>
                    </thead>
                    <tbody>
                        {filteredUsers.map(user => (
                            <tr key={user._id}>
                                <td>
                                    <div style={{display: 'flex', alignItems: 'center', gap: '10px'}}>
                                        <div style={{width: '32px', height: '32px', borderRadius: '50%', background: '#374151', display: 'flex', alignItems: 'center', justifyContent: 'center', fontSize: '0.8rem', fontWeight: 'bold', overflow: 'hidden'}}>
                                            {user.avatarUrl ? <img src={user.avatarUrl} alt="" style={{width:'100%', height:'100%'}}/> : user.name.charAt(0)}
                                        </div>
                                        {user.name}
                                    </div>
                                </td>
                                <td>{user.email}</td>
                                <td>
                                    <span className={`${styles.badge} ${user.role === 'admin' ? styles.badgeAdmin : user.role === 'employer' ? styles.badgeEmployer : styles.badgeActive}`}>
                                        {user.role}
                                    </span>
                                </td>
                                <td>
                                    <span className={`${styles.badge} ${user.status === 'active' ? styles.badgeActive : styles.badgeBlocked}`}>
                                        {user.status}
                                    </span>
                                </td>
                                <td style={{color: '#9ca3af', fontSize: '0.9rem'}}>{user.createdAt ? format(new Date(user.createdAt), 'yyyy-MM-dd') : '-'}</td>
                                <td>
                                    <div style={{display: 'flex'}}>
                                        <button className={`${styles.actionBtn} ${user.status === 'active' ? 'block' : 'active'}`} title={user.status === 'active' ? "Block User" : "Unblock User"} onClick={() => handleAction('block', user._id)}>
                                            <i className={`fas ${user.status === 'active' ? 'fa-ban' : 'fa-check-circle'}`}></i>
                                        </button>
                                        <button className={`${styles.actionBtn} ${styles.delete}`} title="Delete User" onClick={() => handleAction('delete', user._id)}>
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

export default AdminUsers;
