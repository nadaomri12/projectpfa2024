import { Component, OnInit } from '@angular/core';
import { CartserviceService } from '../services/cartservice.service';
import { SerrviceService } from '../services/serrvice.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-topbar',
  templateUrl: './topbar.component.html',
  styleUrls: ['./topbar.component.css']
})
export class TopbarComponent implements OnInit {
  item: any;
  searchInput: any;

  constructor(private cartService: CartserviceService, private productService: SerrviceService, private router: Router) {}

  
  searchproduct(productName: any) {
    if (productName === null || productName === undefined) {
      
      alert('Veuillez entrer un terme de recherche.');
      return; 
    }

    this.productService.searchproduct(productName).subscribe(
      (data) => {
        console.log('Search Results:', data);
        // Naviguer vers la page searchprod avec le nom du produit en tant que paramètre
        this.router.navigate(['/searchprod/:nameprod', { nameprod: productName }]);
      }
    )
  }
  

  ngOnInit(): void {
    this.cartService.getcartItemList().subscribe(res => {
      this.item = res.length;
    });
  }
}
