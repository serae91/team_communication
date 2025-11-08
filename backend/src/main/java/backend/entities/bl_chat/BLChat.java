package backend.entities.bl_chat;

import backend.entities.bl_message.BLMessage;
import backend.entities.bl_rel_chat_user.BLRelChatUser;
import io.quarkus.runtime.annotations.RegisterForReflection;
import jakarta.persistence.Column;
import jakarta.persistence.Entity;
import jakarta.persistence.EnumType;
import jakarta.persistence.Enumerated;
import jakarta.persistence.GeneratedValue;
import jakarta.persistence.GenerationType;
import jakarta.persistence.Id;
import jakarta.persistence.OneToMany;
import jakarta.persistence.SequenceGenerator;
import jakarta.persistence.Table;
import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Data;
import lombok.NoArgsConstructor;

import java.util.Date;
import java.util.Set;

@Entity
@Table(name = "bl_chat")
@RegisterForReflection
@Data
@NoArgsConstructor
@AllArgsConstructor
@Builder
public class BLChat {

    @Id
    @GeneratedValue(generator = "bl_chat_sequence", strategy = GenerationType.SEQUENCE)
    @SequenceGenerator(name = "bl_chat_sequence", sequenceName = "bl_chat_sequence", allocationSize = 1)
    @Column(name = "id", nullable = false)
    private Long id;

    @Column(name = "title", nullable = false)
    private String title;

    @Enumerated(EnumType.STRING)
    @Column(name = "urgency", nullable = false)
    private Urgency urgency;

    @Column(name = "created_at", nullable = false)
    private Date createdAt;

    @OneToMany(mappedBy = "chat")
    //@OrderBy("message.createdAt ASC")
    private Set<BLMessage> messages;

    @OneToMany(mappedBy = "chat")
    //@OrderBy("user.username ASC")
    private Set<BLRelChatUser> users;

    /*@OneToMany(
            mappedBy = "bl_chat",
            targetEntity = BLMessage.class,
            cascade = CascadeType.ALL,
            orphanRemoval = true,
            fetch = FetchType.LAZY
    )
    @OrderBy("createdAt ASC")
    private Set<BLMessage> messages;*/
}
