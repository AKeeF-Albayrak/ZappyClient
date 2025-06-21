"use client"

import type React from "react"

import { useState, useEffect, useRef } from "react"
import { Send, Paperclip, Smile, MoreVertical } from "lucide-react"
import { User, GroupViewModel } from "../types/Index"
import { bufferToBase64 } from "../utils/bufferUtils"

interface GroupChatProps {
  group: GroupViewModel
  currentUser: User
  themeClasses: {
    bg: string
    sidebar: string
    accent: string
    hover: string
    text: string
    border: string
  }
  highlightedMessageId: string | null
}

export default function GroupChat({ group, currentUser, themeClasses, highlightedMessageId }: GroupChatProps) {
  const [newMessage, setNewMessage] = useState("")
  const messagesEndRef = useRef<HTMLDivElement>(null)
  const highlightedMessageRef = useRef<HTMLDivElement>(null)

  // Scroll to bottom on initial load
  useEffect(() => {
    messagesEndRef.current?.scrollIntoView({ behavior: "smooth" })
  }, [group.id])

  // Scroll to highlighted message if any
  useEffect(() => {
    if (highlightedMessageId && highlightedMessageRef.current) {
      highlightedMessageRef.current.scrollIntoView({ behavior: "smooth", block: "center" })

      // Add highlight animation
      highlightedMessageRef.current.classList.add("highlight-message")

      // Remove highlight after animation completes
      const timeout = setTimeout(() => {
        highlightedMessageRef.current?.classList.remove("highlight-message")
      }, 2000)

      return () => clearTimeout(timeout)
    }
  }, [highlightedMessageId, group.id])

  const handleSendMessage = (e: React.FormEvent) => {
    e.preventDefault()
    if (newMessage.trim()) {
      // In a real app, you would send this message to your backend
      console.log("Sending message:", newMessage)
      setNewMessage("")

      // Scroll to bottom after sending a message
      setTimeout(() => {
        messagesEndRef.current?.scrollIntoView({ behavior: "smooth" })
      }, 100)
    }
  }

  // Find the current user (for this demo, we'll use the passed currentUser)
  const currentUserId = currentUser.id

  return (
    <div className="flex flex-col h-full">
      {/* Chat header */}
      <div
        className={`px-4 py-3 border-b ${themeClasses.border} ${themeClasses.sidebar} flex items-center justify-between`}
      >
        <div className="flex items-center">
          <img
            src={
              group.groupPicture
                ? `data:image/png;base64,${bufferToBase64(group.groupPicture)}`
                : "/placeholder.svg"
            }
            alt={group.name}
            className="w-10 h-10 rounded-full object-cover"
          />
          <div className="ml-3">
            <h2 className="text-lg font-medium text-gray-200">{group.name}</h2>
          </div>
        </div>
        <div className="flex items-center space-x-4">
          <button className={`p-2 rounded-full text-gray-400 ${themeClasses.hover}`}>
            <svg
              xmlns="http://www.w3.org/2000/svg"
              width="20"
              height="20"
              viewBox="0 0 24 24"
              fill="none"
              stroke="currentColor"
              strokeWidth="2"
              strokeLinecap="round"
              strokeLinejoin="round"
            >
              <path d="M15.05 5A5 5 0 0 1 19 8.95M15.05 1A9 9 0 0 1 23 8.94m-1 7.98v3a2 2 0 0 1-2.18 2 19.79 19.79 0 0 1-8.63-3.07 19.5 19.5 0 0 1-6-6 19.79 19.79 0 0 1-3.07-8.67A2 2 0 0 1 4.11 2h3a2 2 0 0 1 2 1.72 12.84 12.84 0 0 0 .7 2.81 2 2 0 0 1-.45 2.11L8.09 9.91a16 16 0 0 0 6 6l1.27-1.27a2 2 0 0 1 2.11-.45 12.84 12.84 0 0 0 2.81.7A2 2 0 0 1 22 16.92z"></path>
            </svg>
          </button>
          <button className={`p-2 rounded-full text-gray-400 ${themeClasses.hover}`}>
            <svg
              xmlns="http://www.w3.org/2000/svg"
              width="20"
              height="20"
              viewBox="0 0 24 24"
              fill="none"
              stroke="currentColor"
              strokeWidth="2"
              strokeLinecap="round"
              strokeLinejoin="round"
            >
              <path d="M23 7l-7 5 7 5V7z"></path>
              <rect x="1" y="5" width="15" height="14" rx="2" ry="2"></rect>
            </svg>
          </button>
          <button className={`p-2 rounded-full text-gray-400 ${themeClasses.hover}`}>
            <MoreVertical size={20} />
          </button>
        </div>
      </div>

      {/* Chat messages */}
      <div className={`flex-1 p-4 overflow-y-auto ${themeClasses.bg}`}>
        <div className="space-y-4">
          {group.messages.map((message) => {
            const isCurrentUser = message.senderUsername === currentUser.name;
            const sender = group.users.find((m) => m.username === message.senderUsername);
            const isHighlighted = message.id === highlightedMessageId

            return (
              <div
                key={message.id}
                className={`flex ${isCurrentUser ? "justify-end" : "justify-start"} ${isHighlighted ? "highlight-message-container" : ""}`}
                ref={isHighlighted ? highlightedMessageRef : null}
              >
                {!isCurrentUser && (
                  <img
                    src={
                      sender?.profilePicture
                        ? `data:image/png;base64,${bufferToBase64(sender.profilePicture)}`
                        : "/placeholder.svg"
                    }
                    alt={sender?.username || "User"}
                    className="w-8 h-8 rounded-full mr-2 self-end"
                  />
                )}
                <div className="max-w-xs">
                  {!isCurrentUser && <p className="text-xs text-gray-400 mb-1">{sender?.username}</p>}
                  <div
                    className={`rounded-xl px-4 py-2 inline-block transition-all duration-300 ${
                      isCurrentUser
                        ? `${themeClasses.accent} text-white rounded-br-none`
                        : "bg-gray-700 text-gray-200 rounded-bl-none"
                    } ${isHighlighted ? "highlight-pulse" : ""}`}
                  >
                    <p>{message.content}</p>
                  </div>
                  <div className="flex items-center mt-1">
                    <p className="text-xs text-gray-500">{message.createdDate}</p>
                    {message.isStarred && (
                      <svg
                        xmlns="http://www.w3.org/2000/svg"
                        className="h-3 w-3 text-yellow-400 ml-1"
                        viewBox="0 0 20 20"
                        fill="currentColor"
                      >
                        <path
                          fillRule="evenodd"
                          d="M10 2a1 1 0 01.894.553l2.447 4.969 5.476.796a1 1 0 01.554 1.705l-3.96 3.862.935 5.452a1 1 0 01-1.45 1.054L10 17.28l-4.896 2.575a1 1 0 01-1.45-1.054l.935-5.452-3.96-3.862a1 1 0 01.554-1.705l5.476-.796L9.106 2.553A1 1 0 0110 2z"
                          clipRule="evenodd"
                        />
                      </svg>
                    )}
                    {isCurrentUser && (
                      <svg
                        xmlns="http://www.w3.org/2000/svg"
                        className="h-3 w-3 text-gray-400 ml-1"
                        viewBox="0 0 20 20"
                        fill="currentColor"
                      >
                        <path
                          fillRule="evenodd"
                          d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z"
                          clipRule="evenodd"
                        />
                      </svg>
                    )}
                  </div>
                </div>
                {isCurrentUser && (
                  <img
                    src={
                      typeof currentUser.image === "string"
                        ? currentUser.image
                        : `data:image/png;base64,${bufferToBase64(currentUser.image)}`
                    }
                    alt={currentUser.name}
                    className="w-8 h-8 rounded-full ml-2 self-end"
                  />
                )}
              </div>
            )
          })}
          <div ref={messagesEndRef} />
        </div>
      </div>

      {/* Message input */}
      <div className={`p-3 ${themeClasses.sidebar}`}>
        <form onSubmit={handleSendMessage} className="flex items-center">
          <div className="flex items-center mr-2 space-x-2">
            <button type="button" className={`p-2 text-gray-400 rounded-full ${themeClasses.hover} focus:outline-none`}>
              <Smile size={20} />
            </button>
            <button type="button" className={`p-2 text-gray-400 rounded-full ${themeClasses.hover} focus:outline-none`}>
              <Paperclip size={20} />
            </button>
          </div>
          <input
            type="text"
            value={newMessage}
            onChange={(e) => setNewMessage(e.target.value)}
            placeholder="Type a message"
            className="flex-1 bg-gray-700 border-0 rounded-full px-4 py-2 focus:outline-none focus:ring-1 focus:ring-purple-500 text-gray-200 placeholder-gray-400"
          />
          <button
            type="submit"
            className={`ml-2 ${themeClasses.accent} text-white rounded-full p-2 hover:bg-opacity-90 focus:outline-none`}
            disabled={!newMessage.trim()}
          >
            <Send size={20} />
          </button>
        </form>
      </div>
    </div>
  )
}
