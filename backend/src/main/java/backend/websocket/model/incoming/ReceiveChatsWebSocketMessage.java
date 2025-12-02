package backend.websocket.model.incoming;

import backend.entities.bl_chat.BLChatPlainView;

import java.util.List;

public record ReceiveChatsWebSocketMessage(String type, List<BLChatPlainView> blChats) implements IncomingWebSocketMessage {
}
