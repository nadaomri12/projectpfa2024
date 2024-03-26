package pfaaa.backend.dto;

import pfaaa.backend.entity.Client;

import java.util.Date;

public class ClientDto {
    public Long id;
    private String name;
    public String emailSubscription;

    private  String email;
    private String address;
    private Long CIN;
    private Long NumTel;
    private String Compte;

    public String getName() {
        return name;
    }

    public void setName(String name) {
        this.name = name;
    }

    public String getCompte() {
        return Compte;
    }

    public void setCompte(String compte) {
        this.Compte = compte;
    }

    public Long getNumTel() {
        return NumTel;
    }

    public void setNumTel(Long numTel) {
        NumTel = numTel;
    }

    public String getAddress() {
        return address;
    }

    public void setAddress(String address) {
        this.address = address;
    }

    public Long getCIN() {
        return CIN;
    }
    public Date date=new Date();


    public void setCIN(Long CIN) {
        this.CIN = CIN;
    }

    public String getEmail() {
        return email;
    }

    public void setEmail(String email) {
        this.email = email;
    }


    public ClientDto() {
        // Constructeur par défaut
    }
    public ClientDto(Client client) {
        this.id = client.getId();
        this.name = client.getUsername();
        this.email = client.getEmail();
        this.address = client.getAddress();
        this.CIN = client.getCIN();
        this.NumTel = client.getNumTel();
        this.Compte = client.getCompte();
        this.emailSubscription=client.getEmailSubscription();
    }


}