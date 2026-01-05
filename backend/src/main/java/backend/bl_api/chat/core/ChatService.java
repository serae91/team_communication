package backend.bl_api.chat.core;

import backend.bl_entities.bl_chat.BLChat;
import backend.bl_entities.bl_chat.BLChatView;
import backend.bl_entities.bl_chat.ChatBox;
import backend.bl_entities.bl_chat.ChatSortField;
import backend.bl_entities.bl_rel_chat_group.BLRelChatGroup;
import backend.bl_entities.bl_rel_chat_user.BLRelChatUser;
import backend.bl_entities.bl_rel_chat_user_attr.BLRelChatUserAttr;
import backend.bl_entities.bl_rel_chat_user_attr.ReminderStatus;
import backend.utils.enums.SortDirection;
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

    public List<BLChatView> getChatListByUserId(final Long userId, final ChatBox box, final int page, final int size, final ChatSortField sortField, final SortDirection sortDirection) {
        final CriteriaBuilder<BLChat> criteriaBuilder = criteriaBuilderFactory.create(entityManager, BLChat.class);
        filterByUserId(userId, criteriaBuilder);
        filterByBox(userId, box, criteriaBuilder);
        filterByPagination(page, size, criteriaBuilder);
        sort(sortField, sortDirection, criteriaBuilder);

        return entityViewManager.applySetting(EntityViewSetting.create(BLChatView.class), criteriaBuilder).getResultList();
    }

    private void filterByUserId(final Long userId, final CriteriaBuilder<BLChat> criteriaBuilder) {
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
    }

    private void filterByBox(final Long userId, final ChatBox box, final CriteriaBuilder<BLChat> criteriaBuilder) {
        if (ChatBox.INBOX.equals(box)) {
            criteriaBuilder
                    .where("lastMessageUserId").notEq(userId)
                    .whereNotExists()
                    .from(BLRelChatUserAttr.class)
                    .where("chatId").eqExpression("OUTER(id)")
                    .where("userId").eq(userId)
                    .where("done").eq(true)
                    .where("reminderStatus").notEq(ReminderStatus.SCHEDULED)
                    .end();
        } else if (ChatBox.REMINDER.equals(box)) {
            criteriaBuilder
                    .whereExists()
                    .from(BLRelChatUserAttr.class)
                    .where("chatId").eqExpression("OUTER(id)")
                    .where("userId").eq(userId)
                    .where("reminderStatus").eq(ReminderStatus.SCHEDULED)
                    .end();
        } else if (ChatBox.SENT.equals(box)) {
            criteriaBuilder.where("lastMessageUserId").eq(userId);
        }
    }

    private void filterByPagination(final int page, final int size, final CriteriaBuilder<BLChat> criteriaBuilder) {
        criteriaBuilder
                .setFirstResult(page * size)
                .setMaxResults(size);
    }

    private void sort(final ChatSortField sortField, final SortDirection sortDirection, final CriteriaBuilder<BLChat> criteriaBuilder) {
        final String sortFieldValue = getSortFieldValue(sortField);
        if (SortDirection.DESC.equals(sortDirection)) {
            criteriaBuilder.orderByDesc(sortFieldValue);
        } else {
            criteriaBuilder.orderByAsc(sortFieldValue);
        }
    }

    private String getSortFieldValue(final ChatSortField sortField) {
        return switch (sortField) {
            case LAST_MESSAGE_AT -> "lastMessageAt";
            case CREATED_AT -> "createdAt";
        };
    }
}
