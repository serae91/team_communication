package backend.websocket.model.incoming;

import com.fasterxml.jackson.annotation.JsonProperty;

//Incoming means incoming to the client (so outgoing from the server)
public interface IncomingWebSocketMessage {
    @JsonProperty
    String type();
}
