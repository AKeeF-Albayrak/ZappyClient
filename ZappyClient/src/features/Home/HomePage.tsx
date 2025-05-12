"use client"

import type React from "react"

import { useState } from "react"
import GroupSidebar from "../../components/group-sidebar"
import GroupChat from "../../components/group-chat"
import GroupInfo from "../../components/group-info"
import type { Group } from "../../types/GroupTypes"

// Sample data for groups
const sampleGroups: Group[] = [
  {
    id: 1,
    name: "Family Group",
    image: "/placeholder.svg?height=50&width=50",
    status: "3 online",
    lastMessage: {
      sender: "Mom",
      content: "When are you coming home?",
      time: "10:30 AM",
    },
    members: [
      { id: 1, name: "Mom", image: "/placeholder.svg?height=40&width=40", status: "online" },
      { id: 2, name: "Dad", image: "/placeholder.svg?height=40&width=40", status: "offline" },
      { id: 3, name: "Sister", image: "/placeholder.svg?height=40&width=40", status: "online" },
    ],
    messages: [
      { id: 1, senderId: 1, content: "Hello everyone!", time: "10:15 AM" },
      { id: 2, senderId: 2, content: "Hi there!", time: "10:20 AM" },
      { id: 3, senderId: 1, content: "When are you coming home?", time: "10:30 AM" },
    ],
  },
  {
    id: 2,
    name: "Work Team",
    image: "/placeholder.svg?height=50&width=50",
    status: "5 online",
    lastMessage: {
      sender: "Boss",
      content: "Meeting at 2pm today",
      time: "09:45 AM",
    },
    members: [
      { id: 4, name: "Boss", image: "/placeholder.svg?height=40&width=40", status: "online" },
      { id: 5, name: "Colleague 1", image: "/placeholder.svg?height=40&width=40", status: "online" },
      { id: 6, name: "Colleague 2", image: "/placeholder.svg?height=40&width=40", status: "offline" },
    ],
    messages: [
      { id: 4, senderId: 4, content: "Good morning team", time: "09:30 AM" },
      { id: 5, senderId: 5, content: "Good morning!", time: "09:35 AM" },
      { id: 6, senderId: 4, content: "Meeting at 2pm today", time: "09:45 AM" },
    ],
  },
  {
    id: 3,
    name: "Friends",
    image: "/placeholder.svg?height=50&width=50",
    status: "2 online",
    lastMessage: {
      sender: "Alex",
      content: "Movie night on Friday?",
      time: "Yesterday",
    },
    members: [
      { id: 7, name: "Alex", image: "/placeholder.svg?height=40&width=40", status: "online" },
      { id: 8, name: "Jamie", image: "/placeholder.svg?height=40&width=40", status: "offline" },
      { id: 9, name: "Taylor", image: "/placeholder.svg?height=40&width=40", status: "online" },
    ],
    messages: [
      { id: 7, senderId: 7, content: "Hey everyone", time: "Yesterday" },
      { id: 8, senderId: 8, content: "What's up?", time: "Yesterday" },
      { id: 9, senderId: 7, content: "Movie night on Friday?", time: "Yesterday" },
    ],
  },
  {
    id: 4,
    name: "Project Alpha",
    image: "/placeholder.svg?height=50&width=50",
    status: "1 online",
    lastMessage: {
      sender: "Project Lead",
      content: "Check the latest updates",
      time: "2 days ago",
    },
    members: [
      { id: 10, name: "Project Lead", image: "/placeholder.svg?height=40&width=40", status: "online" },
      { id: 11, name: "Developer 1", image: "/placeholder.svg?height=40&width=40", status: "offline" },
      { id: 12, name: "Designer", image: "/placeholder.svg?height=40&width=40", status: "offline" },
    ],
    messages: [
      { id: 10, senderId: 10, content: "Project update", time: "2 days ago" },
      { id: 11, senderId: 11, content: "I've completed my tasks", time: "2 days ago" },
      { id: 12, senderId: 10, content: "Check the latest updates", time: "2 days ago" },
    ],
  },
  {
    id: 5,
    name: "Neighborhood",
    image: "/placeholder.svg?height=50&width=50",
    status: "7 online",
    lastMessage: {
      sender: "Neighbor Joe",
      content: "Community meeting tomorrow",
      time: "3 days ago",
    },
    members: [
      { id: 13, name: "Neighbor Joe", image: "/placeholder.svg?height=40&width=40", status: "offline" },
      { id: 14, name: "Neighbor Lisa", image: "/placeholder.svg?height=40&width=40", status: "online" },
      { id: 15, name: "Neighbor Mike", image: "/placeholder.svg?height=40&width=40", status: "offline" },
    ],
    messages: [
      { id: 13, senderId: 13, content: "Hello neighbors", time: "3 days ago" },
      { id: 14, senderId: 14, content: "Hi Joe!", time: "3 days ago" },
      { id: 15, senderId: 13, content: "Community meeting tomorrow", time: "3 days ago" },
    ],
  },
]

export default function Homepage() {
  const [selectedGroup, setSelectedGroup] = useState<Group | null>(null)
  const [viewMode, setViewMode] = useState<"chat" | "info" | null>(null)

  // Handle clicking on a group
  const handleGroupClick = (group: Group) => {
    setSelectedGroup(group)
    setViewMode("chat")
  }

  // Handle clicking on a group photo
  const handleGroupPhotoClick = (group: Group, e: React.MouseEvent) => {
    e.stopPropagation() // Prevent triggering the group click
    setSelectedGroup(group)
    setViewMode("info")
  }

  return (
    <main className="flex h-screen bg-gray-100">
      {/* Left sidebar with groups */}
      <div className="w-80 bg-white border-r border-gray-200 flex flex-col">
        <div className="p-4 border-b border-gray-200">
          <h1 className="text-xl font-semibold text-gray-800">Messages</h1>
        </div>
        <GroupSidebar
          groups={sampleGroups}
          onGroupClick={handleGroupClick}
          onGroupPhotoClick={handleGroupPhotoClick}
          selectedGroupId={selectedGroup?.id}
        />
      </div>

      {/* Right content area */}
      <div className="flex-1 flex flex-col">
        {selectedGroup && viewMode === "chat" ? (
          <GroupChat group={selectedGroup} />
        ) : selectedGroup && viewMode === "info" ? (
          <GroupInfo group={selectedGroup} />
        ) : (
          <div className="flex-1 flex items-center justify-center bg-gray-50">
            <div className="text-center text-gray-500">
              <svg
                xmlns="http://www.w3.org/2000/svg"
                className="h-16 w-16 mx-auto mb-4 text-gray-400"
                fill="none"
                viewBox="0 0 24 24"
                stroke="currentColor"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={1.5}
                  d="M8 12h.01M12 12h.01M16 12h.01M21 12c0 4.418-4.03 8-9 8a9.863 9.863 0 01-4.255-.949L3 20l1.395-3.72C3.512 15.042 3 13.574 3 12c0-4.418 4.03-8 9-8s9 3.582 9 8z"
                />
              </svg>
              <h3 className="text-xl font-medium mb-1">No conversation selected</h3>
              <p>Choose a group from the sidebar to start messaging</p>
            </div>
          </div>
        )}
      </div>
    </main>
  )
}
