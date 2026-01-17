package backend.websocket.model.incoming;

import backend.bl_entities.bl_chat.ChatBox;
import backend.bl_entities.bl_rel_chat_user_attr.ChatUserView;

public record ReceiveUpdatedChatWebSocketMessage(ChatUserView chatUserView,
                                                 ChatBox fromBox) implements IncomingWebSocketMessage {
    @Override
    public String type() {
        return "RECEIVE_UPDATED_CHAT";
    }
}
