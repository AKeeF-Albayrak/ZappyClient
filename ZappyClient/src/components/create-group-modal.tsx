"use client"

import type React from "react"

import { useState } from "react"
import { X, Users } from "lucide-react"
import { Friend } from "../types/Index"


interface CreateGroupModalProps {
  friends: Friend[]
  onClose: () => void
  onCreateGroup: (name: string, members: number[]) => void
  themeClasses: {
    bg: string
    sidebar: string
    accent: string
    hover: string
    text: string
    border: string
  }
}

export default function CreateGroupModal({ friends, onClose, onCreateGroup, themeClasses }: CreateGroupModalProps) {
  const [groupName, setGroupName] = useState("")
  const [selectedMembers, setSelectedMembers] = useState<number[]>([])
  const [searchQuery, setSearchQuery] = useState("")

  const handleToggleMember = (friendId: number) => {
    if (selectedMembers.includes(friendId)) {
      setSelectedMembers(selectedMembers.filter((id) => id !== friendId))
    } else {
      setSelectedMembers([...selectedMembers, friendId])
    }
  }

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault()
    if (groupName.trim() && selectedMembers.length > 0) {
      onCreateGroup(groupName, selectedMembers)
    }
  }

  const filteredFriends = friends.filter((friend) => friend.name.toLowerCase().includes(searchQuery.toLowerCase()))

  return (
    <div className="p-6">
      <div className="flex justify-between items-center mb-6">
        <h2 className="text-xl font-semibold text-gray-200">Create New Group</h2>
        <button onClick={onClose} className="p-1 rounded-full hover:bg-gray-700 text-gray-400">
          <X size={20} />
        </button>
      </div>

      <form onSubmit={handleSubmit}>
        {/* Group name */}
        <div className="mb-4">
          <label htmlFor="groupName" className="block text-sm font-medium text-gray-400 mb-1">
            Group Name
          </label>
          <input
            type="text"
            id="groupName"
            value={groupName}
            onChange={(e) => setGroupName(e.target.value)}
            className="w-full px-3 py-2 bg-gray-700 border border-gray-600 rounded-md text-gray-200 focus:outline-none focus:ring-2 focus:ring-purple-500"
            placeholder="Enter group name"
            required
          />
        </div>

        {/* Selected members count */}
        <div className="mb-4">
          <div className="flex items-center justify-between">
            <label className="block text-sm font-medium text-gray-400">Add Members ({selectedMembers.length})</label>
            <span className="text-xs text-gray-500">
              {selectedMembers.length} of {friends.length} selected
            </span>
          </div>

          {/* Search friends */}
          <div className="relative mt-2 mb-3">
            <input
              type="text"
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              placeholder="Search friends"
              className="w-full pl-9 pr-3 py-2 text-sm bg-gray-700 border border-gray-600 rounded-md text-gray-200 focus:outline-none focus:ring-2 focus:ring-purple-500"
            />
            <svg
              className="absolute left-3 top-2.5 h-4 w-4 text-gray-400"
              xmlns="http://www.w3.org/2000/svg"
              fill="none"
              viewBox="0 0 24 24"
              stroke="currentColor"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth={2}
                d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z"
              />
            </svg>
          </div>

          {/* Selected members preview */}
          {selectedMembers.length > 0 && (
            <div className="flex flex-wrap gap-2 mb-3">
              {selectedMembers.map((memberId) => {
                const friend = friends.find((f) => f.id === memberId)
                if (!friend) return null
                return (
                  <div
                    key={`selected-${memberId}`}
                    className={`flex items-center px-2 py-1 rounded-full ${themeClasses.accent} text-white text-xs`}
                  >
                    <img
                      src={friend.image || "/placeholder.svg"}
                      alt={friend.name}
                      className="w-4 h-4 rounded-full mr-1"
                    />
                    <span className="mr-1">{friend.name}</span>
                    <button
                      type="button"
                      onClick={() => handleToggleMember(memberId)}
                      className="hover:bg-purple-700 rounded-full p-0.5"
                    >
                      <X size={12} />
                    </button>
                  </div>
                )
              })}
            </div>
          )}

          {/* Friends list */}
          <div className="max-h-60 overflow-y-auto border border-gray-600 rounded-md">
            {filteredFriends.length > 0 ? (
              filteredFriends.map((friend) => (
                <div
                  key={friend.id}
                  className={`flex items-center p-2 hover:bg-gray-750 cursor-pointer ${
                    selectedMembers.includes(friend.id) ? "bg-gray-750" : ""
                  }`}
                  onClick={() => handleToggleMember(friend.id)}
                >
                  <div className="flex items-center flex-1">
                    <img
                      src={friend.image || "/placeholder.svg"}
                      alt={friend.name}
                      className="w-8 h-8 rounded-full mr-3"
                    />
                    <span className="text-sm text-gray-200">{friend.name}</span>
                  </div>
                  <div
                    className={`w-5 h-5 rounded-full border ${
                      selectedMembers.includes(friend.id)
                        ? `${themeClasses.accent} border-transparent flex items-center justify-center`
                        : "border-gray-500"
                    }`}
                  >
                    {selectedMembers.includes(friend.id) && (
                      <svg
                        xmlns="http://www.w3.org/2000/svg"
                        className="h-3 w-3 text-white"
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
              ))
            ) : (
              <div className="p-4 text-center text-gray-400">
                <p>No friends found</p>
              </div>
            )}
          </div>
        </div>

        {/* Submit button */}
        <div className="flex justify-end mt-6">
          <button
            type="button"
            onClick={onClose}
            className="px-4 py-2 mr-2 border border-gray-600 rounded-md text-gray-300 hover:bg-gray-700"
          >
            Cancel
          </button>
          <button
            type="submit"
            disabled={!groupName.trim() || selectedMembers.length === 0}
            className={`px-4 py-2 rounded-md ${themeClasses.accent} text-white disabled:opacity-50 disabled:cursor-not-allowed flex items-center`}
          >
            <Users size={16} className="mr-2" />
            Create Group
          </button>
        </div>
      </form>
    </div>
  )
}
