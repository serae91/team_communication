package backend.chat.web;

import backend.entities.bl_chat.Urgency;
import jakarta.enterprise.context.RequestScoped;
import jakarta.ws.rs.GET;
import jakarta.ws.rs.Path;

import java.util.Arrays;
import java.util.List;

@Path("/chat")
@RequestScoped
public class ChatResource {

    @GET
    @Path("/urgencies")
    public List<String> getUrgencies() {
        return Arrays.stream(Urgency.values())
                .map(Enum::name)
                .toList();
    }
}
