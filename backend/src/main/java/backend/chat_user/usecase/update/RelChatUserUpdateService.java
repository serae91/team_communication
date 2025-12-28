package backend.chat_user.usecase.update;

import backend.chat_user.core.ChatUserRepository;
import jakarta.enterprise.context.ApplicationScoped;
import jakarta.inject.Inject;

@ApplicationScoped
public class RelChatUserUpdateService {

    @Inject
    ChatUserRepository chatUserRepository;

}
