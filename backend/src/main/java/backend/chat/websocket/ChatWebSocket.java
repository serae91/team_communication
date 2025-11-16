package backend.chat.websocket;

import backend.chat.core.ChatService;
import backend.entities.bl_chat.BLChat;
import backend.entities.bl_chat.BLChatPlainView;
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

import java.net.URLDecoder;
import java.nio.charset.StandardCharsets;
import java.util.Arrays;
import java.util.Map;
import java.util.stream.Collectors;

@Singleton
@Slf4j
@WebSocket(path = "/chatwebsocket")
public class ChatWebSocket {

    @Inject
    BLWebRegistry chatRegistry;

    @Inject
    ObjectMapper objectMapper;

    @Inject
    ChatService chatService;

    @OnOpen
    void onOpen(final WebSocketConnection connection) {
        log.info("Client connected: {}", connection.id());
    }

    @OnClose
    void onClose(final WebSocketConnection connection) {
        log.info("Client disconnected: {}", connection.id());
    }

    @OnTextMessage
    void onMessage(final BLChat chat, final WebSocketConnection connection) {
        log.info("Received: {}", chat);
        try {
            final Long chatId = chat.getId();
            final String stringMessage = objectMapper.writeValueAsString(chat);
            chatRegistry.sendToRoom(chatId, stringMessage);
        } catch (final JsonProcessingException jpe) {
            log.error("Error sending chat message", jpe);
        }
    }

    @OnError
    public void onError(final Throwable error, final WebSocketConnection connection) {
        log.error("WebSocket Error: ", error);
    }

    private Map<String, String> parseQuery(String query) {
        return Arrays.stream(query.split("&"))
                .map(s -> s.split("=", 2))
                .filter(arr -> arr.length == 2)
                .collect(Collectors.toMap(arr -> URLDecoder.decode(arr[0], StandardCharsets.UTF_8),
                        arr -> URLDecoder.decode(arr[1], StandardCharsets.UTF_8)));
    }
}
