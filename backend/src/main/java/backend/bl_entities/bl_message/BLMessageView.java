package backend.bl_entities.bl_message;

import backend.bl_entities.bl_user.BLUserView;
import com.blazebit.persistence.view.EntityView;
import com.blazebit.persistence.view.IdMapping;

import java.time.Instant;

@EntityView(BLMessage.class)
public interface BLMessageView {

    @IdMapping
    Long getId();

    String getText();

    Instant getCreatedAt();

    BLUserView getSender();

}
