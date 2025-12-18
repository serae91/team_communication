export interface BLChatDto {
  id: number;
  title: string;
  urgency: string;
  createdAt: Date;
  reminderStatus: string;
}

export interface BLChatCreateDto {
  title: string;
  urgency: string;
  senderId: number;
  firstMessageText: string;
  userIds: number[];
}