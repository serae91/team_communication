import api from './api';
import type { SetReminderDto } from '../dtos/BLChatUserDto.ts';

const path = '/chatuser'

export async function setReminder(setReminderDto: SetReminderDto) {
  return (await api.patch(`${ path }/reminder`, setReminderDto)).data;
}

export async function setReminderSeen(chatId: number) {
  return (await api.patch(`${ path }/reminder/seen/${ chatId }`)).data;
}

export async function triggerDown(chatId: number, userId: number) {
  return (await api.patch(`${ path }/triggerdown/${ chatId }/${ userId }`)).data;
}