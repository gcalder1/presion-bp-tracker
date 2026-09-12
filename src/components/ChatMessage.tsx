import { Bot, User } from 'lucide-react';
import type { ChatMessage as ChatMessageType } from '../types';

interface Props {
  message: ChatMessageType;
}

export default function ChatMessage({ message }: Props) {
  const isUser = message.role === 'user';

  return (
    <div className={`flex items-start gap-3 ${isUser ? 'flex-row-reverse' : ''}`}>
      <div
        className={`flex h-9 w-9 shrink-0 items-center justify-center rounded-full ${
          isUser ? 'bg-ink-200 text-ink-700' : 'bg-brand-600 text-white'
        }`}
        aria-hidden="true"
      >
        {isUser ? <User className="h-5 w-5" /> : <Bot className="h-5 w-5" />}
      </div>

      <div
        className={`max-w-[80%] rounded-2xl px-4 py-3 text-[15px] leading-relaxed ${
          isUser ? 'rounded-tr-sm bg-brand-600 text-white' : 'rounded-tl-sm bg-ink-100 text-ink-900'
        }`}
      >
        {message.typing ? (
          <span className="flex items-center gap-1 py-1" aria-label="Typing">
            <span className="h-2 w-2 animate-bounce rounded-full bg-ink-400 [animation-delay:-0.3s]" />
            <span className="h-2 w-2 animate-bounce rounded-full bg-ink-400 [animation-delay:-0.15s]" />
            <span className="h-2 w-2 animate-bounce rounded-full bg-ink-400" />
          </span>
        ) : (
          message.text
        )}
      </div>
    </div>
  );
}
