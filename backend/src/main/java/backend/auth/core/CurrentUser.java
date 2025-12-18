package backend.auth.core;

import jakarta.enterprise.context.ApplicationScoped;
import jakarta.inject.Inject;
import jakarta.ws.rs.WebApplicationException;
import jakarta.ws.rs.core.Response;
import jakarta.ws.rs.core.SecurityContext;
import org.eclipse.microprofile.jwt.JsonWebToken;

@ApplicationScoped
public class CurrentUser {

    @Inject
    SecurityContext securityContext;

    public Long getUserId() {
        if (!(securityContext.getUserPrincipal() instanceof JsonWebToken jwt)) {
            throw new WebApplicationException(Response.Status.UNAUTHORIZED);
        }

        final Object claim = jwt.getClaim("userId");
        if (claim == null) {
            throw new WebApplicationException(
                    "Missing userId claim", Response.Status.FORBIDDEN
            );
        }

        return Long.valueOf(claim.toString());
    }
}
