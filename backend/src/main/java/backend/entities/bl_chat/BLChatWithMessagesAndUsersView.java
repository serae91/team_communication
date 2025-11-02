package backend.entities.bl_chat;

import backend.entities.bl_rel_chat_message.BLChatMessageView;
import backend.entities.bl_rel_chat_user.BLChatUserView;
import com.blazebit.persistence.view.EntityView;
import com.blazebit.persistence.view.IdMapping;
import com.blazebit.persistence.view.Mapping;

import java.util.Set;

@EntityView(BLChat.class)
public interface BLChatWithMessagesAndUsersView {

    @IdMapping
    Long getId();

    @Mapping("messages")
    Set<BLChatMessageView> getMessages();

    @Mapping("users")
    Set<BLChatUserView> getUsers();
}
