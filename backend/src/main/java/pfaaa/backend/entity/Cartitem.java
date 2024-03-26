package pfaaa.backend.entity;

import jakarta.persistence.*;
import lombok.AllArgsConstructor;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;

@Entity
@AllArgsConstructor
@NoArgsConstructor
@Getter
@Setter
public class Cartitem {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;
    private Long quantity;
    private double totalprice;

    @ManyToOne(fetch = FetchType.EAGER, cascade = CascadeType.ALL)
     private Cart cart;
    @OneToOne(fetch = FetchType.EAGER, cascade = CascadeType.ALL)
    private Produit product;


}
