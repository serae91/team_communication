package backend.bl_api.rel_chat_user_attr.usecase.core;

import backend.bl_entities.bl_rel_chat_user_attr.ChatUserView;
import io.quarkus.hibernate.orm.panache.PanacheRepository;
import jakarta.enterprise.context.ApplicationScoped;

import java.util.List;

@ApplicationScoped
public class ChatUserViewRepository implements PanacheRepository<ChatUserView> {

    public List<ChatUserView> findByUserId(final Long userId) {
        return list("userId", userId);
    }
}
