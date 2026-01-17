package backend.bl_api.rel_chat_user_attr.usecase.core;

import backend.bl_entities.bl_rel_chat_user_attr.ChatUserView;
import backend.bl_entities.bl_rel_chat_user_attr.ReminderStatus;
import io.quarkus.hibernate.orm.panache.PanacheRepository;
import jakarta.enterprise.context.ApplicationScoped;

import java.time.Instant;
import java.util.List;

@ApplicationScoped
public class ChatUserViewRepository implements PanacheRepository<ChatUserView> {

    public ChatUserView findByChatIdAndUserId(final Long chatId, final Long userId) {
        return find("chatId = ?1 and userId = ?2", chatId, userId).singleResult();
    }

    public List<ChatUserView> findDueReminders(final Instant now, final int limit) {
        return find("reminderStatus = ?1 and reminderAt <= ?2 order by reminderAt",
                ReminderStatus.SCHEDULED, now)
                .page(0, limit)
                .list();
    }
}
