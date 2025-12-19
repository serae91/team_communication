package backend.chat_user.web;

import backend.chat_user.usecase.update.RelChatUserUpdateService;
import backend.entities.bl_rel_chat_user.BLRelChatUserSetReminderDto;
import jakarta.enterprise.context.ApplicationScoped;
import jakarta.inject.Inject;
import jakarta.ws.rs.PATCH;
import jakarta.ws.rs.Path;
import jakarta.ws.rs.PathParam;

@ApplicationScoped
@Path("/chatuser")
public class ChatUserResource {

    @Inject
    RelChatUserUpdateService updateService;

    @PATCH
    @Path("/reminder")
    public void setReminder(final BLRelChatUserSetReminderDto setReminderDto) {
        updateService.setReminder(setReminderDto);
    }

    @PATCH
    @Path("/triggerdown")
    public void triggerDown(final Long chatId) {
        updateService.triggerDown(chatId);
    }

    @PATCH
    @Path("/reminder/seen/{chatId}")
    public void setReminderSeen(@PathParam("chatId") final Long chatId) {
        updateService.setReminderSeen(chatId);
    }
}
