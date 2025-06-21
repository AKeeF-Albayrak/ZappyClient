"use client"

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
import CreateGroupModal from "../../components/create-group-modal"
import AddFriendModal from "../../components/add-friend-modal"
import { User} from "../../types/Index"
import connection from "../../utils/signalrClient"
import { useHome } from "./useHome"
import { addFriend } from "./homeService"
import friendRequests from "../../components/friend-requests"


export default function Home() {
  const [searchQuery, setSearchQuery] = useState("")
  const [activeTab, setActiveTab] = useState<"chats" | "settings" | "starred" | "friends" | "requests">("chats")
  const [showProfileUpdate, setShowProfileUpdate] = useState(false)
  const [theme, setTheme] = useState<"dark" | "purple" | "blue" | "green">("dark")
  const [currentTheme, setCurrentTheme] = useState<"dark" | "purple" | "blue" | "green">("dark")
  const [profileAnimation, setProfileAnimation] = useState(false)
  const [showCreateGroupModal, setShowCreateGroupModal] = useState(false)
  const [showAddFriendModal, setShowAddFriendModal] = useState(false)
  const [isConnected, setIsConnected] = useState(false)
  const [isConnecting, setIsConnecting] = useState(true)
  const {
    groups,
    friends,
    //friendRequests,
    user,
    selectedGroup,
    viewMode,
    highlightedMessageId,
    starredMessages,
    selectedFriendUsername,
    //addFriend,
    //updateFriendRequest,
    groupClick,
    addFriend,
    createGroup,
    starredClick,
    profileUpdate,
    setSelectedGroup,
    setViewMode,
    getStarredMessages,
    handleFriendClick,
    //handleGroupPhotoClick,
  } = useHome();

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
  const handleGroupClick = async (groupId: string) => {
    await groupClick(groupId);
  };

  // Handle updating user profile
  const handleProfileUpdate = (updatedUser: User) => {
    profileUpdate(updatedUser);
    setShowProfileUpdate(false);
  };

  // Handle showing profile update modal with animation
  const handleShowProfileUpdate = () => {
    setShowProfileUpdate(true)
    setTimeout(() => {
      setProfileAnimation(true)
    }, 50)
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

  //const incomingRequestsCount = friendRequests.filter((req) => req.type === "incoming").length

  if (isConnecting) {
    return (
      <main className="flex items-center justify-center h-screen bg-black text-white">
        <div className="loader"></div>
      </main>
    )
  }

  if (!user) {
  return (
    <main className="flex items-center justify-center h-screen bg-black text-white">
      <div className="animate-pulse">Loading user...</div>
    </main>
  );
}


  return (
    <main className={`flex h-screen ${themeClasses.bg} text-gray-100 transition-colors duration-700`}>
      <div className="flex h-full w-full">
        <NavigationSidebar
          activeTab={activeTab}
          onTabChange={setActiveTab}
          user={user}
          onProfileClick={handleShowProfileUpdate}
          themeClasses={themeClasses}
          pendingRequestsCount={5} // Replace with actual count from friendRequests
        />

        <div className={`w-80 h-full ${themeClasses.sidebar} border-r ${themeClasses.border} flex flex-col`}>
          {activeTab === "chats" && (
            <>
              <GroupSidebar
                  groups={
                  groups.filter((group) => {
                    if (!searchQuery) return true;

                    const nameMatch = group.groupName.toLowerCase().includes(searchQuery.toLowerCase());
                    const messageContent = group.lastMessage?.content?.toLowerCase() || "";
                    return nameMatch || messageContent.includes(searchQuery.toLowerCase());
                  })
                }
                onGroupClick={handleGroupClick}
                //onGroupPhotoClick={handleGroupPhotoClick}
                selectedGroupId={selectedGroup?.id}
                themeClasses={themeClasses}
              />
            </>
          )}

          {activeTab === "friends" && (
            <FriendsSidebar
              friends={friends}
              onFriendClick={handleFriendClick}
              selectedFriendUsername={selectedFriendUsername ?? ""}
              themeClasses={themeClasses}
              onAddFriend={() => setShowAddFriendModal(true)}
            />
          )}

          {/*activeTab === "requests" && (
            <FriendRequests
              requests={friendRequests}
              themeClasses={themeClasses}
              onStatusChange={(id, status) => updateFriendRequest(id, status)}
              onAddFriend={() => setShowAddFriendModal(true)}
            />
          )*/}

          {activeTab === "starred" && (
            <StarredMessagesSidebar
              starredMessages={starredMessages}
              themeClasses={themeClasses}
              onMessageClick={starredClick}
            />
          )}

          {activeTab === "settings" && (
            <SettingsPage user={user} theme={theme} onThemeChange={setTheme} themeClasses={themeClasses} />
          )}
        </div>

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

      {showCreateGroupModal && (
        <div className="fixed inset-0 bg-black bg-opacity-75 flex items-center justify-center z-50">
          <div className={`${themeClasses.sidebar} rounded-lg shadow-lg w-full max-w-md mx-4`}>
            <CreateGroupModal
              friends={friends}
              onClose={() => setShowCreateGroupModal(false)}
              onCreateGroup={createGroup}
              themeClasses={themeClasses}
            />
          </div>
        </div>
      )}

      {showAddFriendModal && (
        <div className="fixed inset-0 bg-black bg-opacity-75 flex items-center justify-center z-50">
          <div className={`${themeClasses.sidebar} rounded-lg shadow-lg w-full max-w-md mx-4`}>
            <AddFriendModal
              onClose={() => setShowAddFriendModal(false)}
              onAddFriend={addFriend}
              themeClasses={themeClasses}
            />
          </div>
        </div>
      )}
    </main>
  )
}
