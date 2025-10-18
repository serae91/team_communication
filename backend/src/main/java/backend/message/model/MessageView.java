package backend.message.model;

import com.blazebit.persistence.view.EntityView;
import com.blazebit.persistence.view.IdMapping;

import java.util.Date;

@EntityView(Message.class)
public interface MessageView {

    @IdMapping
    Long getId();

    String getText();

    Date getCreatedAt();

    Long getSenderId();

    Long getReceiverId();
}
