export interface Member {
  id: number
  name: string
  image: string
  status: "online" | "offline"
}

export interface Message {
  id: number
  senderId: number
  content: string
  time: string
}

export interface LastMessage {
  sender: string
  content: string
  time: string
}

export interface Group {
  id: number
  name: string
  image: string
  status: string
  lastMessage: LastMessage
  members: Member[]
  messages: Message[]
}
