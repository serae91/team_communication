package backend.entities.bl_chat;

import com.blazebit.persistence.view.EntityView;
import com.blazebit.persistence.view.IdMapping;
import com.blazebit.persistence.view.Mapping;

import java.time.Instant;

@EntityView(BLChat.class)
public interface BLChatPlainView {

    @IdMapping
    Long getId();

    @Mapping("title")
    String getTitle();

    @Mapping("urgency")
    Urgency getUrgency();

    @Mapping("createdAt")
    Instant getCreatedAt();
}
