package backend.bl_api.rel_chat_user_attr.usecase.core;

import backend.bl_entities.bl_rel_chat_user_attr.ChatUserView;
import jakarta.enterprise.context.ApplicationScoped;
import jakarta.inject.Inject;

import java.util.List;

@ApplicationScoped
public class ChatUserViewService {

    @Inject
    ChatUserViewRepository repository;

    public List<ChatUserView> findByUserId(final Long userId) {
        return repository.findByUserId(userId);
    }
}
