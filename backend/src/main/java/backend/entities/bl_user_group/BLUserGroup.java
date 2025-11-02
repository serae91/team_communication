package backend.entities.bl_user_group;

import com.fasterxml.jackson.annotation.JsonFormat;
import io.quarkus.runtime.annotations.RegisterForReflection;
import jakarta.persistence.Column;
import jakarta.persistence.Entity;
import jakarta.persistence.GeneratedValue;
import jakarta.persistence.GenerationType;
import jakarta.persistence.Id;
import jakarta.persistence.SequenceGenerator;
import jakarta.persistence.Table;
import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Data;
import lombok.NoArgsConstructor;

import java.util.Date;

@Entity
@Table(name = "chat_group")
@RegisterForReflection
@Data
@NoArgsConstructor
@AllArgsConstructor
@Builder
public class BLUserGroup {

    @Id
    @GeneratedValue(generator = "user_group_sequence", strategy = GenerationType.SEQUENCE)
    @SequenceGenerator(name = "user_group_sequence", sequenceName = "user_group_sequence", allocationSize = 1)
    @Column(name = "id", nullable = false)
    private Long id;

    @Column(name = "name", nullable = false)
    private String name;

    @JsonFormat(shape = JsonFormat.Shape.NUMBER)
    @Column(name = "created_at", nullable = false)
    private Date createdAt;
}
