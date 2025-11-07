import type { BLUserDto } from './BLUserDto.ts';

export interface BLMessageDto {
  id: number;
  text: string;
  createdAt: Date;
  chatGroupId: number;
  sender: BLUserDto;
}