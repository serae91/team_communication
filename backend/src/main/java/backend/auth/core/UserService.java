package backend.auth.core;

import backend.auth.model.User;
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
        final User user = new User();
        user.setUsername(username);
        user.setPasswordHash(hash);
        userRepository.persist(user);
    }

    public boolean authenticate(final String username, final String password) {
        final User user = userRepository.find("username", username).firstResult();
        return user != null && BcryptUtil.matches(password, user.getPasswordHash());
    }
}

