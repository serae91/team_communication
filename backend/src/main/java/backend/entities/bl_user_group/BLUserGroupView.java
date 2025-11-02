package backend.entities.bl_user_group;

import com.blazebit.persistence.view.EntityView;
import com.blazebit.persistence.view.IdMapping;

import java.util.Date;

@EntityView(BLUserGroup.class)
public interface BLUserGroupView {

    @IdMapping
    Long getId();

    String getName();

    Date getCreatedAt();
}
