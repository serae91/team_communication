package backend.bl_entities.bl_rel_chat_group;

import backend.bl_entities.bl_chat.BLChat;
import backend.bl_entities.bl_group.BLGroup;
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

@Entity
@Table(name = "bl_rel_chat_group")
@RegisterForReflection
@Data
@NoArgsConstructor
@AllArgsConstructor
@Builder
public class BLRelChatGroup {
    @Id
    @GeneratedValue(generator = "bl_rel_chat_group_sequence", strategy = GenerationType.SEQUENCE)
    @SequenceGenerator(name = "bl_rel_chat_group_sequence", sequenceName = "bl_rel_chat_group_sequence", allocationSize = 1)
    @Column(name = "id", nullable = false)
    private Long id;

    @ManyToOne
    @JoinColumn(name = "chat_id", nullable = false)
    private BLChat chat;

    @ManyToOne
    @JoinColumn(name = "group_id", nullable = false)
    private BLGroup group;
}
