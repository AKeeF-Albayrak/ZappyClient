"use client"

import { useState, type InputHTMLAttributes, type TextareaHTMLAttributes } from "react"

type InputProps = InputHTMLAttributes<HTMLInputElement> & {
  multiline?: false
  label: string
  id: string
}

type TextAreaProps = TextareaHTMLAttributes<HTMLTextAreaElement> & {
  multiline: true
  label: string
  id: string
}

type FloatingLabelInputProps = InputProps | TextAreaProps


export function FloatingLabelInput({
  label,
  id,
  value,
  onChange,
  multiline,
  ...props
}: FloatingLabelInputProps) {
  const [isFocused, setIsFocused] = useState(false)

  const hasValue = value !== undefined && value !== ""
  const isFloating = isFocused || hasValue

  const commonProps = {
    id,
    value,
    onChange,
    onFocus: () => setIsFocused(true),
    onBlur: () => setIsFocused(false),
    className: `
      block w-full px-4 pt-6 pb-2
      border border-gray-300 rounded-lg
      focus:outline-none focus:ring-2 focus:ring-purple-500 focus:border-transparent
      transition-all duration-300 ease-out
      peer
    `,
    placeholder: " ",
    ...props,
  }

  return (
    <div className="relative">
      {multiline ? (
        <textarea {...(commonProps as TextareaHTMLAttributes<HTMLTextAreaElement>)} />
      ) : (
        <input type={(props as InputProps).type ?? "text"} {...(commonProps as InputHTMLAttributes<HTMLInputElement>)} />
      )}

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
