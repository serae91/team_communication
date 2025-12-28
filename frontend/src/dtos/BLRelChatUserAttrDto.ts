import type { BLUserDto } from './BLUserDto.ts';

export interface BLRelChatUserAttrSetReminderDto {
  chatId: number;
  reminderAt: Date;
}

export interface BLRelChatUserAttrDto {
  id: number;
  user: BLUserDto;
  done: boolean;
  reminder: Date;
  reminded: boolean;
}