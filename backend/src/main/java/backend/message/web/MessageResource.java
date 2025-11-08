package backend.message.web;

import backend.entities.bl_message.BLMessage;
import backend.entities.bl_message.BLMessageCreateView;
import backend.entities.bl_message.BLMessageView;
import backend.message.core.MessageService;
import backend.message.usecase.create.MessageCreateService;
import jakarta.enterprise.context.ApplicationScoped;
import jakarta.inject.Inject;
import jakarta.transaction.Transactional;
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
    @Path("/{senderId}/{receiverId}")
    @Produces(MediaType.APPLICATION_JSON)
    public List<BLMessage> listForSenderIdAndReceiverId(@PathParam("senderId") final Long senderId, @PathParam("receiverId") final Long receiverId) {
        return messageService.listForSenderIdAndReceiverId(senderId, receiverId);
    }

    @POST
    @Path("/create")
    @Produces(MediaType.APPLICATION_JSON)
    @Transactional
    public BLMessageView createMessage(final BLMessageCreateView blMessageCreateView) {
        messageCreateService.createMessage(blMessageCreateView);
        return messageService.getBLMessageView(blMessageCreateView.getId());
    }
}
