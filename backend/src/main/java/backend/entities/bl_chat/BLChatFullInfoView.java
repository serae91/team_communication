package backend.entities.bl_chat;

import backend.entities.bl_message.BLMessageView;
import backend.entities.bl_rel_chat_user.BLChatUserView;
import com.blazebit.persistence.view.EntityView;
import com.blazebit.persistence.view.IdMapping;
import com.blazebit.persistence.view.Mapping;
import jakarta.persistence.OrderBy;

import java.time.Instant;
import java.util.List;

@EntityView(BLChat.class)
public interface BLChatFullInfoView {

    @IdMapping
    Long getId();

    @Mapping("title")
    String getTitle();

    @Mapping("urgency")
    Urgency getUrgency();

    @Mapping("createdAt")
    Instant getCreatedAt();

    @Mapping("messages")
    @OrderBy("createdAt DESC")
    List<BLMessageView> getMessages();

    @Mapping("users")
    List<BLChatUserView> getUsers();
}
