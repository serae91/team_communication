package backend.bl_api.rel_chat_user_attr.usecase.web;

import backend.bl_api.auth.core.CurrentUser;
import backend.bl_entities.bl_rel_chat_user_attr.BLRelChatUserAttrSetReminderDto;
import backend.bl_api.rel_chat_user_attr.usecase.update.RelChatUserAttrUpdateService;
import jakarta.enterprise.context.ApplicationScoped;
import jakarta.inject.Inject;
import jakarta.ws.rs.PATCH;
import jakarta.ws.rs.Path;
import jakarta.ws.rs.PathParam;

@ApplicationScoped
@Path("/relchatuserattr")
public class RelChatUserAttrResource {

    @Inject
    RelChatUserAttrUpdateService updateService;

    @Inject
    CurrentUser currentUser;

    @PATCH
    @Path("/reminder")
    public void setReminder(final BLRelChatUserAttrSetReminderDto setReminderDto) {
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
