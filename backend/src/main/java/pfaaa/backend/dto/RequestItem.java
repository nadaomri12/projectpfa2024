package pfaaa.backend.dto;

public class RequestItem {

    private Long productid ;
    private Long quantity;
    private Long idclient;

    public Long getProductid() {
        return productid;
    }

    public Long getQuantity() {
        return quantity;
    }

    public void setQuantity(Long quantity) {
        this.quantity = quantity;
    }

    public void setProductid(Long productid) {
        this.productid = productid;
    }

    public Long getIdclient() {
        return idclient;
    }

    public void setIdclient(Long idclient) {
        this.idclient = idclient;
    }
}

