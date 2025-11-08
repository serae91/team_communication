package backend.message.usecase.create;

import backend.entities.bl_message.BLMessageCreateView;
import com.blazebit.persistence.view.EntityViewManager;
import jakarta.enterprise.context.Dependent;
import jakarta.inject.Inject;
import jakarta.persistence.EntityManager;

import java.util.Date;

@Dependent
public class MessageCreateService {
    @Inject
    EntityManager entityManager;
    @Inject
    EntityViewManager entityViewManager;

    public void createMessage(final BLMessageCreateView blMessageCreateView) {
        blMessageCreateView.setCreatedAt(new Date());
        entityViewManager.save(entityManager, blMessageCreateView);
    }
}
