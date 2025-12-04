package backend.chat.core;

import backend.entities.bl_chat.BLChat;
import io.quarkus.hibernate.orm.panache.PanacheRepository;
import jakarta.enterprise.context.Dependent;

@Dependent
public class ChatRepository implements PanacheRepository<BLChat> {
}
