package backend.message.websocket;

import backend.entities.bl_message.BLMessage;
import backend.entities.bl_message.BLMessageCommand;
import jakarta.annotation.PostConstruct;
import jakarta.enterprise.context.ApplicationScoped;
import jakarta.inject.Inject;
import lombok.extern.slf4j.Slf4j;

import java.util.HashMap;
import java.util.Map;
import java.util.function.Consumer;

@Slf4j
@ApplicationScoped
public class MessageCommandHandler {
    @Inject
    MessageWebRegistry messageRegistry;

    private final Map<String, Consumer<BLMessage>> handlers = new HashMap<>();

    @PostConstruct
    private void init() {
        handlers.put("INITIAL_LOAD", this::handleInitialLoad);
        handlers.put("SEND_MESSAGE", this::handleSendMessage);
        handlers.put("SWITCH_ROOM", this::handleSwitchRoom);
        handlers.put("TYPING_START", this::handleTypingStart);
        handlers.put("TYPING_STOP", this::handleTypingStop);
    }

    public void handleMessageCommand(final BLMessageCommand blMessageCommand) {
        final Consumer<BLMessage> handler = handlers.get(blMessageCommand.type());
        if (handler != null) {
            handler.accept(blMessageCommand.blMessage());
        } else {
            log.warn("Unknown message type: " + blMessageCommand.type());
        }
    }

    private void handleInitialLoad(BLMessage blMessage) {

    }

    private void handleSendMessage(BLMessage blMessage) {

    }

    private void handleSwitchRoom(BLMessage blMessage) {

    }

    private void handleTypingStart(BLMessage blMessage) {

    }

    private void handleTypingStop(BLMessage blMessage) {

    }
}
