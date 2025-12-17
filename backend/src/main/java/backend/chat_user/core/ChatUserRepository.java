package backend.chat_user.core;

import backend.entities.bl_rel_chat_user.BLRelChatUser;
import backend.entities.bl_rel_chat_user.ReminderStatus;
import io.quarkus.hibernate.orm.panache.PanacheRepository;
import io.quarkus.panache.common.Parameters;
import jakarta.enterprise.context.ApplicationScoped;

import java.time.Instant;
import java.util.List;

@ApplicationScoped
public class ChatUserRepository implements PanacheRepository<BLRelChatUser> {

    public List<BLRelChatUser> findDueReminders(final Instant now, final int limit) {
        return find("reminderStatus = ?1 and reminderAt <= ?2 order by reminderAt",
                ReminderStatus.SCHEDULED, now)
                .page(0, limit)
                .list();
    }

}
