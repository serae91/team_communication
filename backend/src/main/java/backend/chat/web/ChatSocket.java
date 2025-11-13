package backend.chat.web;

import io.quarkus.websockets.next.OnClose;
import io.quarkus.websockets.next.OnOpen;
import io.quarkus.websockets.next.WebSocket;

import io.quarkus.websockets.next.WebSocketConnection;

@WebSocket(path = "/chatsocket")
public class ChatSocket {

    @OnOpen
    void onOpen(WebSocketConnection connection) {
        System.out.println("Client connected: " + connection.id());
    }

    void onMessage(String message, WebSocketConnection connection) {
        System.out.println("Received: " + message);
        connection.broadcast(message);
    }

    @OnClose
    void onClose(WebSocketConnection connection) {
        System.out.println("Client disconnected: " + connection.id());
    }
}
