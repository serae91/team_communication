import api from './api';
import type { BLRelChatUserAttrSetReminderDto } from '../dtos/BLRelChatUserAttrDto.ts';

const path = '/relchatuserattr';

export async function setReminder(setReminderDto: BLRelChatUserAttrSetReminderDto) {
  return (await api.patch(`${ path }/reminder`, setReminderDto)).data;
}

export async function setReminderSeen(chatId: number) {
  return (await api.patch(`${ path }/reminder/seen/${ chatId }`)).data;
}

export async function triggerDown(chatId: number) {
  return (await api.patch(`${ path }/triggerdown/${ chatId }`)).data;
}