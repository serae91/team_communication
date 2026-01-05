import api from './api';
import type { BLRelChatUserAttrSetReminderDto } from '../dtos/BLRelChatUserAttrDto.ts';
import type { ChatBoxEnum } from '../enums/ChatBoxEnum.ts';
import type { ChatSortFieldEnum } from '../enums/ChatSortFieldEnum.ts';
import type { SortDirectionEnum } from '../enums/SortDirectionEnum.ts';
import type { PaginationDto } from '../dtos/PaginationDto.ts';

const path = '/relchatuserattr';

export async function getChatUserViews(chatBox: ChatBoxEnum, pagination?: PaginationDto, sortField?: ChatSortFieldEnum, sortDirection?: SortDirectionEnum) {
  const url = `${ path }/list?chatBox=${ chatBox }${ pagination ? `&page=${ pagination.page }&size=${ pagination.size }` : '' }${ sortField ? `&sortField=${ sortField }` : '' }${ sortDirection ? `&sortDirection=${ sortDirection }` : '' }`;
  return (await api.get(url)).data;
}

export async function setReminder(setReminderDto: BLRelChatUserAttrSetReminderDto) {
  return (await api.patch(`${ path }/reminder`, setReminderDto)).data;
}

export async function setReminderSeen(chatId: number) {
  return (await api.patch(`${ path }/reminder/seen/${ chatId }`)).data;
}

export async function triggerDone(chatId: number) {
  return (await api.patch(`${ path }/triggerdone/${ chatId }`)).data;
}