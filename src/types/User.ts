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

export type SearchUsersResponse = {
  users: User[];
  count: number;
};
