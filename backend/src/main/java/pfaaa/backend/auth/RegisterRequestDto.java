
package pfaaa.backend.auth;

import lombok.Builder;
import pfaaa.backend.entity.Role;
@Builder
public class RegisterRequestDto {
    private String email;
    private String username;
    private String password;
    private Role role;
   public String address;
  public Long CIN;
   public Long NumTel;
 public String Compte;

    public Role getRole() {
        return role;
    }

    public void setRole(Role role) {
        this.role = role;
    }

    public String getPassword() {
        return password;
    }

    public void setPassword(String password) {
        this.password = password;
    }

    public String getUsername() {
        return username;
    }

    public void setUsername(String username) {
        this.username = username;
    }

    public String getEmail() {
        return email;
    }

    public void setEmail(String email) {
        this.email = email;
    }
}
