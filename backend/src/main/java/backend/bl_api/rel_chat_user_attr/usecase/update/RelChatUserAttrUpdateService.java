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
        final BLRelChatUserAttr chatUserAttr = getBLRelChatUserAttrOrNew(setReminderDto.chatId(), userId);
        chatUserAttr.setReminderAt(setReminderDto.reminderAt());
        chatUserAttr.setReminderStatus(ReminderStatus.SCHEDULED);
        chatUserAttr.setDone(false);
        repository.persist(chatUserAttr);
    }

    @Transactional
    public void triggerDone(final Long chatId, final Long userId) {
        final BLRelChatUserAttr chatUserAttr = getBLRelChatUserAttrOrNew(chatId, userId);
        chatUserAttr.setDone(!chatUserAttr.isDone());
        if (chatUserAttr.isDone()) {
            chatUserAttr.setReminderStatus(ReminderStatus.NONE);
            chatUserAttr.setReminderAt(null);
        }
        repository.persist(chatUserAttr);
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
    public void setReminderStatus(final Long chatId, final Long userId, final ReminderStatus reminderStatus) {
        final BLRelChatUserAttr attrChatUser = repository.findBy(chatId, userId);
        attrChatUser.setReminderStatus(reminderStatus);
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

