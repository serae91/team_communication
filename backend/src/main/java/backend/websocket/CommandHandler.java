package backend.websocket;

import backend.entities.bl_chat.BLChatIdView;
import backend.entities.bl_message.BLMessageCreateView;
import backend.entities.bl_message.BLMessageView;
import backend.entities.bl_user.BLUserIdView;
import backend.message.core.MessageService;
import backend.message.usecase.create.MessageCreateService;
import backend.websocket.model.outgoing.OutgoingWebSocketMessage;
import backend.websocket.model.incoming.ReceiveMessageWebSocketMessage;
import backend.websocket.model.incoming.ChatMessagesWebSocketMessage;
import backend.websocket.model.outgoing.SendMessageWebSocketMessage;
import backend.websocket.model.outgoing.SwitchChatWebSocketMessage;
import com.blazebit.persistence.view.EntityViewManager;
import com.fasterxml.jackson.core.JsonProcessingException;
import com.fasterxml.jackson.databind.ObjectMapper;
import io.quarkus.websockets.next.WebSocketConnection;
import jakarta.enterprise.context.ApplicationScoped;
import jakarta.inject.Inject;
import lombok.extern.slf4j.Slf4j;

import java.util.List;

@Slf4j
@ApplicationScoped
public class CommandHandler {

    @Inject
    EntityViewManager entityViewManager;

    @Inject
    ChatWebRegistry chatRegistry;

    @Inject
    MessageService messageService;

    @Inject
    MessageCreateService messageCreateService;

    @Inject
    ObjectMapper objectMapper;

    /*private final Map<String, BiConsumer<OutgoingWebSocketMessage, WebSocketConnection>> handlers = new HashMap<>();

    @PostConstruct
    private void init() {
        handlers.put("INITIAL_LOAD", this::handleInitialLoad);
        handlers.put("SEND_MESSAGE", this::handleSendMessage);
        handlers.put("SWITCH_CHAT", this::handleSwitchChat);
        handlers.put("TYPING_START", this::handleTypingStart);
        handlers.put("TYPING_STOP", this::handleTypingStop);
    }*/

    public void handleCommand(final OutgoingWebSocketMessage outgoingWebsocketMessage, final WebSocketConnection connection) {
        /*final BiConsumer<OutgoingWebSocketMessage, WebSocketConnection> handler = handlers.get(outgoingWebsocketMessage.getType());
        if (handler != null) {
            handler.accept(outgoingWebsocketMessage, connection);
        } else {
            log.warn("Unknown message type: " + outgoingWebsocketMessage.getType());
        }*/
        switch (outgoingWebsocketMessage) {
            case SendMessageWebSocketMessage sm -> handleSendMessage(sm, connection);
            case SwitchChatWebSocketMessage sc -> handleSwitchChat(sc, connection);
            default -> throw new IllegalStateException("Unexpected OutgoingWebsocketMessage type: " + outgoingWebsocketMessage);
        }
    }

    private void handleInitialLoad(final OutgoingWebSocketMessage outgoingWebsocketMessage, final WebSocketConnection connection) {

    }

    private void handleSendMessage(final SendMessageWebSocketMessage sendMessageWebSocketMessage, final WebSocketConnection connection) {
        log.info("handleSendMessage");
        try{
            final BLMessageView blMessageView = messageCreateService.createMessageFromDto(sendMessageWebSocketMessage.blMessage());
            final ReceiveMessageWebSocketMessage chatMessage = new ReceiveMessageWebSocketMessage("RECEIVE_MESSAGE", sendMessageWebSocketMessage.chatId(), blMessageView);
            final String jsonString = objectMapper.writeValueAsString(chatMessage);
            log.info("Sending chat message {} ", jsonString);
            chatRegistry.sendToChat(sendMessageWebSocketMessage.chatId(), jsonString);
        } catch (JsonProcessingException jpe) {
            jpe.printStackTrace();
        }
    }

    private void handleSwitchChat(final SwitchChatWebSocketMessage switchChatWebSocketMessage, final WebSocketConnection connection) {
        log.info("Switching chat");

        try{
            chatRegistry.leaveAllChats(connection);
            chatRegistry.joinChat(switchChatWebSocketMessage.chatId(), connection);
            final List<BLMessageView> blMessageViews = messageService.getBLMessageViewsByChatId(switchChatWebSocketMessage.chatId());
            final ChatMessagesWebSocketMessage chatMessages = new ChatMessagesWebSocketMessage("CHAT_MESSAGES", switchChatWebSocketMessage.chatId(), blMessageViews);
            final String jsonString = objectMapper.writeValueAsString(chatMessages);
            log.info("Sending chat messages {} ", jsonString);
            connection.sendText(jsonString).subscribe().with(v -> {});
        }
        catch (JsonProcessingException jpe) {
            jpe.printStackTrace();
        }
    }

    private void handleTypingStart(final OutgoingWebSocketMessage outgoingWebsocketMessage, final WebSocketConnection connection) {

    }

    private void handleTypingStop(final OutgoingWebSocketMessage outgoingWebsocketMessage, final WebSocketConnection connection) {

    }
}
