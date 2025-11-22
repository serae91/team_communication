package backend.message.core;

import backend.entities.bl_message.BLMessage;
import backend.entities.bl_message.BLMessageView;
import com.blazebit.persistence.CriteriaBuilder;
import com.blazebit.persistence.CriteriaBuilderFactory;
import com.blazebit.persistence.view.EntityViewManager;
import com.blazebit.persistence.view.EntityViewSetting;
import jakarta.enterprise.context.ApplicationScoped;
import jakarta.inject.Inject;
import jakarta.persistence.EntityManager;

import java.util.List;

@ApplicationScoped
public class MessageService {
    @Inject
    MessageRepository messageRepository;
    @Inject
    CriteriaBuilderFactory criteriaBuilderFactory;
    @Inject
    EntityManager entityManager;
    @Inject
    EntityViewManager entityViewManager;

    public List<BLMessage> listAll() {
        return messageRepository.listAll();
    }

    public List<BLMessage> listForSenderIdAndReceiverId(final Long senderId, final Long receiverId) {
        return messageRepository.listForSenderIdAndReceiverId(senderId, receiverId);
    }

    public List<BLMessage> listForSenderIdAndGroupChatId(final Long senderId, final Long groupChatId) {
        return messageRepository.listForSenderIdAndGroupChatId(senderId, groupChatId);
    }

    public BLMessageView getBLMessageView(final Long messageId) {
        final CriteriaBuilder<BLMessage> criteriaBuilder = criteriaBuilderFactory.create(entityManager, BLMessage.class);
        criteriaBuilder.where("id").eq(messageId);
        return entityViewManager.applySetting(EntityViewSetting.create(BLMessageView.class), criteriaBuilder).getSingleResult();
    }

    public List<BLMessageView> getBLMessageViewsByChatId(final Long chatId) {
        final CriteriaBuilder<BLMessage> criteriaBuilder = criteriaBuilderFactory.create(entityManager, BLMessage.class);
        criteriaBuilder.where("chat.id").eq(chatId).orderByAsc("createdAt");
        return entityViewManager.applySetting(EntityViewSetting.create(BLMessageView.class), criteriaBuilder).getResultList();
    }
}
