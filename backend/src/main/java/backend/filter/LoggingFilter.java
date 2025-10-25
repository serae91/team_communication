package backend.filter;

/*import org.eclipse.microprofile.rest.client.ext.ClientHeadersFactory;
import javax.ws.rs.client.ClientRequestContext;
import javax.ws.rs.client.ClientRequestFilter;
import javax.ws.rs.ext.Provider;
import javax.json.bind.Jsonb;
import javax.json.bind.JsonbBuilder;*/

import backend.gemini.model.GeminiRequest;
import jakarta.ws.rs.client.ClientRequestContext;
import jakarta.ws.rs.client.ClientRequestFilter;
import jakarta.ws.rs.ext.Provider;

@Provider
public class LoggingFilter implements ClientRequestFilter {

    @Override
    public void filter(ClientRequestContext requestContext) {
        System.out.println("=== HTTP Request ===");
        System.out.println("Method: " + requestContext.getMethod());
        System.out.println("URI: " + requestContext.getUri());
        System.out.println("Headers: " + requestContext.getHeaders());
        System.out.println("Entity: " + ((GeminiRequest)requestContext.getEntity()).contents.get(0).parts.get(0).text);

        /*Object entity = requestContext.getEntity();
        if (entity != null) {
            Jsonb jsonb = JsonbBuilder.create();
            System.out.println("Body: " + jsonb.toJson(entity));
        }
        System.out.println("===================");*/
    }
}

