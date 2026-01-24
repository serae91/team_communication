package backend.bl_api.user.web;

import backend.bl_api.auth.core.CurrentUser;
import backend.bl_api.user.core.UserService;
import backend.bl_entities.bl_user.BLUserView;
import jakarta.enterprise.context.ApplicationScoped;
import jakarta.inject.Inject;
import jakarta.ws.rs.DefaultValue;
import jakarta.ws.rs.GET;
import jakarta.ws.rs.Path;
import jakarta.ws.rs.QueryParam;

import java.util.Set;

@ApplicationScoped
@Path("/user")
public class UserResource {
    @Inject
    UserService userService;
    @Inject
    CurrentUser currentUser;

    @GET
    @Path("/filtered")
    public Set<BLUserView> getFilteredUsers(@QueryParam("query") @DefaultValue("") final String query) {
        return userService.getFilteredUsers(query, currentUser.getUserId());
    }

}
