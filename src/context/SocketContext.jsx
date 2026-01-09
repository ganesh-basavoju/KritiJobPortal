import React, { createContext, useState, useEffect, useContext } from 'react';
import io from 'socket.io-client';
import { AuthContext } from './AuthContext';

export const SocketContext = createContext();

const socket = io.connect('http://localhost:5000');

export const SocketProvider = ({ children }) => {
    const { user } = useContext(AuthContext);
    const [messages, setMessages] = useState([]);

    useEffect(() => {
        socket.on('receive_message', (data) => {
            setMessages((list) => [...list, data]);
        });
        
        return () => socket.off('receive_message');
    }, [socket]);

    const joinRoom = (room) => {
        socket.emit('join_room', room);
    };

    const sendMessage = (messageData) => {
        socket.emit('send_message', messageData);
        setMessages((list) => [...list, messageData]);
    };

    return (
        <SocketContext.Provider value={{ socket, messages, joinRoom, sendMessage }}>
            {children}
        </SocketContext.Provider>
    );
};
