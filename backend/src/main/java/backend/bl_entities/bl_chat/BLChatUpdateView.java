package backend.bl_entities.bl_chat;

import com.blazebit.persistence.view.EntityView;
import com.blazebit.persistence.view.IdMapping;
import com.blazebit.persistence.view.Mapping;
import com.blazebit.persistence.view.UpdatableEntityView;

@UpdatableEntityView
@EntityView(BLChat.class)
public interface BLChatUpdateView {

    @IdMapping
    Long getId();

    @Mapping("title")
    String getTitle();

    void setTitle(String title);

    @Mapping("urgency")
    Urgency getUrgency();

    void setUrgency(Urgency urgency);
}
