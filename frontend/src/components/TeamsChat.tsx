import { motion } from "framer-motion";
import { useEffect, useState } from 'react';
import { MessageDto } from '../dtos/MessageDto';
import { askPost, sayHello } from '../services/GeminiService';
import BLButton from './ui/bl-button/BLButton';
import MainPage from './pages/main-page/MainPage';

const dummymessages = [
  {
    id: 1,
    sender: "Lisa Meier",
    avatar: "https://i.pravatar.cc/150?img=47",
    time: "09:12",
    text: "Guten Morgen zusammen! Das Design-Update ist fast fertig.",
  },
  {
    id: 2,
    sender: "Tom Schneider",
    avatar: "https://i.pravatar.cc/150?img=3",
    time: "09:13",
    text: "Super, Lisa 👍 Ich kümmere mich dann um die API-Anbindung.",
  },
  {
    id: 3,
    sender: "Lisa Meier",
    avatar: "https://i.pravatar.cc/150?img=47",
    time: "09:14",
    text: "Perfekt! Ich lade die neuen Screens bis Mittag hoch.",
  },
  {
    id: 4,
    sender: "Du",
    avatar: "https://i.pravatar.cc/150?img=12",
    time: "09:15",
    text: "Klingt gut, danke euch!",
  },
];

export default function TeamsChat() {
  const [messages, setMessages] = useState<MessageDto[]>([]);
  useEffect(() => {
    askPost('What time is it in Munich?').then(console.log);
  }, []);

  return (<><MainPage/>
    <div className="flex flex-col h-[600px] w-full max-w-xl mx-auto bg-gray-50 dark:bg-gray-900 rounded-2xl shadow p-4 overflow-y-auto">
      <BLButton>Button CTA</BLButton>
      <BLButton size={'s'}>Button CTA</BLButton>
      <BLButton size={'m'}>Button CTA</BLButton>
      <BLButton size={'l'}>Button CTA</BLButton>
      <BLButton size={'xl'}>Button CTA</BLButton>

      {messages.map(message=><div key={message.id}><p>{message.text}</p><p>{message.createdAt}</p></div>)}
      {dummymessages.map((msg, index) => {
        const isOwn = msg.sender === "Du";
        const previous = dummymessages[index - 1];
        const showAvatar = !previous || previous.sender !== msg.sender;

        return (
          <motion.div
            key={msg.id}
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.2 }}
            className={`flex ${isOwn ? "justify-end" : "justify-start"} mb-2`}
          >
            {!isOwn && showAvatar && (
              <img
                src={msg.avatar}
                alt={msg.sender}
                className="w-8 h-8 rounded-full mr-2 self-end"
              />
            )}

            <div
              className={`max-w-[70%] rounded-2xl px-4 py-2 text-sm ${
                isOwn
                  ? "bg-blue-600 text-white rounded-br-none"
                  : "bg-gray-200 dark:bg-gray-800 text-gray-900 dark:text-gray-100 rounded-bl-none"
              }`}
            >
              {showAvatar && !isOwn && (
                <p className="text-xs font-semibold mb-1 opacity-80">
                  {msg.sender}
                </p>
              )}
              <p>{msg.text}</p>
              <p
                className={`text-[10px] mt-1 text-right opacity-60 ${
                  isOwn ? "text-gray-100" : "text-gray-700 dark:text-gray-400"
                }`}
              >
                {msg.time}
              </p>
            </div>

            {isOwn && showAvatar && (
              <img
                src={msg.avatar}
                alt="Dein Avatar"
                className="w-8 h-8 rounded-full ml-2 self-end"
              />
            )}
          </motion.div>
        );
      })}
    </div></>
  );
}
