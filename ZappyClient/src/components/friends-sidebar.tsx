"use client"

import { Plus } from "lucide-react"
import { Friend } from "../types/Index"

interface FriendsSidebarProps {
  friends: Friend[]
  onFriendClick: (friend: Friend) => void
  selectedFriendId?: number
  themeClasses: {
    bg: string
    sidebar: string
    accent: string
    hover: string
    text: string
    border: string
  }
  onAddFriend: () => void
}

export default function FriendsSidebar({
  friends,
  onFriendClick,
  selectedFriendId,
  themeClasses,
  onAddFriend,
}: FriendsSidebarProps) {
  return (
    <div className="flex-1 overflow-y-auto">
      {/* Divider line between profile and friends */}
      <div className={`h-px w-full ${themeClasses.border}`}></div>

      {/* Add friend button */}
      <div className="p-3">
        <button
          onClick={onAddFriend}
          className={`w-full flex items-center justify-center py-2 px-4 rounded-lg ${themeClasses.accent} text-white hover:bg-opacity-90 transition-colors`}
        >
          <Plus size={18} className="mr-2" />
          <span>Add New Friend</span>
        </button>
      </div>

      <div className="divide-y divide-gray-700">
        {friends.length > 0 ? (
          friends.map((friend) => (
            <div
              key={friend.id}
              className={`p-3 flex items-center cursor-pointer transition-colors ${
                selectedFriendId === friend.id ? "bg-gray-750" : `hover:bg-gray-750`
              }`}
              onClick={() => onFriendClick(friend)}
            >
              <div className="relative">
                <img
                  src={friend.image || "/placeholder.svg"}
                  alt={friend.name}
                  className="w-12 h-12 rounded-full object-cover"
                />
                <span
                  className={`absolute bottom-0 right-0 w-3 h-3 rounded-full border-2 border-gray-800 ${
                    friend.status === "online" ? "bg-green-500" : "bg-gray-400"
                  }`}
                ></span>
              </div>
              <div className="ml-3 flex-1 min-w-0">
                <div className="flex justify-between items-center">
                  <h3 className="text-sm font-medium text-gray-200 truncate">{friend.name}</h3>
                  {friend.lastMessage && <span className="text-xs text-gray-400">{friend.lastMessage.time}</span>}
                </div>
                {friend.lastMessage && (
                  <div className="flex items-center mt-1">
                    <p className="text-xs text-gray-400 truncate">
                      {friend.lastMessage.isOutgoing && <span className="font-medium">You: </span>}
                      {friend.lastMessage.content}
                    </p>
                  </div>
                )}
              </div>
            </div>
          ))
        ) : (
          <div className="p-6 text-center text-gray-400">
            <div className="flex justify-center mb-3">
              <Users size={40} className="text-gray-500" />
            </div>
            <p className="mb-1">No friends yet</p>
            <p className="text-xs">Add friends to start chatting</p>
          </div>
        )}
      </div>
    </div>
  )
}

function Users(props: { size: number; className: string }) {
  return (
    <svg
      xmlns="http://www.w3.org/2000/svg"
      width={props.size}
      height={props.size}
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="2"
      strokeLinecap="round"
      strokeLinejoin="round"
      className={props.className}
    >
      <path d="M17 21v-2a4 4 0 0 0-4-4H5a4 4 0 0 0-4 4v2"></path>
      <circle cx="9" cy="7" r="4"></circle>
      <path d="M23 21v-2a4 4 0 0 0-3-3.87"></path>
      <path d="M16 3.13a4 4 0 0 1 0 7.75"></path>
    </svg>
  )
}
