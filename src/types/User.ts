import { IListResponse } from "./Index";
export interface User {
    _id: string;
    full_name: string;
    username: string;
    email: string;
    picture?: string;
    phone_number?: string;
    roles: string[];
    city?: string;
    province?: string;
    is_active: boolean;
    is_coreteam: boolean;
    job_title?: string;
    jobType?: string[];
    profession?: string;
    institution?: string;
    openMic?: string;
    topicExpertise?: string;
    bio?: string;
    website?: string;
    github?: string;
    linkedin?: string;
    skills?: string[];
    createdAt: string;
    updatedAt: string;
}

export interface IUser {
  _id: string;
  email: string;
  username: string;
  full_name: string;
  createdAt: string;
  updatedAt: string;
  picture: string;
  nickName?: string;
  job_title?: string;
  bio?: string;
  website?: string;
  github?: string;
  linkedin?: string;
  province?: string;
  city?: string;
  skills?:string[];
  isCoreTeam?: boolean;
}

export type SearchUsersResponse = {
  users: User[];
  count: number;
};

export interface IUserListResponse {
  listUsers: IListResponse & {
    data: IUser[];
  };
}