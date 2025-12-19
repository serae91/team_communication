package backend.chat.web;

import backend.auth.core.CurrentUser;
import backend.chat.core.ChatService;
import backend.entities.bl_chat.BLChatView;
import backend.entities.bl_chat.Urgency;
import jakarta.enterprise.context.RequestScoped;
import jakarta.inject.Inject;
import jakarta.ws.rs.GET;
import jakarta.ws.rs.Path;

import java.util.Arrays;
import java.util.List;

@Path("/chat")
@RequestScoped
public class ChatResource {
    @Inject
    ChatService chatService;
    @Inject
    CurrentUser currentUser;

    @GET
    @Path("/urgencies")
    public List<String> getUrgencies() {
        return Arrays.stream(Urgency.values())
                .map(Enum::name)
                .toList();
    }

    @GET
    @Path("/list")
    public List<BLChatView> getChats() {
        return chatService.getChatListByUserId(currentUser.getUserId());
    }
}
