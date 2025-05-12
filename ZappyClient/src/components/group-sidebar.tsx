"use client"

import type React from "react"
import type { Group } from "../types/GroupTypes.ts"

interface GroupSidebarProps {
  groups: Group[]
  onGroupClick: (group: Group) => void
  onGroupPhotoClick: (group: Group, e: React.MouseEvent) => void
  selectedGroupId?: number
}

export default function GroupSidebar({ groups, onGroupClick, onGroupPhotoClick, selectedGroupId }: GroupSidebarProps) {
  return (
    <div className="flex-1 overflow-y-auto">
      {groups.map((group) => (
        <div
          key={group.id}
          onClick={() => onGroupClick(group)}
          className={`p-3 border-b border-gray-100 flex items-center cursor-pointer hover:bg-gray-50 transition-colors ${
            selectedGroupId === group.id ? "bg-purple-50" : ""
          }`}
        >
          <div className="relative" onClick={(e) => onGroupPhotoClick(group, e)}>
            <img
              src={group.image || "/placeholder.svg"}
              alt={group.name}
              className="w-12 h-12 rounded-full object-cover border border-gray-200"
            />
            <span className="absolute bottom-0 right-0 w-3 h-3 bg-green-500 rounded-full border-2 border-white"></span>
          </div>
          <div className="ml-3 flex-1 min-w-0">
            <div className="flex justify-between items-center">
              <h3 className="text-sm font-medium text-gray-900 truncate">{group.name}</h3>
              <span className="text-xs text-gray-500">{group.lastMessage.time}</span>
            </div>
            <div className="flex justify-between items-center mt-1">
              <p className="text-xs text-gray-500 truncate">
                <span className="font-medium">{group.lastMessage.sender}:</span> {group.lastMessage.content}
              </p>
              <span className="inline-flex items-center justify-center w-5 h-5 text-xs font-medium text-white bg-purple-600 rounded-full">
                2
              </span>
            </div>
          </div>
        </div>
      ))}
    </div>
  )
}
