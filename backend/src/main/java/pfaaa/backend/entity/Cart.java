package pfaaa.backend.entity;

import com.fasterxml.jackson.annotation.JsonIgnoreProperties;
import jakarta.persistence.*;
import lombok.AllArgsConstructor;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;

import java.util.HashSet;
import java.util.Set;
@Entity
@AllArgsConstructor
@NoArgsConstructor
@Getter
@Setter
public class Cart {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long idcart;
    @JsonIgnoreProperties("cart")
    @OneToMany(mappedBy = "cart", cascade = CascadeType.ALL)
    private Set<Cartitem> cartitems=new HashSet<>();
  @OneToOne
  @JoinColumn(name = "client_id")
  private Client client;
}
