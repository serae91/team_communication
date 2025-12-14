package backend.auth.web;

import backend.auth.core.AuthService;
import backend.auth.model.LoginRequest;
import backend.auth.model.UserInfo;
import backend.entities.bl_user.BLUser;
import backend.filter.CookieAuthFilterProtected;
import io.quarkus.security.Authenticated;
import io.smallrye.jwt.build.Jwt;
import jakarta.enterprise.context.ApplicationScoped;
import jakarta.inject.Inject;
import jakarta.ws.rs.GET;
import jakarta.ws.rs.POST;
import jakarta.ws.rs.Path;
import jakarta.ws.rs.Produces;
import jakarta.ws.rs.WebApplicationException;
import jakarta.ws.rs.core.Context;
import jakarta.ws.rs.core.MediaType;
import jakarta.ws.rs.core.Response;
import jakarta.ws.rs.core.SecurityContext;
import org.eclipse.microprofile.jwt.JsonWebToken;

import java.util.Set;

@Path("/auth")
@ApplicationScoped
public class AuthResource {

    @Inject
    AuthService authService;

    @POST
    @Path("/login")
    public Response login(LoginRequest request) {

        final BLUser user = authService.authenticate(request.username(), request.password());

        if (user == null) {
            return Response.status(Response.Status.UNAUTHORIZED).build();
        }

        String token = Jwt.subject(user.getUsername())
                .claim("userId", user.getId())
                //.groups(user.getRoles())
                .groups(Set.of("user"))//TODO replace by line above
                .expiresIn(3600)
                .sign();

        return Response.noContent()
                //.header("Set-Cookie", "token=" + token + "; HttpOnly; Path=/; SameSite=None; Secure")
                .header("Set-Cookie", "token=" + token + "; HttpOnly; Path=/; SameSite=Lax")//TODO replace by line above
                .build();
    }

    @GET
    @Path("/me")
    @CookieAuthFilterProtected
    @Produces(MediaType.APPLICATION_JSON)
    public UserInfo me(@Context SecurityContext ctx) {

        if (!(ctx.getUserPrincipal() instanceof JsonWebToken jwt)) {
            throw new WebApplicationException(Response.Status.UNAUTHORIZED);
        }

        final Object userIdObj = jwt.getClaim("userId");
        final Long userId = Long.valueOf(userIdObj.toString());
        final Set<String> groups = jwt.getGroups() != null ? jwt.getGroups() : Set.of("user");

        return new UserInfo(
                userId,
                jwt.getName(),
                groups
        );
    }
}
