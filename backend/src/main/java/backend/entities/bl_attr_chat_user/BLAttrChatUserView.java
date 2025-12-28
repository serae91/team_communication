package backend.entities.bl_attr_chat_user;

import backend.entities.bl_user.BLUser;
import com.blazebit.persistence.view.EntityView;
import com.blazebit.persistence.view.IdMapping;
import com.blazebit.persistence.view.Mapping;

import java.time.Instant;

@EntityView(BLAttrChatUser.class)
public interface BLAttrChatUserView {
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
