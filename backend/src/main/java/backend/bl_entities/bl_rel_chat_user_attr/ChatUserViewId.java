package backend.bl_entities.bl_rel_chat_user_attr;

import lombok.EqualsAndHashCode;
import lombok.NoArgsConstructor;

import java.io.Serializable;

@NoArgsConstructor
@EqualsAndHashCode
public class ChatUserViewId implements Serializable {
    private Long chatId;
    private Long userId;
}

