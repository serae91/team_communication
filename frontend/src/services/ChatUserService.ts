import api from './api';

const path = '/chatuser'

export async function setreminder(chatId: number, userId: number) {
  return (await api.patch(`${ path }/triggerdown/${ chatId }/${ userId }`)).data;
}

export async function triggerDown(chatId: number, userId: number) {
  return (await api.patch(`${ path }/triggerdown/${ chatId }/${ userId }`)).data;
}