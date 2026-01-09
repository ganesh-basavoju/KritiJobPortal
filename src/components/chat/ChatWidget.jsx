import React, { useState, useContext, useEffect } from 'react';
import { SocketContext } from '../../context/SocketContext';
import { AuthContext } from '../../context/AuthContext';
import styles from './Chat.module.css';

const ChatWidget = ({ roomId = 'general', recipientName = 'Support' }) => {
    const { user } = useContext(AuthContext);
    const { sendMessage,messages, joinRoom } = useContext(SocketContext);
    const [currentMessage, setCurrentMessage] = useState('');
    const [isOpen, setIsOpen] = useState(false);

    useEffect(() => {
        if (user && isOpen) {
            joinRoom(roomId);
        }
    }, [user, isOpen, roomId, joinRoom]);

    const handleSend = async (e) => {
        e.preventDefault();
        if (currentMessage !== '') {
            const messageData = {
                room: roomId,
                author: user.name,
                message: currentMessage,
                time: new Date(Date.now()).getHours() + ':' + new Date(Date.now()).getMinutes(),
            };

            await sendMessage(messageData);
            setCurrentMessage('');
        }
    };

    return (
        <div className={styles.chatWrapper}>
            <button 
                className={`${styles.chatToggle} ${isOpen ? styles.active : ''}`}
                onClick={() => setIsOpen(!isOpen)}
            >
                <i className={`fas ${isOpen ? 'fa-times' : 'fa-comments'}`}></i>
            </button>

            {isOpen && (
                <div className={`${styles.chatWindow} glass-card`}>
                    <div className={styles.chatHeader}>
                        <h4>Chat with {recipientName}</h4>
                    </div>
                    <div className={styles.chatBody}>
                        {messages.map((msg, index) => (
                            <div 
                                key={index} 
                                className={`${styles.message} ${user.name === msg.author ? styles.mine : styles.theirs}`}
                            >
                                <div className={styles.messageContent}>
                                    <p>{msg.message}</p>
                                </div>
                                <div className={styles.messageMeta}>
                                    <p id="time">{msg.time}</p>
                                    <p id="author">{msg.author}</p>
                                </div>
                            </div>
                        ))}
                    </div>
                    <div className={styles.chatFooter}>
                        <input 
                            type="text" 
                            placeholder="Type a message..." 
                            value={currentMessage}
                            onChange={(event) => setCurrentMessage(event.target.value)}
                            onKeyPress={(event) => event.key === 'Enter' && handleSend(event)}
                        />
                        <button onClick={handleSend}><i className="fas fa-paper-plane"></i></button>
                    </div>
                </div>
            )}
        </div>
    );
};

export default ChatWidget;
