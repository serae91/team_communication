package backend.bl_api.rel_chat_user_attr.usecase.core;

import backend.bl_entities.bl_rel_chat_user_attr.BLRelChatUserAttr;
import io.quarkus.hibernate.orm.panache.PanacheRepository;
import jakarta.enterprise.context.ApplicationScoped;

import java.util.List;
import java.util.Optional;

@ApplicationScoped
public class RelChatUserAttrRepository implements PanacheRepository<BLRelChatUserAttr> {

    public List<BLRelChatUserAttr> findBy(final Long chatId) {
        return find("chat.id", chatId).list();
    }

    public BLRelChatUserAttr findBy(final Long chatId, final Long userId) {
        return find("chat.id = ?1 and user.id = ?2", chatId, userId).singleResult();
    }

    public Optional<BLRelChatUserAttr> findOptionalBy(final Long chatId, final Long userId) {
        return find("chat.id = ?1 and user.id = ?2", chatId, userId).firstResultOptional();
    }

}
