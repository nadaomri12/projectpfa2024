package pfaaa.backend.service;

import org.modelmapper.ModelMapper;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;
import pfaaa.backend.Repository.CartRopository;
import pfaaa.backend.Repository.ClientRepository;
import pfaaa.backend.Repository.ProduitRepository;
import pfaaa.backend.dto.Cartdto;
import pfaaa.backend.dto.RequestItem;
import pfaaa.backend.entity.Cart;
import pfaaa.backend.entity.Cartitem;
import pfaaa.backend.entity.Client;
import pfaaa.backend.entity.Produit;

@Service
public class CartService {
    @Autowired
    private final ProduitRepository produitRepository;
    @Autowired
    private final ClientRepository clientRepository;
    @Autowired
    private final CartRopository cartRopository;

    private final ModelMapper modelMapper;

    public CartService(ProduitRepository produitRepository, ClientRepository clientRepository, CartRopository cartRopository, ModelMapper modelMapper) {
        this.produitRepository = produitRepository;
        this.clientRepository = clientRepository;
        this.cartRopository = cartRopository;
        this.modelMapper = new ModelMapper();

    }

    public Cartdto addtocart(RequestItem item) {
        Long productid = item.getProductid();
        Long quantity = item.getQuantity();
        Produit prod = produitRepository.findById(productid).orElse(null);
        Client client = clientRepository.findById(item.getIdclient()).orElse(null);

        //getting cart from Client
        Cart cart = client.getCart();
        if (cart == null) {
            cart = new Cart();

        }
        cart.setClient(client);
        Cartitem existingCartItem = null;
        for (Cartitem cartItem : cart.getCartitems()) {
            if (cartItem.getProduct().getId().equals(productid)) {
                existingCartItem = cartItem;
                break;
            }
        }

        if (existingCartItem != null) {
            // Mettre à jour la quantité et le prix total de l'élément de panier existant
            existingCartItem.setQuantity(quantity);
            existingCartItem.setTotalprice(prod.getPrix() * quantity);
        } else {
            Cartitem cartItem = new Cartitem();
            cartItem.setProduct(prod);
            cartItem.setQuantity(quantity);
            cartItem.setTotalprice(prod.getPrix() * quantity);
            cartItem.setCart(cart);
            cart.getCartitems().add(cartItem);
        }

        Cart savedCart = cartRopository.save(cart);

        //convertToDto
        return modelMapper.map(savedCart, Cartdto.class);
    }



    public Cart getVartItemofcart( Long clientid) {
        // Récupérer le client
        Client client = clientRepository.findById(clientid).orElse(null);
        Cart cart = client.getCart();

        return cart;
    }




}
