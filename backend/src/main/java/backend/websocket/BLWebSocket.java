package backend.websocket;

import backend.auth.core.SecurityService;
import backend.chat.core.ChatService;
import backend.websocket.model.outgoing.OutgoingWebSocketMessage;
import com.fasterxml.jackson.core.JsonProcessingException;
import com.fasterxml.jackson.databind.ObjectMapper;
import io.quarkus.security.identity.SecurityIdentity;
import io.quarkus.websockets.next.OnClose;
import io.quarkus.websockets.next.OnError;
import io.quarkus.websockets.next.OnOpen;
import io.quarkus.websockets.next.OnTextMessage;
import io.quarkus.websockets.next.WebSocket;
import io.quarkus.websockets.next.WebSocketConnection;
import jakarta.inject.Inject;
import jakarta.inject.Singleton;
import jakarta.ws.rs.WebApplicationException;
import jakarta.ws.rs.core.Response;
import lombok.extern.slf4j.Slf4j;

@Singleton
@Slf4j
@WebSocket(path = "/blwebsocket")
public class BLWebSocket {
    @Inject
    ObjectMapper objectMapper;
    @Inject
    CommandHandler commandHandler;
    @Inject
    SecurityService securityService;
    @Inject
    SecurityIdentity identity;

    @Inject
    ChatWebRegistry chatWebRegistry;
    @Inject
    ChatService chatService;

    @OnOpen
    void onOpen(final WebSocketConnection connection) {
        log.info("Client connected: {}", connection.id());
        
        if (identity.isAnonymous()) {
            throw new WebApplicationException(Response.Status.UNAUTHORIZED);
        }

        Long userId = identity.getAttribute("userId");
        log.info("WS connected userId=" + userId);

        chatWebRegistry.register(userId, connection);

        chatService.getChatIdsByUserId(userId)
                .forEach(chatId -> chatWebRegistry.joinChat(chatId, userId));
    }

    @OnClose
    void onClose(final WebSocketConnection connection) {
        log.info("Client disconnected: {}", connection.id());
        chatWebRegistry.unregister(connection);
    }

    @OnTextMessage
    void onMessage(final String message, final WebSocketConnection connection) {
        log.info("Message received: {}", message);
        try {
            final OutgoingWebSocketMessage outgoingWebsocketMessage = objectMapper.readValue(message, OutgoingWebSocketMessage.class);
            log.info("Received message string: {}", message);
            commandHandler.handleCommand(outgoingWebsocketMessage, connection);
        } catch (JsonProcessingException jpe) {
            log.error("Invalid JSON", jpe);
        }
    }

    @OnError
    public void onError(final Throwable error, final WebSocketConnection connection) {
        log.error("BLWebSocket Error: ", error);
    }
}
