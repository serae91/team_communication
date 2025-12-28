package backend.bl_entities.bl_group;

import backend.bl_entities.bl_chat.BLChat;
import backend.bl_entities.bl_user.BLUser;
import io.quarkus.runtime.annotations.RegisterForReflection;
import jakarta.persistence.CascadeType;
import jakarta.persistence.Column;
import jakarta.persistence.Entity;
import jakarta.persistence.FetchType;
import jakarta.persistence.GeneratedValue;
import jakarta.persistence.GenerationType;
import jakarta.persistence.Id;
import jakarta.persistence.JoinColumn;
import jakarta.persistence.JoinTable;
import jakarta.persistence.ManyToMany;
import jakarta.persistence.SequenceGenerator;
import jakarta.persistence.Table;
import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Data;
import lombok.NoArgsConstructor;

import java.time.Instant;
import java.util.Set;

@Entity
@Table(name = "bl_group")
@RegisterForReflection
@Data
@NoArgsConstructor
@AllArgsConstructor
@Builder
public class BLGroup {

    @Id
    @GeneratedValue(generator = "bl_group_sequence", strategy = GenerationType.SEQUENCE)
    @SequenceGenerator(name = "bl_group_sequence", sequenceName = "bl_group_sequence", allocationSize = 1)
    @Column(name = "id", nullable = false)
    private Long id;

    @Column(name = "name", nullable = false)
    private String name;

    @Column(name = "created_at", nullable = false)
    private Instant createdAt;

    @ManyToMany(targetEntity = BLChat.class, cascade = {CascadeType.PERSIST, CascadeType.MERGE}, fetch = FetchType.LAZY)
    @JoinTable(name = "bl_rel_chat_group",
            joinColumns = {
                    @JoinColumn(name = "group_id", referencedColumnName = "id")
            },
            inverseJoinColumns = {
                    @JoinColumn(name = "chat_id", referencedColumnName = "id")
            })
    private Set<BLChat> chats;

    @ManyToMany(targetEntity = BLChat.class, cascade = {CascadeType.PERSIST, CascadeType.MERGE}, fetch = FetchType.LAZY)
    @JoinTable(name = "bl_rel_group_user",
            joinColumns = {
                    @JoinColumn(name = "group_id", referencedColumnName = "id")
            },
            inverseJoinColumns = {
                    @JoinColumn(name = "user_id", referencedColumnName = "id")
            })
    private Set<BLUser> users;
}
