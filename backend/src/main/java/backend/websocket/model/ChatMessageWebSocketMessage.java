package backend.websocket.model;

import backend.entities.bl_message.BLMessage;
import lombok.Getter;

@Getter
public class ChatMessageWebSocketMessage extends WebsocketMessage {
    private final BLMessage blMessage;

    public ChatMessageWebSocketMessage(final BLMessage blMessage, final String type, final Long chatId) {
        super(type, chatId);
        this.blMessage = blMessage;
    }
}
