package backend.message.core;

import backend.message.model.Message;
import jakarta.enterprise.context.ApplicationScoped;
import jakarta.inject.Inject;

import java.util.List;

@ApplicationScoped
public class MessageService {
    @Inject
    MessageRepository messageRepository;

    public List<Message> listAll() {
        return messageRepository.listAll();
    }

    public List<Message> listForSenderIdAndReceiverId(final Long senderId, final Long receiverId) {
        return messageRepository.listForSenderIdAndReceiverId(senderId, receiverId);
    }

    public List<Message> listForSenderIdAndGroupChatId(final Long senderId, final Long groupChatId) {
        return messageRepository.listForSenderIdAndGroupChatId(senderId, groupChatId);
    }
}
