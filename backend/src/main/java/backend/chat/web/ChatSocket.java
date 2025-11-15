package backend.chat.web;

import io.quarkus.websockets.next.OnClose;
import io.quarkus.websockets.next.OnError;
import io.quarkus.websockets.next.OnOpen;
import io.quarkus.websockets.next.OnTextMessage;
import io.quarkus.websockets.next.WebSocket;

import io.quarkus.websockets.next.WebSocketConnection;
import jakarta.inject.Singleton;

@Singleton
@WebSocket(path = "/chatsocket")
public class ChatSocket {

    @OnOpen
    void onOpen(WebSocketConnection connection) {
        System.out.println("Client connected: " + connection.id());
    }

    @OnClose
    void onClose(WebSocketConnection connection) {
        System.out.println("Client disconnected: " + connection.id());
    }

    @OnTextMessage
    void onMessage(String message, WebSocketConnection connection) {
        System.out.println("Received: " + message);
        connection.broadcast().sendText("Client " + connection.id() + ": " + message);
    }

    @OnError
    public void onError(Throwable error, WebSocketConnection connection) {
        System.out.println("WebSocket Fehler: " + error.getMessage());
    }
}
