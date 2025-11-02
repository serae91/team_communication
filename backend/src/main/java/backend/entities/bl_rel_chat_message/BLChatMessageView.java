package backend.entities.bl_rel_chat_message;

import backend.entities.bl_message.BLMessage;
import com.blazebit.persistence.view.EntityView;
import com.blazebit.persistence.view.IdMapping;
import com.blazebit.persistence.view.Mapping;

@EntityView(BLRelChatMessage.class)
public interface BLChatMessageView {

    @IdMapping
    Long getId();

    @Mapping("message")
    BLMessage getMessage();
}
