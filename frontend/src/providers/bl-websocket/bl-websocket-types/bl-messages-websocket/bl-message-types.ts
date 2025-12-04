import type { BLChatPlainDto } from '../../../../dtos/BLChatPlainDto.ts';
import type { BLMessageCreateDto, BLMessageDto } from '../../../../dtos/BLMessageDto.ts';

export type WebsocketMessage = WebSocketMessageIncoming | WebSocketMessageOutgoing;

export type WebSocketMessageIncoming =
  | ChatMessages
  | ReceiveMessages
  | ReceiveChats
  | ReceiveChat;

type ChatMessages = { type: 'CHAT_MESSAGES'; chatId: number; blMessages: BLMessageDto[] };
type ReceiveMessages = { type: 'RECEIVE_MESSAGE'; chatId: number; blMessage: BLMessageDto };
type ReceiveChats = { type: 'RECEIVE_CHATS';  blChats: BLChatPlainDto[] };
type ReceiveChat = { type: 'RECEIVE_CHAT';  blChat: BLChatPlainDto };

type WebSocketMessageOutgoing =
  | InitConnection
  | SendMessage
  | SwitchChat;

type InitConnection = { type: 'INIT_CONNECTION'; userId: number; }
type SendMessage = { type: 'SEND_MESSAGE'; chatId: number; blMessage: BLMessageCreateDto }
type SwitchChat = { type: 'SWITCH_CHAT'; chatId: number; }