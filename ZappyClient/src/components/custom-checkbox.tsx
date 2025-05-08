"use client"
import { Check } from "lucide-react"

interface CustomCheckboxProps {
  id: string
  label: string
  checked: boolean
  onChange: () => void
}

export function CustomCheckbox({ id, label, checked, onChange }: CustomCheckboxProps) {
  return (
    <div className="flex items-center">
      <div className="relative flex items-center">
        <input
          type="checkbox"
          id={id}
          checked={checked}
          onChange={onChange}
          className="sr-only" // Hide the actual input but keep it accessible
        />
        <div
          className={`
            w-5 h-5 rounded 
            border-2 transition-all duration-300 ease-out
            flex items-center justify-center
            ${checked ? "bg-purple-600 border-purple-600" : "border-gray-300 bg-white"}
          `}
          onClick={onChange}
        >
          <Check
            className={`
              h-3.5 w-3.5 text-white 
              transition-all duration-300
              ${checked ? "opacity-100 scale-100" : "opacity-0 scale-0"}
            `}
          />
        </div>
        <label htmlFor={id} className="ml-2 text-sm text-gray-600 cursor-pointer">
          {label}
        </label>
      </div>
    </div>
  )
}
