package backend.websocket;

import com.fasterxml.jackson.core.JsonProcessingException;
import com.fasterxml.jackson.databind.ObjectMapper;
import io.quarkus.websockets.next.WebSocketConnection;
import jakarta.enterprise.context.ApplicationScoped;
import jakarta.inject.Inject;
import lombok.extern.slf4j.Slf4j;

import java.util.Map;
import java.util.Set;
import java.util.concurrent.ConcurrentHashMap;

/*@Slf4j
@ApplicationScoped
public class ChatWebRegistry {

    private final Map<Long, Set<Long>> chatToUsers =
            new ConcurrentHashMap<>();
    private final Map<Long, Set<WebSocketConnection>> userToConnections =
            new ConcurrentHashMap<>();
    private final Map<Long, Set<WebSocketConnection>> userIdToConnectionMap =
            new ConcurrentHashMap<>();
    private final Map<WebSocketConnection, Long> connectionToUserIdMap =
            new ConcurrentHashMap<>();

    public void register(final Long userId, final WebSocketConnection connection) {
        userIdToConnectionMap
                .computeIfAbsent(userId, id -> ConcurrentHashMap.newKeySet())
                .add(connection);

        connectionToUserIdMap.put(connection, userId);
    }

    public void unregister(final WebSocketConnection connection) {
        final Long userId = connectionToUserIdMap.remove(connection);
        if (userId == null) {
            return;
        }

        final Set<WebSocketConnection> connections = userIdToConnectionMap.get(userId);
        if (connections != null) {
            connections.remove(connection);
            if (connections.isEmpty()) {
                userIdToConnectionMap.remove(userId);
            }
        }
    }

    public void addChat(final Long chatId, final Set<Long> userIds) {
        final Set<WebSocketConnection> connections = new HashSet<>();
        for (final Long userId : userIds) {
            final WebSocketConnection connection = userIdConnections.getOrDefault(userId, null);
            if (Objects.nonNull(connection)) {
                connections.add(connection);
            }
        }
        chatIdConnections.put(chatId, connections);
    }

    public void joinChat(final Long chatId, final Long userId) {
        chatToUsers
                .computeIfAbsent(chatId, id -> ConcurrentHashMap.newKeySet())
                .add(userId);
    }


    public void leaveChat(final Long chatId, final Long userId) {
        final Set<Long> users = chatToUsers.get(chatId);
        if (users != null) {
            users.remove(userId);
            if (users.isEmpty()) {
                chatToUsers.remove(chatId);
            }
        }
    }

    public void sendToChat(final Long chatId, final String json) {
        final Set<Long> userIds = chatToUsers.getOrDefault(chatId, Set.of());

        for (Long userId : userIds) {
            sendToUser(userId, json);
        }
    }

    public void sendToUser(final Long userId, final String message) {
        final Set<WebSocketConnection> connections = userToConnections.get(userId);
        if (Objects.nonNull(connections))
            connections.forEach(connection -> connection.sendText(message).subscribe().with(v -> {
            }));
    }
}*/
@Slf4j
@ApplicationScoped
public class ChatWebRegistry {
    @Inject
    ObjectMapper objectMapper;

    private final Map<Long, WebSocketConnection> userConnections = new ConcurrentHashMap<>();
    private final Map<WebSocketConnection, Long> connectionToUser = new ConcurrentHashMap<>();
    private final Map<Long, Long> userToChat = new ConcurrentHashMap<>();
    private final Map<Long, Set<Long>> chatToUsers = new ConcurrentHashMap<>();

    public void register(Long userId, WebSocketConnection connection) {
        userConnections.put(userId, connection);
        connectionToUser.put(connection, userId);
    }

    public synchronized void joinChat(Long userId, Long chatId) {
        leaveChat(userId);
        chatToUsers
                .computeIfAbsent(chatId, id -> ConcurrentHashMap.newKeySet())
                .add(userId);
        userToChat.put(userId, chatId);
    }

    public synchronized void leaveChat(Long userId) {
        final Long oldChatId = userToChat.remove(userId);
        if (oldChatId == null) return;

        final Set<Long> users = chatToUsers.get(oldChatId);
        if (users != null) {
            users.remove(userId);
            if (users.isEmpty()) {
                chatToUsers.remove(oldChatId);
            }
        }
    }

    public synchronized void unregister(final WebSocketConnection conn) {
        final Long userId = connectionToUser.remove(conn);
        if (userId == null) return;

        userConnections.remove(userId);

        final Long chatId = userToChat.remove(userId);
        if (chatId != null) {
            final Set<Long> users = chatToUsers.get(chatId);
            if (users != null) {
                users.remove(userId);
                if (users.isEmpty()) {
                    chatToUsers.remove(chatId);
                }
            }
        }
    }

    public void sendToChat(Long chatId, Object payload) {
        final Set<Long> users = chatToUsers.get(chatId);
        if (users == null) return;

        for (Long userId : users) {
            WebSocketConnection conn = userConnections.get(userId);
            if (conn != null) {
                sendAsJsonString(conn, payload);
            }
        }
    }

    public void sendToUser(Long userId, Object payload) {
        final WebSocketConnection connection = userConnections.get(userId);
        if (connection != null) {
            sendAsJsonString(connection, payload);
        }
    }

    private void sendAsJsonString(final WebSocketConnection connection, final Object payload) {
        try {
            final String jsonString = objectMapper.writeValueAsString(payload);
            connection.sendText(jsonString).subscribe().with(v -> {
            });
        } catch (JsonProcessingException jpe) {
            jpe.printStackTrace();
        }
    }
}

