package backend.websocket.model.outgoing;

public record RequestChatsWebSocketMessage(String type) implements OutgoingWebSocketMessage {
}
