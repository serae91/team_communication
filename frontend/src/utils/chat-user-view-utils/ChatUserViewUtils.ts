import type { ChatUserView } from '../../dtos/ChatUserView.ts';
import { ChatBoxEnum } from '../../enums/ChatBoxEnum.ts';
import { ReminderStatusEnum } from '../../enums/ReminderStatusEnum.ts';

export const getCurrentChatBoxes = (chatUserView: ChatUserView) => {
  if (chatUserView.done) return [ChatBoxEnum.ALL];
  if (chatUserView.reminderStatus === ReminderStatusEnum.SCHEDULED) return [ChatBoxEnum.REMINDER];
  if (chatUserView.creatorUserId === chatUserView.userId) return [ChatBoxEnum.INBOX, ChatBoxEnum.SENT];
  return [ChatBoxEnum.INBOX];
};