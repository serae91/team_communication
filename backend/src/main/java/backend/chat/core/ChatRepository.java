package backend.chat.core;

import backend.entities.bl_chat.BLChat;
import io.quarkus.hibernate.orm.panache.PanacheRepository;
import jakarta.enterprise.context.Dependent;

import java.util.List;

@Dependent
public class ChatRepository implements PanacheRepository<BLChat> {
    public List<BLChat> getChatsForUserId(final Long userId) {
        return find("users.id", userId).list();
    }
}
