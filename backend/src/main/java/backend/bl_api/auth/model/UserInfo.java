package backend.bl_api.auth.model;

import java.util.Set;

public record UserInfo(long id, String username, Set<String> roles) {
}
