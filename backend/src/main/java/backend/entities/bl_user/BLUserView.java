package backend.entities.bl_user;

import backend.entities.bl_message.BLMessage;
import com.blazebit.persistence.view.EntityView;
import com.blazebit.persistence.view.IdMapping;

@EntityView(BLUser.class)
public interface BLUserView {
    @IdMapping
    Long getId();

    String getUsername();
}
