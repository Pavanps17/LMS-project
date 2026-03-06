import React, { useState, useRef, useEffect } from 'react';
import { MessageSquare, X } from 'lucide-react';
import axios from 'axios';

// API Configuration
const OPENROUTER_API_KEY = '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';
const MODEL = 'mistralai/mistral-7b-instruct:free'; // Free model on OpenRouter for chat functionality

export default function Chatbot() {
    const [isOpen, setIsOpen] = useState(false);
    const [messages, setMessages] = useState([
        { role: 'bot', content: 'Hello! I am Codezilla, your LEARNZILLA assistant. How can I help you today?' }
    ]);
    const [input, setInput] = useState('');
    const [loading, setLoading] = useState(false);
    const messagesEndRef = useRef(null);

    const scrollToBottom = () => {
        messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' });
    };

    useEffect(() => {
        scrollToBottom();
    }, [messages]);

    const handleSend = async () => {
        if (!input.trim()) return;

        const userMsg = { role: 'user', content: input };
        setMessages(prev => [...prev, userMsg]);
        setInput('');
        setLoading(true);

        // Format history for OpenRouter
        const apiMessages = [
            { role: 'system', content: 'You are Codezilla, a helpful AI assistant for the e-learning platform LEARNZILLA. Answer queries concisely and politely.' },
            ...messages.map(m => ({
                role: m.role === 'bot' ? 'assistant' : 'user',
                content: m.content
            })),
            { role: 'user', content: userMsg.content }
        ];

        try {
            const response = await axios.post(
                'https://openrouter.ai/api/v1/chat/completions',
                {
                    model: MODEL,
                    messages: apiMessages,
                },
                {
                    headers: {
                        'Authorization': `Bearer ${OPENROUTER_API_KEY}`,
                        'Content-Type': 'application/json',
                        'HTTP-Referer': window.location.origin,
                        'X-Title': 'LEARNZILLA'
                    }
                }
            );

            const botReply = response.data.choices[0].message.content;
            setMessages(prev => [...prev, { role: 'bot', content: botReply }]);
        } catch (error) {
            console.error('Chat error:', error.response?.data || error.message);
            setMessages(prev => [...prev, { role: 'bot', content: 'Sorry, I am having trouble connecting right now. Please try again later.' }]);
        } finally {
            setLoading(false);
        }
    };

    return (
        <>
            {!isOpen && (
                <div className="chat-btn" onClick={() => setIsOpen(true)}>
                    <MessageSquare size={20} />
                    <span>Codezilla</span>
                </div>
            )}

            {isOpen && (
                <div className="chat-window">
                    <div className="chat-header">
                        <span>Codezilla Assistant</span>
                        <X size={20} style={{ cursor: 'pointer' }} onClick={() => setIsOpen(false)} />
                    </div>
                    <div className="chat-messages">
                        {messages.map((msg, idx) => (
                            <div key={idx} className={`chat-msg ${msg.role === 'user' ? 'msg-user' : 'msg-bot'}`}>
                                {msg.content}
                            </div>
                        ))}
                        {loading && (
                            <div className="chat-msg msg-bot">
                                <span style={{ opacity: 0.7 }}>Typing...</span>
                            </div>
                        )}
                        <div ref={messagesEndRef} />
                    </div>
                    <div className="chat-input" onKeyDown={(e) => e.key === 'Enter' && handleSend()}>
                        <input
                            type="text"
                            placeholder="Ask me anything..."
                            value={input}
                            onChange={(e) => setInput(e.target.value)}
                        />
                        <button onClick={handleSend} disabled={loading}>Send</button>
                    </div>
                </div>
            )}
        </>
    );
}
