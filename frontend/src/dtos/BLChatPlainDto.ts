export interface BLChatPlainDto {
  id: number;
  title: string;
  urgency: string;
  createdAt: Date;
}

export interface BLChatCreateDto {
  title: string;
  urgency: string;
  senderId: number;
  firstMessageText: string;
  userIds: number[];
}