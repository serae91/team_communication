package backend.message.web;

import backend.entities.bl_message.BLMessage;
import backend.message.core.MessageService;
import jakarta.enterprise.context.ApplicationScoped;
import jakarta.inject.Inject;
import jakarta.ws.rs.GET;
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

    @GET
    @Path("/{senderId}/{receiverId}")
    @Produces(MediaType.APPLICATION_JSON)
    public List<BLMessage> listForSenderIdAndReceiverId(@PathParam("senderId") final Long senderId, @PathParam("receiverId") final Long receiverId) {
        final List<BLMessage> messages = messageService.listForSenderIdAndReceiverId(senderId, receiverId);
        return messages;
    }
}
