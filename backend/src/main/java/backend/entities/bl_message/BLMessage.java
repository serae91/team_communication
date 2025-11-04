package backend.entities.bl_message;

import backend.entities.bl_chat.BLChat;
import backend.entities.bl_user.BLUser;
import com.fasterxml.jackson.annotation.JsonFormat;
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

import java.util.Date;
import java.util.Set;

@Entity
@Table(name = "bl_message")
@RegisterForReflection
@Data
@NoArgsConstructor
@AllArgsConstructor
@Builder
public class BLMessage {

    @Id
    @GeneratedValue(generator = "message_sequence", strategy = GenerationType.SEQUENCE)
    @SequenceGenerator(name = "message_sequence", sequenceName = "message_sequence", allocationSize = 1)
    @Column(name = "id", nullable = false)
    private Long id;

    @Column(name = "text", nullable = false)
    private String text;

    @ManyToOne
    @JoinColumn(name = "chat_id")
    private BLChat chat;

    @ManyToOne
    @JoinColumn(name = "sender_id")
    private BLUser sender;

    @JsonFormat(shape = JsonFormat.Shape.NUMBER)
    @Column(name = "created_at", nullable = false)
    private Date createdAt;

    /*@ManyToMany(targetEntity = BLMessage.class, cascade = {CascadeType.PERSIST, CascadeType.MERGE}, fetch = FetchType.LAZY)
    @JoinTable(name = "rel_message_referencing",
            joinColumns = {
                    @JoinColumn(name = "referencing_message_id", referencedColumnName = "id")
            },
            inverseJoinColumns = {
                    @JoinColumn(name = "referenced_message_id", referencedColumnName = "person_id")
            })
    @OrderBy("createdAt ASC")
    private Set<BLMessage> referencedMessages;*/
}
