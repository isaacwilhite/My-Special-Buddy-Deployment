// ChatContext.js

import React, { createContext, useState, useContext } from 'react';

const ChatContext = createContext(null);


export const ChatProvider = ({ children }) => {
    const [chatUser, setChatUserState] = useState(() => {
        const storedChatUser = localStorage.getItem('chatUser');
        return storedChatUser ? JSON.parse(storedChatUser) : null;
    });

    const setChatUser = (user) => {
        setChatUserState(user);
        localStorage.setItem('chatUser', JSON.stringify(user));
    };

    const clearChatUser = () => {
        setChatUserState(null);
        localStorage.removeItem('chatUser');
    };

    return (
        <ChatContext.Provider value={{ chatUser, setChatUser, clearChatUser }}>
            {children}
        </ChatContext.Provider>
    );
};

export const useChatContext = () => useContext(ChatContext);

