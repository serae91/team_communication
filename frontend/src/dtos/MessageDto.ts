export interface MessageDto {
  id: number;
  text: string;
  createdAt: Date;
  senderId: number;
  receiverId: number;
  chatGroupId: number;
}