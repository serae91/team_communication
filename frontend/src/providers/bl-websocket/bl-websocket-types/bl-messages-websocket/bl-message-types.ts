import type { BLChatCreateDto, BLChatPlainDto } from '../../../../dtos/BLChatPlainDto.ts';
import type { BLMessageCreateDto, BLMessageDto } from '../../../../dtos/BLMessageDto.ts';

export type WebsocketMessage = WebSocketMessageIncoming | WebSocketMessageOutgoing;

export type WebSocketMessageIncoming =
  | ReceiveMessages
  | ReceiveMessage
  | ReceiveChats
  | ReceiveChat;

type ReceiveMessages = { type: 'RECEIVE_MESSAGES'; chatId: number; blMessages: BLMessageDto[] };
type ReceiveMessage = { type: 'RECEIVE_MESSAGE'; chatId: number; blMessage: BLMessageDto };
type ReceiveChats = { type: 'RECEIVE_CHATS'; blChats: BLChatPlainDto[] };
type ReceiveChat = { type: 'RECEIVE_CHAT'; blChat: BLChatPlainDto };

type WebSocketMessageOutgoing =
  | RequestChats
  | CreateChat
  | SendMessage
  | SwitchChat;

type RequestChats = { type: 'REQUEST_CHATS'; userId: number; }
type CreateChat = { type: 'CREATE_CHAT'; chatCreateDto: BLChatCreateDto; }
type SendMessage = { type: 'SEND_MESSAGE'; chatId: number; blMessage: BLMessageCreateDto }
type SwitchChat = { type: 'SWITCH_CHAT'; chatId: number; }