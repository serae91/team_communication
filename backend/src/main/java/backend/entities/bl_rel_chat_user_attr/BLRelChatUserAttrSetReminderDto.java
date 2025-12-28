package backend.entities.bl_rel_chat_user_attr;

import java.time.Instant;

public record BLRelChatUserAttrSetReminderDto(Long chatId, Instant reminderAt) {
}
