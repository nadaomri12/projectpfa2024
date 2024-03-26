
package pfaaa.backend.auth;

import lombok.Builder;
import lombok.Data;

@Data
@Builder
public class AuthenticationResponse {
    private boolean success;
    private String token;
    public   Long userId;



}
