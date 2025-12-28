package backend.bl_entities.bl_message;

import backend.bl_entities.bl_chat.BLChat;
import backend.bl_entities.bl_user.BLUser;
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
@Table(name = "bl_message")
@RegisterForReflection
@Data
@NoArgsConstructor
@AllArgsConstructor
@Builder
public class BLMessage {

    @Id
    @GeneratedValue(generator = "bl_message_sequence", strategy = GenerationType.SEQUENCE)
    @SequenceGenerator(name = "bl_message_sequence", sequenceName = "bl_message_sequence", allocationSize = 1)
    @Column(name = "id", nullable = false)
    private Long id;

    @Column(name = "text", nullable = false)
    private String text;

    @ManyToOne
    @JoinColumn(name = "chat_id", nullable = false)
    private BLChat chat;

    @ManyToOne
    @JoinColumn(name = "sender_id", nullable = false)
    private BLUser sender;

    @Column(name = "created_at", nullable = false)
    private Instant createdAt;
}
