// Force Git Update

import React, { useState, useRef } from 'react';
import { useApp } from '../context/AppContext';
import { ScreenTitle, Button, Input, Card } from '../components/UI';
import { Mic, Send, Globe, Sparkles, StopCircle, User, Bot } from 'lucide-react';
import { generateChatResponse, generateSearchResponse, transcribeAudio, blobToBase64 } from '../utils/ai';

interface Message {
    id: string;
    role: 'user' | 'model';
    text: string;
    grounding?: any[];
}

export const Assistant: React.FC = () => {
    const { highContrast, user } = useApp();
    const [messages, setMessages] = useState<Message[]>([
        { id: '1', role: 'model', text: `Hi ${user?.name || 'there'}! I'm Coach Bod. How can I support your fitness journey today?` }
    ]);
    const [input, setInput] = useState("");
    const [loading, setLoading] = useState(false);
    const [useSearch, setUseSearch] = useState(false);
    const [isRecording, setIsRecording] = useState(false);
    
    // Audio Refs
    const mediaRecorderRef = useRef<MediaRecorder | null>(null);
    const chunksRef = useRef<Blob[]>([]);

    const handleSend = async () => {
        if (!input.trim()) return;

        const newUserMsg: Message = { id: Date.now().toString(), role: 'user', text: input };
        setMessages(prev => [...prev, newUserMsg]);
        setInput("");
        setLoading(true);

        try {
            let responseText = "";
            let groundingData = undefined;

            if (useSearch) {
                // Use Gemini Flash with Search Tool
                const result = await generateSearchResponse(input);
                responseText = result.text || "I couldn't find anything on that.";
                groundingData = result.grounding;
            } else {
                // Use Gemini Pro Chat
                const history = messages.map(m => ({
                    role: m.role,
                    parts: [{ text: m.text }]
                }));
                responseText = (await generateChatResponse(history, input)) || "I'm having a moment. Try again?";
            }

            setMessages(prev => [...prev, {
                id: (Date.now() + 1).toString(),
                role: 'model',
                text: responseText,
                grounding: groundingData
            }]);
        } catch (e) {
            console.error(e);
        } finally {
            setLoading(false);
        }
    };

    const toggleRecording = async () => {
        if (isRecording) {
            // Stop
            mediaRecorderRef.current?.stop();
            setIsRecording(false);
        } else {
            // Start
            try {
                const stream = await navigator.mediaDevices.getUserMedia({ audio: true });
                mediaRecorderRef.current = new MediaRecorder(stream);
                chunksRef.current = [];

                mediaRecorderRef.current.ondataavailable = (e) => {
                    chunksRef.current.push(e.data);
                };

                mediaRecorderRef.current.onstop = async () => {
                    setLoading(true);
                    const blob = new Blob(chunksRef.current, { type: 'audio/wav' });
                    const base64 = await blobToBase64(blob);
                    const text = await transcribeAudio(base64);
                    if (text) setInput(prev => prev + " " + text);
                    setLoading(false);
                    // Stop tracks
                    stream.getTracks().forEach(track => track.stop());
                };

                mediaRecorderRef.current.start();
                setIsRecording(true);
            } catch (err) {
                alert("Microphone access denied or unavailable.");
            }
        }
    };

    return (
        <div className="pb-24 h-[calc(100vh-80px)] flex flex-col">
            <ScreenTitle title="AI Coach" subtitle="Powered by Gemini" />

            {/* Chat Area */}
            <div className="flex-1 overflow-y-auto space-y-4 mb-4 pr-2 no-scrollbar">
                {messages.map((msg) => {
                    const isUser = msg.role === 'user';
                    return (
                        <div key={msg.id} className={`flex gap-3 ${isUser ? 'flex-row-reverse' : 'flex-row'}`}>
                            <div className={`w-8 h-8 rounded-full flex items-center justify-center shrink-0 ${isUser 
                                ? (highContrast ? 'bg-black text-yellow-400' : 'bg-indigo-600 text-white')
                                : (highContrast ? 'bg-white border-2 border-black text-black' : 'bg-white border border-slate-200 text-indigo-600')
                            }`}>
                                {isUser ? <User size={16}/> : <Bot size={16}/>}
                            </div>
                            
                            <div className={`p-4 rounded-2xl max-w-[85%] ${isUser 
                                ? (highContrast ? 'bg-black text-yellow-400 border border-yellow-400' : 'bg-indigo-600 text-white rounded-tr-none')
                                : (highContrast ? 'bg-white text-black border-2 border-black' : 'bg-white border border-slate-200 text-slate-800 rounded-tl-none')
                            }`}>
                                <p className="text-sm leading-relaxed whitespace-pre-wrap">{msg.text}</p>
                                
                                {/* Search Sources Display */}
                                {msg.grounding && msg.grounding.length > 0 && (
                                    <div className="mt-3 pt-3 border-t border-black/10">
                                        <p className="text-[10px] font-bold uppercase mb-2 flex items-center gap-1 opacity-70">
                                            <Globe size={10} /> Sources
                                        </p>
                                        <div className="flex flex-wrap gap-2">
                                            {msg.grounding.map((chunk: any, i: number) => {
                                                if (chunk.web?.uri) {
                                                    return (
                                                        <a key={i} href={chunk.web.uri} target="_blank" rel="noopener noreferrer" 
                                                           className={`text-[10px] px-2 py-1 rounded-full truncate max-w-[150px] ${highContrast ? 'bg-black text-white underline' : 'bg-slate-100 text-indigo-600 hover:bg-slate-200'}`}>
                                                            {chunk.web.title || chunk.web.uri}
                                                        </a>
                                                    );
                                                }
                                                return null;
                                            })}
                                        </div>
                                    </div>
                                )}
                            </div>
                        </div>
                    );
                })}
                {loading && (
                    <div className="flex gap-2 items-center text-xs opacity-50 ml-12">
                         <div className="w-2 h-2 bg-slate-400 rounded-full animate-bounce" />
                         <div className="w-2 h-2 bg-slate-400 rounded-full animate-bounce delay-75" />
                         <div className="w-2 h-2 bg-slate-400 rounded-full animate-bounce delay-150" />
                    </div>
                )}
            </div>

            {/* Controls */}
            <div className="space-y-3">
                 <button 
                    onClick={() => setUseSearch(!useSearch)}
                    className={`text-xs font-bold flex items-center gap-2 px-3 py-1 rounded-full w-fit transition-colors ${useSearch 
                        ? (highContrast ? 'bg-black text-yellow-400' : 'bg-blue-100 text-blue-700')
                        : 'opacity-50 hover:opacity-100'
                    }`}
                 >
                    <Globe size={14} />
                    {useSearch ? "Search Mode: ON" : "Enable Web Search"}
                 </button>

                 <div className={`p-2 rounded-3xl flex items-center gap-2 ${highContrast ? 'border-4 border-black bg-white' : 'bg-white shadow-lg border border-slate-100'}`}>
                     <button 
                        onClick={toggleRecording}
                        className={`p-3 rounded-full transition-all ${isRecording 
                            ? 'bg-red-500 text-white animate-pulse' 
                            : (highContrast ? 'bg-white text-black border-2 border-black' : 'bg-slate-100 text-slate-500 hover:text-indigo-600')
                        }`}
                     >
                        {isRecording ? <StopCircle size={20} /> : <Mic size={20} />}
                     </button>
                     
                     <input 
                        className="flex-1 bg-transparent outline-none p-2 text-sm"
                        placeholder={isRecording ? "Listening..." : "Ask Coach Bod..."}
                        value={input}
                        onChange={(e) => setInput(e.target.value)}
                        onKeyDown={(e) => e.key === 'Enter' && handleSend()}
                        disabled={isRecording || loading}
                     />

                     <Button 
                        onClick={handleSend} 
                        disabled={!input.trim() || loading}
                        className="!p-3 !rounded-full !w-12 !h-12 flex items-center justify-center shrink-0"
                     >
                        <Send size={18} />
                     </Button>
                 </div>
            </div>
        </div>
    );
};