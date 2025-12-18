import type { ReminderStatusEnum } from '../enums/ReminderStatusEnum.ts';

export interface BLChatDto {
  id: number;
  title: string;
  urgency: string;
  createdAt: Date;
  reminderAt: Date;
  reminderStatus: ReminderStatusEnum;
}

export interface BLChatCreateDto {
  title: string;
  urgency: string;
  senderId: number;
  firstMessageText: string;
  userIds: number[];
}