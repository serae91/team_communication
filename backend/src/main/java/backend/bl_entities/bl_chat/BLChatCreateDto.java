package backend.bl_entities.bl_chat;

import backend.bl_entities.bl_message.BLMessageCreateDto;

import java.util.List;
import java.util.Set;

public record BLChatCreateDto(String title, Urgency urgency, Set<Long> userIds,
                              List<BLMessageCreateDto> firstMessages) {
}
