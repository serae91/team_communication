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
import io.smallrye.jwt.auth.principal.ParseException;
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
    void onOpen(final WebSocketConnection connection, @PathParam("token") final String token) {
        if (token == null || token.isBlank()) {
            connection.close();
            return;
        }

        try {
            final String decodedToken = URLDecoder.decode(token, StandardCharsets.UTF_8);
            final JsonWebToken jwt = jwtParser.parse(decodedToken);
            final Object userIdClaim = jwt.getClaim("id");
            final Long userId = getUserId(userIdClaim);
            if (userId == null) {
                connection.close().subscribe().with(v -> {
                });
                return;
            }
            chatWebRegistry.register(userId, connection);
        } catch (final ParseException parseException) {
            connection.close().subscribe().with(v -> {
            });
        }
    }

    private Long getUserId(final Object userIdClaim) {
        if (userIdClaim instanceof jakarta.json.JsonNumber jsonNum) {
            return jsonNum.longValue();
        }
        if (userIdClaim instanceof Number n) {
            return n.longValue();
        }
        if (userIdClaim instanceof String s) {
            return Long.valueOf(s);
        }
        return null;
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
