package backend.websocket.model.outgoing;

public record SwitchChatWebSocketMessage(String type, Long chatId) implements OutgoingWebSocketMessage {
}
