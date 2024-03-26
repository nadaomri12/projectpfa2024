package pfaaa.backend.dto;

import pfaaa.backend.auth.RegisterRequestDto;

import java.util.HashSet;
import java.util.Set;

public class Cartdto {
    public Long idcart;

  public Set<Cartitemdto> cartitems=new HashSet<>();

    public RegisterRequestDto client  ;
}
