package backend.bl_api.message.usecase.create;

import backend.bl_api.chat.usecase.update.ChatUpdateService;
import backend.bl_api.message.core.MessageRepository;
import backend.bl_api.message.core.MessageService;
import backend.bl_api.rel_chat_user_attr.usecase.update.RelChatUserAttrUpdateService;
import backend.bl_entities.bl_chat.BLChat;
import backend.bl_entities.bl_message.BLMessage;
import backend.bl_entities.bl_message.BLMessageCreateDto;
import backend.bl_entities.bl_message.BLMessageCreateView;
import backend.bl_entities.bl_message.BLMessageView;
import backend.bl_entities.bl_user.BLUser;
import com.blazebit.persistence.view.EntityViewManager;
import jakarta.enterprise.context.Dependent;
import jakarta.inject.Inject;
import jakarta.persistence.EntityManager;
import jakarta.transaction.Transactional;

import java.time.Instant;

@Dependent
public class MessageCreateService {
    @Inject
    EntityManager entityManager;
    @Inject
    EntityViewManager entityViewManager;
    @Inject
    MessageRepository messageRepository;
    @Inject
    MessageService messageService;
    @Inject
    ChatUpdateService chatUpdateService;
    @Inject
    RelChatUserAttrUpdateService relChatUserAttrUpdateService;

    public void persist(final BLMessage blMessage) {
        messageRepository.persist(blMessage);
    }

    @Transactional
    public void createMessageFromView(final BLMessageCreateView blMessageCreateView) {
        blMessageCreateView.setCreatedAt(Instant.now());
        entityViewManager.save(entityManager, blMessageCreateView);
    }

    @Transactional
    public BLMessageView createMessageFromDto(final BLMessageCreateDto messageCreateDto, final Long userId) {
        final BLChat chat = BLChat.builder().id(messageCreateDto.chatId()).build();
        final BLUser sender = BLUser.builder().id(userId).build();
        final BLMessage message = BLMessage.builder()
                .text(messageCreateDto.text())
                .chat(chat)
                .sender(sender)
                .createdAt(Instant.now())
                .build();
        messageRepository.persist(message);
        relChatUserAttrUpdateService.setUndoneForAllUsers(chat.getId());
        chatUpdateService.updateLastMessageUserId(messageCreateDto.chatId(), userId);

        return messageService.getBLMessageView(message.getId());
    }
}
