package backend.websocket;

import backend.bl_entities.bl_rel_chat_user_attr.ChatUserView;
import backend.websocket.model.incoming.ReceiveReminderWebSocketMessage;
import jakarta.enterprise.context.ApplicationScoped;
import jakarta.inject.Inject;

import java.util.Set;

@ApplicationScoped
public class BLWebSocketService {

    @Inject
    ChatWebRegistry chatWebRegistry;

    public void sendReminder(final Long userId, final Set<ChatUserView> chats) {
        final ReceiveReminderWebSocketMessage receiveReminderWebSocketMessage = new ReceiveReminderWebSocketMessage(chats);
        chatWebRegistry.sendToUser(userId, receiveReminderWebSocketMessage);
    }
}
