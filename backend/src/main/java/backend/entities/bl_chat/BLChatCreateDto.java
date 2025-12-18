package backend.entities.bl_chat;

import java.util.Set;

public record BLChatCreateDto(String title, Urgency urgency, Set<Long> userIds, String firstMessageText) {
}
