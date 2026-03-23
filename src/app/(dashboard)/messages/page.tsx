'use client';

import { useState } from 'react';
import { useRouter } from 'next/navigation';
import { motion } from 'framer-motion';
import { 
  Search, Send, Phone, MoreVertical, ArrowLeft, 
  CheckCheck, Image as ImageIcon, Paperclip
} from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar';
import { Badge } from '@/components/ui/badge';
import { ScrollArea } from '@/components/ui/scroll-area';
import { mockConversations, mockVolunteers, mockOrganizations } from '@/mock/data';

export default function MessagesPage() {
  const [selectedConversation, setSelectedConversation] = useState(mockConversations[0]);
  const [messageInput, setMessageInput] = useState('');

  return (
    <div className="h-[calc(100vh-4rem)] flex">
      {/* Sidebar */}
      <div className="w-full md:w-80 lg:w-96 border-r border-gray-200 dark:border-gray-800 bg-white dark:bg-gray-900 flex flex-col">
        <div className="p-4 border-b border-gray-200 dark:border-gray-800">
          <h1 className="text-xl font-bold text-gray-900 dark:text-white mb-4">Messages</h1>
          <div className="relative">
            <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-gray-400" />
            <Input 
              placeholder="Search conversations..." 
              className="pl-9 rounded-full"
            />
          </div>
        </div>
        
        <ScrollArea className="flex-1">
          <div className="divide-y divide-gray-100 dark:divide-gray-800">
            {mockConversations.map((conversation) => (
              <button
                key={conversation.id}
                onClick={() => setSelectedConversation(conversation)}
                className={`w-full p-4 flex items-start gap-3 hover:bg-gray-50 dark:hover:bg-gray-800/50 transition-colors ${
                  selectedConversation?.id === conversation.id 
                    ? 'bg-yellow-50 dark:bg-yellow-900/20' 
                    : ''
                }`}
              >
                <Avatar className="w-12 h-12">
                  <AvatarImage src={conversation.participants[1]?.avatar} />
                  <AvatarFallback className="bg-yellow-100 text-yellow-700">
                    {conversation.participants[1]?.name.charAt(0)}
                  </AvatarFallback>
                </Avatar>
                <div className="flex-1 min-w-0 text-left">
                  <div className="flex items-center justify-between">
                    <h3 className="font-semibold text-gray-900 dark:text-white truncate">
                      {conversation.participants[1]?.name}
                    </h3>
                    <span className="text-xs text-gray-500">
                      {new Date(conversation.lastMessage.createdAt).toLocaleTimeString([], {
                        hour: '2-digit',
                        minute: '2-digit'
                      })}
                    </span>
                  </div>
                  <p className={`text-sm truncate ${
                    conversation.unreadCount > 0 
                      ? 'text-gray-900 dark:text-white font-medium' 
                      : 'text-gray-500'
                  }`}>
                    {conversation.lastMessage.content}
                  </p>
                </div>
                {conversation.unreadCount > 0 && (
                  <Badge className="rounded-full bg-yellow-500 text-white">
                    {conversation.unreadCount}
                  </Badge>
                )}
              </button>
            ))}
          </div>
        </ScrollArea>
      </div>

      {/* Chat Area */}
      <div className="hidden md:flex flex-1 flex-col bg-gray-50 dark:bg-gray-950">
        {selectedConversation ? (
          <>
            {/* Header */}
            <div className="p-4 bg-white dark:bg-gray-900 border-b border-gray-200 dark:border-gray-800 flex items-center justify-between">
              <div className="flex items-center gap-3">
                <Button variant="ghost" size="icon" className="lg:hidden rounded-full">
                  <ArrowLeft className="w-5 h-5" />
                </Button>
                <Avatar>
                  <AvatarImage src={selectedConversation.participants[1]?.avatar} />
                  <AvatarFallback className="bg-yellow-100 text-yellow-700">
                    {selectedConversation.participants[1]?.name.charAt(0)}
                  </AvatarFallback>
                </Avatar>
                <div>
                  <h2 className="font-semibold text-gray-900 dark:text-white">
                    {selectedConversation.participants[1]?.name}
                  </h2>
                  <p className="text-xs text-gray-500">
                    {selectedConversation.participants[1]?.role === 'organization' ? 'Organization' : 'Volunteer'}
                  </p>
                </div>
              </div>
              <div className="flex items-center gap-2">
                <Button variant="ghost" size="icon" className="rounded-full">
                  <Phone className="w-5 h-5" />
                </Button>
                <Button variant="ghost" size="icon" className="rounded-full">
                  <MoreVertical className="w-5 h-5" />
                </Button>
              </div>
            </div>

            {/* Messages */}
            <ScrollArea className="flex-1 p-4">
              <div className="space-y-4">
                <div className="flex items-start gap-3">
                  <Avatar className="w-8 h-8">
                    <AvatarImage src={selectedConversation.participants[1]?.avatar} />
                    <AvatarFallback className="bg-yellow-100 text-yellow-700 text-xs">
                      {selectedConversation.participants[1]?.name.charAt(0)}
                    </AvatarFallback>
                  </Avatar>
                  <div className="bg-white dark:bg-gray-800 rounded-2xl rounded-tl-none p-3 max-w-md shadow-sm">
                    <p className="text-gray-900 dark:text-white">
                      {selectedConversation.lastMessage.content}
                    </p>
                    <span className="text-xs text-gray-500 mt-1">
                      {new Date(selectedConversation.lastMessage.createdAt).toLocaleTimeString([], {
                        hour: '2-digit',
                        minute: '2-digit'
                      })}
                    </span>
                  </div>
                </div>

                <div className="flex items-start gap-3 justify-end">
                  <div className="bg-yellow-500 text-white rounded-2xl rounded-tr-none p-3 max-w-md">
                    <p>Thank you for reaching out! I&apos;ll be there on time.</p>
                    <div className="flex items-center justify-end gap-1 mt-1">
                      <span className="text-xs text-yellow-100">
                        {new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })}
                      </span>
                      <CheckCheck className="w-3 h-3 text-yellow-200" />
                    </div>
                  </div>
                </div>
              </div>
            </ScrollArea>

            {/* Input */}
            <div className="p-4 bg-white dark:bg-gray-900 border-t border-gray-200 dark:border-gray-800">
              <div className="flex items-center gap-2">
                <Button variant="ghost" size="icon" className="rounded-full text-gray-500">
                  <Paperclip className="w-5 h-5" />
                </Button>
                <Button variant="ghost" size="icon" className="rounded-full text-gray-500">
                  <ImageIcon className="w-5 h-5" />
                </Button>
                <Input
                  value={messageInput}
                  onChange={(e) => setMessageInput(e.target.value)}
                  placeholder="Type a message..."
                  className="flex-1 rounded-full"
                />
                <Button 
                  className="rounded-full gradient-primary"
                  disabled={!messageInput.trim()}
                >
                  <Send className="w-4 h-4" />
                </Button>
              </div>
            </div>
          </>
        ) : (
          <div className="flex-1 flex items-center justify-center">
            <div className="text-center">
              <div className="w-20 h-20 mx-auto mb-4 rounded-full bg-gray-100 dark:bg-gray-800 flex items-center justify-center">
                <Send className="w-8 h-8 text-gray-400" />
              </div>
              <p className="text-gray-500">Select a conversation to start messaging</p>
            </div>
          </div>
        )}
      </div>
    </div>
  );
}
