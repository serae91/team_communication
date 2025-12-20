package backend.chat_user.web;

import backend.auth.core.CurrentUser;
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
    @Inject
    CurrentUser currentUser;

    @PATCH
    @Path("/reminder")
    public void setReminder(final BLRelChatUserSetReminderDto setReminderDto) {
        updateService.setReminder(setReminderDto, currentUser.getUserId());
    }

    @PATCH
    @Path("/triggerdown/{chatId}")
    public void triggerDown(@PathParam("chatId") final Long chatId) {
        updateService.triggerDown(chatId, currentUser.getUserId());
    }

    @PATCH
    @Path("/reminder/seen/{chatId}")
    public void setReminderSeen(@PathParam("chatId") final Long chatId) {
        updateService.setReminderSeen(chatId, currentUser.getUserId());
    }
}
