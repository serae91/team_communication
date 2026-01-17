package backend.websocket.model.incoming;

import backend.bl_entities.bl_rel_chat_user_attr.ChatUserView;

public record ReceiveChatWebSocketMessage(ChatUserView chatUserView) implements IncomingWebSocketMessage {
    @Override
    public String type() {
        return "RECEIVE_CHAT";
    }
}
