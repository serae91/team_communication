package backend.bl_api.rel_chat_user_attr.usecase.core;

import backend.bl_entities.bl_chat.ChatBox;
import backend.bl_entities.bl_chat.ChatSortField;
import backend.bl_entities.bl_rel_chat_user_attr.ChatUserView;
import backend.bl_entities.bl_rel_chat_user_attr.ReminderStatus;
import backend.utils.enums.SortDirection;
import com.blazebit.persistence.CriteriaBuilder;
import com.blazebit.persistence.CriteriaBuilderFactory;
import jakarta.enterprise.context.ApplicationScoped;
import jakarta.inject.Inject;
import jakarta.persistence.EntityManager;

import java.util.List;

@ApplicationScoped
public class ChatUserViewService {

    @Inject
    EntityManager entityManager;
    @Inject
    CriteriaBuilderFactory criteriaBuilderFactory;
    @Inject
    ChatUserViewRepository repository;

    public List<ChatUserView> findByUserId(final Long userId) {
        return repository.findByUserId(userId);
    }

    public List<ChatUserView> getChatUserViews(final Long userId, final ChatBox chatBox, final int page, final int size, final ChatSortField sortField, final SortDirection sortDirection) {
        final CriteriaBuilder<ChatUserView> criteriaBuilder = criteriaBuilderFactory.create(entityManager, ChatUserView.class);
        filterByUserId(userId, criteriaBuilder);
        filterByBox(userId, chatBox, criteriaBuilder);
        filterByPagination(page, size, criteriaBuilder);
        sort(sortField, sortDirection, criteriaBuilder);

        return criteriaBuilder.getResultList();
    }

    private void filterByUserId(final Long userId, final CriteriaBuilder<ChatUserView> criteriaBuilder) {
        criteriaBuilder.where("userId").eq(userId);
    }

    private void filterByBox(final Long userId, final ChatBox chatBox, final CriteriaBuilder<ChatUserView> criteriaBuilder) {
        if (ChatBox.INBOX.equals(chatBox)) {
            criteriaBuilder
                    .where("done").notEq(true)
                    .where("reminderStatus").notEq(ReminderStatus.SCHEDULED);
        } else if (ChatBox.REMINDER.equals(chatBox)) {
            criteriaBuilder
                    .where("reminderStatus").eq(ReminderStatus.SCHEDULED);
        } else if (ChatBox.SENT.equals(chatBox)) {
            criteriaBuilder.where("lastMessageUserId").eq(userId);
        }
    }

    private void filterByPagination(final int page, final int size, final CriteriaBuilder<ChatUserView> criteriaBuilder) {
        criteriaBuilder
                .setFirstResult(page * size)
                .setMaxResults(size);
    }

    private void sort(final ChatSortField sortField, final SortDirection sortDirection, final CriteriaBuilder<ChatUserView> criteriaBuilder) {
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
