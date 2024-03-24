import React, { useState } from 'react';
import 'flowbite';
import 'tailwindcss/tailwind.css';

const ChatPage = () => {
    // State to hold multiple conversations
    const [conversations, setConversations] = useState([
        {
            name: '[Bot] Lilly',
            messages: [
                { text: 'Hi fwef!', fromMe: false },
                { text: 'I’m not really a bot 😊', fromMe: true },
                { text: 'I’m not really a bot 😊', fromMe: true },
                { text: 'I’m not really a bot 😊', fromMe: false },
                { text: 'I’m not really a bot 😊', fromMe: true },
                { text: 'I’m not really a bot 😊', fromMe: true },
                { text: 'I’m not really a bot 😊', fromMe: true },
                { text: 'Tell me about your day.', fromMe: false },
            ],
        },
        {
            name: '[Bot] Max',
            messages: [
                { text: 'Do you like puzzles?', fromMe: false },
                { text: 'Do you like puzzles?', fromMe: true },
                { text: 'Do you like puzzles?', fromMe: false },
                { text: 'Do you like puzzles?', fromMe: true },
                { text: 'Do you like puzzles?', fromMe: false },
                { text: 'Do you like puzzles?', fromMe: true },
                { text: 'Do you like puzzles?', fromMe: false },
                { text: 'I have a challenge for you!', fromMe: false },
            ],
        },
        {
            name: 'Support Agent',
            messages: [
                { text: 'How can I assist you today?', fromMe: false },
                { text: 'How can I assist you today?', fromMe: true },
                { text: 'How can I assist you today?', fromMe: false },
                { text: 'How can I assist you today?', fromMe: true },
                { text: 'How can I assist you today?', fromMe: false },
                { text: 'How can I assist you today?', fromMe: false },
                { text: 'Our team is here to help!', fromMe: false },
            ],
        },
        {
            name: 'Weather Bot',
            messages: [
                { text: 'Today’s forecast is sunny with a chance of rain.', fromMe: false },
                { text: 'Today’s forecast is sunny with a chance of rain.', fromMe: true },
                { text: 'Today’s forecast is sunny with a chance of rain.', fromMe: false },
                { text: 'Today’s forecast is sunny with a chance of rain.', fromMe: false },
                { text: 'Today’s forecast is sunny with a chance of rain.', fromMe: false },
                { text: 'Today’s forecast is sunny with a chance of rain.', fromMe: false },
                { text: 'Today’s forecast is sunny with a chance of rain.', fromMe: false },
                { text: 'Today’s forecast is sunny with a chance of rain.', fromMe: false },
                { text: 'Today’s forecast is sunny with a chance of rain.', fromMe: false },
                { text: 'Today’s forecast is sunny with a chance of rain.', fromMe: false },
                { text: 'Today’s forecast is sunny with a chance of rain.', fromMe: false },
                { text: 'Today’s forecast is sunny with a chance of rain.', fromMe: false },
                { text: 'Today’s forecast is sunny with a chance of rain.', fromMe: false },
                { text: 'Today’s forecast is sunny with a chance of rain.', fromMe: false },
                { text: 'Today’s forecast is sunny with a chance of rain.', fromMe: false },
                { text: 'Today’s forecast is sunny with a chance of rain.', fromMe: false },
                { text: 'Today’s forecast is sunny with a chance of rain.', fromMe: false },
                { text: 'Today’s forecast is sunny with a chance of rain.', fromMe: false },
                { text: 'Today’s forecast is sunny with a chance of rain.', fromMe: false },
                { text: 'Today’s forecast is sunny with a chance of rain.', fromMe: false },
                { text: 'Today’s forecast is sunny with a chance of rain.', fromMe: false },
                { text: 'Today’s forecast is sunny with a chance of rain.', fromMe: false },
                { text: 'Today’s forecast is sunny with a chance of rain.', fromMe: false },
                { text: 'Today’s forecast is sunny with a chance of rain.', fromMe: false },
                { text: 'Today’s forecast is sunny with a chance of rain.', fromMe: false },
                { text: 'Today’s forecast is sunny with a chance of rain.', fromMe: false },
                { text: 'Today’s forecast is sunny with a chance of rain.', fromMe: false },
                { text: 'Today’s forecast is sunny with a chance of rain.', fromMe: false },
                { text: 'Today’s forecast is sunny with a chance of rain.', fromMe: false },
                { text: 'Today’s forecast is sunny with a chance of rain.', fromMe: false },
                { text: 'Today’s forecast is sunny with a chance of rain.', fromMe: false },
                { text: 'Today’s forecast is sunny with a chance of rain.', fromMe: false },
                { text: 'Today’s forecast is sunny with a chance of rain.', fromMe: false },
                { text: 'Today’s forecast is sunny with a chance of rain.', fromMe: false },
                { text: 'Today’s forecast is sunny with a chance of rain.', fromMe: false },
                { text: 'Today’s forecast is sunny with a chance of rain.', fromMe: false },
                { text: 'Today’s forecast is sunny with a chance of rain.', fromMe: false },
                { text: 'Today’s forecast is sunny with a chance of rain.', fromMe: false },
                { text: 'Today’s forecast is sunny with a chance of rain.', fromMe: false },
                { text: 'Today’s forecast is sunny with a chance of rain.', fromMe: false },
                { text: 'Today’s forecast is sunny with a chance of rain.', fromMe: false },
                { text: 'Today’s forecast is sunny with a chance of rain.', fromMe: false },
                { text: 'Today’s forecast is sunny with a chance of rain.', fromMe: false },
                { text: 'Today’s forecast is sunny with a chance of rain.', fromMe: false },
                { text: 'Today’s forecast is sunny with a chance of rain.', fromMe: false },
                { text: 'Today’s forecast is sunny with a chance of rain.', fromMe: false },
                { text: 'Today’s forecast is sunny with a chance of rain.', fromMe: false },
                { text: 'Today’s forecast is sunny with a chance of rain.', fromMe: false },
                { text: 'Today’s forecast is sunny with a chance of rain.', fromMe: false },
                { text: 'Today’s forecast is sunny with a chance of rain.', fromMe: false },
                { text: 'Today’s forecast is sunny with a chance of rain.', fromMe: false },
                { text: 'Today’s forecast is sunny with a chance of rain.', fromMe: false },
                { text: 'Today’s forecast is sunny with a chance of rain.', fromMe: false },
                { text: 'Today’s forecast is sunny with a chance of rain.', fromMe: false },
                { text: 'Today’s forecast is sunny with a chance of rain.', fromMe: false },
                { text: 'Today’s forecast is sunny with a chance of rain.', fromMe: false },
                { text: 'Today’s forecast is sunny with a chance of rain.', fromMe: true },
                { text: 'Today’s forecast is sunny with a chance of rain.', fromMe: false },
                { text: 'Today’s forecast is sunny with a chance of rain.', fromMe: true },
                { text: 'Today’s forecast is sunny with a chance of rain.', fromMe: false },
                { text: 'Don’t forget your umbrella!', fromMe: true },
            ],
        },
        {
            name: 'Recipe Bot',
            messages: [
                { text: 'Looking for cooking inspiration?', fromMe: true },
                { text: 'Looking for cooking inspiration?', fromMe: false },
                { text: 'Looking for cooking inspiration?', fromMe: false },
                { text: 'Looking for cooking inspiration?', fromMe: true },
                { text: 'Looking for cooking inspiration?', fromMe: false },
                { text: 'Looking for cooking inspiration?', fromMe: false },
                { text: 'Looking for cooking inspiration?', fromMe: false },
                { text: 'Looking for cooking inspiration?', fromMe: true },
                { text: 'Let’s whip up something delicious!', fromMe: false },
            ],
        },
        // ... add more dummy contacts and chats as needed
    ]);

    const [currentMessage, setCurrentMessage] = useState('');
    // Currently active conversation index
    const [activeConversationIndex, setActiveConversationIndex] = useState(0);
    const avatarImage = process.env.PUBLIC_URL + '/images/profile.webp';

    const handleSendMessage = () => {
        if (currentMessage.trim() !== '') {
            const updatedConversations = [...conversations];
            const activeConversation = updatedConversations[activeConversationIndex];
            activeConversation.messages.push({
                text: currentMessage,
                fromMe: true
            });
            setConversations(updatedConversations);
            setCurrentMessage('');
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
                                <div className="font-semibold text-xl">{conversation.name}</div>
                                <div className="text-lg text-gray-500">
                                    {conversation.messages[conversation.messages.length - 1].text}
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
                    <div className="font-bold text-xl">
                        Chat with {conversations[activeConversationIndex].name}
                    </div>
                </div>
                {/* Chat messages */}
                <div className="flex-1 p-4 overflow-y-auto">
                    {conversations[activeConversationIndex].messages.map((message, index) => (
                        <div key={index} className={`flex items-end space-x-2 ${message.fromMe ? 'justify-end' : ''}`}>
                            {!message.fromMe && <img className="w-8 h-8 rounded-full" src={avatarImage} alt="avatar" />}
                            <div className={`rounded px-4 py-2 ${message.fromMe ? 'bg-green-100' : 'bg-blue-100'} text-xl`}>
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