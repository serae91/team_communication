import { BLMessageDto } from './BLMessageDto';
import { BLChatUserDto } from './BLUserDto';

export interface BLChatPlainDto {
  id: number;
  title: string;
  urgency: string;
  createdAt: Date;
}

export interface BLChatFullInfoDto {
  id: number;
  title: string;
  urgency: string;
  createdAt: Date;
  messages: BLMessageDto[];
  users: BLChatUserDto[];
}