package backend.chat_user.web;

import backend.chat_user.usecase.update.RelChatUserUpdateService;
import backend.entities.bl_rel_chat_user.BLRelChatUserSetReminderDto;
import jakarta.enterprise.context.ApplicationScoped;
import jakarta.inject.Inject;
import jakarta.ws.rs.POST;
import jakarta.ws.rs.Path;

@ApplicationScoped
@Path("/chatuser")
public class ChatUserResource {

    @Inject
    RelChatUserUpdateService updateService;

    @POST
    @Path("/setreminder")
    public void setReminder(final BLRelChatUserSetReminderDto setReminderDto) {
        updateService.setReminder(setReminderDto);
    }

    @POST
    @Path("/triggerdown")
    public void triggerDown(final Long chatId, Long userId) {
        updateService.triggerDown(chatId, userId);
    }
}
