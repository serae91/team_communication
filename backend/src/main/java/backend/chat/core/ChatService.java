package backend.chat.core;

import backend.entities.bl_chat.BLChat;
import backend.entities.bl_chat.BLChatView;
import backend.entities.bl_rel_chat_user.BLRelChatUser;
import com.blazebit.persistence.CriteriaBuilder;
import com.blazebit.persistence.CriteriaBuilderFactory;
import com.blazebit.persistence.view.EntityViewManager;
import com.blazebit.persistence.view.EntityViewSetting;
import jakarta.enterprise.context.Dependent;
import jakarta.inject.Inject;
import jakarta.persistence.EntityManager;

import java.util.List;

@Dependent
public class ChatService {

    @Inject
    EntityViewManager entityViewManager;
    @Inject
    EntityManager entityManager;
    @Inject
    CriteriaBuilderFactory criteriaBuilderFactory;
    @Inject
    ChatRepository chatRepository;

    public BLChatView getChatPlainById(final Long chatId) {
        final CriteriaBuilder<BLChat> criteriaBuilder = criteriaBuilderFactory.create(entityManager, BLChat.class);
        criteriaBuilder.where("id").eq(chatId);
        return entityViewManager.applySetting(EntityViewSetting.create(BLChatView.class), criteriaBuilder).getSingleResult();
    }

    public List<BLChatView> getChatListByUserId(final Long userId) {
        final CriteriaBuilder<BLChat> criteriaBuilder = criteriaBuilderFactory.create(entityManager, BLChat.class);
        criteriaBuilder
                .where("users.user.id").eq(userId)
                .whereExists()
                .from(BLRelChatUser.class, "c")
                .where("chat.id").eqExpression("OUTER(id)")
                .where("user.id").eq(userId)
                .end();
        return entityViewManager.applySetting(EntityViewSetting.create(BLChatView.class), criteriaBuilder).getResultList();
    }

    public List<BLChatView> getChatListPlainByUserIdWithReminder(final Long userId) {
        final CriteriaBuilder<BLChat> criteriaBuilder = criteriaBuilderFactory.create(entityManager, BLChat.class);

        criteriaBuilder
                .where("users.user.id").eq(userId)
                .whereExists()
                .from(BLRelChatUser.class, "c")
                .where("chat.id").eqExpression("OUTER(id)")
                .where("user.id").eq(userId)
                .where("reminderAt").isNotNull()
                .end();
        return entityViewManager.applySetting(EntityViewSetting.create(BLChatView.class), criteriaBuilder).getResultList();
    }
}
