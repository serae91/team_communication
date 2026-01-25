import type { BLMessageDto } from './BLMessageDto.ts';

export interface BLChatCreateDto {
  title: string;
  urgency: string;
  firstMessages: BLMessageDto[];
  userIds: number[];
  createdAt: Date;
}
