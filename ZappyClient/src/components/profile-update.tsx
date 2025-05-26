"use client"

import type React from "react"
import { useState } from "react"
import { X } from "lucide-react"
import { User } from "../types/Index"
import homeService from "../features/Home/homeService"

interface ProfileUpdateProps {
  user: User
  onUpdate: (user: User) => void
  onClose: () => void
  themeClasses: {
    bg: string
    sidebar: string
    accent: string
    hover: string
    text: string
    border: string
  }
}

export default function ProfileUpdate({ user, onUpdate, onClose, themeClasses }: ProfileUpdateProps) {
  const [name, setName] = useState(user.name)
  const [status, setStatus] = useState(user.status)
  const [statusMessage, setStatusMessage] = useState(user.statusMessage || "")
  const [image, setImage] = useState(user.image)

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    const updatedUser = {
      ...user,
      name,
      status,
      statusMessage,
      image,
    }
    
    try {
      // Backend'e kullanıcı güncellemesi gönder
      const updatedUserFromBackend = await homeService.updateUserProfile(updatedUser)
      onUpdate(updatedUserFromBackend)  // Güncellenen kullanıcıyı üst component'e gönder
    } catch (error) {
      console.error("Error updating profile", error)
    }
  }

  return (
    <div className="p-6">
      <div className="flex justify-between items-center mb-6">
        <h2 className="text-xl font-semibold text-gray-200">Update Profile</h2>
        <button onClick={onClose} className="p-1 rounded-full hover:bg-gray-700 text-gray-400">
          <X size={20} />
        </button>
      </div>

      <form onSubmit={handleSubmit}>
        {/* Profile image */}
        <div className="flex justify-center mb-6">
          <div className="relative">
            <img
              src={image || "/placeholder.svg"}
              alt={name}
              className="w-24 h-24 rounded-full object-cover border-4 border-gray-700"
            />
            <button
              type="button"
              className="absolute bottom-0 right-0 bg-gray-700 p-1.5 rounded-full border-2 border-gray-600 text-gray-300 hover:bg-gray-600"
            >
              <svg
                xmlns="http://www.w3.org/2000/svg"
                className="h-4 w-4"
                fill="none"
                viewBox="0 0 24 24"
                stroke="currentColor"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={2}
                  d="M3 9a2 2 0 012-2h.93a2 2 0 001.664-.89l.812-1.22A2 2 0 0110.07 4h3.86a2 2 0 011.664.89l.812 1.22A2 2 0 0018.07 7H19a2 2 0 012 2v9a2 2 0 01-2 2H5a2 2 0 01-2-2V9z"
                />
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={2}
                  d="M15 13a3 3 0 11-6 0 3 3 0 016 0z"
                />
              </svg>
            </button>
          </div>
        </div>

        {/* Name */}
        <div className="mb-4">
          <label htmlFor="name" className="block text-sm font-medium text-gray-400 mb-1">
            Name
          </label>
          <input
            type="text"
            id="name"
            value={name}
            onChange={(e) => setName(e.target.value)}
            className="w-full px-3 py-2 bg-gray-700 border border-gray-600 rounded-md text-gray-200 focus:outline-none focus:ring-2 focus:ring-purple-500"
          />
        </div>

        {/* Status */}
        <div className="mb-4">
          <label htmlFor="status" className="block text-sm font-medium text-gray-400 mb-1">
            Status
          </label>
          <select
            id="status"
            value={status}
            onChange={(e) => setStatus(e.target.value)}
            className="w-full px-3 py-2 bg-gray-700 border border-gray-600 rounded-md text-gray-200 focus:outline-none focus:ring-2 focus:ring-purple-500"
          >
            <option value="online">Online</option>
            <option value="away">Away</option>
            <option value="busy">Busy</option>
            <option value="offline">Offline</option>
          </select>
        </div>

        {/* Status Message */}
        <div className="mb-6">
          <label htmlFor="statusMessage" className="block text-sm font-medium text-gray-400 mb-1">
            Status Message
          </label>
          <input
            type="text"
            id="statusMessage"
            value={statusMessage}
            onChange={(e) => setStatusMessage(e.target.value)}
            placeholder="What's on your mind?"
            className="w-full px-3 py-2 bg-gray-700 border border-gray-600 rounded-md text-gray-200 focus:outline-none focus:ring-2 focus:ring-purple-500"
          />
        </div>

        {/* Submit button */}
        <div className="flex justify-end">
          <button
            type="button"
            onClick={onClose}
            className="px-4 py-2 mr-2 border border-gray-600 rounded-md text-gray-300 hover:bg-gray-700"
          >
            Cancel
          </button>
          <button type="submit" className={`px-4 py-2 rounded-md ${themeClasses.accent} text-white`}>
            Save Changes
          </button>
        </div>
      </form>
    </div>
  )
}
