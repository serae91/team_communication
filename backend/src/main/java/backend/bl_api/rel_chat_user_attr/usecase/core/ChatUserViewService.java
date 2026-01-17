package backend.bl_api.rel_chat_user_attr.usecase.core;

import backend.bl_entities.bl_chat.ChatBox;
import backend.bl_entities.bl_chat.ChatSortField;
import backend.bl_entities.bl_rel_chat_user_attr.ChatBoxCountDto;
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

    public ChatUserView findByChatIdAndUserId(final Long chatId, final Long userId) {
        return repository.findByChatIdAndUserId(chatId, userId);
    }

    public List<ChatUserView> getChatUserViews(final Long userId, final ChatBox chatBox, final int page, final int size, final ChatSortField sortField, final SortDirection sortDirection) {
        final CriteriaBuilder<ChatUserView> criteriaBuilder = criteriaBuilderFactory.create(entityManager, ChatUserView.class);
        filterByUserId(userId, criteriaBuilder);
        filterByChatBox(userId, chatBox, criteriaBuilder);
        filterByPagination(page, size, criteriaBuilder);
        sort(sortField, sortDirection, criteriaBuilder);

        return criteriaBuilder.getResultList();
    }

    public ChatBoxCountDto getChatBoxCount(final Long userId) {
        final Long inboxCount = getChatCount(userId, ChatBox.INBOX);
        final Long reminderCount = getChatCount(userId, ChatBox.REMINDER);
        final Long sentCount = getChatCount(userId, ChatBox.SENT);
        final Long totalCount = getChatCount(userId, ChatBox.ALL);
        return new ChatBoxCountDto(inboxCount, reminderCount, sentCount, totalCount);
    }

    public Long getChatCount(final Long userId, final ChatBox chatBox) {
        final CriteriaBuilder<Long> criteriaBuilder = criteriaBuilderFactory.create(entityManager, Long.class)
                .from(ChatUserView.class)
                .select("COUNT(chatId)");
        filterByUserId(userId, criteriaBuilder);
        filterByChatBox(userId, chatBox, criteriaBuilder);
        return criteriaBuilder.getSingleResult();
    }

    private <T> void filterByUserId(final Long userId, final CriteriaBuilder<T> criteriaBuilder) {
        criteriaBuilder.where("userId").eq(userId);
    }

    private <T> void filterByChatBox(final Long userId, final ChatBox chatBox, final CriteriaBuilder<T> criteriaBuilder) {
        if (ChatBox.INBOX.equals(chatBox)) {
            criteriaBuilder
                    .where("done").eq(false)
                    .where("reminderStatus").notEq(ReminderStatus.SCHEDULED)
                    .where("lastMessageUserId").notEq(userId);
        } else if (ChatBox.REMINDER.equals(chatBox)) {
            criteriaBuilder
                    .where("reminderStatus").eq(ReminderStatus.SCHEDULED);
        } else if (ChatBox.SENT.equals(chatBox)) {
            criteriaBuilder
                    .where("lastMessageUserId").eq(userId)
                    .where("done").eq(false);
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
