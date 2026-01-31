package backend.bl_entities.bl_rel_chat_user_attr;

import backend.bl_entities.bl_chat.ChatBox;
import jakarta.persistence.Column;
import jakarta.persistence.Entity;
import jakarta.persistence.EnumType;
import jakarta.persistence.Enumerated;
import jakarta.persistence.Id;
import jakarta.persistence.IdClass;
import jakarta.persistence.Table;
import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;
import org.hibernate.annotations.Immutable;

import java.time.Instant;

@Entity
@Immutable
@Table(name = "chat_user_view")
@IdClass(ChatUserViewId.class)
@Getter
@Setter
@Builder
@NoArgsConstructor
@AllArgsConstructor
public class ChatUserView {
    @Id
    @Column(name = "chat_id")
    private Long chatId;

    @Id
    @Column(name = "user_id")
    private Long userId;

    @Column(name = "chat_user_attr_id")
    private Long chatUserAttrId;

    @Column(name = "title")
    private String title;

    @Column(name = "created_at")
    private Instant createdAt;

    @Column(name = "creator_user_id")
    private Long creatorUserId;

    @Column(name = "last_message_user_id")
    private Long lastMessageUserId;

    @Column(name = "last_message_at")
    private Instant lastMessageAt;

    @Column(name = "done")
    private boolean done;

    @Column(name = "reminder_at")
    private Instant reminderAt;

    @Enumerated(EnumType.STRING)
    @Column(name = "reminder_status")
    private ReminderStatus reminderStatus;

    public ChatBox getChatBox() {
        if (done) return ChatBox.ALL;
        if (ReminderStatus.SCHEDULED.equals(reminderStatus)) return ChatBox.REMINDER;
        if (userId.equals(creatorUserId)) return ChatBox.SENT;
        return ChatBox.INBOX;
    }
}
