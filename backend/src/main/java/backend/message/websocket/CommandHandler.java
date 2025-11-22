package backend.message.websocket;

import backend.entities.bl_message.BLMessageView;
import backend.message.core.MessageService;
import backend.message.websocket.model.ChatMessagesWebSocketMessage;
import backend.message.websocket.model.WebsocketMessage;
import com.fasterxml.jackson.core.JsonProcessingException;
import com.fasterxml.jackson.databind.JsonMappingException;
import com.fasterxml.jackson.databind.ObjectMapper;
import io.quarkus.websockets.next.WebSocketConnection;
import jakarta.annotation.PostConstruct;
import jakarta.enterprise.context.ApplicationScoped;
import jakarta.inject.Inject;
import lombok.extern.slf4j.Slf4j;

import java.util.HashMap;
import java.util.List;
import java.util.Map;
import java.util.function.BiConsumer;
import java.util.function.Consumer;

@Slf4j
@ApplicationScoped
public class CommandHandler {
    @Inject
    WebRegistry messageRegistry;

    @Inject
    ChatWebRegistry chatRegistry;

    @Inject
    MessageService messageService;

    @Inject
    ObjectMapper objectMapper;

    private final Map<String, BiConsumer<WebsocketMessage, WebSocketConnection>> handlers = new HashMap<>();

    @PostConstruct
    private void init() {
        handlers.put("INITIAL_LOAD", this::handleInitialLoad);
        handlers.put("SEND_MESSAGE", this::handleSendMessage);
        handlers.put("SWITCH_CHAT", this::handleSwitchChat);
        handlers.put("TYPING_START", this::handleTypingStart);
        handlers.put("TYPING_STOP", this::handleTypingStop);
    }

    public void handleCommand(final WebsocketMessage websocketMessage, final WebSocketConnection connection) {
        final BiConsumer<WebsocketMessage, WebSocketConnection> handler = handlers.get(websocketMessage.getType());
        if (handler != null) {
            handler.accept(websocketMessage, connection);
        } else {
            log.warn("Unknown message type: " + websocketMessage.getType());
        }
    }

    private void handleInitialLoad(final WebsocketMessage websocketMessage, final WebSocketConnection connection) {

    }

    private void handleSendMessage(final WebsocketMessage websocketMessage, final WebSocketConnection connection) {

    }

    private void handleSwitchChat(final WebsocketMessage websocketMessage, final WebSocketConnection connection) {
        log.info("Switching chat");
        log.info(websocketMessage.getChatId().toString());
        try{
            chatRegistry.joinChat(websocketMessage.getChatId(), connection);
            final List<BLMessageView> blMessageViews = messageService.getBLMessageViewsByChatId(websocketMessage.getChatId());
            final ChatMessagesWebSocketMessage chatMessages = new ChatMessagesWebSocketMessage(blMessageViews, "CHAT_MESSAGES", websocketMessage.getChatId());
            final String jsonString = objectMapper.writeValueAsString(chatMessages);
            log.info("Sending chat messages {} ", jsonString);
            connection.sendText(jsonString);
        }
        catch (JsonProcessingException jpe) {
            jpe.printStackTrace();
        }
    }

    private void handleTypingStart(final WebsocketMessage websocketMessage, final WebSocketConnection connection) {

    }

    private void handleTypingStop(final WebsocketMessage websocketMessage, final WebSocketConnection connection) {

    }
}
