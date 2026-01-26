package backend.bl_api.user.core;

import backend.bl_entities.bl_user.BLUser;
import backend.bl_entities.bl_user.BLUserView;
import com.blazebit.persistence.CriteriaBuilder;
import com.blazebit.persistence.CriteriaBuilderFactory;
import com.blazebit.persistence.WhereOrBuilder;
import com.blazebit.persistence.view.EntityViewManager;
import com.blazebit.persistence.view.EntityViewSetting;
import jakarta.enterprise.context.ApplicationScoped;
import jakarta.inject.Inject;
import jakarta.persistence.EntityManager;

import java.util.HashSet;
import java.util.Set;

@ApplicationScoped
public class UserService {

    @Inject
    UserRepository userRepository;
    @Inject
    EntityManager entityManager;
    @Inject
    EntityViewManager entityViewManager;
    @Inject
    CriteriaBuilderFactory criteriaBuilderFactory;

    public BLUser getUserById(final Long userId) {
        return userRepository.findById(userId);
    }

    public Set<BLUserView> getFilteredUsers(final String query, final Long userId/*TODO look for workspace by userId*/) {
        final BLUser user = userRepository.findById(userId);
        final CriteriaBuilder<BLUser> criteriaBuilder = criteriaBuilderFactory.create(entityManager, BLUser.class);
        criteriaBuilder.where("workspace.id").eq(user.getWorkspace().getId());
        if (!query.isBlank()) {
            final WhereOrBuilder<CriteriaBuilder<BLUser>> whereOr = criteriaBuilder.whereOr();
            whereOr.whereExpression("CONCAT(lastName, ' ', firstName) LIKE :q");
            whereOr.whereExpression("username LIKE :q");
            whereOr.endOr();
            criteriaBuilder.setParameter("q", "%" + query + "%");
        }
        return new HashSet<>(entityViewManager.applySetting(EntityViewSetting.create(BLUserView.class), criteriaBuilder).getResultList());
    }
}

