"use client"

import type React from "react"
import { useRef } from "react"
import { Camera, User, Plus } from "lucide-react"

interface CircularImageUploadProps {
  onImageUpload: (file: File | null) => void
  previewUrl: string | null
}

export const CircularImageUpload: React.FC<CircularImageUploadProps> = ({ onImageUpload, previewUrl }) => {
  const fileInputRef = useRef<HTMLInputElement>(null)

  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0] || null
    onImageUpload(file)
  }

  const handleClick = () => {
    fileInputRef.current?.click()
  }

  return (
    <div className="relative animate-fade-in-up animation-delay-100">
      <div className="text-center mb-2">
        <p className="text-sm text-gray-600 font-medium">Profile Photo</p>
        <p className="text-xs text-gray-400">Click to upload your photo</p>
      </div>

      <div
        onClick={handleClick}
        className="w-32 h-32 rounded-full border-3 border-dashed border-purple-300 flex items-center justify-center cursor-pointer hover:border-purple-500 transition-all duration-300 bg-purple-50 hover:bg-purple-100 overflow-hidden shadow-lg hover:shadow-xl transform hover:scale-105"
      >
        {previewUrl ? (
          <img
            src={previewUrl || "/placeholder.svg"}
            alt="Profile preview"
            className="w-full h-full object-cover rounded-full"
          />
        ) : (
          <div className="flex flex-col items-center">
            <div className="w-12 h-12 bg-purple-200 rounded-full flex items-center justify-center mb-2">
              <User className="w-6 h-6 text-purple-600" />
            </div>
            <Plus className="w-5 h-5 text-purple-500 mb-1" />
            <span className="text-xs text-purple-600 font-medium">Add Photo</span>
          </div>
        )}
      </div>

      {previewUrl && (
        <button
          type="button"
          onClick={handleClick}
          className="absolute -bottom-2 -right-2 w-10 h-10 bg-purple-600 rounded-full flex items-center justify-center hover:bg-purple-700 transition-colors shadow-lg border-2 border-white"
        >
          <Camera className="w-5 h-5 text-white" />
        </button>
      )}

      <input ref={fileInputRef} type="file" accept="image/*" onChange={handleFileChange} className="hidden" />
    </div>
  )
}
