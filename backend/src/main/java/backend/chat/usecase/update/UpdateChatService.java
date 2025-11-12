package backend.chat.usecase.update;

import backend.entities.bl_rel_chat_user.BLRelChatUser;
import com.blazebit.persistence.CriteriaBuilderFactory;
import jakarta.enterprise.context.Dependent;
import jakarta.inject.Inject;
import jakarta.persistence.EntityManager;

@Dependent
public class UpdateChatService {
    @Inject
    EntityManager entityManager;
    @Inject
    CriteriaBuilderFactory criteriaBuilderFactory;

    public void triggerDown(final Long chatId, final Long userId) {
        final var criteriaBuilder = criteriaBuilderFactory.create(entityManager, BLRelChatUser.class);
        criteriaBuilder
                .where("chat.id").eq(chatId)
                .where("user.id").eq(userId);
        final var bLRelChatUser  = criteriaBuilder.getSingleResult();
        bLRelChatUser.setDowned(!bLRelChatUser.isDowned());
        entityManager.persist(bLRelChatUser);
    }

    public void unDownForAllUsers(final Long chatId) {
        final var criteriaBuilder = criteriaBuilderFactory.create(entityManager, BLRelChatUser.class);
        criteriaBuilder.where("chat.id").eq(chatId);
        final var bLRelChatUsers  = criteriaBuilder.getResultList();
        bLRelChatUsers.forEach(bLRelChatUser -> {
            bLRelChatUser.setDowned(false);
            entityManager.persist(bLRelChatUser);
        });
    }
}
