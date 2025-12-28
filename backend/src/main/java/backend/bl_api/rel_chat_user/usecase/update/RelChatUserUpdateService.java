package backend.bl_api.rel_chat_user.usecase.update;

import backend.bl_api.rel_chat_user.core.ChatUserRepository;
import jakarta.enterprise.context.ApplicationScoped;
import jakarta.inject.Inject;

@ApplicationScoped
public class RelChatUserUpdateService {

    @Inject
    ChatUserRepository chatUserRepository;

}
