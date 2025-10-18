package backend.chatGroup.model;

import com.blazebit.persistence.view.EntityView;
import com.blazebit.persistence.view.IdMapping;

@EntityView(ChatGroup.class)
public interface ChatGroupView {

    @IdMapping
    Long getId();

    String getGroupName();
}
