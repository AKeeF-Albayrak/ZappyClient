import type { Group } from "../types/GroupTypes.ts"

interface GroupInfoProps {
  group: Group
}

export default function GroupInfo({ group }: GroupInfoProps) {
  return (
    <div className="flex flex-col h-full">
      {/* Group info header */}
      <div className="px-4 py-3 border-b border-gray-200">
        <h2 className="text-lg font-medium text-gray-900">Group Information</h2>
      </div>

      {/* Group details */}
      <div className="p-6 flex-1 overflow-y-auto">
        <div className="flex flex-col items-center mb-6">
          <img
            src={group.image || "/placeholder.svg"}
            alt={group.name}
            className="w-24 h-24 rounded-full object-cover border-2 border-purple-200"
          />
          <h3 className="mt-4 text-xl font-semibold text-gray-900">{group.name}</h3>
          <p className="text-sm text-gray-500">{group.status}</p>
        </div>

        <div className="bg-white rounded-lg shadow-sm border border-gray-200 overflow-hidden">
          <div className="px-4 py-3 bg-gray-50 border-b border-gray-200">
            <h4 className="text-sm font-medium text-gray-700">Members ({group.members.length})</h4>
          </div>
          <div className="divide-y divide-gray-100">
            {group.members.map((member) => (
              <div key={member.id} className="px-4 py-3 flex items-center">
                <div className="relative">
                  <img
                    src={member.image || "/placeholder.svg"}
                    alt={member.name}
                    className="w-10 h-10 rounded-full object-cover"
                  />
                  <span
                    className={`absolute bottom-0 right-0 w-2.5 h-2.5 rounded-full border-2 border-white ${
                      member.status === "online" ? "bg-green-500" : "bg-gray-300"
                    }`}
                  ></span>
                </div>
                <div className="ml-3">
                  <p className="text-sm font-medium text-gray-900">{member.name}</p>
                  <p className="text-xs text-gray-500 capitalize">{member.status}</p>
                </div>
              </div>
            ))}
          </div>
        </div>

        <div className="mt-6 bg-white rounded-lg shadow-sm border border-gray-200 overflow-hidden">
          <div className="px-4 py-3 bg-gray-50 border-b border-gray-200">
            <h4 className="text-sm font-medium text-gray-700">Group Actions</h4>
          </div>
          <div className="p-4 space-y-2">
            <button className="w-full py-2 px-4 bg-gray-100 hover:bg-gray-200 text-gray-800 rounded-md text-sm font-medium transition-colors">
              Add Members
            </button>
            <button className="w-full py-2 px-4 bg-gray-100 hover:bg-gray-200 text-gray-800 rounded-md text-sm font-medium transition-colors">
              Leave Group
            </button>
            <button className="w-full py-2 px-4 bg-red-50 hover:bg-red-100 text-red-600 rounded-md text-sm font-medium transition-colors">
              Report Group
            </button>
          </div>
        </div>
      </div>
    </div>
  )
}
