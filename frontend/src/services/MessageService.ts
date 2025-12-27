import api from './api';

const path = '/message';

export async function getMessages(chatId: number) {
  return (await api.get(`${ path }/list/${ chatId }`)).data;
}