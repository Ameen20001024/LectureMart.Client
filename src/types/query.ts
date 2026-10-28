export interface QueryReply {
  id: number;
  mentorId?: number;
  mentorName?: string;
  queryId: number;
  reply: string;
  createdAt: string;
}

export interface Query {
  id: number;
  videoId: number;
  studentId?: number;
  studentName?: string;
  question: string;
  createdAt: string;
  isResolved: boolean;
  replies: QueryReply[];
}
