package backend.chat.core;

import backend.entities.bl_chat.BLChat;
import backend.entities.bl_chat.BLChatWithMessagesAndUsersView;
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

    public List<BLChatWithMessagesAndUsersView> getAllByUserId(final Long userId) {
        CriteriaBuilder<BLChat> criteriaBuilder = criteriaBuilderFactory.create(entityManager, BLChat.class);
        return entityViewManager.applySetting(EntityViewSetting.create(BLChatWithMessagesAndUsersView.class), criteriaBuilder).getResultList();

    }
}
