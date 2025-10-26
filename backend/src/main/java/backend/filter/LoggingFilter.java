package backend.filter;

import com.fasterxml.jackson.databind.ObjectMapper;
import jakarta.inject.Inject;
import jakarta.ws.rs.client.ClientRequestContext;
import jakarta.ws.rs.client.ClientRequestFilter;
import jakarta.ws.rs.ext.Provider;

import java.util.logging.Logger;

@Provider
public class LoggingFilter implements ClientRequestFilter {

    private static final Logger LOGGER = Logger.getLogger(LoggingFilter.class.getName());

    @Inject
    ObjectMapper objectMapper;

    @Override
    public void filter(ClientRequestContext requestContext) {

        String json = "";
        try{
            json = objectMapper.writeValueAsString(requestContext.getEntity());
        }catch (Exception exception){
            exception.printStackTrace();
        }
        LOGGER.info("=== HTTP Request ===");
        LOGGER.info("Method: " + requestContext.getMethod());
        LOGGER.info("URI: [" + requestContext.getUri() + "]");
        requestContext.getHeaders().forEach((header, list)->{
            LOGGER.info("Header: " + header);
            list.forEach(object-> {
                try{
                    String headerObject = objectMapper.writeValueAsString(object);
                    LOGGER.info(headerObject);
                }catch (Exception exception){
                    exception.printStackTrace();
                }
            });
        });
        //LOGGER.info("Headers: " + requestContext.getHeaders());
        LOGGER.info("Entity: " + json);
        LOGGER.info("===================");
    }
}

