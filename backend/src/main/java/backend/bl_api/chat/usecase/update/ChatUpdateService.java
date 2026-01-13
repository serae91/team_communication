package backend.bl_api.chat.usecase.update;

import backend.bl_api.chat.core.ChatRepository;
import backend.bl_entities.bl_chat.BLChat;
import jakarta.enterprise.context.ApplicationScoped;
import jakarta.inject.Inject;
import jakarta.transaction.Transactional;

@ApplicationScoped
public class ChatUpdateService {
    @Inject
    ChatRepository chatRepository;

    @Transactional
    public void updateLastMessageUserId(final Long chatId, final Long userId) {
        final BLChat chat = chatRepository.findById(chatId);
        chat.setLastMessageUserId(userId);
        chatRepository.persist(chat);
    }
}
