package backend.entities.bl_chat;

import com.blazebit.persistence.view.EntityView;
import com.blazebit.persistence.view.IdMapping;
import com.blazebit.persistence.view.Mapping;

import java.util.Date;

@EntityView(BLChat.class)
public interface BLChatPlainView {

    @IdMapping
    Long getId();

    @Mapping("title")
    String getTitle();

    @Mapping("urgency")
    Urgency getUrgency();

    @Mapping("createdAt")
    Date getCreatedAt();
}
