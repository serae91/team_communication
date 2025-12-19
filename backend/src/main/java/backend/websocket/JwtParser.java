package backend.websocket;

import jakarta.enterprise.context.ApplicationScoped;
import jakarta.ws.rs.WebApplicationException;
import org.eclipse.microprofile.config.inject.ConfigProperty;
import org.jose4j.jwt.JwtClaims;

@ApplicationScoped
public class JwtParser {

    @ConfigProperty(name = "mp.jwt.verify.publickey")
    String publicKey;

    @ConfigProperty(name = "mp.jwt.verify.issuer")
    String issuer;

    public JwtClaims parse(String token) {
        try {
            return JwtClaims.parse(token); // oder SmallRye JWT API
        } catch (Exception e) {
            throw new WebApplicationException("Invalid JWT", 401);
        }
    }
}

