package backend.chat.web;

import backend.chat.core.ChatService;
import backend.chat.usecase.update.ChatUpdateService;
import backend.entities.bl_chat.BLChatFullInfoView;
import backend.entities.bl_chat.BLChatPlainView;
import backend.entities.bl_chat.Urgency;
import jakarta.enterprise.context.RequestScoped;
import jakarta.inject.Inject;
import jakarta.transaction.Transactional;
import jakarta.ws.rs.GET;
import jakarta.ws.rs.PATCH;
import jakarta.ws.rs.Path;
import jakarta.ws.rs.PathParam;

import java.util.Arrays;
import java.util.List;

@Path("/chat")
@RequestScoped
public class ChatResource {

    @Inject
    ChatService chatService;
    @Inject
    ChatUpdateService chatUpdateService;

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

    @PATCH
    @Path("/triggerdown/{chatId}/{userId}")
    @Transactional
    public void triggerDown(@PathParam("chatId") final Long chatId, @PathParam("userId") final Long userId) {
        chatUpdateService.triggerDown(chatId, userId);
    }

    @GET
    @Path("/urgencies")
    public List<String> getUrgencies() {
        return Arrays.stream(Urgency.values())
                .map(Enum::name)
                .toList();
    }
}
