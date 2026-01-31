export interface ChatUserView {
  chatId: number;
  userId: number;
  chatUserAttrId: number;
  title: string;
  createdAt: Date;
  creatorUserId: number;
  lastMessageUserId: number;
  lastMessageAt: Date;
  done: boolean;
  reminderAt: Date;
  reminderStatus: string;
}

