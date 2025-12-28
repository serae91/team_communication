package backend.websocket.model.outgoing;

import backend.bl_entities.bl_chat.BLChatCreateDto;

public record CreateChatWebSocketMessage(String type,
                                         BLChatCreateDto chatCreateDto) implements OutgoingWebSocketMessage {
}
