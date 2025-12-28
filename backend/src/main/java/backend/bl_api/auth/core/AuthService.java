package backend.bl_api.auth.core;

import backend.bl_entities.bl_user.BLUser;
import backend.bl_api.user.core.UserRepository;
import io.quarkus.elytron.security.common.BcryptUtil;
import jakarta.enterprise.context.ApplicationScoped;
import jakarta.inject.Inject;
import jakarta.transaction.Transactional;
import jakarta.ws.rs.WebApplicationException;
import jakarta.ws.rs.core.Response;

import java.util.regex.Pattern;

@ApplicationScoped
public class AuthService {
    private static final Pattern STRONG_PASSWORD =
            Pattern.compile("^(?=.*[a-z])(?=.*[A-Z])(?=.*\\d)(?=.*[^A-Za-z0-9]).{8,}$");

    @Inject
    UserRepository userRepository;

    public BLUser authenticate(final String username, final String password) {
        final BLUser user = userRepository.findByUsername(username);

        if (user == null) {
            return null;
        }

        if (!BcryptUtil.matches(password, user.getPasswordHash())) {
            return null;
        }

        return user;
    }

    @Transactional
    public BLUser createUser(final String username, final String password) {

        if (username == null || username.isBlank()) {
            throw new WebApplicationException("Username required", 400);
        }

        if (userRepository.doesUsernameExist(username)) {
            throw new WebApplicationException("User already exists", 409);
        }

        if (!STRONG_PASSWORD.matcher(password).matches()) {
            throw new WebApplicationException(
                    "Password must be at least 8 characters long and contain upper, lower, number and special character",
                    Response.Status.BAD_REQUEST
            );
        }

        final BLUser user = BLUser.builder()
                .username(username)
                .passwordHash(BcryptUtil.bcryptHash(password))
                .build();

        userRepository.persist(user);

        return user;
    }
}
