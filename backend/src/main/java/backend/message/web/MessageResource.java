package backend.message.web;

import backend.entities.bl_message.BLMessageCreateView;
import backend.entities.bl_message.BLMessageView;
import backend.message.core.MessageService;
import backend.message.usecase.create.MessageCreateService;
import jakarta.enterprise.context.ApplicationScoped;
import jakarta.inject.Inject;
import jakarta.ws.rs.POST;
import jakarta.ws.rs.Path;
import jakarta.ws.rs.Produces;
import jakarta.ws.rs.core.MediaType;

@Path("/message")
@ApplicationScoped
public class MessageResource {

    @Inject
    MessageService messageService;

    @Inject
    MessageCreateService messageCreateService;

    @POST
    @Path("/create")
    @Produces(MediaType.APPLICATION_JSON)
    public BLMessageView createMessage(final BLMessageCreateView blMessageCreateView) {
        messageCreateService.createMessageFromView(blMessageCreateView);
        return messageService.getBLMessageView(blMessageCreateView.getId());
    }
}
