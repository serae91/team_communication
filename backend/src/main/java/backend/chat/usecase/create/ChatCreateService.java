package backend.chat.usecase.create;

import backend.chat.core.ChatRepository;
import backend.entities.bl_chat.BLChat;
import backend.entities.bl_chat.BLChatCreateDto;
import backend.entities.bl_chat.BLChatCreateView;
import backend.entities.bl_message.BLMessage;
import backend.entities.bl_user.BLUser;
import backend.entities.bl_user.BLUserIdView;
import backend.message.usecase.create.MessageCreateService;
import com.blazebit.persistence.view.EntityViewManager;
import jakarta.enterprise.context.Dependent;
import jakarta.inject.Inject;
import jakarta.persistence.EntityManager;
import jakarta.transaction.Transactional;

import java.util.ArrayList;
import java.util.Date;
import java.util.List;

@Dependent
public class ChatCreateService {
    @Inject
    ChatRepository chatRepository;

    @Inject
    MessageCreateService messageCreateService;

    @Inject
    EntityManager entityManager;

    @Inject
    EntityViewManager entityViewManager;

    @Transactional
    public void createChatFromDto(final BLChatCreateDto blChatCreateDto) {
        final Date createdAt = new Date();
        final BLChatCreateView chatCreateView = entityViewManager.create(BLChatCreateView.class);
        final List<BLUserIdView> userIdViews = new ArrayList<>();
        blChatCreateDto.userIds().forEach(userId->userIdViews.add(entityViewManager.getReference(BLUserIdView.class, userId)));
        chatCreateView.setCreatedAt(createdAt);
        chatCreateView.setTitle(blChatCreateDto.title());
        chatCreateView.setUrgency(blChatCreateDto.urgency());
        chatCreateView.set(blChatCreateDto.urgency());
        final BLChat blChat = BLChat.builder()
                .title(blChatCreateDto.title())
                .urgency(blChatCreateDto.urgency())
                .createdAt(createdAt)
                .users()
                .build();
        chatRepository.persist(blChat);
        final BLUser sender = BLUser.builder().id(blChatCreateDto.senderId()).build();
        final BLMessage blMessage = BLMessage.builder()
                .sender(sender)
                .chat(blChat)
                .text(blChatCreateDto.firstMessageText())
                .createdAt(createdAt)
                .build();
        messageCreateService.persist(blMessage);
    }
}
