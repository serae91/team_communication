package backend.websocket.model.outgoing;

public record RequestChatsWebSocketMessage(String type, Long userId) implements OutgoingWebSocketMessage {
}
