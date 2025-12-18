package backend.websocket;

import backend.chat.core.ChatService;
import backend.chat.usecase.create.ChatCreateService;
import backend.entities.bl_chat.BLChatView;
import backend.entities.bl_message.BLMessageView;
import backend.message.core.MessageService;
import backend.message.usecase.create.MessageCreateService;
import backend.websocket.model.incoming.ReceiveChatWebSocketMessage;
import backend.websocket.model.incoming.ReceiveChatsWebSocketMessage;
import backend.websocket.model.incoming.ReceiveMessageWebSocketMessage;
import backend.websocket.model.incoming.ReceiveMessagesWebSocketMessage;
import backend.websocket.model.outgoing.CreateChatWebSocketMessage;
import backend.websocket.model.outgoing.OutgoingWebSocketMessage;
import backend.websocket.model.outgoing.RequestChatsWebSocketMessage;
import backend.websocket.model.outgoing.SendMessageWebSocketMessage;
import backend.websocket.model.outgoing.SwitchChatWebSocketMessage;
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
    ChatWebRegistry chatRegistry;

    @Inject
    ChatService chatService;

    @Inject
    ChatCreateService chatCreateService;

    @Inject
    MessageService messageService;

    @Inject
    MessageCreateService messageCreateService;

    @Inject
    ObjectMapper objectMapper;
    @Inject
    ChatWebRegistry chatWebRegistry;

    public void handleCommand(final OutgoingWebSocketMessage outgoingWebsocketMessage, final WebSocketConnection connection) {
        switch (outgoingWebsocketMessage) {
            case CreateChatWebSocketMessage cc -> handleCreateChat(cc, connection);
            case RequestChatsWebSocketMessage rc -> handleRequestChats(rc, connection);
            case SendMessageWebSocketMessage sm -> handleSendMessage(sm, connection);
            case SwitchChatWebSocketMessage sc -> handleSwitchChat(sc, connection);
            default ->
                    throw new IllegalStateException("Unexpected OutgoingWebsocketMessage type: " + outgoingWebsocketMessage);
        }
    }

    private void handleCreateChat(final CreateChatWebSocketMessage createChatWebSocketMessage, final WebSocketConnection connection) {
        try {
            final BLChatView chatView = chatCreateService.createChatFromDto(createChatWebSocketMessage.chatCreateDto());
            final ReceiveChatWebSocketMessage receiveChatWebSocketMessage = new ReceiveChatWebSocketMessage("RECEIVE_CHAT", chatView);
            final String jsonString = objectMapper.writeValueAsString(receiveChatWebSocketMessage);
            chatRegistry.addChat(chatView.getId(), createChatWebSocketMessage.chatCreateDto().userIds());
            chatRegistry.sendToChat(chatView.getId(), jsonString);
        } catch (JsonProcessingException jpe) {
            jpe.printStackTrace();
        }
    }

    private void handleRequestChats(final RequestChatsWebSocketMessage requestChatsWebSocketMessage, final WebSocketConnection connection) {
        try {
            chatWebRegistry.registerUserConnection(requestChatsWebSocketMessage.userId(), connection);
            final List<BLChatView> chats = chatService.getChatListByUserId(requestChatsWebSocketMessage.userId());
            final ReceiveChatsWebSocketMessage receiveChatsWebSocketMessage = new ReceiveChatsWebSocketMessage("RECEIVE_CHATS", chats);
            final String jsonString = objectMapper.writeValueAsString(receiveChatsWebSocketMessage);
            connection.sendText(jsonString).subscribe().with(v -> {
            });
        } catch (JsonProcessingException jpe) {
            jpe.printStackTrace();
        }
    }

    private void handleSendMessage(final SendMessageWebSocketMessage sendMessageWebSocketMessage, final WebSocketConnection connection) {
        log.info("handleSendMessage");
        try {
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

        try {
            chatRegistry.leaveAllChats(connection);
            chatRegistry.joinChat(switchChatWebSocketMessage.chatId(), connection);
            final List<BLMessageView> blMessageViews = messageService.getBLMessageViewsByChatId(switchChatWebSocketMessage.chatId());
            final ReceiveMessagesWebSocketMessage chatMessages = new ReceiveMessagesWebSocketMessage("RECEIVE_MESSAGES", switchChatWebSocketMessage.chatId(), blMessageViews);
            final String jsonString = objectMapper.writeValueAsString(chatMessages);
            log.info("Sending chat messages {} ", jsonString);
            connection.sendText(jsonString).subscribe().with(v -> {
            });
        } catch (JsonProcessingException jpe) {
            jpe.printStackTrace();
        }
    }

    private void handleTypingStart(final OutgoingWebSocketMessage outgoingWebsocketMessage, final WebSocketConnection connection) {

    }

    private void handleTypingStop(final OutgoingWebSocketMessage outgoingWebsocketMessage, final WebSocketConnection connection) {

    }
}
