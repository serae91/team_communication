package backend.attr_chat_user.usecase.update;

import backend.attr_chat_user.usecase.core.AttrChatUserRepository;
import backend.entities.bl_attr_chat_user.BLAttrChatUser;
import backend.entities.bl_attr_chat_user.BLAttrChatUserSetReminderDto;
import backend.entities.bl_attr_chat_user.ReminderStatus;
import jakarta.enterprise.context.ApplicationScoped;
import jakarta.inject.Inject;
import jakarta.transaction.Transactional;

import java.util.List;

@ApplicationScoped
public class AttrChatUserUpdateService {

    @Inject
    AttrChatUserRepository repository;

    @Transactional
    public void setReminder(final BLAttrChatUserSetReminderDto setReminderDto, final Long userId) {
        final BLAttrChatUser attrChatUser = repository.findBy(setReminderDto.chatId(), userId);
        attrChatUser.setReminderAt(setReminderDto.reminderAt());
        attrChatUser.setReminderStatus(ReminderStatus.SCHEDULED);
        repository.persist(attrChatUser);
    }

    @Transactional
    public void triggerDone(final Long chatId, final Long userId) {
        final BLAttrChatUser attrChatUser = repository.findBy(chatId, userId);
        attrChatUser.setDone(!attrChatUser.isDone());
        repository.persist(attrChatUser);
    }

    @Transactional
    public void setUndoneForAllUsers(final Long chatId) {
        final List<BLAttrChatUser> attrChatUsers = repository.findBy(chatId);
        attrChatUsers.forEach(bLRelChatUser -> {
            bLRelChatUser.setDone(false);
        });
        repository.persist(attrChatUsers);
    }

    @Transactional
    public void setReminderSeen(final Long chatId, final Long userId) {
        final BLAttrChatUser attrChatUser = repository.findBy(chatId, userId);
        attrChatUser.setReminderStatus(ReminderStatus.SEEN);
        repository.persist(attrChatUser);
    }
}

