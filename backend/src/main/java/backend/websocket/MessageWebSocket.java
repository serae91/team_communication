package backend.websocket;

import backend.websocket.model.WebsocketMessage;
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

import java.net.URLDecoder;
import java.nio.charset.StandardCharsets;
import java.util.Arrays;
import java.util.Map;
import java.util.stream.Collectors;

@Singleton
@Slf4j
@WebSocket(path = "/messagewebsocket")
public class MessageWebSocket {

    @Inject
    ObjectMapper objectMapper;

    @Inject
    CommandHandler commandHandler;



    @OnOpen
    void onOpen(final WebSocketConnection connection) {
        log.info("Client connected: {}", connection.id());
    }

    @OnClose
    void onClose(final WebSocketConnection connection) {
        log.info("Client disconnected: {}", connection.id());
    }

    @OnTextMessage
    void onMessage(final String message, final WebSocketConnection connection) {
        try {
            final WebsocketMessage websocketMessage = objectMapper.readValue(message, WebsocketMessage.class);
            log.info("Received message string: {}", message);
            commandHandler.handleCommand(websocketMessage, connection);
        } catch (JsonProcessingException jpe) {
            log.error("Invalid JSON", jpe);
        }
    }

    @OnError
    public void onError(final Throwable error, final WebSocketConnection connection) {
        log.error("MessageWebSocket Error: ", error);
    }
}
