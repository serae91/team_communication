package backend.bl_api.rel_chat_user_attr.usecase.web;

import backend.bl_api.auth.core.CurrentUser;
import backend.bl_api.rel_chat_user_attr.usecase.core.ChatUserViewService;
import backend.bl_api.rel_chat_user_attr.usecase.update.RelChatUserAttrUpdateService;
import backend.bl_entities.bl_rel_chat_user_attr.BLRelChatUserAttrSetReminderDto;
import backend.bl_entities.bl_rel_chat_user_attr.ChatUserView;
import jakarta.enterprise.context.ApplicationScoped;
import jakarta.inject.Inject;
import jakarta.ws.rs.GET;
import jakarta.ws.rs.PATCH;
import jakarta.ws.rs.Path;
import jakarta.ws.rs.PathParam;

import java.util.List;

@ApplicationScoped
@Path("/relchatuserattr")
public class RelChatUserAttrResource {

    @Inject
    ChatUserViewService chatUserViewService;

    @Inject
    RelChatUserAttrUpdateService updateService;

    @Inject
    CurrentUser currentUser;

    @GET
    @Path("/list")
    public List<ChatUserView> findByUserId() {
        return chatUserViewService.findByUserId(currentUser.getUserId());
    }

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
