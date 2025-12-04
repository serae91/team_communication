package backend.entities.bl_chat;

import java.util.List;

public record BLChatCreateDto(String title, Urgency urgency, Long senderId, List<Long> userIds, String firstMessageText) {
}
