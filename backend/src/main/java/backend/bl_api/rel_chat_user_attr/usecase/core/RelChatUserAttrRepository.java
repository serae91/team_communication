package backend.bl_api.rel_chat_user_attr.usecase.core;

import backend.bl_entities.bl_rel_chat_user_attr.ReminderStatus;
import io.quarkus.hibernate.orm.panache.PanacheRepository;
import jakarta.enterprise.context.ApplicationScoped;

import java.time.Instant;
import java.util.List;

@ApplicationScoped
public class RelChatUserAttrRepository implements PanacheRepository<backend.bl_entities.bl_rel_chat_user_attr.BLRelChatUserAttr> {

    public backend.bl_entities.bl_rel_chat_user_attr.BLRelChatUserAttr findBy(final Long chatId, final Long userId) {
        return find("chat.id = ?1 and user.id = ?2", chatId, userId).singleResult();
    }

    public List<backend.bl_entities.bl_rel_chat_user_attr.BLRelChatUserAttr> findBy(final Long chatId) {
        return find("chat.id", chatId).list();
    }

    public List<backend.bl_entities.bl_rel_chat_user_attr.BLRelChatUserAttr> findDueReminders(final Instant now, final int limit) {
        return find("reminderStatus = ?1 and reminderAt <= ?2 order by reminderAt",
                ReminderStatus.SCHEDULED, now)
                .page(0, limit)
                .list();
    }

}