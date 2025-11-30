package backend.entities.bl_chat;

import com.blazebit.persistence.view.EntityView;
import com.blazebit.persistence.view.IdMapping;

@EntityView(BLChat.class)
public interface BLChatIdView {
    @IdMapping
    Long getId();

    void setId(Long id);
}
