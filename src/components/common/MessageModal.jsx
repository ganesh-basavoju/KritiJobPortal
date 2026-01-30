import React, { useState } from 'react';
import styles from './MessageModal.module.css';

const MessageModal = ({ isOpen, onClose, onSend, recipientName, jobTitle }) => {
    const [message, setMessage] = useState('');
    const [loading, setLoading] = useState(false);

    if (!isOpen) return null;

    const handleSubmit = async (e) => {
        e.preventDefault();
        if (!message.trim()) return;

        setLoading(true);
        await onSend(message);
        setLoading(false);
        setMessage('');
    };

    return (
        <div className={styles.overlay}>
            <div className={styles.modal}>
                <div className={styles.header}>
                    <h3>Message Candidate</h3>
                    <button onClick={onClose} className={styles.closeBtn}>&times;</button>
                </div>
                
                <div className={styles.body}>
                    <p className={styles.info}>
                        To: <span className={styles.highlight}>{recipientName}</span>
                        <br />
                        Job: <span className={styles.highlight}>{jobTitle}</span>
                    </p>
                    
                    <textarea
                        className={styles.textarea}
                        placeholder="Type your message here..."
                        value={message}
                        onChange={(e) => setMessage(e.target.value)}
                        rows={6}
                        autoFocus
                    />
                </div>

                <div className={styles.footer}>
                    <button onClick={onClose} className={styles.cancelBtn} disabled={loading}>Cancel</button>
                    <button 
                        onClick={handleSubmit} 
                        className={styles.sendBtn} 
                        disabled={!message.trim() || loading}
                    >
                        {loading ? 'Sending...' : 'Send Message'}
                    </button>
                </div>
            </div>
        </div>
    );
};

export default MessageModal;
