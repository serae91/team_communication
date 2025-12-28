package backend.attr_chat_user.usecase.core;

import backend.entities.bl_attr_chat_user.BLAttrChatUser;
import backend.entities.bl_attr_chat_user.ReminderStatus;
import io.quarkus.hibernate.orm.panache.PanacheRepository;
import jakarta.enterprise.context.ApplicationScoped;

import java.time.Instant;
import java.util.List;

@ApplicationScoped
public class AttrChatUserRepository implements PanacheRepository<BLAttrChatUser> {

    public BLAttrChatUser findBy(final Long chatId, final Long userId) {
        return find("chat.id = ?1 and user.id = ?2", chatId, userId).singleResult();
    }

    public List<BLAttrChatUser> findBy(final Long chatId) {
        return find("chat.id", chatId).list();
    }

    public List<BLAttrChatUser> findDueReminders(final Instant now, final int limit) {
        return find("reminderStatus = ?1 and reminderAt <= ?2 order by reminderAt",
                ReminderStatus.SCHEDULED, now)
                .page(0, limit)
                .list();
    }

}