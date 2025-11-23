package backend.websocket.model;

import lombok.Getter;
import lombok.RequiredArgsConstructor;

@Getter
@RequiredArgsConstructor
public class WebsocketMessage {
    private final String type;
    private final Long chatId;
}
