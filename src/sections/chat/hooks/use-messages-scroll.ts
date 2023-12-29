import { RefObject, useCallback, useEffect, useRef } from 'react';
import { IChatMessage } from 'types/chat';

export default function useMessagesScroll(messages: IChatMessage[]): {
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
