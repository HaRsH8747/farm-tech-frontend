import React, { useState, useEffect } from 'react';
import 'flowbite';
import 'tailwindcss/tailwind.css';
import { firestore, } from './context/firebase';
import { collection, doc, addDoc, query, orderBy, onSnapshot } from 'firebase/firestore';
import { useAuth } from './context/authContext/index.js'; // Adjust the import path as necessaryZZ
import { HiOutlinePaperAirplane, HiOutlineUserCircle } from 'react-icons/hi'; // For user icons

const ChatPage = () => {
    const { currentUser, currentDBUser, setCurrentDBUser } = useAuth();

    // State to hold multiple conversations
    const [conversations, setConversations] = useState([]);
    const [currentMessage, setCurrentMessage] = useState('');
    const [activeConversationIndex, setActiveConversationIndex] = useState(0);
    const avatarImage = process.env.PUBLIC_URL + '/images/profile.webp';

    // Assuming 'yourUserId' is the ID of the current user
    const userIds = ["vatsal11", "keyur", "reza"]; // Example user IDs
    // const yourUserId = currentUser?.uid;
    const storedDBData = JSON.parse(localStorage.getItem('storedDBData'));
    // if (storedDBData) {
    //     setCurrentDBUser(JSON.parse(storedDBData));
    // }
    const yourUserId = storedDBData?.user_name;
    useEffect(() => {
        userIds.forEach((userId, index) => {
            if (userId !== yourUserId) {
                const conversationId = [`${yourUserId}`, `${userId}`].sort().join("");
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
    }, [firestore]); // Added dependencies

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
        <div className="flex h-screen bg-gray-50">
            {/* Sidebar */}
            <div className="w-1/4 bg-indigo-100 p-5 border-r border-2 border-gray-300 shadow-2xl">
                {/* List of chat contacts */}
                <ul className="divide-y divide-gray-200 border">
    {conversations.map((conversation, index) => (
        <li
            key={index}
            className={`flex items-center space-x-3 p-3 ${index === activeConversationIndex ? 'bg-blue-200' : 'hover:bg-blue-200'
                } cursor-pointer transition-all duration-200 ease-in-out transform ${index === activeConversationIndex && 'scale-105'
                } border border-gray-700 rounded-lg mt-2`}

            onClick={() => setActiveConversationIndex(index)}
        >
            <img className="w-10 h-10 rounded-full border-2 border-blue-900 shadow" src={avatarImage} alt="avatar" />
            <div className="flex-1">
                <div className="font-semibold text-blue-800">{conversation.name}</div>
                <div className="text-sm text-gray-600 truncate">
                    {conversation.messages[conversation.messages.length - 1]?.text || 'No messages'}
                </div>
            </div>
        </li>
    ))}
</ul>

            </div>

            {/* Chat container */}
            <div className="flex-1 flex flex-col">
                {/* Chat header */}
                <div className="bg-gradient-to-r from-blue-200 to-blue-300 p-6 shadow-xl rounded-lg border-b-2 border-gray-400">
                    <div className="flex items-center space-x-3">
                        <h1 className="font-semibold text-xl text-blue-800">
                            {conversations.length > 0 ? conversations[activeConversationIndex].name : 'Select a conversation'}
                        </h1>
                    </div>
                </div>
                {/* Chat messages */}
                <div className="flex-1 bg-sky-900 p-4 overflow-y-auto ">
                    {conversations[activeConversationIndex]?.messages.map((message, index) => (
                        <div key={index} className={`flex items-end ${message.senderID === yourUserId ? 'justify-end' : ''} mb-4`}>
                            {message.senderID !== yourUserId && (
                                <img className="w-8 h-8 rounded-full mr-2" src={avatarImage} alt="avatar" />
                            )}
                            <div className={`rounded-lg px-4 py-2 text-sm ${message.senderID === yourUserId ? 'bg-blue-500 text-white' : 'bg-gray-200'
                                }`}>
                                {message.text}
                            </div>
                        </div>
                    ))}
                </div>
                {/* Chat input */}
                <div className="bg-sky-300 p-4 flex items-center shadow-inner">
                    <input
                        type="text"
                        value={currentMessage}
                        onChange={handleMessageChange}
                        className="flex-1 bg-blue-100 rounded-full pl-4 pr-10  shadow-xl border-2 border-gray-300 focus:ring focus:ring-blue-200 transition duration-150"
                        placeholder="Type a message..."
                        onKeyDown={(event) => {
                            if (event.key === 'Enter') {
                                handleSendMessage();
                            }
                        }}
                    />
                    <button
                        onClick={handleSendMessage}
                        className="absolute right-4 rounded-full p-2 bg-blue-500 text-white hover:bg-blue-600 focus:outline-none focus:ring-2 focus:ring-blue-300 transition shadow hover:scale-105"
                        >
                        <HiOutlinePaperAirplane className="text-xl transform rotate-90" />
                    </button>
                </div>
            </div>
        </div>
    );
};


export default ChatPage;