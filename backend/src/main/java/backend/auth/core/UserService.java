package backend.auth.core;

import backend.entities.bl_user.BLUser;
import jakarta.enterprise.context.ApplicationScoped;
import jakarta.inject.Inject;
import jakarta.transaction.Transactional;

@ApplicationScoped
public class UserService {

    @Inject
    UserRepository UserRepository;

    @Transactional
    public void register(final String username, final String password) {
        /*final String hash = BcryptUtil.bcryptHash(password);
        final BLUser user = new BLUser();
        user.setUsername(username);
        user.setPasswordHash(hash);
        UserRepository.persist(user);*/
    }

    public boolean authenticate(final String username, final String password) {
        //final BLUser user = UserRepository.find("username", username).firstResult();
        //return user != null && BcryptUtil.matches(password, user.getPasswordHash());
        return true;
    }

    public BLUser getUserById(final Long userId) {
        return UserRepository.findById(userId);
    }
}

