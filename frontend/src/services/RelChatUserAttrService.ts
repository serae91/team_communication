import api from './api';
import type { BLRelChatUserAttrSetReminderDto } from '../dtos/BLRelChatUserAttrDto.ts';

const path = '/relchatuserattr';

export async function getChatUserViews() {
  return (await api.get(`${ path }/list`)).data;
}

export async function setReminder(setReminderDto: BLRelChatUserAttrSetReminderDto) {
  return (await api.patch(`${ path }/reminder`, setReminderDto)).data;
}

export async function setReminderSeen(chatId: number) {
  return (await api.patch(`${ path }/reminder/seen/${ chatId }`)).data;
}

export async function triggerDone(chatId: number) {
  return (await api.patch(`${ path }/triggerdone/${ chatId }`)).data;
}