import type { BLMessageDto } from './BLMessageDto.ts';
import type { BLChatUserDto } from './BLUserDto.ts';

export interface BLChatFullInfoDto {
  id: number;
  title: string;
  urgency: string;
  createdAt: Date;
  messages: BLMessageDto[];
  users: BLChatUserDto[];
}