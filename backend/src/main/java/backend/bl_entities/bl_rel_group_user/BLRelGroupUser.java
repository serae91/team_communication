package backend.bl_entities.bl_rel_group_user;

import backend.bl_entities.bl_group.BLGroup;
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

@Entity
@Table(name = "bl_rel_group_user")
@RegisterForReflection
@Data
@NoArgsConstructor
@AllArgsConstructor
@Builder
public class BLRelGroupUser {
    @Id
    @GeneratedValue(generator = "bl_rel_group_user_sequence", strategy = GenerationType.SEQUENCE)
    @SequenceGenerator(name = "bl_rel_group_user_sequence", sequenceName = "bl_rel_group_user_sequence", allocationSize = 1)
    @Column(name = "id", nullable = false)
    private Long id;

    @ManyToOne
    @JoinColumn(name = "group_id", nullable = false)
    private BLGroup group;

    @ManyToOne
    @JoinColumn(name = "user_id", nullable = false)
    private BLUser user;
}
