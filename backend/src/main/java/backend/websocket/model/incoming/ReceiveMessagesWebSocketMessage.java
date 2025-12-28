package backend.websocket.model.incoming;

import backend.bl_entities.bl_message.BLMessageView;

import java.util.List;

public record ReceiveMessagesWebSocketMessage(String type, Long chatId,
                                              List<BLMessageView> blMessages) implements IncomingWebSocketMessage {

}
