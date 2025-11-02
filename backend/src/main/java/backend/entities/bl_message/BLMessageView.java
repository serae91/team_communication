package backend.entities.bl_message;

import com.blazebit.persistence.view.EntityView;
import com.blazebit.persistence.view.IdMapping;

import java.util.Date;

@EntityView(BLMessage.class)
public interface BLMessageView {

    @IdMapping
    Long getId();

    String getText();

    Date getCreatedAt();

    Long getSenderId();

    Long getReceiverId();
}
