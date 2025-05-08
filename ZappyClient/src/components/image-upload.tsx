"use client"

import type React from "react"

import { useState, useRef } from "react"
import { Upload, X } from "lucide-react"

interface ImageUploadProps {
  onImageUpload: (file: File | null) => void
  previewUrl: string | null
}

export function ImageUpload({ onImageUpload, previewUrl }: ImageUploadProps) {
  const [isDragging, setIsDragging] = useState(false)
  const fileInputRef = useRef<HTMLInputElement>(null)

  const handleDragOver = (e: React.DragEvent) => {
    e.preventDefault()
    setIsDragging(true)
  }

  const handleDragLeave = () => {
    setIsDragging(false)
  }

  const handleDrop = (e: React.DragEvent) => {
    e.preventDefault()
    setIsDragging(false)

    if (e.dataTransfer.files && e.dataTransfer.files[0]) {
      const file = e.dataTransfer.files[0]
      if (file.type.startsWith("image/")) {
        onImageUpload(file)
      }
    }
  }

  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files && e.target.files[0]) {
      onImageUpload(e.target.files[0])
    }
  }

  const handleRemoveImage = () => {
    onImageUpload(null)
    if (fileInputRef.current) {
      fileInputRef.current.value = ""
    }
  }

  const triggerFileInput = () => {
    fileInputRef.current?.click()
  }

  return (
    <div className="w-full">
      <p className="text-sm font-medium text-gray-700 mb-2">Profile Picture (optional)</p>

      {previewUrl ? (
        <div className="relative w-full h-40 rounded-lg overflow-hidden border border-gray-300">
          <img src={previewUrl || "/placeholder.svg"} alt="Profile preview" className="w-full h-full object-cover" />
          <button
            type="button"
            onClick={handleRemoveImage}
            className="absolute top-2 right-2 bg-white rounded-full p-1 shadow-md hover:bg-gray-100 transition-colors"
          >
            <X className="h-5 w-5 text-gray-700" />
          </button>
        </div>
      ) : (
        <div
          className={`
            w-full h-40 border-2 border-dashed rounded-lg
            flex flex-col items-center justify-center
            transition-colors duration-200 cursor-pointer
            ${
              isDragging
                ? "border-purple-500 bg-purple-50"
                : "border-gray-300 hover:border-purple-400 hover:bg-purple-50"
            }
          `}
          onDragOver={handleDragOver}
          onDragLeave={handleDragLeave}
          onDrop={handleDrop}
          onClick={triggerFileInput}
        >
          <Upload className="h-8 w-8 text-gray-400 mb-2" />
          <p className="text-sm text-gray-500">
            <span className="text-purple-600 font-medium">Click to upload</span> or drag and drop
          </p>
          <p className="text-xs text-gray-400 mt-1">PNG, JPG, GIF up to 10MB</p>
        </div>
      )}

      <input ref={fileInputRef} type="file" accept="image/*" onChange={handleFileChange} className="hidden" />
    </div>
  )
}
