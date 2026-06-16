import React, { useState, useEffect, useRef } from 'react';
import axios from 'axios';

export default function ChatBox({ project, currentUser }) {
    const [messages, setMessages] = useState([]);
    const [newMessage, setNewMessage] = useState('');
    const [loading, setLoading] = useState(true);
    const messagesEndRef = useRef(null);

    // Fetch message history on mount
    useEffect(() => {
        axios.get(`/api/v1/projects/${project.id}/messages`)
            .then(res => {
                setMessages(res.data);
                setLoading(false);
            })
            .catch(err => {
                console.error("Error fetching messages", err);
                setLoading(false);
            });
    }, [project.id]);

    // Setup Echo listener
    useEffect(() => {
        if (!window.Echo) return;

        const channel = window.Echo.private(`project.${project.id}`)
            .listen('MessageSent', (e) => {
                setMessages(prev => [...prev, e.message]);
            });

        return () => {
            channel.stopListening('MessageSent');
        };
    }, [project.id]);

    // Scroll to bottom when messages change
    useEffect(() => {
        messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' });
    }, [messages]);

    const sendMessage = (e) => {
        e.preventDefault();
        if (!newMessage.trim()) return;

        const content = newMessage;
        setNewMessage(''); // optimistic clear

        // Optimistic UI update
        const tempId = Date.now();
        setMessages(prev => [...prev, {
            id: tempId,
            content: content,
            user_id: currentUser.id,
            user: currentUser,
            created_at: new Date().toISOString(),
            is_sending: true
        }]);

        axios.post(`/api/v1/projects/${project.id}/messages`, { content })
            .then(res => {
                // Replace optimistic message with real message
                setMessages(prev => prev.map(msg => msg.id === tempId ? res.data : msg));
            })
            .catch(err => {
                console.error("Error sending message", err);
                // remove optimistic message on failure
                setMessages(prev => prev.filter(msg => msg.id !== tempId));
            });
    };

    return (
        <div className="flex flex-col h-[500px] bg-white border border-gray-200 rounded-xl shadow-sm">
            <div className="px-4 py-3 border-b border-gray-200 bg-gray-50 rounded-t-xl">
                <h3 className="font-semibold text-gray-800">Project Chat</h3>
            </div>

            <div className="flex-1 p-4 overflow-y-auto bg-gray-50 space-y-4">
                {loading ? (
                    <div className="text-center text-sm text-gray-500 py-10">Loading messages...</div>
                ) : messages.length === 0 ? (
                    <div className="text-center text-sm text-gray-500 py-10">No messages yet. Say hi!</div>
                ) : (
                    messages.map(msg => {
                        const isMe = msg.user_id === currentUser.id;
                        return (
                            <div key={msg.id} className={`flex ${isMe ? 'justify-end' : 'justify-start'}`}>
                                <div className={`max-w-[80%] rounded-lg px-4 py-2 ${
                                    isMe ? 'bg-indigo-600 text-white rounded-br-none' : 'bg-white border border-gray-200 text-gray-800 rounded-bl-none shadow-sm'
                                } ${msg.is_sending ? 'opacity-70' : ''}`}>
                                    {!isMe && <div className="text-xs font-semibold mb-1 text-indigo-600">{msg.user?.name}</div>}
                                    <div className="text-sm whitespace-pre-wrap">{msg.content}</div>
                                </div>
                            </div>
                        );
                    })
                )}
                <div ref={messagesEndRef} />
            </div>

            <div className="p-3 border-t border-gray-200 bg-white rounded-b-xl">
                <form onSubmit={sendMessage} className="flex gap-2">
                    <input
                        type="text"
                        value={newMessage}
                        onChange={e => setNewMessage(e.target.value)}
                        placeholder="Type a message..."
                        className="flex-1 rounded-md border-gray-300 shadow-sm focus:border-indigo-500 focus:ring-indigo-500 sm:text-sm"
                        autoComplete="off"
                    />
                    <button
                        type="submit"
                        disabled={!newMessage.trim()}
                        className="inline-flex items-center px-4 py-2 border border-transparent text-sm font-medium rounded-md shadow-sm text-white bg-indigo-600 hover:bg-indigo-700 disabled:opacity-50"
                    >
                        Send
                    </button>
                </form>
            </div>
        </div>
    );
}
