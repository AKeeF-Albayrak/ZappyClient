"use client"

import type React from "react"
import { useState } from "react"
import { Eye, EyeOff } from "lucide-react"

interface PasswordInputProps {
  id: string
  name: string
  label: string
  value: string
  onChange: (e: React.ChangeEvent<HTMLInputElement>) => void
  required?: boolean
  className?: string
}

export const PasswordInput: React.FC<PasswordInputProps> = ({
  id,
  name,
  label,
  value,
  onChange,
  required = false,
  className = "",
}) => {
  const [showPassword, setShowPassword] = useState(false)
  const [isFocused, setIsFocused] = useState(false)

  const togglePasswordVisibility = () => {
    setShowPassword(!showPassword)
  }

  const hasValue = value !== undefined && value !== ""
  const isFloating = isFocused || hasValue

  return (
    <div className={`relative ${className}`}>
      <input
        type={showPassword ? "text" : "password"}
        id={id}
        name={name}
        value={value}
        onChange={onChange}
        onFocus={() => setIsFocused(true)}
        onBlur={() => setIsFocused(false)}
        required={required}
        className="block w-full px-4 pt-6 pb-2 pr-12 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-purple-500 focus:border-transparent transition-all duration-300 ease-out peer"
        placeholder=" "
      />
      <label
        htmlFor={id}
        className={`
          absolute text-gray-500 duration-300 transform transition-all ease-out pointer-events-none
          ${isFloating ? "text-xs top-2 left-4 scale-90" : "text-base top-1/2 left-4 -translate-y-1/2"}
          ${isFocused ? "text-purple-500" : "text-gray-500"}
        `}
      >
        {label}
      </label>
      <button
        type="button"
        onClick={togglePasswordVisibility}
        className="absolute right-3 top-1/2 transform -translate-y-1/2 text-gray-400 hover:text-gray-600 transition-colors"
      >
        {showPassword ? <EyeOff className="w-5 h-5" /> : <Eye className="w-5 h-5" />}
      </button>
    </div>
  )
}
