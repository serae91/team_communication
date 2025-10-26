package backend.gemini.service;

import backend.gemini.client.GeminiClient;
import backend.gemini.model.GeminiRequest;
import backend.gemini.model.GeminiResponse;
import io.quarkiverse.bucket4j.runtime.RateLimited;
import org.eclipse.microprofile.config.inject.ConfigProperty;
import org.eclipse.microprofile.rest.client.inject.RestClient;
import jakarta.enterprise.context.ApplicationScoped;
import jakarta.inject.Inject;

@ApplicationScoped
public class GeminiService {

    @Inject
    @RestClient
    GeminiClient geminiClient;

    @ConfigProperty(name = "gemini.api.key")
    String apiKey;

    @RateLimited(bucket = "gemini-api")
    public String askGemini(final String prompt) {
        final String subPormpt = prompt.substring(1, prompt.length() - 1);
        final GeminiRequest request = new GeminiRequest(subPormpt);

        final GeminiResponse response = geminiClient.generateContent(request, apiKey);
        return response.candidates.get(0).content.parts.get(0).text;
    }

    public String sayHello() {
        return "hello";
    }
}

