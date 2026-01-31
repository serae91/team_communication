package backend.bl_api.chat.usecase.create;

import backend.bl_api.chat.core.ChatRepository;
import backend.bl_api.chat.core.RelChatUserRepository;
import backend.bl_api.message.usecase.create.MessageCreateService;
import backend.bl_entities.bl_chat.BLChat;
import backend.bl_entities.bl_chat.BLChatCreateDto;
import backend.bl_entities.bl_message.BLMessage;
import backend.bl_entities.bl_message.BLMessageCreateDto;
import backend.bl_entities.bl_rel_chat_user.BLRelChatUser;
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
    RelChatUserRepository relChatUserRepository;
    @Inject
    MessageCreateService messageCreateService;

    @Transactional
    public Long createChatFromDto(final BLChatCreateDto chatCreateDto, final Long senderId) {
        final Instant createdAt = chatCreateDto.firstMessages().getFirst().createdAt();
        chatCreateDto.userIds().add(senderId);

        final BLChat chat = BLChat.builder()
                .title(chatCreateDto.title())
                .urgency(chatCreateDto.urgency())
                .createdAt(createdAt)
                .lastMessageUserId(senderId)
                .lastMessageAt(chatCreateDto.firstMessages().getLast().createdAt())
                .build();
        chatRepository.persist(chat);
        chatCreateDto.userIds().forEach(id -> {
            final BLUser user = BLUser.builder().id(id).build();
            final BLRelChatUser relChatUser = BLRelChatUser.builder().user(user).chat(chat).build();
            relChatUserRepository.persist(relChatUser);
        });
        final BLUser sender = BLUser.builder().id(senderId).build();
        chatCreateDto.firstMessages().forEach(message -> createMessage(message, sender, chat));
        return chat.getId();
    }

    private void createMessage(final BLMessageCreateDto messageCreateDto, final BLUser sender, final BLChat chat) {
        final BLMessage firstMessage = BLMessage.builder()
                .sender(sender)
                .chat(chat)
                .text(messageCreateDto.text())
                .createdAt(messageCreateDto.createdAt())
                .build();
        messageCreateService.persist(firstMessage);
    }
}
