import api from './api';
import type { BLMessageCreateView } from '../dtos/BLMessageDto.ts';

const path = '/message';

/*export async function listForSenderIdAndReceiverId(senderId: number, receiverId: number){
  const response = await api.get(`${path}/${senderId}/${receiverId}`);
  return response.data;
}

export async function listForSenderIdAndGroupChatId(senderId: number, groupChatId: number) {
  const response = await api.get(`${path}/${senderId}/${groupChatId}`);
  return response.data;
}*/

export async function createMessage(blMessageCreateDto: BLMessageCreateView){
  const response = await api.post(`${path}/create`, blMessageCreateDto);
  return response.data;
}

