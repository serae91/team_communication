import api from './api';

const path = '/chat'

export async function getChatListPlainByUserId(userId: number)  {
  return (await api.get(`${path}/listplain/${userId}`)).data;

}

export async function getChatFullInfoById(id: number) {
  return (await api.get(`${path}/fullinfo/${id}`)).data;
}