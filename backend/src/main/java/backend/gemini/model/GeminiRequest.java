package backend.gemini.model;

import java.util.List;

public class GeminiRequest {
    public List<Content> contents;

    public GeminiRequest(String text) {
        this.contents = List.of(new Content(text));
    }

    public static class Content {
        public List<Part> parts;

        public Content(String text) {
            this.parts = List.of(new Part(text));
        }
    }

    public static class Part {
        public String text;

        public Part(String text) {
            this.text = text;
        }
    }
}
