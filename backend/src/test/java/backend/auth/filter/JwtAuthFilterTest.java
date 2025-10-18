package backend.auth.filter;

import org.junit.jupiter.api.extension.ExtendWith;
import org.mockito.junit.jupiter.MockitoExtension;

@ExtendWith(MockitoExtension.class)
public class JwtAuthFilterTest {
    /*private static final String SECRET = "super-secure-random-secret-123456";
    private static final String API_DATA = "/api/data";

    @Mock
    UriInfo uriInfo;
    @InjectMocks
    JwtAuthFilter jwtAuthFilter;
    @Mock
    ContainerRequestContext context;


    private Key key;

    @BeforeEach
    void setUp() {
        jwtAuthFilter.jwtSecret = SECRET;
        jwtAuthFilter.init();
        key = jwtAuthFilter.getKey();
    }

    @Test
    void shouldAllowLoginPath() throws IOException {
        when(context.getUriInfo()).thenReturn(uriInfo);
        when(uriInfo.getPath()).thenReturn("/auth/login");

        jwtAuthFilter.filter(context);

        verify(context, never()).abortWith(any());
    }

    @Test
    void shouldAbortIfNoAuthHeader() throws IOException {
        when(context.getUriInfo()).thenReturn(uriInfo);
        when(uriInfo.getPath()).thenReturn("/api/some");
        when(context.getHeaderString(HttpHeaders.AUTHORIZATION)).thenReturn(null);

        jwtAuthFilter.filter(context);

        final ArgumentCaptor<Response> responseCaptor = ArgumentCaptor.forClass(Response.class);
        verify(context).abortWith(responseCaptor.capture());
        assertEquals(401, responseCaptor.getValue().getStatus());
    }

    @Test
    void shouldAbortIfInvalidToken() throws IOException {
        when(context.getUriInfo()).thenReturn(uriInfo);
        when(uriInfo.getPath()).thenReturn(API_DATA);
        when(context.getHeaderString(HttpHeaders.AUTHORIZATION)).thenReturn("Bearer invalid.token.here");

        jwtAuthFilter.filter(context);

        final ArgumentCaptor<Response> responseCaptor = ArgumentCaptor.forClass(Response.class);
        verify(context).abortWith(responseCaptor.capture());
        assertEquals(401, responseCaptor.getValue().getStatus());
    }

    @Test
    void shouldAbortIfWrongGroup() throws IOException {
        final String token = Jwts.builder()
                .claim("groups", "admin")
                .setIssuedAt(new Date())
                .signWith(key, SignatureAlgorithm.HS256)
                .compact();

        when(context.getUriInfo()).thenReturn(uriInfo);
        when(uriInfo.getPath()).thenReturn(API_DATA);
        when(context.getHeaderString(HttpHeaders.AUTHORIZATION)).thenReturn("Bearer " + token);

        jwtAuthFilter.filter(context);

        final ArgumentCaptor<Response> responseCaptor = ArgumentCaptor.forClass(Response.class);
        verify(context).abortWith(responseCaptor.capture());
        assertEquals(403, responseCaptor.getValue().getStatus());
    }

    @Test
    void shouldAllowValidToken() throws IOException {
        final String token = Jwts.builder()
                .claim("groups", "user")
                .setIssuedAt(new Date())
                .signWith(key, SignatureAlgorithm.HS256)
                .compact();
        when(context.getUriInfo()).thenReturn(uriInfo);
        when(uriInfo.getPath()).thenReturn(API_DATA);
        when(context.getHeaderString(HttpHeaders.AUTHORIZATION)).thenReturn("Bearer " + token);

        jwtAuthFilter.filter(context);

        verify(context, never()).abortWith(any());
    }*/
}
