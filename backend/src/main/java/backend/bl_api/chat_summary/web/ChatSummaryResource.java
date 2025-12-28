package backend.bl_api.chat_summary.web;

import backend.env_config.EnvConfig;
import com.fasterxml.jackson.databind.ObjectMapper;
import io.quarkus.logging.Log;
import jakarta.enterprise.context.ApplicationScoped;
import jakarta.inject.Inject;
import jakarta.ws.rs.GET;
import jakarta.ws.rs.Path;

import java.io.IOException;
import java.net.URI;
import java.net.http.HttpClient;
import java.net.http.HttpRequest;
import java.net.http.HttpResponse;
import java.util.List;
import java.util.Map;

@Path("/chatsummary")
@ApplicationScoped
public class ChatSummaryResource {

    @Inject
    EnvConfig config;

    @GET
    @Path("/summary")
    public String summarize() throws IOException, InterruptedException {
        //String bl_chat = (String) payload.get("chat_history");
        final String apiKey = config.getOpenAIKey();
        Log.debug(apiKey);
        final String chat = """
                User: Hallo, ich wollte mich über eure Produktfunktionen informieren.
                Bot: Hallo! Natürlich, welche Funktionen interessieren Sie besonders?
                User: Vor allem die Datenanalyse und Reporting-Möglichkeiten.
                Bot: Unsere Plattform bietet detaillierte Dashboards, Exportfunktionen und automatisierte Berichte.
                User: Kann man auch benutzerdefinierte Reports erstellen?
                Bot: Ja, Sie können eigene Reports konfigurieren und als PDF oder Excel exportieren.
                User: Wie sieht es mit der Benutzerverwaltung aus?
                Bot: Sie können Rollen vergeben, Nutzergruppen erstellen und Berechtigungen individuell anpassen.
                User: Gibt es eine mobile App für den Zugriff unterwegs?
                Bot: Ja, wir haben Apps für iOS und Android mit den wichtigsten Funktionen.
                User: Vielen Dank, das klingt sehr hilfreich.
                Bot: Gerne! Wenn Sie möchten, kann ich Ihnen eine kurze Zusammenfassung der Funktionen schicken.
                """;
        /*final String requestJson = """
                {
                  "model": "gpt-5-mini",
                  "messages": [
                    {"role": "system", "content": "Fasse den folgenden Chatverlauf zusammen."},
                    {"role": "BLUser", "content": "%s"}
                  ]
                }
                """.formatted(bl_chat);*/
        final ObjectMapper mapper = new ObjectMapper();

        final Map<String, Object> requestBody = Map.of(
                "model", "gpt-4o-mini", // "gpt-5-mini" gibt es aktuell nicht
                "messages", List.of(
                        Map.of("role", "system", "content", "Fasse den folgenden Chatverlauf zusammen."),
                        Map.of("role", "BLUser", "content", chat)
                )
        );

        final String requestJson = mapper.writeValueAsString(requestBody);
        final HttpClient client = HttpClient.newHttpClient();
        final HttpRequest request = HttpRequest.newBuilder()
                .uri(URI.create("https://api.openai.com/v1/chat/completions"))
                .header("Content-Type", "application/json")
                .header("Authorization", "Bearer " + apiKey)
                .POST(HttpRequest.BodyPublishers.ofString(requestJson))
                .build();

        final HttpResponse<String> response = client.send(request, HttpResponse.BodyHandlers.ofString());
        Log.debug(response.body());
        return response.body();
    }
}
