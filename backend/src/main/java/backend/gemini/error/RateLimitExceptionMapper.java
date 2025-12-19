package backend.gemini.error;

import io.quarkiverse.bucket4j.runtime.RateLimitException;
import jakarta.ws.rs.core.Response;
import jakarta.ws.rs.ext.ExceptionMapper;
import jakarta.ws.rs.ext.Provider;
import lombok.extern.slf4j.Slf4j;

@Slf4j
@Provider
public class RateLimitExceptionMapper implements ExceptionMapper<RateLimitException> {

    @Override
    public Response toResponse(final RateLimitException exception) {
        log.error("Internal Rate Limit exceeded.");

        return Response.status(429)
                .entity("{\"error\": \"Rate limit exceeded. Please try again in one minute.\"}")
                .header("Content-Type", "application/json")
                .build();
    }
}
