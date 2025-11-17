package backend.message.websocket;

import backend.entities.bl_message.BLMessage;
import backend.entities.bl_message.BLMessageCommand;
import backend.message.core.MessageService;
import com.fasterxml.jackson.core.JsonProcessingException;
import com.fasterxml.jackson.databind.ObjectMapper;
import io.quarkus.websockets.next.OnClose;
import io.quarkus.websockets.next.OnError;
import io.quarkus.websockets.next.OnOpen;
import io.quarkus.websockets.next.OnTextMessage;
import io.quarkus.websockets.next.WebSocket;
import io.quarkus.websockets.next.WebSocketConnection;
import jakarta.annotation.PostConstruct;
import jakarta.inject.Inject;
import jakarta.inject.Singleton;
import lombok.extern.slf4j.Slf4j;

import java.net.URLDecoder;
import java.nio.charset.StandardCharsets;
import java.util.Arrays;
import java.util.function.Consumer;
import java.util.HashMap;
import java.util.Map;
import java.util.stream.Collectors;

@Singleton
@Slf4j
@WebSocket(path = "/messagewebsocket")
public class MessageWebSocket {

    @Inject
    ObjectMapper objectMapper;

    @Inject
    MessageCommandHandler messageCommandHandler;



    @OnOpen
    void onOpen(final WebSocketConnection connection) {
        log.info("Client connected: {}", connection.id());
    }

    @OnClose
    void onClose(final WebSocketConnection connection) {
        log.info("Client disconnected: {}", connection.id());
    }

    @OnTextMessage
    void onMessage(final String jsonStr, final WebSocketConnection connection) {
        try {
            final BLMessageCommand command = objectMapper.readValue(jsonStr, BLMessageCommand.class);
            messageCommandHandler.handleMessageCommand(command);
        } catch (JsonProcessingException jpe) {
            log.error("Invalid JSON", jpe);
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
