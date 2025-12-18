package backend.message.usecase.create;

import backend.entities.bl_chat.BLChat;
import backend.entities.bl_message.BLMessage;
import backend.entities.bl_message.BLMessageCreateDto;
import backend.entities.bl_message.BLMessageCreateView;
import backend.entities.bl_message.BLMessageView;
import backend.entities.bl_user.BLUser;
import backend.message.core.MessageRepository;
import backend.message.core.MessageService;
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

    public void persist(final BLMessage blMessage) {
        messageRepository.persist(blMessage);
    }

    @Transactional
    public void createMessageFromView(final BLMessageCreateView blMessageCreateView) {
        blMessageCreateView.setCreatedAt(Instant.now());
        entityViewManager.save(entityManager, blMessageCreateView);
    }

    @Transactional
    public BLMessageView createMessageFromDto(final BLMessageCreateDto blMessageCreateDto) {
        final BLChat blChat = BLChat.builder().id(blMessageCreateDto.chatId()).build();
        final BLUser sender = BLUser.builder().id(blMessageCreateDto.senderId()).build();
        final BLMessage blMessage = BLMessage.builder()
                .text(blMessageCreateDto.text())
                .chat(blChat)
                .sender(sender)
                .createdAt(Instant.now())
                .build();
        messageRepository.persist(blMessage);
        return messageService.getBLMessageView(blMessage.getId());
    }
}
