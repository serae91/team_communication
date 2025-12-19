package backend.websocket;

import backend.websocket.model.incoming.ReceiveReminderWebSocketMessage;
import com.fasterxml.jackson.core.JsonProcessingException;
import com.fasterxml.jackson.databind.ObjectMapper;
import jakarta.enterprise.context.ApplicationScoped;
import jakarta.inject.Inject;

import java.util.Set;

@ApplicationScoped
public class BLWebSocketService {

    @Inject
    ObjectMapper objectMapper;

    @Inject
    ChatWebRegistry chatWebRegistry;

    public void sendReminder(final Long userId, final Set<Long> chatIds) {
        try {
            final ReceiveReminderWebSocketMessage receiveReminderWebSocketMessage = new ReceiveReminderWebSocketMessage("RECEIVE_REMINDER", chatIds);
            final String jsonString = objectMapper.writeValueAsString(receiveReminderWebSocketMessage);
            chatWebRegistry.sendToUser(userId, jsonString);
        } catch (JsonProcessingException jpe) {
            jpe.printStackTrace();
        }
    }
}
