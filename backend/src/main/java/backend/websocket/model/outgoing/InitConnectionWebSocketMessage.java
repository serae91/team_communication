package backend.websocket.model.outgoing;

public record InitConnectionWebSocketMessage(String type, Long userId) implements OutgoingWebSocketMessage {
}
