package backend.bl_entities.bl_rel_chat_user_attr;

import backend.bl_entities.bl_chat.BLChat;
import backend.bl_entities.bl_user.BLUser;
import io.quarkus.runtime.annotations.RegisterForReflection;
import jakarta.persistence.Column;
import jakarta.persistence.Entity;
import jakarta.persistence.EnumType;
import jakarta.persistence.Enumerated;
import jakarta.persistence.GeneratedValue;
import jakarta.persistence.GenerationType;
import jakarta.persistence.Id;
import jakarta.persistence.JoinColumn;
import jakarta.persistence.ManyToOne;
import jakarta.persistence.SequenceGenerator;
import jakarta.persistence.Table;
import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Data;
import lombok.NoArgsConstructor;

import java.time.Instant;

@Entity
@Table(name = "bl_rel_chat_user_attr")
@RegisterForReflection
@Data
@NoArgsConstructor
@AllArgsConstructor
@Builder
public class BLRelChatUserAttr {

    @Id
    @GeneratedValue(generator = "bl_rel_chat_user_attr_sequence", strategy = GenerationType.SEQUENCE)
    @SequenceGenerator(name = "bl_rel_chat_user_attr_sequence", sequenceName = "bl_rel_chat_user_attr_sequence", allocationSize = 1)
    @Column(name = "id", nullable = false)
    private Long id;

    @Column(name = "done", nullable = false)
    private boolean done;

    @Column(name = "reminder_at")
    private Instant reminderAt;

    @Enumerated(EnumType.STRING)
    @Column(name = "reminder_status", nullable = false)
    private ReminderStatus reminderStatus;

    @ManyToOne
    @JoinColumn(name = "chat_id", nullable = false)
    private BLChat chat;

    @ManyToOne
    @JoinColumn(name = "user_id", nullable = false)
    private BLUser user;
}

