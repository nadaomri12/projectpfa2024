import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { SerrviceService } from '../services/serrvice.service';

@Component({
  selector: 'app-searchprod',
  templateUrl: './searchprod.component.html',
  styleUrls: ['./searchprod.component.css']  // Fix the typo here
})
export class SearchprodComponent  {
  

  nameprod:any;
 product:any;
 quantity:number=1;
  constructor(private route:ActivatedRoute,private Service:SerrviceService){
   this.nameprod=this.route.snapshot.paramMap.get("nameprod");
  
 }
 searchprod(){
  this.Service.searchproduct(this.nameprod).subscribe((data) => this.product = data);
}



ngOnInit() {
  this.searchprod();
  
}

}

  

