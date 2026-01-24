export interface CreateAttendInput {
  eventId: string;
  ticket: number;
  qty?: number;
  paymentProof?: string;
  paymentMethod?: string;
  payerIdentity?: string;
  phone?: string;
  jobType?: string[];
  profession?: string;
  institution?: string;
  openMic?: string;
  topicExpertise?: string;
  eventSource?: string;
  question?: string;
  ktp?: string;
  fullName: string;
}

export interface Community {
  _id: string;
  name: string;
  url: string;
  logo: string;
}

export interface Event {
  _id: string;
  title: string;
  description: string;
  startDate: string;
  endDate: string;
  address: string;
  format: string;
  cover: string;
  slugname?: string;
  community: Community;
  image: string;
}

export interface Attendance {
  _id: string;
  qrCode: string;
  attendedAt: string;
  createdAt: string;
  event: Event;
}

export interface AttendedEventsData {
  total: number;
  totalPage: number;
  page: number;
  limit: number;
  data: Attendance[];
}
