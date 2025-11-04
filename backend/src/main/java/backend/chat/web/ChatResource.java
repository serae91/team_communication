package backend.chat.web;

import backend.chat.core.ChatService;
import backend.entities.bl_chat.BLChatFullInfoView;
import backend.entities.bl_chat.BLChatPlainView;
import jakarta.enterprise.context.RequestScoped;
import jakarta.inject.Inject;
import jakarta.ws.rs.GET;
import jakarta.ws.rs.Path;
import jakarta.ws.rs.PathParam;

import java.util.List;

@Path("/chat")
@RequestScoped
public class ChatResource {

    @Inject
    ChatService chatService;

    @GET
    @Path("/listplain/{userId}")
    public List<BLChatPlainView> getChatListPlainByUserId(@PathParam("userId") final Long userId) {
        return chatService.getChatListPlainByUserId(userId);
    }

    @GET
    @Path("/fullinfo/{id}")
    public BLChatFullInfoView getChatFullInfoById(@PathParam("id") final Long id) {
        return chatService.getChatFullInfoById(id);
    }
}
