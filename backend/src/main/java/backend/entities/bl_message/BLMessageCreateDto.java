package backend.entities.bl_message;

public record BLMessageCreateDto(String text, Long chatId, Long senderId) {
}
