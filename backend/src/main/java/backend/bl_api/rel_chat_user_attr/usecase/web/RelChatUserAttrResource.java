package backend.bl_api.rel_chat_user_attr.usecase.web;

import backend.bl_api.auth.core.CurrentUser;
import backend.bl_api.rel_chat_user_attr.usecase.core.ChatUserViewService;
import backend.bl_api.rel_chat_user_attr.usecase.update.RelChatUserAttrUpdateService;
import backend.bl_entities.bl_chat.ChatBox;
import backend.bl_entities.bl_chat.ChatSortField;
import backend.bl_entities.bl_rel_chat_user_attr.BLRelChatUserAttrSetReminderDto;
import backend.bl_entities.bl_rel_chat_user_attr.ChatBoxCountDto;
import backend.bl_entities.bl_rel_chat_user_attr.ChatUserView;
import backend.utils.enums.SortDirection;
import jakarta.enterprise.context.ApplicationScoped;
import jakarta.inject.Inject;
import jakarta.validation.constraints.Max;
import jakarta.validation.constraints.Min;
import jakarta.ws.rs.DefaultValue;
import jakarta.ws.rs.GET;
import jakarta.ws.rs.PATCH;
import jakarta.ws.rs.Path;
import jakarta.ws.rs.PathParam;
import jakarta.ws.rs.QueryParam;

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
    @Path("/chatboxcount")
    public ChatBoxCountDto getChatBoxCount() {
        return chatUserViewService.getChatBoxCount(currentUser.getUserId());
    }

    @GET
    @Path("/list")
    public List<ChatUserView> getChatUserViews(@QueryParam("chatBox") @DefaultValue("INBOX") final ChatBox box, @QueryParam("page") @DefaultValue("0") @Min(0) final int page, @QueryParam("size") @DefaultValue("20") @Min(1) @Max(100) final int size, @QueryParam("sortField") @DefaultValue("LAST_MESSAGE_AT") final ChatSortField sortField, @QueryParam("sortDirection") @DefaultValue("DESC") final SortDirection sortDirection) {
        return chatUserViewService.getChatUserViews(currentUser.getUserId(), box, page, size, sortField, sortDirection);
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
