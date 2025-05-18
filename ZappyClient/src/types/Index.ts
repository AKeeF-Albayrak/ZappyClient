export interface User {
  id: number
  name: string
  image: string
  status: string
  statusMessage?: string
}

export interface Message {
  id: number
  senderId: number
  content: string
  time: string
  isStarred?: boolean
}

export interface Group {
  id: number
  name: string
  image: string
  status: string
  lastMessage: {
    sender: string
    content: string
    time: string
  }
  members: {
    id: number
    name: string
    image: string
    status: string
  }[]
  messages: Message[]
}

export interface Friend {
  id: number
  name: string
  image: string
  status: string
  lastMessage?: {
    content: string
    time: string
    isOutgoing: boolean
  }
}

export interface FriendRequest {
  id: number
  user: {
    id: number
    name: string
    image: string
  }
  time: string
  type: "incoming" | "outgoing"
  mutualFriends?: number
}
