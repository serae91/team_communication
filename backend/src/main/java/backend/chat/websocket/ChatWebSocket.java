package backend.chat.websocket;

import backend.entities.bl_message.BLMessage;
import backend.webregistry.BLWebRegistry;
import com.fasterxml.jackson.core.JsonProcessingException;
import com.fasterxml.jackson.databind.ObjectMapper;
import io.quarkus.websockets.next.OnClose;
import io.quarkus.websockets.next.OnError;
import io.quarkus.websockets.next.OnOpen;
import io.quarkus.websockets.next.OnTextMessage;
import io.quarkus.websockets.next.WebSocket;

import io.quarkus.websockets.next.WebSocketConnection;
import jakarta.inject.Inject;
import jakarta.inject.Singleton;
import lombok.extern.slf4j.Slf4j;

@Singleton
@Slf4j
@WebSocket(path = "/chatwebsocket")
public class ChatWebSocket {

    @Inject
    BLWebRegistry chatRegistry;

    @Inject
    ObjectMapper objectMapper;

    @OnOpen
    void onOpen(final WebSocketConnection connection) {
        log.info("Client connected: {}", connection.id());
    }

    @OnClose
    void onClose(final WebSocketConnection connection) {
        log.info("Client disconnected: {}", connection.id());
    }

    @OnTextMessage
    void onMessage(final BLMessage message) {
        log.info("Received: {}", message);
        try {
            final String stringMessage = objectMapper.writeValueAsString(message);
            chatRegistry.sendToRoom(message.getChat().getId(), objectMapper.writeValueAsString(message));
        } catch (final JsonProcessingException jpe) {
            log.error("Error sending chat message", jpe);
        }
    }

    @OnError
    public void onError(final Throwable error, final WebSocketConnection connection) {
        log.error("WebSocket Error: ", error);
    }
}
