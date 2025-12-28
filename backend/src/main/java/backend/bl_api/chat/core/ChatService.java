package backend.bl_api.chat.core;

import backend.bl_entities.bl_chat.BLChat;
import backend.bl_entities.bl_chat.BLChatView;
import backend.bl_entities.bl_rel_chat_group.BLRelChatGroup;
import backend.bl_entities.bl_rel_chat_user.BLRelChatUser;
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
        criteriaBuilder.whereOr()
                .whereExists()
                .from(BLRelChatUser.class, "cu")
                .where("cu.chat.id").eqExpression("OUTER(id)")
                .where("cu.user.id").eq(userId)
                .end()
                .whereExists()
                .from(BLRelChatGroup.class, "cg")
                .where("cg.chat.id").eqExpression("OUTER(id)")
                .where("cg.group.users.id").eq(userId)
                .end()
                .endOr();


        return entityViewManager.applySetting(EntityViewSetting.create(BLChatView.class), criteriaBuilder).getResultList();
    }
}
