package backend.websocket;

import backend.bl_entities.bl_message.BLMessageView;
import backend.bl_entities.bl_rel_chat_user_attr.ChatUserView;
import backend.websocket.model.incoming.ReceiveMessageWebSocketMessage;
import backend.websocket.model.incoming.ReceiveReminderWebSocketMessage;
import backend.websocket.model.incoming.ReceiveUpdatedChatWebSocketMessage;
import jakarta.enterprise.context.ApplicationScoped;
import jakarta.inject.Inject;

import java.util.List;
import java.util.Set;

@ApplicationScoped
public class BLWebSocketService {

    @Inject
    ChatWebRegistry chatWebRegistry;

    public void sendReminder(final Long userId, final Set<ChatUserView> chats) {
        final ReceiveReminderWebSocketMessage receiveReminderWebSocketMessage = new ReceiveReminderWebSocketMessage(chats);
        chatWebRegistry.sendToUser(userId, receiveReminderWebSocketMessage);
    }

    public void sendMessageToChat(final Long chatId, final List<ReceiveUpdatedChatWebSocketMessage> updatedChats, final BLMessageView blMessageView) {
        chatWebRegistry.sendToChat(chatId, new ReceiveMessageWebSocketMessage(blMessageView));
        final Set<Long> users = chatWebRegistry.getToChatConnectedUsers(chatId);

        for (final ReceiveUpdatedChatWebSocketMessage updatedChat : updatedChats) {
            //if (users.contains(updatedChat.chatUserView().getUserId())) continue;
            chatWebRegistry.sendToUser(updatedChat.chatUserView().getUserId(), updatedChat);
        }
    }
}
