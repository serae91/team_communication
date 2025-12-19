package backend.websocket;

import backend.chat.usecase.create.ChatCreateService;
import backend.entities.bl_chat.BLChatView;
import backend.entities.bl_message.BLMessageView;
import backend.message.usecase.create.MessageCreateService;
import backend.websocket.model.incoming.ReceiveChatWebSocketMessage;
import backend.websocket.model.incoming.ReceiveMessageWebSocketMessage;
import backend.websocket.model.outgoing.CreateChatWebSocketMessage;
import backend.websocket.model.outgoing.OutgoingWebSocketMessage;
import backend.websocket.model.outgoing.SendMessageWebSocketMessage;
import backend.websocket.model.outgoing.SwitchChatWebSocketMessage;
import io.quarkus.websockets.next.WebSocketConnection;
import jakarta.enterprise.context.ApplicationScoped;
import jakarta.inject.Inject;
import lombok.extern.slf4j.Slf4j;

@Slf4j
@ApplicationScoped
public class CommandHandler {

    @Inject
    ChatWebRegistry chatRegistry;
    @Inject
    ChatCreateService chatCreateService;
    @Inject
    MessageCreateService messageCreateService;

    public void handleCommand(final OutgoingWebSocketMessage outgoingWebsocketMessage, final WebSocketConnection connection) {
        switch (outgoingWebsocketMessage) {
            case CreateChatWebSocketMessage cc -> handleCreateChat(cc, connection);
            case SendMessageWebSocketMessage sm -> handleSendMessage(sm, connection);
            case SwitchChatWebSocketMessage sc -> handleSwitchChat(sc, connection);
            default ->
                    throw new IllegalStateException("Unexpected OutgoingWebsocketMessage type: " + outgoingWebsocketMessage);
        }
    }

    private void handleCreateChat(final CreateChatWebSocketMessage createChatWebSocketMessage, final WebSocketConnection connection) {
        final BLChatView chatView = chatCreateService.createChatFromDto(createChatWebSocketMessage.chatCreateDto());
        final ReceiveChatWebSocketMessage receiveChatWebSocketMessage = new ReceiveChatWebSocketMessage("RECEIVE_CHAT", chatView);
        //chatRegistry.addChat(chatView.getId(), createChatWebSocketMessage.chatCreateDto().userIds());
        //chatRegistry.sendToChat(chatView.getId(), receiveChatWebSocketMessage);
        createChatWebSocketMessage.chatCreateDto().userIds().forEach(userId -> {
            chatRegistry.sendToUser(userId, receiveChatWebSocketMessage);
        });
    }

    private void handleSendMessage(final SendMessageWebSocketMessage sendMessageWebSocketMessage, final WebSocketConnection connection) {
        final BLMessageView blMessageView = messageCreateService.createMessageFromDto(sendMessageWebSocketMessage.blMessage());
        final ReceiveMessageWebSocketMessage chatMessage = new ReceiveMessageWebSocketMessage("RECEIVE_MESSAGE", sendMessageWebSocketMessage.chatId(), blMessageView);
        chatRegistry.sendToChat(sendMessageWebSocketMessage.chatId(), chatMessage);
    }

    private void handleSwitchChat(final SwitchChatWebSocketMessage switchChatWebSocketMessage, final WebSocketConnection connection) {
        log.info("Switching chat");
        //chatRegistry.joinChat(switchChatWebSocketMessage.chatId(), securityService.getUserId());
        /*try {
            chatRegistry.joinChat(switchChatWebSocketMessage.chatId(), connection);
            final List<BLMessageView> blMessageViews = messageService.getForChatId(switchChatWebSocketMessage.chatId());
            final ReceiveMessagesWebSocketMessage chatMessages = new ReceiveMessagesWebSocketMessage("RECEIVE_MESSAGES", switchChatWebSocketMessage.chatId(), blMessageViews);
            final String jsonString = objectMapper.writeValueAsString(chatMessages);
            log.info("Sending chat messages {} ", jsonString);
            connection.sendText(jsonString).subscribe().with(v -> {
            });
        } catch (JsonProcessingException jpe) {
            jpe.printStackTrace();
        }*/
    }

    private void handleTypingStart(final OutgoingWebSocketMessage outgoingWebsocketMessage, final WebSocketConnection connection) {

    }

    private void handleTypingStop(final OutgoingWebSocketMessage outgoingWebsocketMessage, final WebSocketConnection connection) {

    }

}
