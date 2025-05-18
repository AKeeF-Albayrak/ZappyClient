"use client"

import type React from "react"

import { useState, useEffect } from "react"
import GroupSidebar from "../../components/group-sidebar"
import GroupChat from "../../components/group-chat"
import GroupInfo from "../../components/group-info"
import NavigationSidebar from "../../components/navigation-sidebar"
import ProfileUpdate from "../../components/profile-update"
import SettingsPage from "../../components/settings-page"
import StarredMessagesSidebar from "../../components/starred-messages-sidebar"
import FriendsSidebar from "../../components/friends-sidebar"
import FriendRequests from "../../components/friend-requests"
import CreateGroupModal from "../../components//create-group-modal"
import AddFriendModal from "../../components/add-friend-modal"
import { Group, User, Message, Friend, FriendRequest } from "../../types/Index"
import connection from "../../utils/signalrClient"

// Sample current user data
const currentUser: User = {
  id: 1,
  name: "John Doe",
  image: "/placeholder.svg?height=60&width=60",
  status: "online",
  statusMessage: "Available",
}

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
      { id: 3, senderId: 1, content: "When are you coming home?", time: "10:30 AM", isStarred: true },
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
      { id: 6, senderId: 4, content: "Meeting at 2pm today", time: "09:45 AM", isStarred: true },
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
      { id: 8, senderId: 8, content: "What's up?", time: "Yesterday", isStarred: true },
      { id: 9, senderId: 7, content: "Movie night on Friday?", time: "Yesterday" },
    ],
  },
]

// Sample friends data
const sampleFriends: Friend[] = [
  {
    id: 101,
    name: "Sarah Johnson",
    image: "/placeholder.svg?height=50&width=50",
    status: "online",
    lastMessage: {
      content: "See you tomorrow!",
      time: "11:45 AM",
      isOutgoing: false,
    },
  },
  {
    id: 102,
    name: "Michael Brown",
    image: "/placeholder.svg?height=50&width=50",
    status: "offline",
    lastMessage: {
      content: "Thanks for the help",
      time: "Yesterday",
      isOutgoing: true,
    },
  },
  {
    id: 103,
    name: "Emily Davis",
    image: "/placeholder.svg?height=50&width=50",
    status: "online",
    lastMessage: {
      content: "Did you watch the game?",
      time: "2 days ago",
      isOutgoing: false,
    },
  },
]

// Sample friend requests
const sampleFriendRequests: FriendRequest[] = [
  {
    id: 201,
    user: {
      id: 201,
      name: "David Wilson",
      image: "/placeholder.svg?height=50&width=50",
    },
    time: "2 hours ago",
    type: "incoming",
    mutualFriends: 3,
  },
  {
    id: 202,
    user: {
      id: 202,
      name: "Jessica Martinez",
      image: "/placeholder.svg?height=50&width=50",
    },
    time: "1 day ago",
    type: "incoming",
    mutualFriends: 1,
  },
  {
    id: 203,
    user: {
      id: 203,
      name: "Robert Taylor",
      image: "/placeholder.svg?height=50&width=50",
    },
    time: "3 days ago",
    type: "outgoing",
  },
]

export default function Home() {
  const [selectedGroup, setSelectedGroup] = useState<Group | null>(null)
  const [viewMode, setViewMode] = useState<"chat" | "info" | null>(null)
  const [user, setUser] = useState<User>(currentUser)
  const [searchQuery, setSearchQuery] = useState("")
  const [activeTab, setActiveTab] = useState<"chats" | "settings" | "starred" | "friends" | "requests">("chats")
  const [showProfileUpdate, setShowProfileUpdate] = useState(false)
  const [theme, setTheme] = useState<"dark" | "purple" | "blue" | "green">("dark")
  const [currentTheme, setCurrentTheme] = useState<"dark" | "purple" | "blue" | "green">("dark")
  const [profileAnimation, setProfileAnimation] = useState(false)
  const [highlightedMessageId, setHighlightedMessageId] = useState<number | null>(null)
  const [friends, setFriends] = useState<Friend[]>(sampleFriends)
  const [friendRequests, setFriendRequests] = useState<FriendRequest[]>(sampleFriendRequests)
  const [groups, setGroups] = useState<Group[]>(sampleGroups)
  const [showCreateGroupModal, setShowCreateGroupModal] = useState(false)
  const [showAddFriendModal, setShowAddFriendModal] = useState(false)
  const [isConnected, setIsConnected] = useState(false)
  const [isConnecting, setIsConnecting] = useState(true)

  useEffect(() => {
    const startConnection = async () => {
      try {
        await connection.start()
        setIsConnected(true)
        setIsConnecting(false)
        console.log("SignalR connected")
      } catch (error) {
        console.error("SignalR connection failed:", error)
        setIsConnected(false)
        setIsConnecting(true)

        // Retry after 10 seconds
        setTimeout(() => {
          startConnection()
        }, 10000)
      }
    }

    startConnection()

    return () => {
      connection.stop()
    }
  }, [])

  // Apply theme change with transition
  useEffect(() => {
    const timer = setTimeout(() => {
      setCurrentTheme(theme)
    }, 50)
    return () => clearTimeout(timer)
  }, [theme])

  // Handle clicking on a group
  const handleGroupClick = (group: Group) => {
    setSelectedGroup(group)
    setViewMode("chat")
    setHighlightedMessageId(null) // Reset highlighted message when changing groups
  }

  // Handle clicking on a group photo
  const handleGroupPhotoClick = (group: Group, e: React.MouseEvent) => {
    e.stopPropagation() // Prevent triggering the group click
    setSelectedGroup(group)
    setViewMode("info")
  }

  // Handle updating user status
  const handleStatusUpdate = (status: string, statusMessage: string) => {
    setUser({
      ...user,
      status,
      statusMessage,
    })
  }

  // Handle updating user profile
  const handleProfileUpdate = (updatedUser: User) => {
    setUser(updatedUser)
    setProfileAnimation(false)
    setTimeout(() => {
      setShowProfileUpdate(false)
    }, 300)
  }

  // Handle showing profile update modal with animation
  const handleShowProfileUpdate = () => {
    setShowProfileUpdate(true)
    setTimeout(() => {
      setProfileAnimation(true)
    }, 50)
  }

  // Handle clicking on a starred message
  const handleStarredMessageClick = (groupId: number, messageId: number) => {
    const group = groups.find((g) => g.id === groupId)
    if (group) {
      setSelectedGroup(group)
      setViewMode("chat")
      setHighlightedMessageId(messageId)

      // Switch to chats tab
      setActiveTab("chats")
    }
  }

  // Handle clicking on a friend
  const handleFriendClick = (friend: Friend) => {
    // In a real app, you would open a chat with this friend
    console.log("Open chat with friend:", friend)
  }

  // Handle accepting a friend request
  const handleAcceptFriendRequest = (requestId: number) => {
    const request = friendRequests.find((req) => req.id === requestId && req.type === "incoming")
    if (request) {
      // Add to friends
      const newFriend: Friend = {
        id: request.user.id,
        name: request.user.name,
        image: request.user.image,
        status: "online",
      }
      setFriends([...friends, newFriend])

      // Remove from requests
      setFriendRequests(friendRequests.filter((req) => req.id !== requestId))
    }
  }

  // Handle rejecting a friend request
  const handleRejectFriendRequest = (requestId: number) => {
    setFriendRequests(friendRequests.filter((req) => req.id !== requestId))
  }

  // Handle creating a new group
  const handleCreateGroup = (name: string, memberIds: number[]) => {
    const newGroupId = groups.length + 10 // Just for demo
    const groupMembers = friends
      .filter((friend) => memberIds.includes(friend.id))
      .map((friend) => ({
        id: friend.id,
        name: friend.name,
        image: friend.image,
        status: friend.status,
      }))

    const newGroup: Group = {
      id: newGroupId,
      name,
      image: "/placeholder.svg?height=50&width=50",
      status: `${groupMembers.length} members`,
      lastMessage: {
        sender: "You",
        content: "Group created",
        time: "Just now",
      },
      members: [
        ...groupMembers,
        {
          id: user.id,
          name: user.name,
          image: user.image,
          status: user.status,
        },
      ],
      messages: [
        {
          id: 1,
          senderId: user.id,
          content: "Group created",
          time: "Just now",
        },
      ],
    }

    setGroups([newGroup, ...groups])
    setShowCreateGroupModal(false)
    setActiveTab("chats")
    setSelectedGroup(newGroup)
    setViewMode("chat")
  }

  // Handle adding a new friend
  const handleAddFriend = (username: string) => {
    // In a real app, this would send a friend request
    const newRequestId = friendRequests.length + 300 // Just for demo

    const newRequest: FriendRequest = {
      id: newRequestId,
      user: {
        id: newRequestId,
        name: username,
        image: "/placeholder.svg?height=50&width=50",
      },
      time: "Just now",
      type: "outgoing",
    }

    setFriendRequests([...friendRequests, newRequest])
    setShowAddFriendModal(false)
  }

  // Get all starred messages from all groups
  const getStarredMessages = (): { message: Message; group: Group }[] => {
    const starredMessages: { message: Message; group: Group }[] = []
    groups.forEach((group) => {
      group.messages.forEach((message) => {
        if (message.isStarred) {
          starredMessages.push({ message, group })
        }
      })
    })
    return starredMessages
  }

  // Get theme classes based on selected theme
  const getThemeClasses = (theme: "dark" | "purple" | "blue" | "green") => {
    switch (theme) {
      case "purple":
        return {
          bg: "bg-purple-900",
          sidebar: "bg-purple-800",
          accent: "bg-purple-600",
          hover: "hover:bg-purple-700",
          text: "text-purple-200",
          border: "border-purple-700",
        }
      case "blue":
        return {
          bg: "bg-blue-900",
          sidebar: "bg-blue-800",
          accent: "bg-blue-600",
          hover: "hover:bg-blue-700",
          text: "text-blue-200",
          border: "border-blue-700",
        }
      case "green":
        return {
          bg: "bg-green-900",
          sidebar: "bg-green-800",
          accent: "bg-green-600",
          hover: "hover:bg-green-700",
          text: "text-green-200",
          border: "border-green-700",
        }
      default:
        return {
          bg: "bg-gray-900",
          sidebar: "bg-gray-800",
          accent: "bg-purple-600",
          hover: "hover:bg-gray-700",
          text: "text-gray-200",
          border: "border-gray-700",
        }
    }
  }

  const themeClasses = getThemeClasses(currentTheme)

  // Count incoming friend requests
  const incomingRequestsCount = friendRequests.filter((req) => req.type === "incoming").length
  if (isConnecting) {
    return (
      <main className="flex items-center justify-center h-screen bg-black text-white">
        <div className="loader"></div>
      </main>
    )
  } 
  return (
    <main className={`flex h-screen ${themeClasses.bg} text-gray-100 transition-colors duration-700`}>
      {/* WhatsApp-style layout */}
      <div className="flex h-full w-full">
        {/* Navigation sidebar (narrow) - always visible */}
        <NavigationSidebar
          activeTab={activeTab}
          onTabChange={setActiveTab}
          user={user}
          onProfileClick={handleShowProfileUpdate}
          themeClasses={themeClasses}
          pendingRequestsCount={incomingRequestsCount}
        />

        {/* Chat list sidebar - always visible on desktop, can be hidden on mobile */}
        <div className={`w-80 h-full ${themeClasses.sidebar} border-r ${themeClasses.border} flex flex-col`}>
          {activeTab === "chats" && (
            <>
              {/* Header with user info and actions */}
              <div className={`px-4 py-3 flex items-center justify-between ${themeClasses.sidebar}`}>
                <div className="flex items-center">
                  <h2 className="text-lg font-medium text-gray-200 ml-3">Chats</h2>
                </div>
                <div className="flex items-center space-x-3">
                  <button
                    className={`p-2 rounded-full text-gray-400 ${themeClasses.hover}`}
                    onClick={() => setShowCreateGroupModal(true)}
                    title="Create Group"
                  >
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
                      <path d="M17 21v-2a4 4 0 0 0-4-4H5a4 4 0 0 0-4 4v2"></path>
                      <circle cx="9" cy="7" r="4"></circle>
                      <path d="M23 21v-2a4 4 0 0 0-3-3.87"></path>
                      <path d="M16 3.13a4 4 0 0 1 0 7.75"></path>
                      <line x1="19" y1="8" x2="23" y2="8"></line>
                      <line x1="21" y1="6" x2="21" y2="10"></line>
                    </svg>
                  </button>
                </div>
              </div>

              {/* Strong divider line between profile and search */}
              <div className={`h-px w-full ${themeClasses.border}`}></div>

              {/* Search bar */}
              <div className="px-3 py-2">
                <div className="relative">
                  <input
                    type="text"
                    placeholder="Search or start a new chat"
                    value={searchQuery}
                    onChange={(e) => setSearchQuery(e.target.value)}
                    className={`w-full pl-10 pr-3 py-2 text-sm bg-gray-700 border-0 rounded-lg focus:outline-none focus:ring-1 focus:ring-${
                      theme === "dark" ? "purple" : theme
                    }-500 text-gray-200 placeholder-gray-400`}
                  />
                  <svg
                    className="absolute left-3 top-2.5 h-5 w-5 text-gray-400"
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
              </div>

              {/* Groups list */}
              <GroupSidebar
                groups={groups.filter((group) =>
                  searchQuery
                    ? group.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
                      group.lastMessage.content.toLowerCase().includes(searchQuery.toLowerCase())
                    : true,
                )}
                onGroupClick={handleGroupClick}
                onGroupPhotoClick={handleGroupPhotoClick}
                selectedGroupId={selectedGroup?.id}
                themeClasses={themeClasses}
              />
            </>
          )}

          {activeTab === "friends" && (
            <FriendsSidebar
              friends={friends}
              onFriendClick={handleFriendClick}
              themeClasses={themeClasses}
              onAddFriend={() => setShowAddFriendModal(true)}
            />
          )}

          {activeTab === "requests" && (
            <FriendRequests
              requests={friendRequests}
              themeClasses={themeClasses}
              onAccept={handleAcceptFriendRequest}
              onReject={handleRejectFriendRequest}
              onAddFriend={() => setShowAddFriendModal(true)}
            />
          )}

          {activeTab === "starred" && (
            <StarredMessagesSidebar
              starredMessages={getStarredMessages()}
              themeClasses={themeClasses}
              onMessageClick={handleStarredMessageClick}
            />
          )}

          {activeTab === "settings" && (
            <SettingsPage user={user} theme={theme} onThemeChange={setTheme} themeClasses={themeClasses} />
          )}
        </div>

        {/* Right content area - chat or welcome screen */}
        <div className="flex-1 flex flex-col">
          {selectedGroup && viewMode === "chat" ? (
            <GroupChat
              group={selectedGroup}
              currentUser={user}
              themeClasses={themeClasses}
              highlightedMessageId={highlightedMessageId}
            />
          ) : selectedGroup && viewMode === "info" ? (
            <GroupInfo group={selectedGroup} themeClasses={themeClasses} />
          ) : (
            <div className={`flex-1 flex items-center justify-center ${themeClasses.bg}`}>
              <div className="text-center text-gray-400 p-4">
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  className="h-24 w-24 mx-auto mb-6 text-gray-600"
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
                <h3 className="text-xl font-medium mb-2 text-gray-300">Welcome to Messages</h3>
                <p className="text-gray-400 max-w-md mx-auto">
                  Send and receive messages without keeping your phone online.
                  <br />
                  Use on up to 4 linked devices and 1 phone at the same time.
                </p>
              </div>
            </div>
          )}
        </div>
      </div>

      {/* Profile update modal with animation */}
      {showProfileUpdate && (
        <div
          className={`fixed inset-0 bg-black bg-opacity-75 flex items-center justify-center z-50 transition-opacity duration-300 ${
            profileAnimation ? "opacity-100" : "opacity-0"
          }`}
        >
          <div
            className={`${themeClasses.sidebar} rounded-lg shadow-lg w-full max-w-md mx-4 transition-transform duration-300 transform ${
              profileAnimation ? "scale-100" : "scale-95"
            }`}
          >
            <ProfileUpdate
              user={user}
              onUpdate={handleProfileUpdate}
              onClose={() => {
                setProfileAnimation(false)
                setTimeout(() => {
                  setShowProfileUpdate(false)
                }, 300)
              }}
              themeClasses={themeClasses}
            />
          </div>
        </div>
      )}

      {/* Create Group Modal */}
      {showCreateGroupModal && (
        <div className="fixed inset-0 bg-black bg-opacity-75 flex items-center justify-center z-50">
          <div className={`${themeClasses.sidebar} rounded-lg shadow-lg w-full max-w-md mx-4`}>
            <CreateGroupModal
              friends={friends}
              onClose={() => setShowCreateGroupModal(false)}
              onCreateGroup={handleCreateGroup}
              themeClasses={themeClasses}
            />
          </div>
        </div>
      )}

      {/* Add Friend Modal */}
      {showAddFriendModal && (
        <div className="fixed inset-0 bg-black bg-opacity-75 flex items-center justify-center z-50">
          <div className={`${themeClasses.sidebar} rounded-lg shadow-lg w-full max-w-md mx-4`}>
            <AddFriendModal
              onClose={() => setShowAddFriendModal(false)}
              onAddFriend={handleAddFriend}
              themeClasses={themeClasses}
            />
          </div>
        </div>
      )}
    </main>
  )
}
