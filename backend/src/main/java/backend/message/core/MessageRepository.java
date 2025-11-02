package backend.message.core;

import backend.entities.bl_message.BLMessage;
import io.quarkus.hibernate.orm.panache.PanacheRepository;
import jakarta.enterprise.context.ApplicationScoped;

import java.util.List;

@ApplicationScoped
public class MessageRepository implements PanacheRepository<BLMessage> {
    public List<BLMessage> listForSenderIdAndReceiverId(final Long senderId, final Long receiverId) {
        return list("senderId = ?1 and receiverId = ?2", senderId, receiverId);
    }

    public List<BLMessage> listForSenderIdAndGroupChatId(final Long senderId, final Long groupChatId) {
        return list("senderId = ?1 and groupChatId = ?2", senderId, groupChatId);
    }
}
