"use client"

import type React from "react"

import { useState } from "react"
import { X, UserPlus, Search } from "lucide-react"

interface AddFriendModalProps {
  onClose: () => void
  onAddFriend: (username: string) => void
  themeClasses: {
    bg: string
    sidebar: string
    accent: string
    hover: string
    text: string
    border: string
  }
}

export default function AddFriendModal({ onClose, onAddFriend, themeClasses }: AddFriendModalProps) {
  const [username, setUsername] = useState("")
  const [searchResults, setSearchResults] = useState<{ id: number; name: string; image: string }[]>([])
  const [isSearching, setIsSearching] = useState(false)

  const handleSearch = (e: React.FormEvent) => {
    e.preventDefault()
    if (!username.trim()) return

    setIsSearching(true)

    // Simulate search results - in a real app, this would be an API call
    setTimeout(() => {
      if (username.toLowerCase().includes("john")) {
        setSearchResults([
          {
            id: 101,
            name: "John Smith",
            image: "/placeholder.svg?height=50&width=50",
          },
          {
            id: 102,
            name: "Johnny Walker",
            image: "/placeholder.svg?height=50&width=50",
          },
        ])
      } else if (username.toLowerCase().includes("a")) {
        setSearchResults([
          {
            id: 103,
            name: "Alice Johnson",
            image: "/placeholder.svg?height=50&width=50",
          },
        ])
      } else {
        setSearchResults([])
      }
      setIsSearching(false)
    }, 1000)
  }

  return (
    <div className="p-6">
      <div className="flex justify-between items-center mb-6">
        <h2 className="text-xl font-semibold text-gray-200">Add Friend</h2>
        <button onClick={onClose} className="p-1 rounded-full hover:bg-gray-700 text-gray-400">
          <X size={20} />
        </button>
      </div>

      <form onSubmit={handleSearch}>
        <div className="mb-6">
          <label htmlFor="username" className="block text-sm font-medium text-gray-400 mb-1">
            Find by Username or Email
          </label>
          <div className="relative">
            <input
              type="text"
              id="username"
              value={username}
              onChange={(e) => setUsername(e.target.value)}
              className="w-full pl-10 pr-3 py-2 bg-gray-700 border border-gray-600 rounded-md text-gray-200 focus:outline-none focus:ring-2 focus:ring-purple-500"
              placeholder="Enter username or email"
            />
            <Search className="absolute left-3 top-2.5 h-5 w-5 text-gray-400" />
          </div>
          <p className="text-xs text-gray-400 mt-2">You can add friends by their username or email address.</p>
        </div>

        <button
          type="submit"
          disabled={!username.trim() || isSearching}
          className={`w-full py-2 rounded-md ${themeClasses.accent} text-white disabled:opacity-50 disabled:cursor-not-allowed flex items-center justify-center`}
        >
          {isSearching ? (
            <>
              <svg
                className="animate-spin -ml-1 mr-2 h-4 w-4 text-white"
                xmlns="http://www.w3.org/2000/svg"
                fill="none"
                viewBox="0 0 24 24"
              >
                <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
                <path
                  className="opacity-75"
                  fill="currentColor"
                  d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"
                ></path>
              </svg>
              Searching...
            </>
          ) : (
            <>
              <Search size={16} className="mr-2" />
              Search
            </>
          )}
        </button>
      </form>

      {/* Search results */}
      {searchResults.length > 0 && (
        <div className="mt-6">
          <h3 className="text-sm font-medium text-gray-400 mb-3">Search Results</h3>
          <div className="space-y-3">
            {searchResults.map((user) => (
              <div
                key={user.id}
                className={`p-3 rounded-lg ${themeClasses.bg} border ${themeClasses.border} flex items-center justify-between`}
              >
                <div className="flex items-center">
                  <img
                    src={user.image || "/placeholder.svg"}
                    alt={user.name}
                    className="w-10 h-10 rounded-full object-cover"
                  />
                  <span className="ml-3 text-gray-200">{user.name}</span>
                </div>
                <button
                  onClick={() => onAddFriend(user.name)}
                  className={`px-3 py-1.5 rounded-md ${themeClasses.accent} text-white hover:bg-opacity-90 flex items-center text-sm`}
                >
                  <UserPlus size={16} className="mr-1" />
                  Add
                </button>
              </div>
            ))}
          </div>
        </div>
      )}

      {username && searchResults.length === 0 && !isSearching && (
        <div className="mt-6 text-center py-6 text-gray-400 border border-gray-700 rounded-lg">
          <div className="flex justify-center mb-3">
            <UserPlus size={32} className="text-gray-500" />
          </div>
          <p className="text-sm">No users found with that username</p>
          <p className="text-xs mt-1">Try a different search term</p>
        </div>
      )}
    </div>
  )
}
