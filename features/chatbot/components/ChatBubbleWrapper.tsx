'use client';

import dynamic from 'next/dynamic';

const ChatBubble = dynamic(() => import('./ChatBubble'), { ssr: false });

const ChatBubbleWrapper = () => <ChatBubble />;

export default ChatBubbleWrapper;
