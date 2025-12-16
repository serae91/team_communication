import api from './api';

const path = '/chat'

export async function triggerDown(chatId: number, userId: number) {
  return (await api.patch(`${ path }/triggerdown/${ chatId }/${ userId }`)).data;
}