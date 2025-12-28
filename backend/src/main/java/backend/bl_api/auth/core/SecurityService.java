package backend.bl_api.auth.core;

import io.quarkus.security.identity.SecurityIdentity;
import jakarta.enterprise.context.ApplicationScoped;
import jakarta.inject.Inject;
import jakarta.ws.rs.WebApplicationException;

@ApplicationScoped
public class SecurityService {

    @Inject
    SecurityIdentity identity;

    public Long getUserId() {
        if (identity == null || identity.isAnonymous()) {
            throw new WebApplicationException(401);
        }

        final Object userId = identity.getAttribute("userId");
        if (userId == null) {
            throw new WebApplicationException("userId missing in token", 401);
        }

        return Long.valueOf(userId.toString());
    }
}

