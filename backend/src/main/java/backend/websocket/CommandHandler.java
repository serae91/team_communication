package backend.websocket;

import backend.bl_api.chat.usecase.create.ChatCreateService;
import backend.bl_api.message.usecase.create.MessageCreateService;
import backend.bl_api.rel_chat_user_attr.usecase.core.ChatUserViewService;
import backend.bl_entities.bl_chat.ChatBox;
import backend.bl_entities.bl_message.BLMessageView;
import backend.bl_entities.bl_rel_chat_user_attr.ChatUserView;
import backend.bl_entities.bl_rel_chat_user_attr.ReminderStatus;
import backend.websocket.model.incoming.ReceiveChatWebSocketMessage;
import backend.websocket.model.incoming.ReceiveMessageWebSocketMessage;
import backend.websocket.model.incoming.ReceiveUpdatedChatWebSocketMessage;
import backend.websocket.model.outgoing.CreateChatWebSocketMessage;
import backend.websocket.model.outgoing.OutgoingWebSocketMessage;
import backend.websocket.model.outgoing.SendMessageWebSocketMessage;
import backend.websocket.model.outgoing.SwitchChatWebSocketMessage;
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
    BLWebSocketService blWebSocketService;
    @Inject
    ChatCreateService chatCreateService;
    @Inject
    MessageCreateService messageCreateService;
    @Inject
    ChatUserViewService chatUserViewService;

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
        final ChatUserView chatUserView = chatCreateService.createChatFromDto(createChatWebSocketMessage.chatCreateDto(), chatRegistry.getUserIdByConnection(connection));
        final ReceiveChatWebSocketMessage receiveChatWebSocketMessage = new ReceiveChatWebSocketMessage(chatUserView);
        createChatWebSocketMessage.chatCreateDto().userIds().forEach(userId ->
                chatRegistry.sendToUser(userId, receiveChatWebSocketMessage)
        );
    }

    private void handleSendMessage(final SendMessageWebSocketMessage sendMessageWebSocketMessage, final WebSocketConnection connection) {
        final List<ChatUserView> chatUserViews = chatUserViewService.listByChatId(sendMessageWebSocketMessage.chatId());
        final Long userId = chatRegistry.getUserIdByConnection(connection);
        final List<ReceiveUpdatedChatWebSocketMessage> updatedChats = chatUserViews.stream().map(chatUserView -> {
            final ChatBox chatBox = chatUserView.getChatBox();
            chatUserView.setReminderAt(null);
            chatUserView.setReminderStatus(ReminderStatus.NONE);
            chatUserView.setLastMessageUserId(userId);
            return new ReceiveUpdatedChatWebSocketMessage(chatUserView, chatBox);
        }).toList();
        final BLMessageView blMessageView = messageCreateService.createMessageFromDto(sendMessageWebSocketMessage.blMessage(), userId);

        chatRegistry.sendToChat(sendMessageWebSocketMessage.chatId(), new ReceiveMessageWebSocketMessage(blMessageView));

        for (final ReceiveUpdatedChatWebSocketMessage updatedChat : updatedChats) {
            chatRegistry.sendToUser(updatedChat.chatUserView().getUserId(), updatedChat);
        }
    }

    private void handleSwitchChat(final SwitchChatWebSocketMessage switchChatWebSocketMessage, final WebSocketConnection connection) {
        log.info("Switching chat");
        chatRegistry.joinChat(connection, switchChatWebSocketMessage.chatId());
    }

    private void handleTypingStart(final OutgoingWebSocketMessage outgoingWebsocketMessage, final WebSocketConnection connection) {

    }

    private void handleTypingStop(final OutgoingWebSocketMessage outgoingWebsocketMessage, final WebSocketConnection connection) {

    }

}
