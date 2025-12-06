package backend.websocket.model.outgoing;

import com.fasterxml.jackson.annotation.JsonSubTypes;
import com.fasterxml.jackson.annotation.JsonTypeInfo;

@JsonTypeInfo(
        use = JsonTypeInfo.Id.NAME,
        include = JsonTypeInfo.As.PROPERTY,
        property = "type"
)
@JsonSubTypes({
        @JsonSubTypes.Type(value = CreateChatWebSocketMessage.class, name = "CREATE_CHAT"),
        @JsonSubTypes.Type(value = RequestChatsWebSocketMessage.class, name = "REQUEST_CHATS"),
        @JsonSubTypes.Type(value = SendMessageWebSocketMessage.class, name = "SEND_MESSAGE"),
        @JsonSubTypes.Type(value = SwitchChatWebSocketMessage.class, name = "SWITCH_CHAT"),
})
//Outgoing means outgoing from the client (so incoming to the server)
public interface OutgoingWebSocketMessage {
}
