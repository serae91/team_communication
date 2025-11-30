import type { BLChatPlainDto } from '../../../../dtos/BLChatPlainDto.ts';
import type { BLMessageDto } from '../../../../dtos/BLMessageDto.ts';
import type { MessageBaseType } from '../../BLWebSocketProvider.tsx';

export type WebsocketMessage = WebSocketMessageIncoming | WebSocketMessageOutgoing;

export type WebSocketMessageIncoming =
  | ChatMessages
  | ReceiveMessages
  | ReceiveChat;

type ChatMessages = { chatId: number; blMessages: BLMessageDto[] } & MessageBaseType<'CHAT_MESSAGES'>;
type ReceiveMessages = { chatId: number; blMessage: BLMessageDto } & MessageBaseType<'RECEIVE_MESSAGE'>;
type ReceiveChat = { blChat: BLChatPlainDto } & MessageBaseType<'RECEIVE_CHAT'>;

type WebSocketMessageOutgoing =
  | SendMessage
  | SwitchChat

type SendMessage = { chatId: number; blMessage: BLMessageDto } & MessageBaseType<'SEND_MESSAGE'>
type SwitchChat = { chatId: number; } & MessageBaseType<'SWITCH_CHAT'>