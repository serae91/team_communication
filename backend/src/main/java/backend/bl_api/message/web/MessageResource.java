package backend.bl_api.message.web;

import backend.bl_entities.bl_message.BLMessageCreateView;
import backend.bl_entities.bl_message.BLMessageView;
import backend.bl_api.message.core.MessageService;
import backend.bl_api.message.usecase.create.MessageCreateService;
import jakarta.enterprise.context.ApplicationScoped;
import jakarta.inject.Inject;
import jakarta.ws.rs.GET;
import jakarta.ws.rs.POST;
import jakarta.ws.rs.Path;
import jakarta.ws.rs.PathParam;
import jakarta.ws.rs.Produces;
import jakarta.ws.rs.core.MediaType;

import java.util.List;

@Path("/message")
@ApplicationScoped
public class MessageResource {

    @Inject
    MessageService messageService;

    @Inject
    MessageCreateService messageCreateService;

    @GET
    @Path("/list/{chatId}")
    @Produces(MediaType.APPLICATION_JSON)
    public List<BLMessageView> getForChatId(@PathParam("chatId") final Long chatId) {
        return messageService.getForChatId(chatId);
    }

    @POST
    @Path("/create")
    @Produces(MediaType.APPLICATION_JSON)
    public BLMessageView createMessage(final BLMessageCreateView blMessageCreateView) {
        messageCreateService.createMessageFromView(blMessageCreateView);
        return messageService.getBLMessageView(blMessageCreateView.getId());
    }
}
