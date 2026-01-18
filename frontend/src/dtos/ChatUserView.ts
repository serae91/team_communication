export interface ChatUserView {
  chatId: number;
  userId: number;
  chatUserAttrId: number;
  title: string;
  createdAt: Date;
  lastMessageUserId: number;
  lastMessageAt: Date;
  done: boolean;
  reminderAt: Date;
  reminderStatus: string;
}

