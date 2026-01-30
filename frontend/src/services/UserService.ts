import api from './api';

const path = '/user';

export async function getFilteredUser(query: string = '') {
  return (await api.get(`${ path }/filtered?query=${ query }`)).data;
}