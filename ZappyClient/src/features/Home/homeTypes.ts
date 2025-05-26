
import { FriendshipStatus, FriendViewModel, GroupsViewModel, GroupViewModel, User_Status } from "../../types/Index";

export interface FetchGroupServiceRequest{
  userId: string;
}

export interface FetchGroupServiceResponse {
    groups: GroupsViewModel[];
    succeeded: boolean;
}

export interface AddFriendRequest {
  username: string;
}

export interface AddFriendResponse {
  succeeded: boolean;
}

export interface FetchFriendsRequest {
  status: FriendshipStatus;
}

export interface FetchFriendsResponse {
  friends: FriendViewModel[];
  succeeded: boolean;
}

export interface UpdateUserStatusRequest {
  userId: string;
  status: User_Status;
}

export interface UpdateUserStatusResponse {
  succeeded: boolean;
}

export interface UpdateFriendshipRequest {
  Id : string;
  status: FriendshipStatus;
}

export interface UpdateFriendshipResponse {
  succeeded: boolean;
}

export interface GetGroupRequest {
  groupId: string;
}

export interface GetGroupResponse {
  succeeded: boolean;
  group: GroupViewModel;
}
