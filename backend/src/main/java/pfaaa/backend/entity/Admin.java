package pfaaa.backend.entity;

import jakarta.persistence.DiscriminatorValue;
import jakarta.persistence.Entity;
import lombok.NoArgsConstructor;

@Entity

@NoArgsConstructor
@DiscriminatorValue("admin")
public class Admin  extends  User{


}
