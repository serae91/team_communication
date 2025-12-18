package backend.websocket.model.incoming;

import backend.entities.bl_chat.BLChatView;

import java.util.List;

public record ReceiveChatsWebSocketMessage(String type, List<BLChatView> blChats) implements IncomingWebSocketMessage {
}
