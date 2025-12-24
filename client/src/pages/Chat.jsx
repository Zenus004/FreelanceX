import { useState, useEffect, useRef } from 'react';
import { useSocket } from '../context/SocketContext';
import { useAuth } from '../context/AuthContext';
import api from '../api/axios';
import { Send, User, Loader2 } from 'lucide-react';
import { motion, AnimatePresence } from 'framer-motion';

const Chat = ({ roomId }) => {
    const socket = useSocket();
    const { user } = useAuth();
    const [messages, setMessages] = useState([]);
    const [newMessage, setNewMessage] = useState('');
    const [typing, setTyping] = useState(false);
    const messagesEndRef = useRef(null);

    useEffect(() => {
        const fetchMessages = async () => {
            try {
                const { data } = await api.get(`/chat/${roomId}/messages`);
                setMessages(data || []);
            } catch (error) {
                console.error('Error fetching messages:', error);
            }
        };

        if (roomId) {
            fetchMessages();
        }
    }, [roomId]);

    useEffect(() => {
        if (!socket || !roomId) return;

        socket.emit('joinRoom', roomId);

        const handleMessage = (message) => {
            setMessages((prev) => [...prev, message]);
        };

        const handleTyping = (data) => {
            if (data.sender !== user._id) {
                setTyping(true);
                setTimeout(() => setTyping(false), 3000); // clear after 3s
            }
        };

        socket.on('chat:message', handleMessage);
        socket.on('chat:typing', handleTyping);

        return () => {
            socket.off('chat:message', handleMessage);
            socket.off('chat:typing', handleTyping);
        };
    }, [socket, roomId, user]);

    useEffect(() => {
        messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' });
    }, [messages, typing]);

    const handleSendMessage = (e) => {
        e.preventDefault();
        if (!newMessage.trim() || !socket) return;

        const messageData = {
            room: roomId,
            sender: user._id,
            content: newMessage
        };

        socket.emit('chat:message', messageData);
        setNewMessage('');
    };

    const handleTypingInput = () => {
        if (socket) {
            socket.emit('chat:typing', { room: roomId, sender: user._id });
        }
    };

    return (
        <div className="flex flex-col h-[600px] bg-white rounded-xl shadow-sm border border-gray-100 overflow-hidden">
            {/* Header */}
            <div className="p-4 border-b border-gray-100 bg-gray-50 flex items-center justify-between">
                <h2 className="font-bold text-gray-800 flex items-center">
                    <div className="w-2 h-2 bg-green-500 rounded-full mr-2 animate-pulse"></div>
                    Workspace Chat
                </h2>
                <span className="text-xs text-gray-500">Secure Line</span>
            </div>

            {/* Messages Area */}
            <div className="flex-1 overflow-y-auto p-4 space-y-6 bg-white">
                {messages.length === 0 && (
                    <div className="text-center text-gray-400 my-8">
                        <p className="text-sm">No messages yet. Start the conversation!</p>
                    </div>
                )}

                {messages.map((msg, index) => {
                    const isMe = msg.sender?._id === user._id;
                    return (
                        <motion.div
                            initial={{ opacity: 0, y: 10 }}
                            animate={{ opacity: 1, y: 0 }}
                            key={index}
                            className={`flex ${isMe ? 'justify-end' : 'justify-start'}`}
                        >
                            <div className={`flex max-w-[80%] ${isMe ? 'flex-row-reverse' : 'flex-row'}`}>
                                {/* Avatar */}
                                <div className={`flex-shrink-0 w-8 h-8 rounded-full flex items-center justify-center ${isMe ? 'bg-indigo-100 ml-2' : 'bg-gray-100 mr-2'
                                    }`}>
                                    <User className={`w-4 h-4 ${isMe ? 'text-indigo-600' : 'text-gray-600'}`} />
                                </div>

                                {/* Bubble */}
                                <div>
                                    <div
                                        className={`p-3 rounded-2xl text-sm shadow-sm ${isMe
                                            ? 'bg-indigo-600 text-white rounded-tr-none'
                                            : 'bg-white border border-gray-200 text-gray-800 rounded-tl-none'
                                            }`}
                                    >
                                        <p className="whitespace-pre-wrap">{msg.content}</p>
                                    </div>
                                    <span className={`text-[10px] text-gray-400 mt-1 block ${isMe ? 'text-right' : 'text-left'}`}>
                                        {msg.createdAt ? new Date(msg.createdAt).toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' }) : ''}
                                    </span>
                                </div>
                            </div>
                        </motion.div>
                    );
                })}

                {typing && (
                    <motion.div
                        initial={{ opacity: 0 }}
                        animate={{ opacity: 1 }}
                        className="flex justify-start"
                    >
                        <div className="bg-gray-100 rounded-full px-4 py-2 flex space-x-1 items-center ml-10">
                            <div className="w-1.5 h-1.5 bg-gray-400 rounded-full animate-bounce" style={{ animationDelay: '0ms' }}></div>
                            <div className="w-1.5 h-1.5 bg-gray-400 rounded-full animate-bounce" style={{ animationDelay: '150ms' }}></div>
                            <div className="w-1.5 h-1.5 bg-gray-400 rounded-full animate-bounce" style={{ animationDelay: '300ms' }}></div>
                        </div>
                    </motion.div>
                )}
                <div ref={messagesEndRef} />
            </div>

            {/* Input Area */}
            <form onSubmit={handleSendMessage} className="p-4 border-t border-gray-100 bg-gray-50">
                <div className="flex gap-2">
                    <input
                        type="text"
                        className="flex-1 px-4 py-2 border border-gray-200 rounded-full focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500 transition-shadow bg-white"
                        placeholder="Type a message..."
                        value={newMessage}
                        onChange={(e) => setNewMessage(e.target.value)}
                        onKeyUp={handleTypingInput}
                    />
                    <button
                        type="submit"
                        disabled={!newMessage.trim()}
                        className="bg-indigo-600 text-white p-2.5 rounded-full hover:bg-indigo-700 transition-colors disabled:opacity-50 disabled:cursor-not-allowed shadow-sm"
                    >
                        <Send className="w-5 h-5" />
                    </button>
                </div>
            </form>
        </div>
    );
};

export default Chat;
