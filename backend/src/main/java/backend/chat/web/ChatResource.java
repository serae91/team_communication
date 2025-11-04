package backend.chat.web;

import backend.chat.core.ChatService;
import backend.entities.bl_chat.BLChatWithMessagesAndUsersView;
import jakarta.enterprise.context.ApplicationScoped;
import jakarta.inject.Inject;
import jakarta.ws.rs.GET;
import jakarta.ws.rs.Path;
import jakarta.ws.rs.PathParam;

import java.util.List;

@Path("/chat")
@ApplicationScoped
public class ChatResource {

    @Inject
    ChatService chatService;

    @GET
    @Path("/all/{userId}")
    public List<BLChatWithMessagesAndUsersView> getAllByUserId(@PathParam("userId") final Long userId) {
        return chatService.getAllByUserId(userId);
    }
}
