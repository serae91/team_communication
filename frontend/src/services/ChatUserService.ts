import api from './api';
import type { SetReminderDto, SetReminderSeenDto } from '../dtos/BLChatUserDto.ts';

const path = '/chatuser'

export async function setReminder(setReminderDto: SetReminderDto) {
  return (await api.patch(`${ path }/setreminder`, setReminderDto)).data;
}

export async function setReminderSeen(setReminderSeenDto: SetReminderSeenDto) {
  return (await api.patch(`${ path }/setReminderSeen`, setReminderSeenDto)).data;
}

export async function triggerDown(chatId: number, userId: number) {
  return (await api.patch(`${ path }/triggerdown/${ chatId }/${ userId }`)).data;
}