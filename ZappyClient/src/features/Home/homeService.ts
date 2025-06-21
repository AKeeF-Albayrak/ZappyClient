import axios from "axios";
import {
  StarredMessageViewModel,
  User,
} from "../../types/Index";
import {
  FetchGroupServiceRequest,
  FetchGroupServiceResponse,
  AddFriendRequest,
  AddFriendResponse,
  GetGroupRequest,
  GetGroupResponse,
  FetchFriendsRequest,
  FetchFriendsResponse,
  UpdateFriendshipRequest,
  UpdateFriendshipResponse,
} from "./homeTypes";

const API_URL = "https://localhost:7127/api";

export const fetchGroups = async (request: FetchGroupServiceRequest): Promise<FetchGroupServiceResponse> => {
  const response = await axios.get(`${API_URL}/groups`, { params: { userId: request.userId } });
  return response.data;
};

export const fetchFriends = async (request: FetchFriendsRequest): Promise<FetchFriendsResponse> => {
  const response = await axios.get(`${API_URL}/friends`, {
    params: { status: request.status },
  });
  return response.data;
};

export const fetchGroupDetails = async (request: GetGroupRequest): Promise<GetGroupResponse> => {
  const response = await axios.post(`${API_URL}/groups/details`, request);
  return response.data;
};

export const createGroup = async (name: string, memberIds: string[], userId: string) => {
  const response = await axios.post(`${API_URL}/groups/create`, {
    name,
    memberIds,
    createdBy: userId,
  });
  return response.data;
};

export const fetchStarredMessages = async (): Promise<StarredMessageViewModel[]> => {
  const response = await axios.get(`${API_URL}/messages/starred`);
  return response.data;
};

export const logout = async () => {
  await axios.post(`${API_URL}/Auth/logout`);
};

export const updateUserProfile = async (user: User): Promise<User> => {
  const response = await axios.put(`${API_URL}/user/update`, user);
  return response.data;
};

export const searchUsers = async (username: string) => {
  const response = await axios.get(`${API_URL}/users/search`, {
    params: { username },
  });
  return response.data;
};

export const addFriend = async (request: AddFriendRequest): Promise<AddFriendResponse> => {
  const response = await axios.post(`${API_URL}/friends/add`, request);
  return response.data;
};

export const updateFriendRequest = async (
  request: UpdateFriendshipRequest
): Promise<UpdateFriendshipResponse> => {
  const response = await axios.post(`${API_URL}/friendships/update`, request);
  return response.data;
};

const fetchUserProfile = async () => {
  const response = await axios.get(`${API_URL}/user/profile`);
  return {
    succeeded: response.status === 200,
    user: response.data,
  };
};


const homeService = {
  fetchGroups,
  fetchFriends,
  fetchGroupDetails,
  createGroup,
  logout,
  updateUserProfile,
  searchUsers,
  addFriend,
  updateFriendRequest,
  fetchStarredMessages,
  fetchUserProfile,
};

export default homeService;
