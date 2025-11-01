package backend.message.core;

import backend.entities.message.Message;
import io.quarkus.hibernate.orm.panache.PanacheRepository;
import jakarta.enterprise.context.ApplicationScoped;

import java.util.List;

@ApplicationScoped
public class MessageRepository implements PanacheRepository<Message> {
    public List<Message> listForSenderIdAndReceiverId(final Long senderId, final Long receiverId) {
        return list("senderId = ?1 and receiverId = ?2", senderId, receiverId);
    }

    public List<Message> listForSenderIdAndGroupChatId(final Long senderId, final Long groupChatId) {
        return list("senderId = ?1 and groupChatId = ?2", senderId, groupChatId);
    }
}
