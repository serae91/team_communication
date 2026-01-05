package backend.bl_api.chat.web;

import backend.bl_api.auth.core.CurrentUser;
import backend.bl_api.chat.core.ChatService;
import backend.bl_entities.bl_chat.BLChatView;
import backend.bl_entities.bl_chat.ChatBox;
import backend.bl_entities.bl_chat.ChatSortField;
import backend.bl_entities.bl_chat.Urgency;
import backend.utils.enums.SortDirection;
import jakarta.enterprise.context.RequestScoped;
import jakarta.inject.Inject;
import jakarta.validation.constraints.Max;
import jakarta.validation.constraints.Min;
import jakarta.ws.rs.DefaultValue;
import jakarta.ws.rs.GET;
import jakarta.ws.rs.Path;
import jakarta.ws.rs.QueryParam;

import java.util.Arrays;
import java.util.List;

@Path("/chat")
@RequestScoped
public class ChatResource {
    @Inject
    ChatService chatService;
    @Inject
    CurrentUser currentUser;

    @GET
    @Path("/urgencies")
    public List<String> getUrgencies() {
        return Arrays.stream(Urgency.values())
                .map(Enum::name)
                .toList();
    }

    @GET
    @Path("/list")
    public List<BLChatView> getChats(@QueryParam("box") @DefaultValue("INBOX") final ChatBox box, @QueryParam("page") @DefaultValue("0") @Min(0) final int page, @QueryParam("size") @DefaultValue("20") @Min(1) @Max(100) final int size, @QueryParam("sortField") @DefaultValue("LAST_MESSAGE_AT") final ChatSortField sortField, @QueryParam("sortDirection") @DefaultValue("DESC") final SortDirection sortDirection) {
        return chatService.getChatListByUserId(currentUser.getUserId(), box, page, size, sortField, sortDirection);
    }
}
