import api from './api';
import { MessageDto } from '../dtos/MessageDto';
import { AxiosResponse } from 'axios';

const path = '/message';

export async function listForSenderIdAndReceiverId(senderId: number, receiverId: number){
  const response = await api.get(`${path}/${senderId}/${receiverId}`);
  return response.data;
}

export async function listForSenderIdAndGroupChatId(senderId: number, groupChatId: number) {
  const response = await api.get(`${path}/${senderId}/${groupChatId}`);
  return response.data;
}

