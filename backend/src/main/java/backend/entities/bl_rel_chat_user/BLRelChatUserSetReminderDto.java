package backend.entities.bl_rel_chat_user;

import java.time.Instant;

public record BLRelChatUserSetReminderDto(Long chatId, Instant reminderAt) {
}
