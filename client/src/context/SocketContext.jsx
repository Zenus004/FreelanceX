import { createContext, useState, useEffect, useContext } from 'react';
import io from 'socket.io-client';
import { useAuth } from './AuthContext';

const SocketContext = createContext();

export const useSocket = () => useContext(SocketContext);

export const SocketProvider = ({ children }) => {
    const [socket, setSocket] = useState(null);
    const { user } = useAuth();

    useEffect(() => {
        if (user) {
            // Remove /api from the end of the URL if present to get the root domain
            const socketUrl = (import.meta.env.VITE_API_URL || 'http://localhost:5000').replace('/api', '');

            const newSocket = io(socketUrl, {
                withCredentials: true,
                transports: ['websocket', 'polling'] // Explicitly enable websocket and polling
            });
            setSocket(newSocket);

            newSocket.on('connect_error', (err) => {
                console.error('Socket connection error:', err);
            });

            return () => newSocket.close();
        } else {
            if (socket) {
                socket.close();
                setSocket(null);
            }
        }
    }, [user]);

    return (
        <SocketContext.Provider value={socket}>
            {children}
        </SocketContext.Provider>
    );
};
