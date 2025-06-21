export interface User {
  id: string
  name: string
  image: string
  status: string
  statusMessage?: string
}

export interface GroupsViewModel {
    groupId: string;
    groupPhoto: Uint8Array;
    lastMessage: LastMessageViewModel;
    groupName: string;
}

export interface LastMessageViewModel {
  id: string;
  content: string;
  senderName: string;
  isUser: boolean;
  time : string;
}

export interface GroupViewModel {
  id: string;
  name: string;
  groupPicture: Uint8Array;
  messages: MessageViewModel[];
  users: UserViewModel[];
  GroupReadStatuses: GroupReadStatusViewModel[];
}

export interface MessageViewModel {
  id: string;
  createdDate: string;
  senderUsername: string;
  isUser: boolean;
  isStarred: boolean;
  ContentType: MessageContentType;
  content: string;
  isPinned: boolean;
  repliedMessageId?: string;
}

export interface UserViewModel {
  username: string;
  profilePicture: Uint8Array;
  status: User_Status;
}

export interface GroupReadStatusViewModel {
  username: string;
  lastReadAt: string;
}

export interface StarredMessageViewModel {
  messageId: string;
  groupId: string;
  content: string;
  createdDate: string;
  senderUsername: string;
}

export interface FriendViewModel {
  username: string;
  image: Uint8Array;
  status: User_Status;
}

export enum MessageContentType {
  Text = "Text",
  Audio = "Audio",
  Picture = "Picture",
}

export enum User_Status {
  Offline = "Offline",
  Online = "Online",
  Away = "Away",
  Invisible = "Invisible",
  Idle = "Idle",
}

export enum FriendshipStatus {
  Pending = "Pending",
  Accepted = "Accepted",
  Declined = "Declined",
  Blocked = "Blocked",
}