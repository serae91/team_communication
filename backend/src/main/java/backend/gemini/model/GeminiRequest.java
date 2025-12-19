package backend.gemini.model;

import com.fasterxml.jackson.annotation.JsonProperty;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;

import java.util.List;

@Getter
@Setter
@NoArgsConstructor
public class GeminiRequest {
    @JsonProperty("contents")
    public List<Content> contents;

    public GeminiRequest(final String text) {
        this.contents = List.of(new Content(text));
    }

    @Getter
    @Setter
    @NoArgsConstructor
    public static class Content {

        @JsonProperty("role")
        public String role = "user";

        @JsonProperty("parts")
        public List<Part> parts;

        public Content(final String text) {
            this.parts = List.of(new Part(text));
        }
    }

    @Getter
    @Setter
    @NoArgsConstructor
    public static class Part {

        @JsonProperty("text")
        public String text;

        public Part(final String text) {
            this.text = text;
        }
    }
}
