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
        <div className={styles.notificationContainer} ref={dropdownRef}>
            <button 
                onClick={toggleDropdown} 
                className={styles.iconBtn}
                title="Notifications"
            >
                <i className="fas fa-bell"></i>
                {unreadCount > 0 && (
                    <span className={styles.notificationDot}></span>
                )}
            </button>

            {isOpen && (
                <div className={styles.dropdown}>
                    <div className={styles.dropdownHeader}>
                        <h4>Notifications</h4>
                        <span className={styles.unreadCount}>{unreadCount} unread</span>
                    </div>

                    <div className={styles.notificationList}>
                        {notifications.length === 0 ? (
                            <div className={styles.emptyState}>
                                No notifications yet
                            </div>
                        ) : (
                            notifications.map(notif => (
                                <div 
                                    key={notif._id} 
                                    onClick={() => handleNotificationClick(notif._id)}
                                    className={`${styles.notificationItem} ${!notif.isRead ? styles.unread : ''}`}
                                >
                                    <div className={styles.itemHeader}>
                                        <span className={styles.itemTitle}>
                                            {notif.title}
                                        </span>
                                        <span className={styles.itemTime}>
                                            {formatDate(notif.createdAt)}
                                        </span>
                                    </div>
                                    <p className={styles.itemMessage}>
                                        {notif.message}
                                    </p>
                                </div>
                            ))
                        )}
                    </div>
                    
                     <div className={styles.dropdownFooter}>
                        <button className={styles.viewAllBtn}>
                            View All
                        </button>
                    </div>
                </div>
            )}
        </div>
    );
};

export default NotificationDropdown;
