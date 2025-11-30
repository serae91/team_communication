import type { BLUserDto } from './BLUserDto.ts';
import type { BLIdDto } from './BLIdDto.ts';

export interface BLMessageDto {
  id: number;
  text: string;
  createdAt: Date;
  sender: BLUserDto;
}

export interface BLMessageCreateView {
  text: string;
  chat: BLIdDto;
  sender: BLIdDto;
}

export interface BLMessageCreateDto {
  text: string;
  chatId: number;
  senderId: number;
}
