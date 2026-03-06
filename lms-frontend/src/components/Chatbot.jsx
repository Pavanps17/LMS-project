import React, { useState, useRef, useEffect } from 'react';
import { MessageSquare, X } from 'lucide-react';
import axios from 'axios';

// API Configuration
const HUGGING_FACE_API_KEY = 'hf_' + 'DzACaubPyAiLjECRwcQykmkmASYwsOUmva';
const MODEL = 'Qwen/Qwen2.5-7B-Instruct'; // Hugging Face model

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

        // Format history for HuggingFace Router v1/chat/completions
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
                `https://router.huggingface.co/v1/chat/completions`,
                {
                    model: MODEL,
                    messages: apiMessages,
                    max_tokens: 500,
                },
                {
                    headers: {
                        'Authorization': `Bearer ${HUGGING_FACE_API_KEY}`,
                        'Content-Type': 'application/json'
                    }
                }
            );

            const botReply = response.data.choices[0]?.message?.content || "I am sorry, but I received an empty response.";
            setMessages(prev => [...prev, { role: 'bot', content: botReply }]);
        } catch (error) {
            const errorMsg = error.response?.data?.error?.message || error.message;
            console.error('Chat error:', errorMsg);

            if (error.response?.status === 401) {
                setMessages(prev => [...prev, { role: 'bot', content: `API Error (401): The provided API key is invalid or unauthorized. Please check your Hugging Face API key. Details: ${errorMsg}` }]);
            } else {
                setMessages(prev => [...prev, { role: 'bot', content: `Sorry, I am having trouble connecting right now. Details: ${errorMsg}` }]);
            }
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
