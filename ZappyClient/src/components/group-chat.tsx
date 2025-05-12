"use client"

import type React from "react"

import { useState } from "react"
import type { Group } from "../types/GroupTypes.ts"
import { Send } from "lucide-react"

interface GroupChatProps {
  group: Group
}

export default function GroupChat({ group }: GroupChatProps) {
  const [newMessage, setNewMessage] = useState("")

  const handleSendMessage = (e: React.FormEvent) => {
    e.preventDefault()
    if (newMessage.trim()) {
      // In a real app, you would send this message to your backend
      console.log("Sending message:", newMessage)
      setNewMessage("")
    }
  }

  // Find the current user (for this demo, we'll assume user ID 1)
  const currentUserId = 1

  return (
    <div className="flex flex-col h-full">
      {/* Chat header */}
      <div className="px-4 py-3 border-b border-gray-200 flex items-center">
        <img src={group.image || "/placeholder.svg"} alt={group.name} className="w-10 h-10 rounded-full object-cover" />
        <div className="ml-3">
          <h2 className="text-lg font-medium text-gray-900">{group.name}</h2>
          <p className="text-sm text-gray-500">{group.status}</p>
        </div>
      </div>

      {/* Chat messages */}
      <div className="flex-1 p-4 overflow-y-auto bg-gray-50">
        <div className="space-y-4">
          {group.messages.map((message) => {
            const isCurrentUser = message.senderId === currentUserId
            const sender = group.members.find((m) => m.id === message.senderId)

            return (
              <div key={message.id} className={`flex ${isCurrentUser ? "justify-end" : "justify-start"}`}>
                {!isCurrentUser && (
                  <img
                    src={sender?.image || "/placeholder.svg?height=40&width=40"}
                    alt={sender?.name || "User"}
                    className="w-8 h-8 rounded-full mr-2 self-end"
                  />
                )}
                <div className="max-w-xs">
                  {!isCurrentUser && <p className="text-xs text-gray-500 mb-1">{sender?.name}</p>}
                  <div
                    className={`rounded-lg px-4 py-2 inline-block ${
                      isCurrentUser
                        ? "bg-purple-600 text-white rounded-br-none"
                        : "bg-white text-gray-800 border border-gray-200 rounded-bl-none"
                    }`}
                  >
                    <p>{message.content}</p>
                  </div>
                  <p className="text-xs text-gray-500 mt-1">{message.time}</p>
                </div>
                {isCurrentUser && (
                  <img
                    src="/placeholder.svg?height=40&width=40"
                    alt="You"
                    className="w-8 h-8 rounded-full ml-2 self-end"
                  />
                )}
              </div>
            )
          })}
        </div>
      </div>

      {/* Message input */}
      <div className="p-4 border-t border-gray-200 bg-white">
        <form onSubmit={handleSendMessage} className="flex items-center">
          <input
            type="text"
            value={newMessage}
            onChange={(e) => setNewMessage(e.target.value)}
            placeholder="Type a message..."
            className="flex-1 border border-gray-300 rounded-full px-4 py-2 focus:outline-none focus:ring-2 focus:ring-purple-500 focus:border-transparent"
          />
          <button
            type="submit"
            className="ml-2 bg-purple-600 text-white rounded-full p-2 hover:bg-purple-700 focus:outline-none focus:ring-2 focus:ring-purple-500 focus:ring-offset-2"
            disabled={!newMessage.trim()}
          >
            <Send size={20} />
          </button>
        </form>
      </div>
    </div>
  )
}
