package backend.entities.bl_chat;

import com.blazebit.persistence.view.CreatableEntityView;
import com.blazebit.persistence.view.EntityView;
import com.blazebit.persistence.view.IdMapping;
import com.blazebit.persistence.view.Mapping;

import java.time.Instant;

@CreatableEntityView
@EntityView(BLChat.class)
public interface BLChatCreateView {

    @IdMapping
    Long getId();

    @Mapping("title")
    String getTitle();

    void setTitle(String title);

    @Mapping("urgency")
    Urgency getUrgency();

    void setUrgency(Urgency urgency);

    @Mapping("createdAt")
    Instant getCreatedAt();

    void setCreatedAt(Instant createdAt);
}
