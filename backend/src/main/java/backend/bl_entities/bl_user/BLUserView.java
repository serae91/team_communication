package backend.bl_entities.bl_user;

import com.blazebit.persistence.view.EntityView;
import com.blazebit.persistence.view.IdMapping;

@EntityView(BLUser.class)
public interface BLUserView {
    @IdMapping
    Long getId();

    String getFirstName();

    String getLastName();

    String getUsername();
}
