import React, { useState, useEffect } from 'react';
import 'flowbite';
import 'tailwindcss/tailwind.css';
import { firestore, } from './context/firebase';
import { collection, doc, addDoc, query, orderBy, onSnapshot } from 'firebase/firestore';
import { useAuth } from './context/authContext/index.js'; // Adjust the import path as necessary


const ChatPage = () => {
    const { currentUser } = useAuth();

    // State to hold multiple conversations
    const [conversations, setConversations] = useState([]);
    const [currentMessage, setCurrentMessage] = useState('');
    const [activeConversationIndex, setActiveConversationIndex] = useState(0);
    const avatarImage = process.env.PUBLIC_URL + '/images/profile.webp';

    // Assuming 'yourUserId' is the ID of the current user
    const userIds = ["vatsal123", "keyur123", "reza123"]; // Example user IDs
    const yourUserId = currentUser?.uid;
    useEffect(() => {
        userIds.forEach((userId, index) => {
            if (userId !== yourUserId) {
                const conversationId = [yourUserId, userId].sort().join("");
                const messagesRef = collection(firestore, "users", yourUserId, "conversations", conversationId, "messages");
                const q = query(messagesRef, orderBy("timestamp"));

                const unsubscribe = onSnapshot(q, (querySnapshot) => {
                    const messages = [];
                    querySnapshot.forEach((doc) => {
                        messages.push({ id: doc.id, ...doc.data() });
                    });

                    setConversations(prevConversations => {
                        const newConversations = [...prevConversations];
                        newConversations[index] = { name: `User ${userId}`, messages };
                        return newConversations;
                    });
                });

                return () => unsubscribe();
            }
        });
    }, [firestore, currentUser]); // Added dependencies

    const handleSendMessage = async () => {
        if (currentMessage.trim() !== '') {
            const activeUserId = userIds[activeConversationIndex];
            const conversationId = [yourUserId, activeUserId].sort().join("");

            const messagesRef = collection(firestore, "users", yourUserId, "conversations", conversationId, "messages");

            try {
                await addDoc(messagesRef, {
                    text: currentMessage,
                    senderID: yourUserId,
                    timestamp: new Date(), // Firestore uses server timestamps, which is recommended
                });
                setCurrentMessage('');
            } catch (error) {
                console.error("Error sending message: ", error);
            }
        }
    };

    const handleMessageChange = (event) => {
        setCurrentMessage(event.target.value);
    };


    return (
        <div className="flex h-screen bg-gray-100">
            {/* Sidebar */}
            <div className="w-1/4 bg-white p-20">
                {/* List of chat contacts */}
                <ul className="space-y-1">
                    {conversations.map((conversation, index) => (
                        <li
                            key={index}
                            className="flex items-center space-x-3 hover:bg-gray-100 p-2 cursor-pointer"
                            onClick={() => setActiveConversationIndex(index)}
                        >
                            <img className="w-10 h-10 rounded-full" src={avatarImage} alt="avatar" />
                            <div>
                                <div className="font-semibold text-lg">{conversation.name}</div>
                                <div className="text-lg text-gray-500">
                                    {conversation.messages[conversation.messages.length - 1]?.text}
                                </div>
                            </div>
                        </li>
                    ))}
                </ul>
            </div>

            {/* Chat container */}
            <div className="flex-1 flex flex-col">
                {/* Chat header */}
                <div className="bg-white p-4 border-b">
                    <div className="font-bold text-lg">
                    Chat with {conversations.length > 0 ? conversations[activeConversationIndex].name : "Select a conversation"}
                    </div>
                </div>
                {/* Chat messages */}
                <div className="flex-1 p-4 overflow-y-auto">
                    {conversations[activeConversationIndex]?.messages.map((message, index) => (
                        <div key={index} className={`flex items-end space-x-2 ${message.senderID==yourUserId ? 'justify-end' : ''}`}>
                            {message.senderID!=yourUserId && <img className="w-8 h-8 rounded-full" src={avatarImage} alt="avatar" />}
                            <div className={`rounded px-4 py-2 ${message.senderID==yourUserId ? 'bg-green-100' : 'bg-blue-100'} text-lg`}>
                                {message.text}
                            </div>
                        </div>
                    ))}
                </div>
                {/* Chat input */}
                <div className="bg-white p-4 flex items-center">
                    <input
                        type="text"
                        value={currentMessage}
                        onChange={handleMessageChange}
                        className="w-full rounded-full border-gray-300 focus:border-blue-500 focus:ring focus:ring-blue-200 transition duration-150"
                        placeholder="Type message here"
                        onKeyDown={(event) => {
                            if (event.key === 'Enter') {
                                handleSendMessage();
                            }
                        }}
                    />
                    <button
                        onClick={handleSendMessage}
                        className="ml-4 px-4 py-2 bg-green-500 text-white rounded-full hover:bg-green-600 focus:outline-none focus:ring-2 focus:ring-green-300"
                    >
                        Send
                    </button>
                </div>
            </div>
        </div>
    );
};

export default ChatPage;