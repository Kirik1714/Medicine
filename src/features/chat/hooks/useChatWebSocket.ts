import { useState, useEffect, useCallback, useRef } from 'react';
import type { ChatMessage } from '../chat.types';

export function useChatWebSocket(url: string = 'wss://ws.ifelse.io') {
  const [messages, setMessages] = useState<ChatMessage[]>([]);
  const [isConnected, setIsConnected] = useState(false);
  const socketRef = useRef<WebSocket | null>(null);

  
  useEffect(() => {
    // 1. Создаем соединение
    const ws = new WebSocket(url);
    socketRef.current = ws;

    ws.onopen = () => {
      setIsConnected(true);
     
    };

    // 2. Слушаем входящие сообщения
    ws.onmessage = (event) => {
      const incomingText = event.data;
      if (incomingText.includes('Request served')) {
    return; 
  }
      
      setMessages((prev) => [
        ...prev,
        {
          id: `msg-${Date.now()}-bot`,
          text: incomingText,
          sender: 'bot', // Помечаем как ответ бота/сервера
          timestamp: new Date().toLocaleTimeString(),
        },
      ]);
    };

    ws.onclose = () => {
      setIsConnected(false);
     
    };

    return () => {
      ws.close();
    };
  }, [url]);

  // Функция отправки сообщения
  const sendMessage = useCallback((text: string) => {
    if (!text.trim() || !socketRef.current || socketRef.current.readyState !== WebSocket.OPEN) return;

    // Сразу добавляем сообщение пользователя в UI
    const userMessage: ChatMessage = {
      id: `msg-${Date.now()}-user`,
      text,
      sender: 'user',
      timestamp: new Date().toLocaleTimeString(),
    };

    setMessages((prev) => [...prev, userMessage]);

    socketRef.current.send(text);
  }, []);

  return { messages, isConnected, sendMessage };
}