"use client"

import { MessageSquare, Star, Settings, Users, UserPlus } from "lucide-react"
import { User } from "../types/Index"
import homeService from "../features/Home/homeService" 

interface NavigationSidebarProps {
  activeTab: "chats" | "settings" | "starred" | "friends" | "requests"
  onTabChange: (tab: "chats" | "settings" | "starred" | "friends" | "requests") => void
  user: User
  onProfileClick: () => void
  themeClasses: {
    bg: string
    sidebar: string
    accent: string
    hover: string
    text: string
    border: string
  }
  pendingRequestsCount?: number
}

export default function NavigationSidebar({
  activeTab,
  onTabChange,
  user,
  onProfileClick,
  themeClasses,
  pendingRequestsCount = 0,
}: NavigationSidebarProps) {
  // Logout handler
  const handleLogout = async () => {
    try {
      await homeService.logout(); // Calling the logout service method
      window.location.href = "/login"; // Redirect to login page after logout
    } catch (error) {
      console.error("Logout failed", error);
    }
  };

  return (
    <div
      className={`w-16 ${themeClasses.bg} flex flex-col items-center border-r ${themeClasses.border} transition-all duration-300 z-20`}
    >
      {/* User profile */}
      <div className={`w-full py-5 flex justify-center`}>
        <div className="relative cursor-pointer" onClick={onProfileClick}>
          <img src={user.image || "/placeholder.svg"} alt="Profile" className="w-8 h-8 rounded-full" />
          <span
            className={`absolute bottom-0 right-0 w-2.5 h-2.5 rounded-full border-2 border-gray-900 ${
              user.status === "online"
                ? "bg-green-500"
                : user.status === "busy"
                ? "bg-red-500"
                : user.status === "away"
                ? "bg-yellow-500"
                : "bg-gray-400"
            }`}
          ></span>
        </div>
      </div>

      <div className={`w-full border-t ${themeClasses.border}`}></div>

      {/* Navigation icons */}
      <div className="flex-1 w-full py-4 flex flex-col items-center space-y-6">
        <button
          className={`p-2 rounded-full relative ${
            activeTab === "chats" ? themeClasses.accent + " text-white" : "text-gray-400 " + themeClasses.hover
          }`}
          onClick={() => onTabChange("chats")}
        >
          <MessageSquare size={20} />
          {activeTab === "chats" && <span className="absolute top-0 right-0 w-2 h-2 bg-white rounded-full"></span>}
        </button>

        <button
          className={`p-2 rounded-full relative ${
            activeTab === "friends" ? themeClasses.accent + " text-white" : "text-gray-400 " + themeClasses.hover
          }`}
          onClick={() => onTabChange("friends")}
        >
          <Users size={20} />
          {activeTab === "friends" && <span className="absolute top-0 right-0 w-2 h-2 bg-white rounded-full"></span>}
        </button>

        <button
          className={`p-2 rounded-full relative ${
            activeTab === "requests" ? themeClasses.accent + " text-white" : "text-gray-400 " + themeClasses.hover
          }`}
          onClick={() => onTabChange("requests")}
        >
          <UserPlus size={20} />
          {activeTab === "requests" && <span className="absolute top-0 right-0 w-2 h-2 bg-white rounded-full"></span>}
          {pendingRequestsCount > 0 && (
            <span className="absolute -top-1 -right-1 bg-red-500 text-white text-xs rounded-full w-5 h-5 flex items-center justify-center">
              {pendingRequestsCount}
            </span>
          )}
        </button>

        <button
          className={`p-2 rounded-full relative ${
            activeTab === "starred" ? themeClasses.accent + " text-white" : "text-gray-400 " + themeClasses.hover
          }`}
          onClick={() => onTabChange("starred")}
        >
          <Star size={20} />
          {activeTab === "starred" && <span className="absolute top-0 right-0 w-2 h-2 bg-white rounded-full"></span>}
        </button>
      </div>

      {/* Bottom menu items */}
      <div className={`w-full py-4 flex flex-col items-center space-y-6 border-t ${themeClasses.border}`}>
        <button
          className={`p-2 rounded-full relative ${
            activeTab === "settings" ? themeClasses.accent + " text-white" : "text-gray-400 " + themeClasses.hover
          }`}
          onClick={() => onTabChange("settings")}
        >
          <Settings size={20} />
          {activeTab === "settings" && <span className="absolute top-0 right-0 w-2 h-2 bg-white rounded-full"></span>}
        </button>

        {/* Logout button */}
        <button onClick={handleLogout} className={`p-2 rounded-full text-gray-400 ${themeClasses.hover}`} title="Logout">
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
            <path d="M9 21H5a2 2 0 0 1-2-2V5a2 2 0 0 1 2-2h4"></path>
            <polyline points="16 17 21 12 16 7"></polyline>
            <line x1="21" y1="12" x2="9" y2="12"></line>
          </svg>
        </button>
      </div>
    </div>
  )
}
