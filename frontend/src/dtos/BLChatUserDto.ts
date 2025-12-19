import type { BLUserDto } from './BLUserDto.ts';

export interface SetReminderDto {
  chatId: number;
  reminderAt: Date;
}

export interface BLChatUserDto {
  id: number;
  user: BLUserDto;
  downed: boolean;
  reminder: Date;
  reminded: boolean;
}