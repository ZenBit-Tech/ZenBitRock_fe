import { RefObject, useCallback, useEffect, useRef } from 'react';
import { Message } from 'types';

export default function useMessagesScroll(messages: Message[]): {
  messagesEndRef: RefObject<HTMLDivElement>;
} {
  const messagesEndRef = useRef<HTMLDivElement>(null);

  const scrollMessagesToBottom = useCallback(() => {
    if (!messages) {
      return;
    }

    if (!messagesEndRef.current) {
      return;
    }

    if (messagesEndRef.current) {
      messagesEndRef.current.scrollTop = messagesEndRef.current.scrollHeight;
    }
  }, [messages]);

  useEffect(() => {
    scrollMessagesToBottom();
  }, [messages, scrollMessagesToBottom]);

  return {
    messagesEndRef,
  };
}
