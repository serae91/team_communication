package backend.gemini.model;

import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;

import java.util.List;

@Getter
@Setter
@NoArgsConstructor
public class GeminiResponse {

    public List<Candidate> candidates;

    public String promptFeedback;

    public UsageMetadata usageMetadata;

    @Getter
    @Setter
    @NoArgsConstructor
    public static class Candidate {
        public Content content;
    }

    @Getter
    @Setter
    @NoArgsConstructor
    public static class Content {
        public List<GeminiRequest.Part> parts;
    }

    @Getter
    @Setter
    @NoArgsConstructor
    public static class UsageMetadata {
        public int promptTokenCount;
        public int candidatesTokenCount;
        public int totalTokenCount;
    }
}
