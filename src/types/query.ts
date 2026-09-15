export interface QueryReply {
  id: number;
  queryId: number;
  reply: string;
  createdAt: string;
}

export interface Query {
  id: number;
  videoId: number;
  studentId: number;
  question: string;
  createdAt: string;
  isResolved: boolean;
  replies: QueryReply[];
}