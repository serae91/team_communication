import api from './api';

const path = '/gemini';

export async function ask(question: string){
  const response = await api.get(`${path}/ask/${question}`);
  return response.data;
}

export async function askPost(question: string){
  const response = await api.post(`${path}/ask/`, question);
  return response.data;
}