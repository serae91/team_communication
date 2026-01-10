package backend.bl_api.rel_chat_user_attr.usecase.update;

import backend.bl_api.rel_chat_user_attr.usecase.core.RelChatUserAttrRepository;
import backend.bl_entities.bl_chat.BLChat;
import backend.bl_entities.bl_rel_chat_user_attr.BLRelChatUserAttr;
import backend.bl_entities.bl_rel_chat_user_attr.BLRelChatUserAttrSetReminderDto;
import backend.bl_entities.bl_rel_chat_user_attr.ReminderStatus;
import backend.bl_entities.bl_user.BLUser;
import jakarta.enterprise.context.ApplicationScoped;
import jakarta.inject.Inject;
import jakarta.transaction.Transactional;

import java.util.List;

@ApplicationScoped
public class RelChatUserAttrUpdateService {

    @Inject
    RelChatUserAttrRepository repository;

    @Transactional
    public void setReminder(final BLRelChatUserAttrSetReminderDto setReminderDto, final Long userId) {
        final BLRelChatUserAttr attrChatUser = getBLRelChatUserAttrOrNew(setReminderDto.chatId(), userId);
        attrChatUser.setReminderAt(setReminderDto.reminderAt());
        attrChatUser.setReminderStatus(ReminderStatus.SCHEDULED);
        repository.persist(attrChatUser);
    }

    @Transactional
    public void triggerDone(final Long chatId, final Long userId) {
        final BLRelChatUserAttr attrChatUser = getBLRelChatUserAttrOrNew(chatId, userId);
        attrChatUser.setDone(!attrChatUser.isDone());
        repository.persist(attrChatUser);
    }

    @Transactional
    public void setUndoneForAllUsers(final Long chatId) {
        final List<BLRelChatUserAttr> attrChatUsers = repository.findBy(chatId);
        attrChatUsers.forEach(bLRelChatUser -> {
            bLRelChatUser.setDone(false);
        });
        repository.persist(attrChatUsers);
    }

    @Transactional
    public void setReminderSeen(final Long chatId, final Long userId) {
        final BLRelChatUserAttr attrChatUser = repository.findBy(chatId, userId);
        attrChatUser.setReminderStatus(ReminderStatus.SEEN);
        repository.persist(attrChatUser);
    }

    private BLRelChatUserAttr getBLRelChatUserAttrOrNew(final Long chatId, final Long userId) {
        return repository.findOptionalBy(chatId, userId).orElseGet(() -> {
            final BLChat chat = BLChat.builder().id(chatId).build();
            final BLUser user = BLUser.builder().id(userId).build();
            return BLRelChatUserAttr.builder().chat(chat).user(user).build();
        });

    }
}

