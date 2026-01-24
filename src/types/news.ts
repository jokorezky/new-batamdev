export interface INewsCreateResponse {
  _id: string;
}

export interface INewsInput {
  title: string;
  content: string;
  thumbnail_url: string;
  tags: string[];
}
export interface INewsCreatePayload {
  createNewsInput: INewsInput;
}

export interface IUser{
  full_name: string
  job_title: string
  picture: string
}

export interface INewsItem {
  _id: string;
  title: string;
  createdAt: string;
  tags: string[];
  thumbnail_url: string;
  url: string;
  user: IUser
  content: string
  category: string
}
export interface ListNewsInput {
  page: number;
  limit: number;
}

export interface IFindAllNewsResponse {
  findAll: {
    data: INewsItem[];
    total: number;
    totalPage: number;
  };
}

export interface INewsListResponse {
  getAllNewsByUserSlug: {
    data: INewsItem[];
    total: number;
    totalPage: number;
  };
}

export interface INewsListPayload {
  userslug: string;
  listNewsInput: {
    page: number;
    limit: number;
  };
}

export interface INewsUpdateResponse {
  updateNews: INewsItem;
}

export interface INewsUpdatePayload {
  updateNewsInput: {
    _id: string;
    title?: string;
    content?: string;
    thumbnail_url?: string;
    tags?: string[];
    url?: string;
  };
}
