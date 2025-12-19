package backend.websocket;

import backend.websocket.model.outgoing.OutgoingWebSocketMessage;
import com.fasterxml.jackson.core.JsonProcessingException;
import com.fasterxml.jackson.databind.ObjectMapper;
import io.quarkus.websockets.next.OnClose;
import io.quarkus.websockets.next.OnError;
import io.quarkus.websockets.next.OnOpen;
import io.quarkus.websockets.next.OnTextMessage;
import io.quarkus.websockets.next.PathParam;
import io.quarkus.websockets.next.WebSocket;
import io.quarkus.websockets.next.WebSocketConnection;
import io.smallrye.jwt.auth.principal.JWTParser;
import jakarta.inject.Inject;
import jakarta.inject.Singleton;
import lombok.extern.slf4j.Slf4j;
import org.eclipse.microprofile.jwt.JsonWebToken;

import java.net.URLDecoder;
import java.nio.charset.StandardCharsets;

@Singleton
@Slf4j
@WebSocket(path = "/blwebsocket/{token}")
public class BLWebSocket {
    @Inject
    ObjectMapper objectMapper;
    @Inject
    CommandHandler commandHandler;

    @Inject
    ChatWebRegistry chatWebRegistry;
    @Inject
    JWTParser jwtParser;


    @OnOpen
    void onOpen(WebSocketConnection connection, @PathParam("token") String token) {
        if (token == null || token.isBlank()) {
            connection.close();
            return;
        }

        try {
            // URL-decode, falls PathParam
            String decodedToken = URLDecoder.decode(token, StandardCharsets.UTF_8);

            // Parse JWT
            JsonWebToken jwt = jwtParser.parse(decodedToken);

            // Claim auslesen
            Object userIdClaim = jwt.getClaim("userId");
            Long userId = null;

            if (userIdClaim instanceof jakarta.json.JsonNumber jsonNum) {
                userId = jsonNum.longValue();
            } else if (userIdClaim instanceof Number n) {
                userId = n.longValue();
            } else if (userIdClaim instanceof String s) {
                userId = Long.valueOf(s);
            } else {
                connection.close().subscribe().with(v -> {
                });
                return;
            }

            chatWebRegistry.register(userId, connection);
        } catch (Exception e) {
            connection.close().subscribe().with(v -> {
            });
        }
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
