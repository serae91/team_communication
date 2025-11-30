package backend.websocket.model.incoming;

import backend.entities.bl_message.BLMessageView;

public record ReceiveMessageWebSocketMessage(String type, Long chatId, BLMessageView blMessage) implements IncomingWebSocketMessage {
}
