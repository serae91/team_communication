package backend.auth.core;

import backend.entities.bl_user.BLUser;
import io.quarkus.elytron.security.common.BcryptUtil;
import jakarta.enterprise.context.ApplicationScoped;
import jakarta.inject.Inject;

@ApplicationScoped
public class AuthService {

    @Inject
    UserRepository UserRepository;

    public BLUser authenticate(final String username, final String password) {
        final BLUser user = UserRepository.findByUsername(username);

        final String pwd = BcryptUtil.bcryptHash("123456");

        if (user == null) {
            return null;
        }

        if (!BcryptUtil.matches(password, user.getPasswordHash())) {
            return null;
        }

        return user;
    }
}
