import api from './api';

const path = '/chat'

export async function getAllChatsByUserId(userId: number){
  const response = await api.get(`${path}/all/${userId}`);
  return response.data;
}