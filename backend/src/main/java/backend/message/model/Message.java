package backend.message.model;

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
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;

import java.util.Date;

@Entity
@Table(name = "message")
@RegisterForReflection
@Getter
@Setter
@NoArgsConstructor
@AllArgsConstructor
@Builder
public class Message {

    @Id
    @GeneratedValue(generator = "message_sequence", strategy = GenerationType.SEQUENCE)
    @SequenceGenerator(name = "message_sequence", sequenceName = "message_sequence", allocationSize = 1)
    @Column(name = "id", nullable = false)
    private Long id;

    @Column(name = "text", nullable = false)
    private String text;

    @JsonFormat(shape = JsonFormat.Shape.NUMBER)
    @Column(name = "created_at", nullable = false)
    private Date createdAt;

    @Column(name = "team_communication_user_sender_id", nullable = false)
    private Long senderId;

    @Column(name = "team_communication_user_receiver_id")
    private Long receiverId;

    @Column(name = "chat_group_id")
    private Long chatGroupId;
}
