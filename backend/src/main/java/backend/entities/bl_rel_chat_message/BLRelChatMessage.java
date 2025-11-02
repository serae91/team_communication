package backend.entities.bl_rel_chat_message;

import backend.entities.bl_chat.BLChat;
import backend.entities.bl_message.BLMessage;
import io.quarkus.runtime.annotations.RegisterForReflection;
import jakarta.persistence.Column;
import jakarta.persistence.Entity;
import jakarta.persistence.GeneratedValue;
import jakarta.persistence.GenerationType;
import jakarta.persistence.Id;
import jakarta.persistence.ManyToOne;
import jakarta.persistence.MapsId;
import jakarta.persistence.SequenceGenerator;
import jakarta.persistence.Table;
import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Data;
import lombok.NoArgsConstructor;

@Entity
@Table(name = "rel_chat_message")
@RegisterForReflection
@Data
@NoArgsConstructor
@AllArgsConstructor
@Builder
public class BLRelChatMessage {

    @Id
    @GeneratedValue(generator = "rel_chat_message_sequence", strategy = GenerationType.SEQUENCE)
    @SequenceGenerator(name = "rel_chat_message_sequence", sequenceName = "rel_chat_message_sequence", allocationSize = 1)
    @Column(name = "id", nullable = false)
    private Long id;

    @ManyToOne
    @MapsId("chat_id")
    private BLChat chat;

    @ManyToOne
    @MapsId("user_id")
    private BLMessage message;
}
