package backend.chat.usecase.create;

import backend.auth.core.UserService;
import backend.chat.core.ChatRepository;
import backend.chat.core.ChatService;
import backend.chat.core.RelChatUserRepository;
import backend.entities.bl_chat.BLChat;
import backend.entities.bl_chat.BLChatCreateDto;
import backend.entities.bl_chat.BLChatView;
import backend.entities.bl_message.BLMessage;
import backend.entities.bl_rel_chat_user.BLRelChatUser;
import backend.entities.bl_user.BLUser;
import backend.message.usecase.create.MessageCreateService;
import jakarta.enterprise.context.Dependent;
import jakarta.inject.Inject;
import jakarta.transaction.Transactional;

import java.time.Instant;

@Dependent
public class ChatCreateService {
    @Inject
    ChatRepository chatRepository;

    @Inject
    ChatService chatService;

    @Inject
    UserService userService;

    @Inject
    RelChatUserRepository relChatUserRepository;

    @Inject
    MessageCreateService messageCreateService;

    @Transactional
    public BLChatView createChatFromDto(final BLChatCreateDto blChatCreateDto) {
        final Instant createdAt = Instant.now();
        blChatCreateDto.userIds().add(blChatCreateDto.senderId());

        final BLChat chat = BLChat.builder()
                .title(blChatCreateDto.title())
                .urgency(blChatCreateDto.urgency())
                .createdAt(createdAt)
                .build();
        chatRepository.persist(chat);
        blChatCreateDto.userIds().forEach(id -> {
            final BLUser user = userService.getUserById(id);
            final BLRelChatUser relChatUser = BLRelChatUser.builder().user(user).chat(chat).build();
            relChatUserRepository.persist(relChatUser);
        });
        final BLUser sender = BLUser.builder().id(blChatCreateDto.senderId()).build();
        final BLMessage firstMessage = BLMessage.builder()
                .sender(sender)
                .chat(chat)
                .text(blChatCreateDto.firstMessageText())
                .createdAt(createdAt)
                .build();
        messageCreateService.persist(firstMessage);
        return chatService.getChatPlainById(chat.getId());
    }
}
