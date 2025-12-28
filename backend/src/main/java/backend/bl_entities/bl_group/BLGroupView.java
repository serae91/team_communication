package backend.bl_entities.bl_group;

import com.blazebit.persistence.view.EntityView;
import com.blazebit.persistence.view.IdMapping;

import java.time.Instant;

@EntityView(BLGroup.class)
public interface BLGroupView {

    @IdMapping
    Long getId();

    String getName();

    Instant getCreatedAt();
}
