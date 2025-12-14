package backend.filter;

import jakarta.ws.rs.core.SecurityContext;
import java.security.Principal;
import org.eclipse.microprofile.jwt.JsonWebToken;

public class CustomSecurityContext implements SecurityContext {

    private final JsonWebToken jwt;

    public CustomSecurityContext(JsonWebToken jwt) {
        this.jwt = jwt;
    }

    @Override
    public Principal getUserPrincipal() {
        return jwt;
    }

    @Override
    public boolean isUserInRole(String role) {
        return jwt.getGroups() != null && jwt.getGroups().contains(role);
    }

    @Override
    public boolean isSecure() {
        return true; // HTTPS in Production
    }

    @Override
    public String getAuthenticationScheme() {
        return "JWT";
    }
}

