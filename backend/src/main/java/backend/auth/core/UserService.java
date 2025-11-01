package backend.auth.core;

import backend.entities.bl_user.BLUser;
import io.quarkus.elytron.security.common.BcryptUtil;
import jakarta.enterprise.context.ApplicationScoped;
import jakarta.inject.Inject;
import jakarta.transaction.Transactional;

@ApplicationScoped
public class UserService {

    @Inject
    UserRepository userRepository;

    @Transactional
    public void register(final String username, final String password) {
        final String hash = BcryptUtil.bcryptHash(password);
        final BLUser BLUser = new BLUser();
        BLUser.setUsername(username);
        BLUser.setPasswordHash(hash);
        userRepository.persist(BLUser);
    }

    public boolean authenticate(final String username, final String password) {
        final BLUser BLUser = userRepository.find("username", username).firstResult();
        return BLUser != null && BcryptUtil.matches(password, BLUser.getPasswordHash());
    }
}

