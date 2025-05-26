import { useEffect, useState } from "react";
import homeService from "./homeService";
import { getUserIdFromToken } from "../../utils/jwtUtils";
import {
  User_Status,
  //FriendshipStatus,
  GroupsViewModel,
  //FriendRequest,
  GroupViewModel,
  FriendViewModel,
  FriendshipStatus,
} from "../../types/Index";
import { GetGroupResponse } from "./homeTypes";

export const useHome = () => {
  const [groups, setGroups] = useState<GroupsViewModel[]>([]);
  const [friends, setFriends] = useState<FriendViewModel[]>([]);
  //const [friendRequests, setFriendRequests] = useState<FriendRequest[]>([]);
  const [user, setUser] = useState<{ status: User_Status; statusMessage: string } | null>(null);
  const [selectedGroup, setSelectedGroup] = useState<GroupViewModel | null>(null);
  const [viewMode, setViewMode] = useState<"chat" | "info" | null>(null);
  const [highlightedMessageId, setHighlightedMessageId] = useState<string | null>(null);

  const userId = getUserIdFromToken();
  if (!userId) throw new Error("User ID not found in token");

  useEffect(() => {
    const loadData = async () => {
      const groupResponse = await homeService.fetchGroups({ userId });
      if (groupResponse.succeeded) setGroups(groupResponse.groups);

      const fetchedFriendsResponse = await homeService.fetchFriends({ status: FriendshipStatus.Accepted });
      if(fetchedFriendsResponse.succeeded) setFriends(fetchedFriendsResponse.friends);

    };

    loadData();
  }, [userId]);

  const handleAddFriend = async (username: string) => {
    const response = await homeService.addFriend({ username });
    if (response.succeeded) {
      const updatedFriends = await homeService.fetchFriends({ status: FriendshipStatus.Accepted });
      if(updatedFriends.succeeded)setFriends(updatedFriends.friends);
    }
  };

  const handleUpdateFriendRequest = async (Id: string, status: FriendshipStatus) => {
    const response = await homeService.updateFriendRequest({ Id, status });
    if (response.succeeded) {
      const updatedFriends = await homeService.fetchFriends({ status: FriendshipStatus.Accepted });
      if(updatedFriends.succeeded)setFriends(updatedFriends.friends);
    }
  };

  const handleFetchGroupDetails = async (groupId: string): Promise<GetGroupResponse | null> => {
    try {
      const response = await homeService.fetchGroupDetails({ groupId });
      return response.succeeded ? response : null;
    } catch {
      return null;
    }
  };

  const handleGroupClick = async (groupId: string) => {
    setHighlightedMessageId(null);

    const groupDetails = await handleFetchGroupDetails(groupId);
    if (!groupDetails || !groupDetails.group) return;

    const detailed = groupDetails.group;

    const formattedGroup: GroupViewModel = {
      id: detailed.id,
      name: detailed.name,
      groupPicture: detailed.groupPicture,
      users: detailed.users.map((u) => ({
        username: u.username,
        profilePicture: u.profilePicture,
        isOnline: u.isOnline,
      })),
      messages: detailed.messages.map((m) => ({
        id: m.id,
        createdDate: m.createdDate,
        senderUsername: m.senderUsername,
        isUser: m.isUser,
        isStarred: m.isStarred,
        ContentType: m.ContentType,
        content: m.content,
        isPinned: m.isPinned,
        repliedMessageId: m.repliedMessageId,
      })),
      GroupReadStatuses: detailed.GroupReadStatuses.map((r) => ({
        username: r.username,
        lastReadAt: r.lastReadAt,
      })),
    };

    setSelectedGroup(formattedGroup);
    setViewMode("chat");
  };


  const handleCreateGroup = async (name: string, memberIds: string[]) => {
    const response = await homeService.createGroup(name, memberIds, userId);
    if (response.succeeded) {
      const updatedGroups = await homeService.fetchGroups({ userId });
      if (updatedGroups.succeeded) setGroups(updatedGroups.groups);
    }
  };

  const handleStarredMessageClick = (groupId: string, messageId: string) => {
    const group = groups.find((g) => g.groupId === groupId);
    if (group) {
      handleGroupClick(group.groupId);
      setHighlightedMessageId(messageId);
    }
  };

  const handleProfileUpdate = (updatedUser: any) => {
    setUser(updatedUser);
  };

  /*onst getStarredMessages = (): { message: Message; group: GroupsViewModel }[] => {
    const starredMessages: { message: Message; group: GroupsViewModel }[] = [];

    groups.forEach((group) => {
      if (!("messages" in group)) return; // tip güvenliği için (bazı gruplar sadece listede olabilir)

      (group as any).messages?.forEach((message: Message) => {
        if (message.isStarred) {
          starredMessages.push({ message, group });
        }
      });
    });

    return starredMessages;
  };

  const handleGroupPhotoClick = (group: GroupViewModel, e: React.MouseEvent) => {
    e.stopPropagation();
    setSelectedGroup(group);
    setViewMode("info");
  };*/

  return {
    groups,
    friends,
    user,
    selectedGroup,
    viewMode,
    highlightedMessageId,
    addFriend: handleAddFriend,
    updateFriendRequest: handleUpdateFriendRequest,
    groupClick: handleGroupClick,
    createGroup: handleCreateGroup,
    starredClick: handleStarredMessageClick,
    profileUpdate: handleProfileUpdate,
    setViewMode,
    setSelectedGroup,
    //getStarredMessages,
    //handleGroupPhotoClick,
  };
};
