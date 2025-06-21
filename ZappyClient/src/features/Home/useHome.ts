import { useEffect, useState } from "react";
import homeService from "./homeService";
import { getUserIdFromToken } from "../../utils/jwtUtils";
import {
  //FriendshipStatus,
  GroupsViewModel,
  //FriendRequest,
  GroupViewModel,
  FriendViewModel,
  FriendshipStatus,
  StarredMessageViewModel,
  User,
} from "../../types/Index";
import { GetGroupResponse } from "./homeTypes";

export const useHome = () => {
  const [groups, setGroups] = useState<GroupsViewModel[]>([]);
  const [friends, setFriends] = useState<FriendViewModel[]>([]);
  //const [friendRequests, setFriendRequests] = useState<FriendRequest[]>([]);
  const [user, setUser] = useState<User | null>(null);
  const [selectedGroup, setSelectedGroup] = useState<GroupViewModel | null>(null);
  const [viewMode, setViewMode] = useState<"chat" | "info" | null>(null);
  const [highlightedMessageId, setHighlightedMessageId] = useState<string | null>(null);
  const [starredMessages, setStarredMessages] = useState<StarredMessageViewModel[]>([]);
  const [selectedFriendUsername, setSelectedFriendUsername] = useState<string | null>(null);

  const userId = getUserIdFromToken();
  if (!userId) throw new Error("User ID not found in token");

  useEffect(() => {
    const loadData = async () => {
      const groupResponse = await homeService.fetchGroups({ userId });
      if (groupResponse.succeeded) setGroups(groupResponse.groups);

      const fetchedFriendsResponse = await homeService.fetchFriends({ status: FriendshipStatus.Accepted });
      if (fetchedFriendsResponse.succeeded) setFriends(fetchedFriendsResponse.friends);

      const userResponse = await homeService.fetchUserProfile(); // yeni eklenen satır
      if (userResponse.succeeded) {
        setUser({
          id: userResponse.user.id,
          name: userResponse.user.name,
          image: userResponse.user.image, // bu base64 ya da URL olmalı
          status: userResponse.user.status,
          statusMessage: userResponse.user.statusMessage,
        });
      }
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
        status: u.status,
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

  const handleFriendClick = (friend: FriendViewModel) => {
    setSelectedFriendUsername(friend.username);
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

  const getStarredMessages = async () => {
    try {
      const messages = await homeService.fetchStarredMessages();
      setStarredMessages(messages);
    } catch (error) {
      console.error("Yıldızlı mesajlar alınamadı:", error);
    }
  };

  /*
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
    starredMessages,
    selectedFriendUsername,
    addFriend: handleAddFriend,
    updateFriendRequest: handleUpdateFriendRequest,
    groupClick: handleGroupClick,
    createGroup: handleCreateGroup,
    starredClick: handleStarredMessageClick,
    profileUpdate: handleProfileUpdate,
    setViewMode,
    setSelectedGroup,
    getStarredMessages,
    handleFriendClick,
  };
};
