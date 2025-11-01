package backend.env_config;

import jakarta.enterprise.context.ApplicationScoped;
import io.github.cdimascio.dotenv.Dotenv;

@ApplicationScoped
public class EnvConfig {

    private final Dotenv dotenv;

    public EnvConfig() {
        dotenv = Dotenv.configure()
                .ignoreIfMissing()
                .load();
    }

    public String getOpenAIKey() {
        return dotenv.get("GEMINI_API_KEY");
    }
}
