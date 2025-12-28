package backend.rel_chat_user_attr.usecase.update;

import backend.entities.bl_rel_chat_user_attr.ReminderStatus;
import backend.rel_chat_user_attr.usecase.core.RelChatUserAttrRepository;
import jakarta.enterprise.context.ApplicationScoped;
import jakarta.inject.Inject;
import jakarta.transaction.Transactional;

import java.util.List;

@ApplicationScoped
public class RelChatUserAttrUpdateService {

    @Inject
    RelChatUserAttrRepository repository;

    @Transactional
    public void setReminder(final backend.entities.bl_rel_chat_user_attr.BLRelChatUserAttrSetReminderDto setReminderDto, final Long userId) {
        final backend.entities.bl_rel_chat_user_attr.BLRelChatUserAttr attrChatUser = repository.findBy(setReminderDto.chatId(), userId);
        attrChatUser.setReminderAt(setReminderDto.reminderAt());
        attrChatUser.setReminderStatus(ReminderStatus.SCHEDULED);
        repository.persist(attrChatUser);
    }

    @Transactional
    public void triggerDone(final Long chatId, final Long userId) {
        final backend.entities.bl_rel_chat_user_attr.BLRelChatUserAttr attrChatUser = repository.findBy(chatId, userId);
        attrChatUser.setDone(!attrChatUser.isDone());
        repository.persist(attrChatUser);
    }

    @Transactional
    public void setUndoneForAllUsers(final Long chatId) {
        final List<backend.entities.bl_rel_chat_user_attr.BLRelChatUserAttr> attrChatUsers = repository.findBy(chatId);
        attrChatUsers.forEach(bLRelChatUser -> {
            bLRelChatUser.setDone(false);
        });
        repository.persist(attrChatUsers);
    }

    @Transactional
    public void setReminderSeen(final Long chatId, final Long userId) {
        final backend.entities.bl_rel_chat_user_attr.BLRelChatUserAttr attrChatUser = repository.findBy(chatId, userId);
        attrChatUser.setReminderStatus(ReminderStatus.SEEN);
        repository.persist(attrChatUser);
    }
}

