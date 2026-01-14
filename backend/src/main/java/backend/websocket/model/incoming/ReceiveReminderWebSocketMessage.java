package backend.websocket.model.incoming;

import backend.bl_entities.bl_rel_chat_user_attr.ChatUserView;

import java.util.Set;

public record ReceiveReminderWebSocketMessage(String type, Set<ChatUserView> chats) {
}
