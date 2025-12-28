package backend.bl_entities.bl_rel_chat_user_attr;

import backend.bl_entities.bl_user.BLUser;
import com.blazebit.persistence.view.EntityView;
import com.blazebit.persistence.view.IdMapping;
import com.blazebit.persistence.view.Mapping;

import java.time.Instant;

@EntityView(BLRelChatUserAttr.class)
public interface BLRelChatUserAttrView {
    @IdMapping
    Long getId();

    @Mapping("user")
    BLUser getUser();

    @Mapping("done")
    boolean getDone();

    @Mapping("reminderAt")
    Instant getReminderAt();

    @Mapping("reminderStatus")
    ReminderStatus getReminderStatus();
}
