package backend.envConfig;

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
        return dotenv.get("OPENAI_API_KEY");
    }
}
