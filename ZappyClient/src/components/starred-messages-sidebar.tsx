"use client"

import { Group, Message } from "../types/Index";


interface StarredMessagesSidebarProps {
  starredMessages: { message: Message; group: Group }[]
  themeClasses: {
    bg: string
    sidebar: string
    accent: string
    hover: string
    text: string
    border: string
  }
  onMessageClick: (groupId: number, messageId: number) => void
}

export default function StarredMessagesSidebar({
  starredMessages,
  themeClasses,
  onMessageClick,
}: StarredMessagesSidebarProps) {
  return (
    <div className="flex flex-col h-full">
      {/* Header */}
      <div className={`px-4 py-3 border-b ${themeClasses.border}`}>
        <div className="flex items-center">
          <svg
            xmlns="http://www.w3.org/2000/svg"
            className="h-5 w-5 text-yellow-400 mr-2"
            viewBox="0 0 20 20"
            fill="currentColor"
          >
            <path
              fillRule="evenodd"
              d="M10 2a1 1 0 01.894.553l2.447 4.969 5.476.796a1 1 0 01.554 1.705l-3.96 3.862.935 5.452a1 1 0 01-1.45 1.054L10 17.28l-4.896 2.575a1 1 0 01-1.45-1.054l.935-5.452-3.96-3.862a1 1 0 01.554-1.705l5.476-.796L9.106 2.553A1 1 0 0110 2z"
              clipRule="evenodd"
            />
          </svg>
          <h2 className="text-md font-medium text-gray-200">Starred Messages</h2>
        </div>
      </div>

      {/* Messages list */}
      <div className="flex-1 overflow-y-auto">
        {starredMessages.length > 0 ? (
          <div className="divide-y divide-gray-700">
            {starredMessages.map(({ message, group }) => {
              const sender = group.members.find((m) => m.id === message.senderId)

              return (
                <div
                  key={`${group.id}-${message.id}`}
                  className={`p-3 hover:bg-gray-750 cursor-pointer transition-colors duration-150 ${themeClasses.hover.replace("hover:", "")}`}
                  onClick={() => onMessageClick(group.id, message.id)}
                >
                  <div className="flex items-center mb-1">
                    <img
                      src={group.image || "/placeholder.svg"}
                      alt={group.name}
                      className="w-5 h-5 rounded-full mr-2 flex-shrink-0"
                    />
                    <span className="text-xs font-medium text-gray-400 truncate">{group.name}</span>
                    <span className="text-xs text-gray-500 ml-auto">{message.time}</span>
                  </div>
                  <div className="flex items-start mt-1">
                    <img
                      src={sender?.image || "/placeholder.svg"}
                      alt={sender?.name || "User"}
                      className="w-6 h-6 rounded-full mr-2 mt-0.5 flex-shrink-0"
                    />
                    <div className="flex-1 min-w-0">
                      <div className="flex items-center">
                        <span className="text-xs font-medium text-gray-300 truncate">{sender?.name}</span>
                        <svg
                          xmlns="http://www.w3.org/2000/svg"
                          className="h-3 w-3 text-yellow-400 ml-1 flex-shrink-0"
                          viewBox="0 0 20 20"
                          fill="currentColor"
                        >
                          <path
                            fillRule="evenodd"
                            d="M10 2a1 1 0 01.894.553l2.447 4.969 5.476.796a1 1 0 01.554 1.705l-3.96 3.862.935 5.452a1 1 0 01-1.45 1.054L10 17.28l-4.896 2.575a1 1 0 01-1.45-1.054l.935-5.452-3.96-3.862a1 1 0 01.554-1.705l5.476-.796L9.106 2.553A1 1 0 0110 2z"
                            clipRule="evenodd"
                          />
                        </svg>
                      </div>
                      <p className="text-sm text-gray-300 truncate mt-0.5">{message.content}</p>
                    </div>
                  </div>
                </div>
              )
            })}
          </div>
        ) : (
          <div className="flex flex-col items-center justify-center h-full p-4 text-gray-400">
            <svg
              xmlns="http://www.w3.org/2000/svg"
              className="h-12 w-12 mb-3 text-gray-600"
              viewBox="0 0 20 20"
              fill="currentColor"
            >
              <path
                fillRule="evenodd"
                d="M10 2a1 1 0 01.894.553l2.447 4.969 5.476.796a1 1 0 01.554 1.705l-3.96 3.862.935 5.452a1 1 0 01-1.45 1.054L10 17.28l-4.896 2.575a1 1 0 01-1.45-1.054l.935-5.452-3.96-3.862a1 1 0 01.554-1.705l5.476-.796L9.106 2.553A1 1 0 0110 2z"
                clipRule="evenodd"
              />
            </svg>
            <p className="text-sm">No starred messages</p>
            <p className="text-xs mt-1">Star important messages to find them here</p>
          </div>
        )}
      </div>
    </div>
  )
}
