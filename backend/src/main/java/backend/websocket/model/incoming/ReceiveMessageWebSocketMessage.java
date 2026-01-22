package backend.websocket.model.incoming;

import backend.bl_entities.bl_message.BLMessageView;

public record ReceiveMessageWebSocketMessage(
        BLMessageView blMessage) implements IncomingWebSocketMessage {
    @Override
    public String type() {
        return "RECEIVE_MESSAGE";
    }
}
