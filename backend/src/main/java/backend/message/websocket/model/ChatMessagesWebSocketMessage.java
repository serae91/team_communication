package backend.message.websocket.model;

import backend.entities.bl_message.BLMessageView;
import lombok.Getter;

import java.util.List;

@Getter
public class ChatMessagesWebSocketMessage extends WebsocketMessage {
    private final List<BLMessageView> blMessages;

    public ChatMessagesWebSocketMessage(final List<BLMessageView> blMessages, final String type, final Long chatId) {
        super(type, chatId);
        this.blMessages = blMessages;
    }
}
