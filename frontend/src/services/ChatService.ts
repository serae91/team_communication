import api from './api';

const path = '/chat'

export async function getAllChatsByUserId(userId: number){
  const response = await api.get(`${path}/${userId}`);
  return response.data;
}