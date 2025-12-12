package backend.auth.web;

import backend.auth.model.LoginRequest;
import backend.auth.model.TokenDto;
import io.smallrye.jwt.build.Jwt;
import jakarta.enterprise.context.ApplicationScoped;
import jakarta.ws.rs.POST;
import jakarta.ws.rs.Path;
import jakarta.ws.rs.core.Response;

@Path("/auth")
@ApplicationScoped
public class AuthResource {

    @POST
    @Path("/login")
    public Response login(LoginRequest request) {

        if (!"admin".equals(request.username()) || !"secret".equals(request.password())) {
            return Response.status(Response.Status.UNAUTHORIZED).build();
        }

        String token = Jwt.subject(request.username())
                .groups("user")
                .expiresIn(3600)
                .sign();

        return Response.ok()
                .header("Set-Cookie", "token=" + token + "; HttpOnly; Path=/; SameSite=Lax")
                .entity(new TokenDto(token))
                .build();
    }
}

