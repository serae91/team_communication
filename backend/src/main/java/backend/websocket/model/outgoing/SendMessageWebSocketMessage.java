package backend.websocket.model.outgoing;

import backend.bl_entities.bl_message.BLMessageCreateDto;

public record SendMessageWebSocketMessage(String type, Long chatId,
                                          BLMessageCreateDto blMessage) implements OutgoingWebSocketMessage {
}
