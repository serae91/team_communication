import type { BLUserDto } from './BLUserDto.ts';

export interface BLMessageDto {
  id: number;
  text: string;
  createdAt: Date;
  sender: BLUserDto;
}

export interface BLMessageCreateDto {
  text: string;
  chatId: number;
  createdAt: Date;
}
