package backend.attr_chat_user.usecase.web;

import backend.attr_chat_user.usecase.update.AttrChatUserUpdateService;
import backend.auth.core.CurrentUser;
import backend.entities.bl_attr_chat_user.BLAttrChatUserSetReminderDto;
import jakarta.enterprise.context.ApplicationScoped;
import jakarta.inject.Inject;
import jakarta.ws.rs.PATCH;
import jakarta.ws.rs.Path;
import jakarta.ws.rs.PathParam;

@ApplicationScoped
@Path("/attrchatuser")
public class AttrChatUserResource {

    @Inject
    AttrChatUserUpdateService updateService;

    @Inject
    CurrentUser currentUser;

    @PATCH
    @Path("/reminder")
    public void setReminder(final BLAttrChatUserSetReminderDto setReminderDto) {
        updateService.setReminder(setReminderDto, currentUser.getUserId());
    }

    @PATCH
    @Path("/triggerdone/{chatId}")
    public void triggerDone(@PathParam("chatId") final Long chatId) {
        updateService.triggerDone(chatId, currentUser.getUserId());
    }

    @PATCH
    @Path("/reminder/seen/{chatId}")
    public void setReminderSeen(@PathParam("chatId") final Long chatId) {
        updateService.setReminderSeen(chatId, currentUser.getUserId());
    }
}
