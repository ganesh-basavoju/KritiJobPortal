import React, { useContext, useState, useRef, useEffect } from 'react';
import { SocketContext } from '../../context/SocketContext';
import styles from './common.module.css'; // Assuming you have some common styles or use specific

const NotificationDropdown = () => {
    const { notifications, unreadCount, markAsRead } = useContext(SocketContext);
    const [isOpen, setIsOpen] = useState(false);
    const dropdownRef = useRef(null);

    // Close on click outside
    useEffect(() => {
        const handleClickOutside = (event) => {
            if (dropdownRef.current && !dropdownRef.current.contains(event.target)) {
                setIsOpen(false);
            }
        };
        document.addEventListener('mousedown', handleClickOutside);
        return () => document.removeEventListener('mousedown', handleClickOutside);
    }, []);

    const toggleDropdown = () => setIsOpen(!isOpen);

    const handleNotificationClick = (id) => {
        markAsRead(id);
        // Optional navigation logic here based on entityType/entityId
    };

    const formatDate = (dateString) => {
        const date = new Date(dateString);
        const now = new Date();
        const diff = Math.floor((now - date) / 1000); // seconds

        if (diff < 60) return 'Just now';
        if (diff < 3600) return `${Math.floor(diff / 60)}m ago`;
        if (diff < 86400) return `${Math.floor(diff / 3600)}h ago`;
        return date.toLocaleDateString();
    };

    return (
        <div className="notification-container" ref={dropdownRef} style={{ position: 'relative' }}>
            <button 
                onClick={toggleDropdown} 
                className="icon-btn" 
                style={{ 
                    background: 'transparent', border: 'none', color: '#fff', fontSize: '1.2rem', cursor: 'pointer', position: 'relative' 
                }}
            >
                <i className="fas fa-bell"></i>
                {unreadCount > 0 && (
                    <span style={{
                        position: 'absolute', top: '-5px', right: '-5px', 
                        background: '#ef4444', color: 'white', 
                        borderRadius: '50%', padding: '2px 5px', fontSize: '0.7rem'
                    }}>
                        {unreadCount > 9 ? '9+' : unreadCount}
                    </span>
                )}
            </button>

            {isOpen && (
                <div style={{
                    position: 'absolute', right: 0, top: '40px', width: '320px',
                    background: '#1f2937', border: '1px solid #374151', borderRadius: '12px',
                    boxShadow: '0 10px 25px rgba(0,0,0,0.5)', zIndex: 1000, overflow: 'hidden'
                }}>
                    <div style={{ padding: '15px', borderBottom: '1px solid #374151', display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
                        <h4 style={{ margin: 0, color: 'white', fontSize: '1rem' }}>Notifications</h4>
                        <span style={{ fontSize: '0.8rem', color: '#9ca3af' }}>{unreadCount} unread</span>
                    </div>

                    <div style={{ maxHeight: '350px', overflowY: 'auto' }}>
                        {notifications.length === 0 ? (
                            <div style={{ padding: '20px', textAlign: 'center', color: '#9ca3af', fontSize: '0.9rem' }}>
                                No notifications yet
                            </div>
                        ) : (
                            notifications.map(notif => (
                                <div 
                                    key={notif._id} 
                                    onClick={() => handleNotificationClick(notif._id)}
                                    style={{
                                        padding: '12px 15px',
                                        borderBottom: '1px solid rgba(255,255,255,0.05)',
                                        background: notif.isRead ? 'transparent' : 'rgba(255, 255, 0, 0.05)',
                                        cursor: 'pointer',
                                        transition: 'background 0.2s'
                                    }}
                                    className="notification-item"
                                >
                                    <div style={{ display: 'flex', justifyContent: 'space-between', marginBottom: '5px' }}>
                                        <span style={{ fontWeight: 600, color: notif.isRead ? '#d1d5db' : '#fbbf24', fontSize: '0.9rem' }}>
                                            {notif.title}
                                        </span>
                                        <span style={{ fontSize: '0.75rem', color: '#6b7280' }}>
                                            {formatDate(notif.createdAt)}
                                        </span>
                                    </div>
                                    <p style={{ margin: 0, fontSize: '0.85rem', color: '#9ca3af', lineHeight: '1.4' }}>
                                        {notif.message}
                                    </p>
                                </div>
                            ))
                        )}
                    </div>
                    
                     <div style={{ padding: '10px', borderTop: '1px solid #374151', textAlign: 'center' }}>
                        <button style={{ background: 'none', border: 'none', color: '#60a5fa', fontSize: '0.85rem', cursor: 'pointer' }}>
                            View All
                        </button>
                    </div>
                </div>
            )}
        </div>
    );
};

export default NotificationDropdown;
