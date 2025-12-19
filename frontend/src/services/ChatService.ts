import api from './api';

const path = '/chat'

export async function getChats() {
  return (await api.get(`${ path }/list`)).data;
}