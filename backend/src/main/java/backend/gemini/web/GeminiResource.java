package backend.gemini.web;

import backend.gemini.service.GeminiService;
import jakarta.enterprise.context.ApplicationScoped;
import jakarta.inject.Inject;
import jakarta.ws.rs.GET;
import jakarta.ws.rs.POST;
import jakarta.ws.rs.Path;
import jakarta.ws.rs.Produces;
import jakarta.ws.rs.QueryParam;
import jakarta.ws.rs.core.MediaType;

@Path("/gemini")
@Produces(MediaType.TEXT_PLAIN)
@ApplicationScoped
public class GeminiResource {

    @Inject
    GeminiService geminiService;

    @GET
    @Path("/sayHello")
    public String sayHello() {
        return geminiService.sayHello();
    }

    @GET
    @Path("/ask")
    public String ask(@QueryParam("question") final String question) {
        return geminiService.askGemini(question);
    }

    @POST
    @Path("/ask")
    public String askPost(final String question) {
        return geminiService.askGemini(question);
    }
}

