package backend.entities.bl_user;

import com.blazebit.persistence.view.EntityView;
import com.blazebit.persistence.view.IdMapping;

@EntityView(BLUser.class)
public interface BLUserIdView {
    @IdMapping
    Long getId();

    void setId(Long id);
}
