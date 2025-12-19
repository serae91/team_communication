package backend.filter;

import jakarta.ws.rs.core.SecurityContext;
import org.eclipse.microprofile.jwt.JsonWebToken;

import java.security.Principal;

public class CustomSecurityContext implements SecurityContext {

    private final JsonWebToken jwt;

    public CustomSecurityContext(final JsonWebToken jwt) {
        this.jwt = jwt;
    }

    @Override
    public Principal getUserPrincipal() {
        return jwt;
    }

    @Override
    public boolean isUserInRole(final String role) {
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

