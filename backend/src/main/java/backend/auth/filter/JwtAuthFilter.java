package backend.auth.filter;

import io.jsonwebtoken.security.Keys;
import jakarta.annotation.PostConstruct;
import jakarta.annotation.Priority;
import jakarta.ws.rs.Priorities;
import jakarta.ws.rs.container.ContainerRequestContext;
import jakarta.ws.rs.container.ContainerRequestFilter;
import jakarta.ws.rs.ext.Provider;
import lombok.Getter;

import java.io.IOException;
import java.nio.charset.StandardCharsets;
import java.security.Key;

@Provider
@Priority(Priorities.AUTHENTICATION)
@Getter
public class JwtAuthFilter implements ContainerRequestFilter {

    @jakarta.inject.Inject
    @org.eclipse.microprofile.config.inject.ConfigProperty(name = "jwt.secret")
    String jwtSecret;

    private Key key;

    @PostConstruct
    void init() {
        key = Keys.hmacShaKeyFor(jwtSecret.getBytes(StandardCharsets.UTF_8));
    }

    @Override
    public void filter(final ContainerRequestContext requestContext) throws IOException {
        /*String path = requestContext.getUriInfo().getPath();

        if ("OPTIONS".equalsIgnoreCase(requestContext.getMethod())) {
            return;
        }

        if (path.startsWith("/api/")) {
            path = path.substring("/api".length());
        }

        if (path.startsWith("/auth/login") || path.startsWith("/auth/register")) {
            return;
        }

        final String authHeader = requestContext.getHeaderString(HttpHeaders.AUTHORIZATION);
        if (authHeader == null || !authHeader.startsWith("Bearer ")) {
            requestContext.abortWith(Response.status(Response.Status.UNAUTHORIZED).build());
            return;
        }

        final String token = authHeader.substring("Bearer ".length());
        try {
            final Jws<Claims> claims = Jwts.parserBuilder()
                    .setSigningKey(key)
                    .build()
                    .parseClaimsJws(token);

            final String group = claims.getBody().get("groups", String.class);
            if (!"user".equals(group)) {
                requestContext.abortWith(Response.status(Response.Status.FORBIDDEN).build());
            }

        } catch (JwtException exception) {
            requestContext.abortWith(Response.status(Response.Status.UNAUTHORIZED).build());
        }*/
    }
}
