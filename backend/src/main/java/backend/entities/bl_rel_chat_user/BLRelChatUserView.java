package backend.entities.bl_rel_chat_user;

import backend.entities.bl_user.BLUser;
import com.blazebit.persistence.view.EntityView;
import com.blazebit.persistence.view.IdMapping;
import com.blazebit.persistence.view.Mapping;

import java.time.Instant;

@EntityView(BLRelChatUser.class)
public interface BLRelChatUserView {
    @IdMapping
    public Long getId();

    @Mapping("user")
    BLUser getUser();

    @Mapping("downed")
    boolean getDowned();

    @Mapping("reminderAt")
    Instant getReminderAt();

    @Mapping("reminderStatus")
    ReminderStatus getReminderStatus();
}
