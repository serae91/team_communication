import type { BLChatCreateDto, BLChatDto } from '../../../../dtos/BLChatDto.ts';
import type { BLMessageCreateDto, BLMessageDto } from '../../../../dtos/BLMessageDto.ts';

export type WebsocketMessage = WebSocketMessageIncoming | WebSocketMessageOutgoing;

export type WebSocketMessageIncoming =
//  | ReceiveMessages
  | ReceiveMessage
//  | ReceiveChats
  | ReceiveChat
  | ReceiveReminder;

//type ReceiveMessages = { type: 'RECEIVE_MESSAGES'; chatId: number; blMessages: BLMessageDto[] };
type ReceiveMessage = { type: 'RECEIVE_MESSAGE'; chatId: number; blMessage: BLMessageDto };
//type ReceiveChats = { type: 'RECEIVE_CHATS'; blChats: BLChatDto[] };
type ReceiveChat = { type: 'RECEIVE_CHAT'; blChat: BLChatDto };
type ReceiveReminder = { type: 'RECEIVE_REMINDER'; chatIds: number[] };

type WebSocketMessageOutgoing =
  | RequestChats
  | CreateChat
  | SendMessage
  | SwitchChat;

type RequestChats = { type: 'REQUEST_CHATS'; }
type CreateChat = { type: 'CREATE_CHAT'; chatCreateDto: BLChatCreateDto; }
type SendMessage = { type: 'SEND_MESSAGE'; chatId: number; blMessage: BLMessageCreateDto }
type SwitchChat = { type: 'SWITCH_CHAT'; chatId: number; }