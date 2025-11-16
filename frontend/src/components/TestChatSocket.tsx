import { useEffect, useState } from "react";

export default function TestChatSocket() {
  const [socket, setSocket] = useState<WebSocket|null>(null);
  const [messages, setMessages] = useState<string[]>([]);
  const [input, setInput] = useState<string>("");

  useEffect(() => {
    const ws = new WebSocket("ws://localhost:8080/chatsocket");

    ws.onopen = () => console.log("Verbunden mit Quarkus WebSocket");
    ws.onmessage = (event) => setMessages(prev => [...prev, event.data]);
    ws.onclose = () => console.log("Verbindung geschlossen");

    setSocket(ws);

    return () => ws.close();
  }, []);

  const sendMessage = () => {
    if (socket && socket.readyState === WebSocket.OPEN) {
      socket.send(input);
      setInput("");
    }
  };

  return (
    <div style={{ padding: 20 }}>
      <h2>React WebSocket Chat</h2>

      <div style={{
        border: "1px solid #ccc",
        height: 200,
        overflowY: "auto",
        marginBottom: 10,
        padding: 10
      }}>
        {messages.map((m, i) => <div key={i}>{m}</div>)}
      </div>

      <input
        value={input}
        onChange={e => setInput(e.target.value)}
        placeholder="Nachricht eingeben..."
      />

      <button onClick={sendMessage}>Senden</button>
    </div>
  );
}
