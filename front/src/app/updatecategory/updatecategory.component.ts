import { Component, OnInit } from '@angular/core';
import { SerrviceService } from '../services/serrvice.service';
import { ActivatedRoute } from '@angular/router';
@Component({
  selector: 'app-updatecategory',
  templateUrl: './updatecategory.component.html',
  styleUrls: ['./updatecategory.component.css'] // Corrected 'styleUrl' to 'styleUrls'
})
export class UpdatecategoryComponent implements OnInit {
  categories: any;
  id:any;
  category: any = {
    id:'',
    nomCatalogue: '',
  };

  constructor(private service:SerrviceService,private route:ActivatedRoute){
    this.id=this.route.snapshot.paramMap.get("id");
  }
   
  getcategorybyid(){
    this.service.getcategorybyid(this.id).subscribe((data) => this.category = data);
  }
  
  ngOnInit() {
  
   
    this.getcategorybyid();
   
   
    
  }

  updatecategory() {
    this.service.updateCategory(this.category).subscribe(
      response => {
        console.log('Category successfully updated', this.category);
        alert('Category successfully updated');
      },
      error => {
        console.error('Error updating category', error);
        alert('Error updating category');
      }
    );
  }

  getcategory() {
    this.service.getcategory().subscribe((data: any) => {
      this.categories = Object.values(data);
    });
  }

 
}
