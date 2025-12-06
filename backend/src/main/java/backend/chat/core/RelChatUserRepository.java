package backend.chat.core;

import backend.entities.bl_rel_chat_user.BLRelChatUser;
import io.quarkus.hibernate.orm.panache.PanacheRepository;
import jakarta.enterprise.context.Dependent;

@Dependent
public class RelChatUserRepository implements PanacheRepository<BLRelChatUser> {
}
