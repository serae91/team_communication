package backend.chat.core;

import backend.entities.bl_chat.BLChat;
import backend.entities.bl_chat.BLChatPlainView;
import backend.entities.bl_chat.BLChatFullInfoView;
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

    public List<BLChatPlainView> getChatListPlainByUserId(final Long userId) {
        final CriteriaBuilder<BLChat> criteriaBuilder = criteriaBuilderFactory.create(entityManager, BLChat.class);

        criteriaBuilder
                .where("users.user.id").eq(userId)
                .whereExists()
                .from(BLRelChatUser.class, "c")
                .where("chat.id").eqExpression("OUTER(id)")
                .where("user.id").eq(userId)
                .where("downed").eq(false)
                .end();
        return entityViewManager.applySetting(EntityViewSetting.create(BLChatPlainView.class), criteriaBuilder).getResultList();

    }

    public BLChatFullInfoView getChatFullInfoById(final Long id) {
        final CriteriaBuilder<BLChat> criteriaBuilder = criteriaBuilderFactory.create(entityManager, BLChat.class);
        criteriaBuilder.where("id").eq(id);
        return entityViewManager.applySetting(EntityViewSetting.create(BLChatFullInfoView.class), criteriaBuilder).getSingleResult();
    }
}
