package backend.filter;

import com.fasterxml.jackson.core.JsonProcessingException;
import com.fasterxml.jackson.databind.ObjectMapper;
import jakarta.inject.Inject;
import jakarta.ws.rs.client.ClientRequestContext;
import jakarta.ws.rs.client.ClientRequestFilter;
import jakarta.ws.rs.ext.Provider;
import lombok.extern.slf4j.Slf4j;

@Slf4j
@Provider
public class LoggingFilter implements ClientRequestFilter {

    @Inject
    ObjectMapper objectMapper;

    @Override
    public void filter(final ClientRequestContext requestContext) {

        String json = "";
        try {
            json = objectMapper.writeValueAsString(requestContext.getEntity());
        } catch (final JsonProcessingException jsonProcessingException) {
            jsonProcessingException.printStackTrace();
        }
        log.info("=== HTTP Request ===");
        log.info("Method: " + requestContext.getMethod());
        log.info("URI: [" + requestContext.getUri() + "]");
        requestContext.getHeaders().forEach((header, list) -> {
            log.info("Header: " + header);
            list.forEach(object -> {
                try {
                    log.info(objectMapper.writeValueAsString(object));
                } catch (final JsonProcessingException jsonProcessingException) {
                    jsonProcessingException.printStackTrace();
                }
            });
        });
        log.info("Entity: " + json);
        log.info("===================");
    }
}

