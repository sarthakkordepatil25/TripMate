import React, { useState, useRef, useEffect } from 'react';
import { useApp } from '../context/AppContext';
import { Send, Users, Sparkles, CheckCheck } from 'lucide-react';
import { motion } from 'framer-motion';

export const ChatPanel = () => {
  const { chatMessages, sendChatMessage, user, groupMembers } = useApp();
  const [inputText, setInputText] = useState('');
  const messagesEndRef = useRef(null);

  useEffect(() => {
    messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' });
  }, [chatMessages]);

  const handleSend = (e) => {
    e?.preventDefault();
    if (!inputText.trim()) return;
    sendChatMessage(inputText);
    setInputText('');
  };

  const handleKeyDown = (e) => {
    if (e.key === 'Enter' && !e.shiftKey) {
      e.preventDefault();
      handleSend();
    }
  };

  const quickReplies = [
    'I vote sunset sailing! ⛵',
    'What time are we meeting?',
    'Checked the weather forecast! ☀️',
    'I will book the villa tonight 🏨'
  ];

  return (
    <div className="glass-card-luxury rounded-3xl border border-sand/20 shadow-luxury flex flex-col h-[560px] overflow-hidden text-ivory">
      {/* CHAT HEADER */}
      <div className="p-4 sm:px-6 border-b border-sand/15 bg-midnight-dark/80 flex items-center justify-between shrink-0">
        <div className="flex items-center gap-3">
          <div className="flex -space-x-2 overflow-hidden">
            {groupMembers.map((m) => (
              <span
                key={m.id}
                title={m.name}
                className="inline-flex h-8 w-8 items-center justify-center rounded-full bg-midnight-600 ring-2 ring-midnight-dark text-xs font-bold shadow-sm text-ivory"
                style={{ backgroundColor: m.color + '40' }}
              >
                {m.name.charAt(0)}
              </span>
            ))}
          </div>

          <div>
            <h4 className="text-sm font-serif font-bold text-ivory">
              Group Travel Lounge
            </h4>
            <p className="text-[11px] text-sand/60 font-num">
              4 travelers active in Goa trip
            </p>
          </div>
        </div>

        <span className="text-[10px] bg-forest/80 text-sand font-bold px-3 py-1 rounded-full flex items-center gap-1.5 shadow-sm border border-forest/60 font-mono">
          <span className="w-1.5 h-1.5 rounded-full bg-emerald-400 animate-pulse"></span>
          Live Sync
        </span>
      </div>

      {/* MESSAGES LIST */}
      <div className="flex-1 p-4 sm:p-6 overflow-y-auto space-y-4 bg-midnight-dark/40">
        {chatMessages.map((msg) => {
          const isMe = msg.isCurrentUser || msg.sender === (user?.name || 'You');

          return (
            <motion.div
              key={msg.id}
              initial={{ opacity: 0, y: 8 }}
              animate={{ opacity: 1, y: 0 }}
              className={`flex flex-col ${isMe ? 'items-end' : 'items-start'}`}
            >
              {/* Sender Name */}
              <span className="text-[11px] font-semibold text-sand/60 mb-1 px-1 font-sans">
                {isMe ? 'You' : msg.sender}
              </span>

              {/* Message Bubble */}
              <div
                className={`max-w-[85%] sm:max-w-[75%] px-4 py-3 rounded-2xl text-xs leading-relaxed shadow-md ${
                  isMe
                    ? 'bg-terracotta text-ivory rounded-br-xs'
                    : 'bg-midnight-dark/90 text-ivory border border-sand/15 rounded-bl-xs'
                }`}
              >
                <p className="break-words font-medium">{msg.text}</p>
                <div
                  className={`flex items-center justify-end gap-1 text-[9px] mt-1.5 font-num ${
                    isMe ? 'text-sand/80' : 'text-sand/50'
                  }`}
                >
                  <span>{msg.timestamp}</span>
                  {isMe && <CheckCheck className="w-3 h-3 text-ivory" />}
                </div>
              </div>
            </motion.div>
          );
        })}
        <div ref={messagesEndRef} />
      </div>

      {/* QUICK SUGGESTION PILLS */}
      <div className="px-4 py-2 bg-midnight-dark/60 border-t border-sand/10 flex items-center gap-2 overflow-x-auto no-scrollbar shrink-0">
        <Sparkles className="w-3.5 h-3.5 text-sunset shrink-0" />
        {quickReplies.map((reply, i) => (
          <button
            key={i}
            onClick={() => {
              sendChatMessage(reply);
            }}
            className="text-[11px] whitespace-nowrap bg-midnight-dark/80 hover:bg-terracotta/30 border border-sand/15 text-sand hover:text-ivory px-3 py-1 rounded-full transition-all shrink-0"
          >
            {reply}
          </button>
        ))}
      </div>

      {/* INPUT FORM */}
      <form onSubmit={handleSend} className="p-3.5 bg-midnight-dark/90 border-t border-sand/15 flex items-center gap-2 shrink-0">
        <input
          type="text"
          value={inputText}
          onChange={(e) => setInputText(e.target.value)}
          onKeyDown={handleKeyDown}
          placeholder="Message group travelers..."
          className="flex-1 bg-midnight-dark/80 border border-sand/20 rounded-full px-4 py-2.5 text-xs text-ivory placeholder:text-sand/40 focus:outline-none focus:border-terracotta"
        />
        <button
          type="submit"
          disabled={!inputText.trim()}
          className="p-2.5 rounded-full bg-terracotta hover:bg-terracotta-hover text-ivory disabled:opacity-40 disabled:cursor-not-allowed transition-all shadow-glow shrink-0"
          aria-label="Send message"
        >
          <Send className="w-4 h-4" />
        </button>
      </form>
    </div>
  );
};

export default ChatPanel;
