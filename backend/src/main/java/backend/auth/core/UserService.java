package backend.auth.core;

import jakarta.enterprise.context.ApplicationScoped;
import jakarta.inject.Inject;
import jakarta.transaction.Transactional;

@ApplicationScoped
public class UserService {

    @Inject
    UserRepository userRepository;

    @Transactional
    public void register(final String username, final String password) {
        /*final String hash = BcryptUtil.bcryptHash(password);
        final BLUser user = new BLUser();
        user.setUsername(username);
        user.setPasswordHash(hash);
        userRepository.persist(user);*/
    }

    public boolean authenticate(final String username, final String password) {
        //final BLUser user = userRepository.find("username", username).firstResult();
        //return user != null && BcryptUtil.matches(password, user.getPasswordHash());
        return true;
    }
}

