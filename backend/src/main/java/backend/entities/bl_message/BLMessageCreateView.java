package backend.entities.bl_message;

import backend.entities.bl_chat.BLChatIdView;
import backend.entities.bl_user.BLUserIdView;
import com.blazebit.persistence.view.CreatableEntityView;
import com.blazebit.persistence.view.EntityView;
import com.blazebit.persistence.view.IdMapping;
import com.blazebit.persistence.view.Mapping;

import java.time.Instant;

@CreatableEntityView
@EntityView(BLMessage.class)
public interface BLMessageCreateView {
    @IdMapping
    Long getId();

    @Mapping("text")
    String getText();
    void setText(String text);

    @Mapping("chat")
    BLChatIdView getChat();
    void setChat(BLChatIdView chatId);

    @Mapping("sender")
    BLUserIdView getSender();
    void setSender(BLUserIdView senderId);

    @Mapping("createdAt")
    Instant getCreatedAt();
    void setCreatedAt(Instant createdAt);
}
