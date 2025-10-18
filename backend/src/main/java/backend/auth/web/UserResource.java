package backend.auth.web;

import backend.auth.core.UserService;
import backend.auth.model.TokenDTO;
import backend.auth.model.UserDTO;
import io.jsonwebtoken.Jwts;
import io.jsonwebtoken.SignatureAlgorithm;
import io.jsonwebtoken.security.Keys;
import jakarta.annotation.PostConstruct;
import jakarta.enterprise.context.ApplicationScoped;
import jakarta.inject.Inject;
import jakarta.ws.rs.POST;
import jakarta.ws.rs.Path;
import jakarta.ws.rs.core.Response;

import java.nio.charset.StandardCharsets;
import java.security.Key;
import java.util.Date;

@Path("/auth")
@ApplicationScoped
public class UserResource {
    @Inject
    UserService userService;

    @Inject
    @org.eclipse.microprofile.config.inject.ConfigProperty(name = "jwt.secret")
    String jwtSecret;

    private Key key;

    @PostConstruct
    void init() {
        key = Keys.hmacShaKeyFor(jwtSecret.getBytes(StandardCharsets.UTF_8));
    }


    @POST
    @Path("/register")
    public Response register(final UserDTO dto) {
        userService.register(dto.username(), dto.password());
        return Response.ok().build();
    }

    @POST
    @Path("/login")
    public Response login(final UserDTO dto) {
        if (userService.authenticate(dto.username(), dto.password())) {
            final long now = System.currentTimeMillis();
            final String token = Jwts.builder()
                    .setSubject(dto.username())
                    .setIssuer("https://myapp.example.com")
                    .claim("groups", "user")
                    .setExpiration(new Date(now + 3600 * 1000)) // 1 hour
                    .setIssuedAt(new Date(now))
                    .signWith(key, SignatureAlgorithm.HS256)
                    .compact();
            return Response.ok(new TokenDTO(token)).build();
        }
        return Response.status(Response.Status.UNAUTHORIZED).build();
    }
}
