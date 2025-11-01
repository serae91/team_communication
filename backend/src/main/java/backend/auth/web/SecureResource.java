package backend.auth.web;

import io.quarkus.security.identity.SecurityIdentity;
import jakarta.annotation.security.RolesAllowed;
import jakarta.enterprise.context.ApplicationScoped;
import jakarta.ws.rs.GET;
import jakarta.ws.rs.Path;
import jakarta.ws.rs.core.Context;

@Path("/secure")
@ApplicationScoped
public class SecureResource {

    @GET
    @RolesAllowed("BLUser")
    public String hello(@Context final SecurityIdentity identity) {
        return "Hallo " + identity.getPrincipal().getName();
    }
}

