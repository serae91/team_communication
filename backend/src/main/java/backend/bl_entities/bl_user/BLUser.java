package backend.bl_entities.bl_user;

import backend.bl_entities.bl_group.BLGroup;
import backend.bl_entities.bl_workspace.BLWorkspace;
import com.fasterxml.jackson.annotation.JsonBackReference;
import io.quarkus.runtime.annotations.RegisterForReflection;
import jakarta.persistence.Column;
import jakarta.persistence.Entity;
import jakarta.persistence.GeneratedValue;
import jakarta.persistence.GenerationType;
import jakarta.persistence.Id;
import jakarta.persistence.JoinColumn;
import jakarta.persistence.JoinTable;
import jakarta.persistence.ManyToMany;
import jakarta.persistence.ManyToOne;
import jakarta.persistence.SequenceGenerator;
import jakarta.persistence.Table;
import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Data;
import lombok.NoArgsConstructor;

import java.time.Instant;
import java.util.Set;

@Entity
@Table(name = "bl_user")
@RegisterForReflection
@Data
@NoArgsConstructor
@AllArgsConstructor
@Builder
public class BLUser {

    @Id
    @GeneratedValue(generator = "bl_user_sequence", strategy = GenerationType.SEQUENCE)
    @SequenceGenerator(name = "bl_user_sequence", sequenceName = "bl_user_sequence", allocationSize = 1)
    @Column(name = "id", nullable = false)
    private Long id;

    @Column(name = "username", nullable = false)
    private String username;

    @Column(name = "password_hash", nullable = false)
    private String passwordHash;

    @Column(name = "created_at", nullable = false)
    private Instant createdAt;

    @ManyToOne //provisionally this is a many to one relation, lateron it might become many to many
    @JoinTable(
            name = "bl_rel_workspace_user",
            joinColumns = @JoinColumn(name = "user_id"),
            inverseJoinColumns = @JoinColumn(name = "workspace_id")
    )
    private BLWorkspace workspace;

    @JsonBackReference
    @ManyToMany(mappedBy = "users")
    private Set<BLGroup> groups;
}

