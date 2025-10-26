package backend.gemini.client;

import backend.gemini.model.GeminiRequest;
import backend.gemini.model.GeminiResponse;
import jakarta.ws.rs.Consumes;
import jakarta.ws.rs.POST;
import jakarta.ws.rs.Path;
import jakarta.ws.rs.Produces;
import jakarta.ws.rs.QueryParam;
import org.eclipse.microprofile.rest.client.inject.RegisterRestClient;
import jakarta.ws.rs.core.MediaType;

@RegisterRestClient(configKey = "gemini-api")
@Path("/v1beta/models/gemini-2.5-flash:generateContent")
@Consumes(MediaType.APPLICATION_JSON)
@Produces(MediaType.APPLICATION_JSON)
public interface GeminiClient {

    @POST
    GeminiResponse generateContent(GeminiRequest request, @QueryParam("key") String key);
}/*
@RegisterRestClient(baseUri = "https://generativelanguage.googleapis.com/v1beta")
@Consumes(MediaType.APPLICATION_JSON)
@Produces(MediaType.APPLICATION_JSON)
public interface GeminiClient {

    @POST
    @Path("/models/gemini-2.5-flash:generateContent")
    GeminiResponse generateContent(GeminiRequest request, @QueryParam("key") String key);
}*/
