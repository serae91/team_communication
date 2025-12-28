package backend.entities.bl_attr_chat_user;

import java.time.Instant;

public record BLAttrChatUserSetReminderDto(Long chatId, Instant reminderAt) {
}
