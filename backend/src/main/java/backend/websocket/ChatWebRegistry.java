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

@Slf4j
@ApplicationScoped
public class ChatWebRegistry {
    @Inject
    ObjectMapper objectMapper;

    private final Map<Long, WebSocketConnection> userConnections = new ConcurrentHashMap<>();
    private final Map<WebSocketConnection, Long> connectionToUser = new ConcurrentHashMap<>();
    private final Map<Long, Long> userToChat = new ConcurrentHashMap<>();
    private final Map<Long, Set<Long>> chatToUsers = new ConcurrentHashMap<>();

    public void register(final Long userId, final WebSocketConnection connection) {
        userConnections.put(userId, connection);
        connectionToUser.put(connection, userId);
    }

    public synchronized void joinChat(final Long userId, final Long chatId) {
        leaveChat(userId);
        if (chatId != null) {
            chatToUsers
                    .computeIfAbsent(chatId, id -> ConcurrentHashMap.newKeySet())
                    .add(userId);
            userToChat.put(userId, chatId);
        }
    }

    public synchronized void joinChat(final WebSocketConnection connection, final Long chatId) {
        final Long userId = connectionToUser.get(connection);
        joinChat(userId, chatId);
    }

    public synchronized void leaveChat(final Long userId) {
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

    public void sendToChat(final Long chatId, final Object payload) {
        final Set<Long> users = chatToUsers.get(chatId);
        if (users == null) return;

        for (final Long userId : users) {
            final WebSocketConnection conn = userConnections.get(userId);
            if (conn != null) {
                sendAsJsonString(conn, payload);
            }
        }
    }

    public void sendToUser(final Long userId, final Object payload) {
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

    public Long getUserIdByConnection(final WebSocketConnection connection) {
        return connectionToUser.get(connection);
    }

    public Set<Long> getToChatConnectedUsers(final Long chatId) {
        return chatToUsers.get(chatId);
    }
}

