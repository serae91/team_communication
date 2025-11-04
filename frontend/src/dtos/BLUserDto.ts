export interface BLUserDto {
  id: number;
  username: string;
}

export interface BLChatUserDto {
  id: number;
  user: BLUserDto;
  downed: boolean;
  reminder: Date;
  reminded: boolean;
}