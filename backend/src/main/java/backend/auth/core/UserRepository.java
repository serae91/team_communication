package backend.auth.core;

import backend.entities.bl_user.BLUser;
import io.quarkus.hibernate.orm.panache.PanacheRepository;
import jakarta.enterprise.context.ApplicationScoped;

import java.util.Objects;

@ApplicationScoped
public class UserRepository implements PanacheRepository<BLUser> {
    public BLUser findByUsername(final String username) {
        return find("username", username).singleResult();
    }

    public boolean doesUsernameExist(final String username) {
        final BLUser blUser = find("username", username).firstResult();
        return Objects.nonNull(blUser);
    }
}
