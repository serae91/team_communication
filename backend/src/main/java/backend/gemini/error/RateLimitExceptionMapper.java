package backend.gemini.error;

import backend.filter.LoggingFilter;
import jakarta.ws.rs.core.Response;
import jakarta.ws.rs.ext.ExceptionMapper;
import jakarta.ws.rs.ext.Provider;
import io.quarkiverse.bucket4j.runtime.RateLimitException;

import java.util.logging.Logger;

@Provider
public class RateLimitExceptionMapper implements ExceptionMapper<RateLimitException> {

    private static final Logger LOGGER = Logger.getLogger(LoggingFilter.class.getName());
    @Override
    public Response toResponse(RateLimitException exception) {
        // Log the exception. Since getBucketId() isn't available, we log the general event.
        // The fact that this mapper was called confirms a bucket limit was breached.
        LOGGER.severe("Internal Rate Limit exceeded.");

        // Return a 429 Too Many Requests response
        return Response.status(429)
                .entity("{\"error\": \"Rate limit exceeded. Please try again in one minute.\"}")
                .header("Content-Type", "application/json")
                .build();
    }
}
