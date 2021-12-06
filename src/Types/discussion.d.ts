export interface Thread {
  id: number;
  channel: string;
  channelType: string;
  children: Post[];
}

export interface Post {
  id: number;
  author: string;
  content: string;
  details: string;
  creationDate: Date;
  threadId: number;
  parentId?: number;
  children: Post[];
}
