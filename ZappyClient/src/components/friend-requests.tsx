"use client"

import { UserPlus, UserCheck, UserX, ShieldBan } from "lucide-react"
import { FriendRequest } from "../types/Index"

interface FriendRequestsProps {
  requests: FriendRequest[];
  themeClasses: any;
  onAddFriend: () => void;
  onStatusChange: (requestId: string, status: "Accepted" | "Declined" | "Bloked") => void;
}

export default function FriendRequests({
  requests,
  themeClasses,
  onAddFriend,
  onStatusChange,
}: FriendRequestsProps) {
  const incomingRequests = requests.filter((req) => req.type === "incoming")
  const outgoingRequests = requests.filter((req) => req.type === "outgoing")

  return (
    <div className="flex-1 overflow-y-auto">
      {/* Header */}
      <div className={`px-4 py-3 border-b ${themeClasses.border}`}>
        <div className="flex items-center justify-between">
          <h2 className="text-lg font-medium text-gray-200">Friend Requests</h2>
          <button
            onClick={onAddFriend}
            className={`p-2 rounded-full ${themeClasses.hover} text-gray-300`}
            title="Add Friend"
          >
            <UserPlus size={20} />
          </button>
        </div>
      </div>

      {/* Incoming Requests */}
      <div className="p-4">
        <h3 className="text-sm font-medium text-gray-400 mb-3">Incoming Requests</h3>
        {incomingRequests.length > 0 ? (
          <div className="space-y-3">
            {incomingRequests.map((request) => (
              <div
                key={request.id}
                className={`p-3 rounded-lg ${themeClasses.bg} border ${themeClasses.border}`}
              >
                <div className="flex items-center">
                  <img
                    src={request.user.image || "/placeholder.svg"}
                    alt={request.user.name}
                    className="w-12 h-12 rounded-full object-cover"
                  />
                  <div className="ml-3 flex-1">
                    <h4 className="text-sm font-medium text-gray-200">{request.user.name}</h4>
                    {request.mutualFriends && (
                      <p className="text-xs text-gray-400">{request.mutualFriends} mutual friends</p>
                    )}
                    <p className="text-xs text-gray-500 mt-1">{request.time}</p>
                  </div>
                </div>
                <div className="flex justify-end mt-3 space-x-2">
                  <button
                    onClick={() => onStatusChange(request.id, "Declined")}
                    className="px-3 py-1.5 rounded-md bg-gray-700 text-gray-300 hover:bg-gray-600 flex items-center text-sm"
                  >
                    <UserX size={16} className="mr-1" />
                    Reject
                  </button>
                  <button
                    onClick={() => onStatusChange(request.id, "Bloked")}
                    className="px-3 py-1.5 rounded-md bg-red-700 text-white hover:bg-red-600 flex items-center text-sm"
                  >
                    <ShieldBan size={16} className="mr-1" />
                    Block
                  </button>
                  <button
                    onClick={() => onStatusChange(request.id, "Accepted")}
                    className={`px-3 py-1.5 rounded-md ${themeClasses.accent} text-white hover:bg-opacity-90 flex items-center text-sm`}
                  >
                    <UserCheck size={16} className="mr-1" />
                    Accept
                  </button>
                </div>
              </div>
            ))}
          </div>
        ) : (
          <div className="text-center py-6 text-gray-400">
            <div className="flex justify-center mb-3">
              <UserPlus size={32} className="text-gray-500" />
            </div>
            <p className="text-sm">No incoming friend requests</p>
          </div>
        )}
      </div>

      {/* Outgoing Requests */}
      <div className="p-4 border-t border-gray-700">
        <h3 className="text-sm font-medium text-gray-400 mb-3">Outgoing Requests</h3>
        {outgoingRequests.length > 0 ? (
          <div className="space-y-3">
            {outgoingRequests.map((request) => (
              <div
                key={request.id}
                className={`p-3 rounded-lg ${themeClasses.bg} border ${themeClasses.border}`}
              >
                <div className="flex items-center">
                  <img
                    src={request.user.image || "/placeholder.svg"}
                    alt={request.user.name}
                    className="w-12 h-12 rounded-full object-cover"
                  />
                  <div className="ml-3 flex-1">
                    <h4 className="text-sm font-medium text-gray-200">{request.user.name}</h4>
                    <p className="text-xs text-gray-500 mt-1">{request.time}</p>
                  </div>
                </div>
                <div className="flex justify-end mt-3">
                  <button
                    onClick={() => onStatusChange(request.id, "Declined")}
                    className="px-3 py-1.5 rounded-md bg-gray-700 text-gray-300 hover:bg-gray-600 flex items-center text-sm"
                  >
                    <UserX size={16} className="mr-1" />
                    Cancel Request
                  </button>
                </div>
              </div>
            ))}
          </div>
        ) : (
          <div className="text-center py-6 text-gray-400">
            <p className="text-sm">No outgoing friend requests</p>
          </div>
        )}
      </div>
    </div>
  );
}
