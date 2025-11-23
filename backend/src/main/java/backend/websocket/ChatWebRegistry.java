package backend.websocket;

import io.quarkus.websockets.next.WebSocketConnection;
import jakarta.enterprise.context.ApplicationScoped;

import java.util.Map;
import java.util.Objects;
import java.util.Set;
import java.util.concurrent.ConcurrentHashMap;

@ApplicationScoped
public class ChatWebRegistry {

    private final Map<Long, Set<WebSocketConnection>> chatIdConnections = new ConcurrentHashMap<>();

    public void joinChat(final Long chatId, final WebSocketConnection connection) {
        if (Objects.isNull(chatId)) return;
        chatIdConnections.computeIfAbsent(chatId, r -> ConcurrentHashMap.newKeySet())
                .add(connection);
    }

    public void leaveChat(final Long chatId, final WebSocketConnection connection) {
        chatIdConnections.getOrDefault(chatId, Set.of()).remove(connection);
    }

    public void leaveAllChats(final WebSocketConnection connection) {
        chatIdConnections.values().forEach(connections -> connections.remove(connection));
    }

    public void sendToChat(final Long chatId, final String message) {
        for (final WebSocketConnection c : chatIdConnections.getOrDefault(chatId, Set.of())) {
            c.sendText(message);
        }
    }
}
