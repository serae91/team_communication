package backend.bl_entities.bl_message;

import java.time.Instant;

public record BLMessageCreateDto(String text, Long chatId, Instant createdAt) {
}
