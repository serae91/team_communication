package backend.entities.user_group;

import com.blazebit.persistence.view.EntityView;
import com.blazebit.persistence.view.IdMapping;

import java.util.Date;

@EntityView(UserGroup.class)
public interface UserGroupView {

    @IdMapping
    Long getId();

    String getName();

    Date getCreatedAt();
}
