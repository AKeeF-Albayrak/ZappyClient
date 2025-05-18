"use client"

import { User } from "../types/Index"

interface SettingsPageProps {
  user: User
  theme: "dark" | "purple" | "blue" | "green"
  onThemeChange: (theme: "dark" | "purple" | "blue" | "green") => void
  themeClasses: {
    bg: string
    sidebar: string
    accent: string
    hover: string
    text: string
    border: string
  }
}

export default function SettingsPage({ user, theme, onThemeChange, themeClasses }: SettingsPageProps) {
  return (
    <div className="flex flex-col h-full">
      {/* Header */}
      <div className={`px-4 py-3 border-b ${themeClasses.border}`}>
        <h2 className="text-md font-medium text-gray-200">Settings</h2>
      </div>

      {/* Settings content */}
      <div className="flex-1 overflow-y-auto p-4">
        <div className="space-y-6">
          {/* Theme settings */}
          <div>
            <h3 className="text-sm font-medium text-gray-300 mb-3">Theme</h3>
            <div className="grid grid-cols-2 gap-3">
              <button
                className={`p-3 rounded-lg flex items-center ${
                  theme === "dark" ? "ring-2 ring-purple-500" : "hover:bg-gray-750"
                } bg-gray-800`}
                onClick={() => onThemeChange("dark")}
              >
                <div className="w-5 h-5 rounded-full bg-gray-900 mr-2"></div>
                <span className="text-sm text-gray-200">Dark</span>
              </button>
              <button
                className={`p-3 rounded-lg flex items-center ${
                  theme === "purple" ? "ring-2 ring-purple-500" : "hover:bg-gray-750"
                } bg-gray-800`}
                onClick={() => onThemeChange("purple")}
              >
                <div className="w-5 h-5 rounded-full bg-purple-600 mr-2"></div>
                <span className="text-sm text-gray-200">Purple</span>
              </button>
              <button
                className={`p-3 rounded-lg flex items-center ${
                  theme === "blue" ? "ring-2 ring-blue-500" : "hover:bg-gray-750"
                } bg-gray-800`}
                onClick={() => onThemeChange("blue")}
              >
                <div className="w-5 h-5 rounded-full bg-blue-600 mr-2"></div>
                <span className="text-sm text-gray-200">Blue</span>
              </button>
              <button
                className={`p-3 rounded-lg flex items-center ${
                  theme === "green" ? "ring-2 ring-green-500" : "hover:bg-gray-750"
                } bg-gray-800`}
                onClick={() => onThemeChange("green")}
              >
                <div className="w-5 h-5 rounded-full bg-green-600 mr-2"></div>
                <span className="text-sm text-gray-200">Green</span>
              </button>
            </div>
          </div>

          {/* Notification settings */}
          <div>
            <h3 className="text-sm font-medium text-gray-300 mb-3">Notifications</h3>
            <div className="space-y-2">
              <div className="flex items-center justify-between p-3 bg-gray-800 rounded-lg">
                <span className="text-sm text-gray-200">Message notifications</span>
                <label className="relative inline-flex items-center cursor-pointer">
                  <input type="checkbox" className="sr-only peer" defaultChecked />
                  <div className="w-11 h-6 bg-gray-700 peer-focus:outline-none rounded-full peer peer-checked:after:translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-[2px] after:left-[2px] after:bg-white after:border-gray-300 after:border after:rounded-full after:h-5 after:w-5 after:transition-all peer-checked:bg-purple-600"></div>
                </label>
              </div>
              <div className="flex items-center justify-between p-3 bg-gray-800 rounded-lg">
                <span className="text-sm text-gray-200">Group notifications</span>
                <label className="relative inline-flex items-center cursor-pointer">
                  <input type="checkbox" className="sr-only peer" defaultChecked />
                  <div className="w-11 h-6 bg-gray-700 peer-focus:outline-none rounded-full peer peer-checked:after:translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-[2px] after:left-[2px] after:bg-white after:border-gray-300 after:border after:rounded-full after:h-5 after:w-5 after:transition-all peer-checked:bg-purple-600"></div>
                </label>
              </div>
              <div className="flex items-center justify-between p-3 bg-gray-800 rounded-lg">
                <span className="text-sm text-gray-200">Sound</span>
                <label className="relative inline-flex items-center cursor-pointer">
                  <input type="checkbox" className="sr-only peer" defaultChecked />
                  <div className="w-11 h-6 bg-gray-700 peer-focus:outline-none rounded-full peer peer-checked:after:translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-[2px] after:left-[2px] after:bg-white after:border-gray-300 after:border after:rounded-full after:h-5 after:w-5 after:transition-all peer-checked:bg-purple-600"></div>
                </label>
              </div>
            </div>
          </div>

          {/* Privacy settings */}
          <div>
            <h3 className="text-sm font-medium text-gray-300 mb-3">Privacy</h3>
            <div className="space-y-2">
              <div className="flex items-center justify-between p-3 bg-gray-800 rounded-lg">
                <span className="text-sm text-gray-200">Show read receipts</span>
                <label className="relative inline-flex items-center cursor-pointer">
                  <input type="checkbox" className="sr-only peer" defaultChecked />
                  <div className="w-11 h-6 bg-gray-700 peer-focus:outline-none rounded-full peer peer-checked:after:translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-[2px] after:left-[2px] after:bg-white after:border-gray-300 after:border after:rounded-full after:h-5 after:w-5 after:transition-all peer-checked:bg-purple-600"></div>
                </label>
              </div>
              <div className="flex items-center justify-between p-3 bg-gray-800 rounded-lg">
                <span className="text-sm text-gray-200">Show online status</span>
                <label className="relative inline-flex items-center cursor-pointer">
                  <input type="checkbox" className="sr-only peer" defaultChecked />
                  <div className="w-11 h-6 bg-gray-700 peer-focus:outline-none rounded-full peer peer-checked:after:translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-[2px] after:left-[2px] after:bg-white after:border-gray-300 after:border after:rounded-full after:h-5 after:w-5 after:transition-all peer-checked:bg-purple-600"></div>
                </label>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}
