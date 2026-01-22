import type { ChatUserView } from '../../dtos/ChatUserView.ts';
import { ChatBoxEnum } from '../../enums/ChatBoxEnum.ts';
import type { BLUserDto } from '../../dtos/BLUserDto.ts';
import { ReminderStatusEnum } from '../../enums/ReminderStatusEnum.ts';

export const getCurrentChatBox = (chatUserView: ChatUserView, user: BLUserDto) => {
  if (chatUserView.done) return ChatBoxEnum.ALL;
  if (chatUserView.reminderStatus === ReminderStatusEnum.SCHEDULED) return ChatBoxEnum.REMINDER;
  if (chatUserView.lastMessageUserId === user.id) return ChatBoxEnum.SENT;
  return ChatBoxEnum.INBOX;
};