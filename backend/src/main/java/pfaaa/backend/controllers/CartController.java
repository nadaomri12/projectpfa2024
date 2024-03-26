package pfaaa.backend.controllers;

import jakarta.transaction.Transactional;
import lombok.RequiredArgsConstructor;
import org.jetbrains.annotations.NotNull;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;
import pfaaa.backend.Repository.CartItemRepository;
import pfaaa.backend.Repository.CartRopository;
import pfaaa.backend.Repository.ClientRepository;
import pfaaa.backend.Repository.ProduitRepository;
import pfaaa.backend.dto.RequestItem;
import pfaaa.backend.entity.Cart;
import pfaaa.backend.entity.Cartitem;
import pfaaa.backend.entity.Client;
import pfaaa.backend.entity.Produit;
import pfaaa.backend.service.CartService;

@RestController
@RequestMapping(path = "/api")
@RequiredArgsConstructor
@CrossOrigin(origins = "http://localhost:4200")
public class CartController {
    @Autowired
    private final CartService cartservice;
    @Autowired
    private final ProduitRepository produitRepository;
    @Autowired
    private final ClientRepository clientRepository;
    @Autowired
    private final CartRopository cartRopository;
private final CartItemRepository cartItemRepository;


    @PostMapping("/additem")
    @Transactional
    public Cart additem(@RequestBody @NotNull RequestItem itemrequest) {
        Long productid = itemrequest.getProductid();
        Long quantity = itemrequest.getQuantity();
        Produit prod = produitRepository.findById(productid).orElse(null);
        Client client = clientRepository.findById(itemrequest.getIdclient()).orElse(null);

        //getting cart from Client
        Cart cart = client.getCart();
        if (cart == null) {
            cart = new Cart();

        }
        cart.setClient(client);
        Cartitem existingCartItem = null;
        // Chercher l'élément existant du panier par l'ID du produit
        for (Cartitem cartItem : cart.getCartitems()) {
            if (cartItem.getProduct().getId().equals(productid)) {
                existingCartItem = cartItem;
                break;
            }
        }



        if (existingCartItem != null) {
            // Mettre à jour la quantité et le prix total de l'élément de panier existant
            existingCartItem.setQuantity( ++quantity);
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

        return savedCart;
    }


    @GetMapping("/cart/{id}")
    public Cart getCartbyid(@PathVariable Long id) {
        // Récupérer le client
        Client client = clientRepository.findById(id).orElse(null);
        Cart cart = client.getCart();
        return  cart;
    }

    @DeleteMapping("/removeitem/{clientId}/{productId}")
    @Transactional
    public ResponseEntity<Cart> removeItemFromCart(@PathVariable Long clientId, @PathVariable Long productId) {
        // Récupérer le client
        Client client = clientRepository.findById(clientId).orElse(null);

        if (client == null) {
            return ResponseEntity.notFound().build();
        }

        // Récupérer le panier du client
        Cart cart = client.getCart();

      // Supprimer tous les éléments de panier associés au produit donné
        cart.getCartitems().removeIf(cartItem -> cartItem.getProduct().getId().equals(productId));

        // Mettre à jour le panier dans la base de données
        cart = cartRopository.save(cart);
        // Retourner le panier mis à jour avec le statut 200 OK
        return ResponseEntity.ok(cart);

    }

    @DeleteMapping("/removeallitem/{clientId}")
    @Transactional
    public void clearCart(@PathVariable Long clientId) {
        // Récupérer le client à partir de son ID
        Client client = clientRepository.findById(clientId).orElse(null);

        if (client != null) {
            // Récupérer le panier du client
            Cart cart = client.getCart();

            if (cart != null) {
                // Supprimer les Cartitem associés au panier
                cart.getCartitems().clear();
                // Mettre à jour le panier dans la base de données
                cartRopository.save(cart);
            }
        }
    }





}