package backend.websocket.model.incoming;

import backend.bl_entities.bl_chat.BLChatView;

public record ReceiveChatWebSocketMessage(String type, BLChatView blChat) {
}
