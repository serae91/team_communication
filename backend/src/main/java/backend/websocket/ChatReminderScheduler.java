package backend.websocket;

import backend.attr_chat_user.usecase.core.AttrChatUserRepository;
import backend.entities.bl_attr_chat_user.BLAttrChatUser;
import backend.entities.bl_attr_chat_user.ReminderStatus;
import io.quarkus.scheduler.Scheduled;
import jakarta.enterprise.context.ApplicationScoped;
import jakarta.inject.Inject;
import jakarta.transaction.Transactional;

import java.time.Instant;
import java.util.List;
import java.util.Map;
import java.util.Set;
import java.util.stream.Collectors;

@ApplicationScoped
public class ChatReminderScheduler {

    private static final int BATCH_SIZE = 100;

    @Inject
    AttrChatUserRepository attrChatUserRepository;

    @Inject
    BLWebSocketService webSocketService;

    @Transactional
    @Scheduled(every = "10s")
    void processDueReminders() {
        final Instant now = Instant.now();
        final List<BLAttrChatUser> dueReminders = attrChatUserRepository.findDueReminders(now, BATCH_SIZE);
        if (dueReminders.isEmpty()) {
            return;
        }
        final Map<Long, Set<Long>> chatIdsByUser =
                dueReminders.stream()
                        .collect(Collectors.groupingBy(
                                r -> r.getUser().getId(),
                                Collectors.mapping(
                                        r -> r.getChat().getId(),
                                        Collectors.toSet()
                                )
                        ));

        chatIdsByUser.forEach(webSocketService::sendReminder);
        dueReminders.forEach(reminder ->
                reminder.setReminderStatus(ReminderStatus.TRIGGERED)
        );
        attrChatUserRepository.persist(dueReminders);
    }
}
