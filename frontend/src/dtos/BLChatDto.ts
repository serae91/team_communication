import { BLMessageDto } from './BLMessageDto';
import { BLChatUserDto } from './BLUserDto';

export interface BLChatDto {
  id: number;
  urgency: string;
  createdAt: Date;
  messages: BLMessageDto[];
  users: BLChatUserDto[];
}