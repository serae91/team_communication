package backend.websocket.model.incoming;

import java.util.Set;

public record ReceiveReminderWebSocketMessage(String type, Set<Long> chatIds) {
}
