package backend.message.core;

import backend.entities.bl_message.BLMessage;
import jakarta.enterprise.context.ApplicationScoped;
import jakarta.inject.Inject;

import java.util.List;

@ApplicationScoped
public class MessageService {
    @Inject
    MessageRepository messageRepository;

    public List<BLMessage> listAll() {
        return messageRepository.listAll();
    }

    public List<BLMessage> listForSenderIdAndReceiverId(final Long senderId, final Long receiverId) {
        return messageRepository.listForSenderIdAndReceiverId(senderId, receiverId);
    }

    public List<BLMessage> listForSenderIdAndGroupChatId(final Long senderId, final Long groupChatId) {
        return messageRepository.listForSenderIdAndGroupChatId(senderId, groupChatId);
    }
}
