import type { BLMessageCreateDto, BLMessageDto } from '../../../../dtos/BLMessageDto.ts';
import type { ChatUserAttrView } from '../../../../dtos/ChatUserAttrView.ts';
import type { BLChatCreateDto } from '../../../../dtos/BLChatCreateDto.ts';

export type WebsocketMessage = WebSocketMessageIncoming | WebSocketMessageOutgoing;

export type WebSocketMessageIncoming =
  | ReceiveMessage
  | ReceiveChat
  | ReceiveReminder;

type ReceiveMessage = { type: 'RECEIVE_MESSAGE'; chatId: number; blMessage: BLMessageDto };
type ReceiveChat = { type: 'RECEIVE_CHAT'; blChat: ChatUserAttrView };
type ReceiveReminder = { type: 'RECEIVE_REMINDER'; chats: ChatUserAttrView[] };

type WebSocketMessageOutgoing =
  | RequestChats
  | CreateChat
  | SendMessage
  | SwitchChat;

type RequestChats = { type: 'REQUEST_CHATS'; }
type CreateChat = { type: 'CREATE_CHAT'; chatCreateDto: BLChatCreateDto; }
type SendMessage = { type: 'SEND_MESSAGE'; chatId: number; blMessage: BLMessageCreateDto }
type SwitchChat = { type: 'SWITCH_CHAT'; chatId: number; }