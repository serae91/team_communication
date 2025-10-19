import api from './api';

const path = '/message';

export async function listForSenderIdAndReceiverId(senderId: number, receiverId: number){
  const response = await api.get(`${path}/${senderId}/${receiverId}`);
  return response.data;
}

export async function listForSenderIdAndGroupChatId(senderId: number, groupChatId: number) {
  const response = await api.get(`${path}/${senderId}/${groupChatId}`);
  return response.data;
}

