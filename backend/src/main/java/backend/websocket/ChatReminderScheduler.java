package backend.websocket;

import backend.bl_api.rel_chat_user_attr.usecase.core.ChatUserViewRepository;
import backend.bl_api.rel_chat_user_attr.usecase.update.RelChatUserAttrUpdateService;
import backend.bl_entities.bl_rel_chat_user_attr.ChatUserView;
import backend.bl_entities.bl_rel_chat_user_attr.ReminderStatus;
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
    ChatUserViewRepository chatUserViewRepository;

    @Inject
    RelChatUserAttrUpdateService relChatUserAttrUpdateService;

    @Inject
    BLWebSocketService webSocketService;

    @Transactional
    @Scheduled(every = "10s")
    void processDueReminders() {
        final Instant now = Instant.now();
        final List<ChatUserView> dueReminders = chatUserViewRepository.findDueReminders(now, BATCH_SIZE);
        if (dueReminders.isEmpty()) {
            return;
        }
        final Map<Long, Set<ChatUserView>> chatsByUser =
                dueReminders.stream()
                        .collect(Collectors.groupingBy(
                                ChatUserView::getUserId,
                                Collectors.toSet()

                        ));

        chatsByUser.forEach(webSocketService::sendReminder);
        dueReminders.forEach(reminder -> relChatUserAttrUpdateService.setReminderStatus(reminder.getChatId(), reminder.getUserId(), ReminderStatus.TRIGGERED)
        );
    }
}
