"use client"

import { Group } from "../types/Index"



interface GroupInfoProps {
  group: Group
  themeClasses: {
    bg: string
    sidebar: string
    accent: string
    hover: string
    text: string
    border: string
  }
}

export default function GroupInfo({ group, themeClasses }: GroupInfoProps) {
  return (
    <div className="flex flex-col h-full">
      {/* Group header */}
      <div className={`px-4 py-3 border-b ${themeClasses.border} ${themeClasses.sidebar} flex items-center`}>
        <img src={group.image || "/placeholder.svg"} alt={group.name} className="w-10 h-10 rounded-full object-cover" />
        <div className="ml-3">
          <h2 className="text-lg font-medium text-gray-200">{group.name}</h2>
          <p className="text-sm text-gray-400">{group.status}</p>
        </div>
      </div>

      {/* Group info content */}
      <div className={`flex-1 p-4 overflow-y-auto ${themeClasses.bg}`}>
        <div className="max-w-lg mx-auto">
          {/* Group image */}
          <div className="flex justify-center mb-6">
            <img
              src={group.image || "/placeholder.svg"}
              alt={group.name}
              className="w-32 h-32 rounded-full object-cover border-4 border-gray-700"
            />
          </div>

          {/* Group name */}
          <h2 className="text-xl font-semibold text-center text-gray-200 mb-6">{group.name}</h2>

          {/* Group members */}
          <div className="mb-6">
            <h3 className="text-md font-medium text-gray-300 mb-3 flex items-center">
              <svg
                xmlns="http://www.w3.org/2000/svg"
                className="h-5 w-5 mr-2"
                fill="none"
                viewBox="0 0 24 24"
                stroke="currentColor"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={2}
                  d="M12 4.354a4 4 0 110 5.292M15 21H3v-1a6 6 0 0112 0v1zm0 0h6v-1a6 6 0 00-9-5.197M13 7a4 4 0 11-8 0 4 4 0 018 0z"
                />
              </svg>
              Members ({group.members.length})
            </h3>
            <div className="space-y-3">
              {group.members.map((member) => (
                <div key={member.id} className="flex items-center">
                  <div className="relative">
                    <img
                      src={member.image || "/placeholder.svg"}
                      alt={member.name}
                      className="w-10 h-10 rounded-full object-cover"
                    />
                    <span
                      className={`absolute bottom-0 right-0 w-2.5 h-2.5 rounded-full border-2 border-gray-900 ${
                        member.status === "online" ? "bg-green-500" : "bg-gray-400"
                      }`}
                    ></span>
                  </div>
                  <div className="ml-3">
                    <p className="text-sm font-medium text-gray-200">{member.name}</p>
                    <p className="text-xs text-gray-400">{member.status}</p>
                  </div>
                </div>
              ))}
            </div>
          </div>

          {/* Group actions */}
          <div className="flex justify-center space-x-4">
            <button className={`px-4 py-2 rounded-md ${themeClasses.accent} text-white flex items-center`}>
              <svg
                xmlns="http://www.w3.org/2000/svg"
                className="h-5 w-5 mr-2"
                fill="none"
                viewBox="0 0 24 24"
                stroke="currentColor"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={2}
                  d="M11 5H6a2 2 0 00-2 2v11a2 2 0 002 2h11a2 2 0 002-2v-5m-1.414-9.414a2 2 0 112.828 2.828L11.828 15H9v-2.828l8.586-8.586z"
                />
              </svg>
              Edit Group
            </button>
            <button className="px-4 py-2 rounded-md bg-red-600 text-white flex items-center">
              <svg
                xmlns="http://www.w3.org/2000/svg"
                className="h-5 w-5 mr-2"
                fill="none"
                viewBox="0 0 24 24"
                stroke="currentColor"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={2}
                  d="M17 16l4-4m0 0l-4-4m4 4H7m6 4v1a3 3 0 01-3 3H6a3 3 0 01-3-3V7a3 3 0 013-3h4a3 3 0 013 3v1"
                />
              </svg>
              Leave Group
            </button>
          </div>
        </div>
      </div>
    </div>
  )
}
