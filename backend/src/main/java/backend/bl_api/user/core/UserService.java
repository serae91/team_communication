package backend.bl_api.user.core;

import backend.bl_entities.bl_user.BLUser;
import jakarta.enterprise.context.ApplicationScoped;
import jakarta.inject.Inject;

@ApplicationScoped
public class UserService {

    @Inject
    UserRepository userRepository;

    public BLUser getUserById(final Long userId) {
        return userRepository.findById(userId);
    }
}

