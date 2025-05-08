"use client"

import { useState, type InputHTMLAttributes } from "react"

interface FloatingLabelInputProps extends InputHTMLAttributes<HTMLInputElement> {
  label: string
  id: string
}

export function FloatingLabelInput({
  label,
  id,
  value,
  onChange,
  type = "text",
  required,
  ...props
}: FloatingLabelInputProps) {
  const [isFocused, setIsFocused] = useState(false)

  // Check if the input has a value
  const hasValue = value !== undefined && value !== ""

  // Determine if the label should be floating
  const isFloating = isFocused || hasValue

  return (
    <div className="relative">
      <input
        id={id}
        type={type}
        value={value}
        onChange={onChange}
        required={required}
        className={`
          block w-full px-4 pt-6 pb-2 
          border border-gray-300 rounded-lg
          focus:outline-none focus:ring-2 focus:ring-purple-500 focus:border-transparent
          transition-all duration-300 ease-out
          peer
        `}
        placeholder=" "
        onFocus={() => setIsFocused(true)}
        onBlur={() => setIsFocused(false)}
        {...props}
      />
      <label
        htmlFor={id}
        className={`
          absolute text-gray-500
          duration-300 transform transition-all ease-out
          ${isFloating ? "text-xs top-2 left-4 scale-90" : "text-base top-1/2 left-4 -translate-y-1/2"}
          ${isFocused ? "text-purple-500" : "text-gray-500"}
          pointer-events-none
        `}
      >
        {label}
      </label>
    </div>
  )
}
