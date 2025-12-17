package backend.entities.bl_rel_chat_user;

import backend.entities.bl_user.BLUser;
import backend.entities.bl_chat.BLChat;
import io.quarkus.runtime.annotations.RegisterForReflection;
import jakarta.persistence.Column;
import jakarta.persistence.Entity;
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
@Table(name = "bl_rel_chat_user")
@RegisterForReflection
@Data
@NoArgsConstructor
@AllArgsConstructor
@Builder
public class BLRelChatUser {

    @Id
    @GeneratedValue(generator = "bl_rel_chat_user_sequence", strategy = GenerationType.SEQUENCE)
    @SequenceGenerator(name = "bl_rel_chat_user_sequence", sequenceName = "bl_rel_chat_user_sequence", allocationSize = 1)
    @Column(name = "id", nullable = false)
    private Long id;

    @Column(name = "downed")
    private boolean downed;

    @Column(name = "reminder")
    private Instant reminder;

    @Column(name = "reminded")
    private boolean reminded;

    @ManyToOne
    @JoinColumn(name = "chat_id")
    private BLChat chat;

    @ManyToOne
    @JoinColumn(name = "user_id")
    private BLUser user;
}
