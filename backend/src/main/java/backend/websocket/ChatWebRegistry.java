package backend.websocket;

import io.quarkus.websockets.next.WebSocketConnection;
import jakarta.enterprise.context.ApplicationScoped;
import lombok.extern.slf4j.Slf4j;

import java.util.HashSet;
import java.util.Map;
import java.util.Objects;
import java.util.Set;
import java.util.concurrent.ConcurrentHashMap;

@Slf4j
@ApplicationScoped
public class ChatWebRegistry {

    private final Map<Long, Set<WebSocketConnection>> chatIdConnections = new ConcurrentHashMap<>();
    private final Map<Long, WebSocketConnection> userIdConnections = new ConcurrentHashMap<>();

    public void registerUserConnection(final Long userId, final WebSocketConnection connection) {
        log.info("Registering user connection with id {}", userId);
        userIdConnections.put(userId, connection);
    }

    public void addChat(final Long chatId, final Set<Long> userIds) {
        final Set<WebSocketConnection> connections = new HashSet<>();
        for (final Long userId : userIds) {
            final WebSocketConnection connection = userIdConnections.getOrDefault(userId, null);
            if(Objects.nonNull(connection)) {
                connections.add(connection);
            }
        }
        chatIdConnections.put(chatId, connections);
    }

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
            c.sendText(message).subscribe().with(v -> {});
        }
    }
}
