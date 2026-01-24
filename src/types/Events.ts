import { IListResponse } from "@/types/Index";

export type THost = {
  id: string;
  name: string;
  email: string;
};
export interface THosts {
  username: string;
  picture: string;
  full_name: string;
}

interface Community {
  name: string;
}

export interface CollaboratingCommunityDetails {
  url: string;
  logo: string;
  name: string;
  countMembers: number;
}
export interface IEvent {
  _id: string;
  title: string;
  slugname: string;
  image: string;
  is_active: boolean;
  category: string;
  startDate: string;
  endDate: string | null;
  startTime: string;
  timezone: string | null;
  endTime: string;
  format: string;
  type_actifity: string | null;
  address: string;
  location_map: string;
  content: string;
  totalAttendees: number;
  hostDetails: {
    _id: string;
    username: string;
    picture: string;
    full_name: string;
  }[];
  attendeeDetails: THosts[];
  community: {
    name: string;
  };
  collaboratingCommunityDetails: CollaboratingCommunityDetails[];
}

export interface IEventResponse {
  data: IEvent;
  url?: string;
}

export interface IEventCreateResponse {
  createEvent: {
    _id: string;
    title: string;
    slugname: string;
    image: string;
    is_active: boolean;
    category: string;
    startDate: string;
    endDate: string;
    startTime: string;
    timezone: string;
    endTime: string;
    format: string;
    type_actifity: string;
    address: string;
    location_map: string;
    location: string;
    content: string;
    hosts: THosts[];
    community: Community;
  };
}

export interface IEventCreatePayload {
  createEventInput: IEventInput;
}

export interface IEventListResponse {
  listEvents: IListResponse & {
    data: IEvent[];
  };
}

export interface IEventUpdateUserInfoPayload {
  updateUserInput: {
    image?: string;
    is_active?: boolean;
    category?: string;
    date?: string;
    endTime?: string;
    format?: string;
    location_address?: string;
    location_map?: string;
    location_name?: string;
    startTime?: string;
    sub_title?: string;
    title?: string;
    isNeedKtp?: boolean;
  };
}

export interface IEventsByRoleListResponse {
  listByRole: {
    events: IEvent[];
  };
}

export interface IEventDetailResponse {
  getUserByslug: IEvent;
}

interface Admin {
  picture: string;
  username: string;
  full_name: string;
}
interface CommunityAdmin {
  admins: Admin[];
}
export interface IEventInput {
  type_actifity: string;
  is_active?: boolean;
  title: string;
  thumbnail_url?: string;
  category: string;
  startDate: string;
  endDate: string;
  startTime: string;
  endTime: string;
  timezone: string;
  format: string;
  address: string;
  location_map: string;
  capacity: number;
  isApprovalRequired: boolean;
  isFree: boolean;
  content: string;
  account_number: string;
  account_name: string;
  bank_account: string;
  ticket_price: string;
  image: string;
  communityId: string;
  community?: CommunityAdmin;
  hosts: string[];
  _id?: string;
  collaboratingCommunities: string[];
  useRegistrationLink?: boolean;
  registration_link?: string;
}
export interface IEventCreatePayload {
  createEventInput: IEventInput;
}

export interface IEventUpdatePayload {
  updateUserInput: {
    image: string;
    is_active: boolean;
    category: string;
    date: string;
    endTime: string;
    format: string;
    location_address: string;
    location_map: string;
    location_name: string;
    startTime: string;
    sub_title: string;
    title: string;
    isNeedKtp: boolean;
  };
}

export interface IEventUpdateResponse {
  _id: string;
}

export interface ICommunityEventListResponse {
  listEventsByCommunitySlug: {
    total: number;
    totalPage: number;
    page: number;
    limit: number;
    data: IEvent[];
  };
}

export interface CommunityMember {
  userId: string;
  communityId: string;
  community?: Community;
  role: string;
  joinedAt: Date;
}

export interface CommunityInfo {
  _id: string;
  name: string;
  url: string;
  logo?: string;
}

export type EventWithCommunities = Event & {
  userCommunities: CommunityInfo[];
};

export interface IEventWithCommunities extends IEvent {
  userCommunities: CommunityInfo[];
  community: {
    _id: string;
    name: string;
    url: string;
    logo?: string;
  };
}

export interface IEventsByCurrentUserResponse {
  listEventsByCurrentUser: IListResponse & {
    data: IEventWithCommunities[];
  };
}
