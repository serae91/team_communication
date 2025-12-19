package backend.filter;

import io.smallrye.jwt.auth.principal.JWTParser;
import io.smallrye.jwt.auth.principal.ParseException;
import jakarta.annotation.Priority;
import jakarta.inject.Inject;
import jakarta.ws.rs.Priorities;
import jakarta.ws.rs.container.ContainerRequestContext;
import jakarta.ws.rs.container.ContainerRequestFilter;
import jakarta.ws.rs.core.Cookie;
import jakarta.ws.rs.core.Response;
import jakarta.ws.rs.ext.Provider;
import org.eclipse.microprofile.jwt.JsonWebToken;

@Provider
@CookieAuthFilterProtected
@Priority(Priorities.AUTHENTICATION)
public class CookieAuthFilter implements ContainerRequestFilter {

    @Inject
    JWTParser parser;

    @Override
    public void filter(final ContainerRequestContext requestContext) {

        final Cookie cookie = requestContext.getCookies().get("token");

        if (cookie == null) {
            requestContext.abortWith(Response.status(Response.Status.UNAUTHORIZED).build());
            return;
        }

        try {
            final JsonWebToken jwt = parser.parse(cookie.getValue());
            requestContext.setSecurityContext(new CustomSecurityContext(jwt));
        } catch (final ParseException parseException) {
            requestContext.abortWith(Response.status(Response.Status.UNAUTHORIZED).build());
        }
    }
}
