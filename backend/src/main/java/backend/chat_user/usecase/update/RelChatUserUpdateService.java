package backend.chat_user.usecase.update;

import backend.auth.core.CurrentUser;
import backend.chat_user.core.ChatUserRepository;
import backend.entities.bl_rel_chat_user.BLRelChatUser;
import backend.entities.bl_rel_chat_user.BLRelChatUserSetReminderDto;
import backend.entities.bl_rel_chat_user.ReminderStatus;
import jakarta.enterprise.context.ApplicationScoped;
import jakarta.inject.Inject;
import jakarta.transaction.Transactional;

import java.util.List;

@ApplicationScoped
public class RelChatUserUpdateService {

    @Inject
    ChatUserRepository chatUserRepository;
    @Inject
    CurrentUser currentUser;

    @Transactional
    public void setReminder(final BLRelChatUserSetReminderDto setReminderDto) {
        final BLRelChatUser chatUser = chatUserRepository.findBy(setReminderDto.chatId(), currentUser.getUserId());
        chatUser.setReminderAt(setReminderDto.reminderAt());
        chatUser.setReminderStatus(ReminderStatus.SCHEDULED);
        chatUserRepository.persist(chatUser);
    }

    @Transactional
    public void triggerDown(final Long chatId) {
        final BLRelChatUser chatUser = chatUserRepository.findBy(chatId, currentUser.getUserId());
        chatUser.setDowned(!chatUser.isDowned());
        chatUserRepository.persist(chatUser);
    }

    @Transactional
    public void unDownForAllUsers(final Long chatId) {
        final List<BLRelChatUser> chatUsers = chatUserRepository.findBy(chatId);
        chatUsers.forEach(bLRelChatUser -> {
            bLRelChatUser.setDowned(false);
        });
        chatUserRepository.persist(chatUsers);
    }

    @Transactional
    public void setReminderSeen(final Long chatId) {
        final BLRelChatUser chatUser = chatUserRepository.findBy(chatId, currentUser.getUserId());
        chatUser.setReminderStatus(ReminderStatus.SEEN);
        chatUserRepository.persist(chatUser);
    }
}
