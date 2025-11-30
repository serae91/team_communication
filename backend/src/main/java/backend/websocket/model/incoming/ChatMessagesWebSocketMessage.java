package backend.websocket.model.incoming;

import backend.entities.bl_message.BLMessageView;

import java.util.List;

public record ChatMessagesWebSocketMessage(String type, Long chatId, List<BLMessageView> blMessages) implements IncomingWebSocketMessage {

}
