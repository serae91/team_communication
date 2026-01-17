package backend.websocket.model.incoming;

import backend.bl_entities.bl_rel_chat_user_attr.ChatUserView;

public record ReceiveChatWebSocketMessage(String type, ChatUserView chatUserView) {
}
