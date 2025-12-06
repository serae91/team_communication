package backend.websocket.model.incoming;

import backend.entities.bl_chat.BLChatPlainView;

public record ReceiveChatWebSocketMessage(String type, BLChatPlainView blChat) {
}
