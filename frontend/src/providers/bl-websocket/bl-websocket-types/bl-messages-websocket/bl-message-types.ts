import type { BLMessageCreateDto, BLMessageDto } from '../../../../dtos/BLMessageDto.ts';
import type { ChatUserView } from '../../../../dtos/ChatUserView.ts';
import type { BLChatCreateDto } from '../../../../dtos/BLChatCreateDto.ts';
import type { ChatBoxEnum } from '../../../../enums/ChatBoxEnum.ts';

export type WebsocketMessage = WebSocketMessageIncoming | WebSocketMessageOutgoing;

export type WebSocketMessageIncoming =
  | ReceiveMessage
  | ReceiveChat
  | ReceiveUpdatedChat
  | ReceiveReminder;

type ReceiveMessage = { type: 'RECEIVE_MESSAGE'; blMessage: BLMessageDto; };
type ReceiveChat = { type: 'RECEIVE_CHAT'; chatUserView: ChatUserView };
type ReceiveUpdatedChat = { type: 'RECEIVE_UPDATED_CHAT'; chatUserView: ChatUserView; fromBox: ChatBoxEnum };
type ReceiveReminder = { type: 'RECEIVE_REMINDER'; chats: ChatUserView[] };

type WebSocketMessageOutgoing =
  | CreateChat
  | SendMessage
  | SwitchChat;

type CreateChat = { type: 'CREATE_CHAT'; chatCreateDto: BLChatCreateDto; }
type SendMessage = { type: 'SEND_MESSAGE'; chatId: number; blMessage: BLMessageCreateDto }
type SwitchChat = { type: 'SWITCH_CHAT'; chatId: number | null; }