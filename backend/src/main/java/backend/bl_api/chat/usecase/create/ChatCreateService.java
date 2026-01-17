package backend.bl_api.chat.usecase.create;

import backend.bl_api.chat.core.ChatRepository;
import backend.bl_api.chat.core.RelChatUserRepository;
import backend.bl_api.message.usecase.create.MessageCreateService;
import backend.bl_api.rel_chat_user_attr.usecase.core.ChatUserViewService;
import backend.bl_api.user.core.UserService;
import backend.bl_entities.bl_chat.BLChat;
import backend.bl_entities.bl_chat.BLChatCreateDto;
import backend.bl_entities.bl_message.BLMessage;
import backend.bl_entities.bl_rel_chat_user.BLRelChatUser;
import backend.bl_entities.bl_rel_chat_user_attr.ChatUserView;
import backend.bl_entities.bl_user.BLUser;
import jakarta.enterprise.context.Dependent;
import jakarta.inject.Inject;
import jakarta.transaction.Transactional;

import java.time.Instant;

@Dependent
public class ChatCreateService {
    @Inject
    ChatRepository chatRepository;
    @Inject
    UserService userService;
    @Inject
    RelChatUserRepository relChatUserRepository;
    @Inject
    MessageCreateService messageCreateService;
    @Inject
    ChatUserViewService chatUserViewService;

    @Transactional
    public ChatUserView createChatFromDto(final BLChatCreateDto chatCreateDto, final Long senderId) {
        final Instant createdAt = Instant.now();
        chatCreateDto.userIds().add(senderId);

        final BLChat chat = BLChat.builder()
                .title(chatCreateDto.title())
                .urgency(chatCreateDto.urgency())
                .createdAt(createdAt)
                .lastMessageUserId(senderId)
                .build();
        chatRepository.persist(chat);
        chatCreateDto.userIds().forEach(id -> {
            final BLUser user = userService.getUserById(id);
            final BLRelChatUser relChatUser = BLRelChatUser.builder().user(user).chat(chat).build();
            relChatUserRepository.persist(relChatUser);
        });
        final BLUser sender = BLUser.builder().id(senderId).build();
        final BLMessage firstMessage = BLMessage.builder()
                .sender(sender)
                .chat(chat)
                .text(chatCreateDto.firstMessageText())
                .createdAt(createdAt)
                .build();
        messageCreateService.persist(firstMessage);
        return chatUserViewService.findByChatIdAndUserId(chat.getId(), senderId);
    }
}
