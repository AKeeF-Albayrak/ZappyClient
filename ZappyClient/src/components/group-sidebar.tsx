"use client"

import type React from "react"
import { GroupsViewModel } from "../types/Index"


interface GroupSidebarProps {
  groups: GroupsViewModel[]
  onGroupClick: (groupId: string) => void
  onGroupPhotoClick: (group: GroupsViewModel, e: React.MouseEvent) => void
  selectedGroupId?: string
  themeClasses: {
    bg: string
    sidebar: string
    accent: string
    hover: string
    text: string
    border: string
  }
}

export default function GroupSidebar({
  groups,
  onGroupClick,
  onGroupPhotoClick,
  selectedGroupId,
  themeClasses,
}: GroupSidebarProps) {
  return (
    <div className="flex-1 overflow-y-auto">
      {/* Divider line between profile and messages */}
      <div className={`h-px w-full ${themeClasses.border}`}></div>

      <div className="divide-y divide-gray-700">
        {groups.map((group) => (
  <div
    key={group.groupId}
    className={`p-3 flex items-center cursor-pointer transition-colors ${
      selectedGroupId === group.groupId ? themeClasses.accent : themeClasses.hover
    }`}
    onClick={() => onGroupClick(group.groupId)}
  >
    <div className="relative" onClick={(e) => onGroupPhotoClick(group, e)}>
      <img
        src={/*group.groupPhoto ||*/ "/placeholder.svg"}
        alt={group.groupName}
        className="w-12 h-12 rounded-full object-cover"
      />
    </div>
    <div className="ml-3 flex-1 min-w-0">
      <div className="flex justify-between items-center">
        <h3 className="text-sm font-medium text-gray-200 truncate">{group.groupName}</h3>
        <span className="text-xs text-gray-400">{group.lastMessage.createdDate}</span>
      </div>
      <div className="flex items-center mt-1">
        <p className="text-xs text-gray-400 truncate">
          <span className="font-medium">{group.lastMessage.senderName}: </span>
          {group.lastMessage.encryptedContent}
        </p>
      </div>
    </div>
  </div>
))}


      </div>
    </div>
  )
}
