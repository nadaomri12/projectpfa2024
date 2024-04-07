import { Component } from '@angular/core';
import { LoginService } from '../services/login.service';
import { SerrviceService } from '../services/serrvice.service';
interface Category {
  nomCatalogue: string;
  selected: boolean;
  // ... other properties if there are any
}
@Component({
  selector: 'app-addquestion',
  templateUrl: './addquestion.component.html',
  styleUrl: './addquestion.component.css'
})
export class AddquestionComponent {
  image2: string | undefined;

  image: string | null = null;
 
  selectedCategoryId: number=0// Définition de la propriété pour stocker l'ID sélectionné
  idUser: number = 0; // Déclaration de idUser
  categories:any

  users:any

  

  submitDisabled = false;

  


questionDto: any = [];
 userConnect: any = [];
  
   
     
   
  
constructor( private auth: LoginService , private Service:SerrviceService) { } 
ngOnInit(): void {
  const clientIdString = localStorage.getItem("clientId");
  if (clientIdString) {
    // Utilisez parseInt pour convertir la chaîne en nombre
    this.idUser = parseInt(clientIdString, 10);
    this.userConnect.id=parseInt(clientIdString, 10);
  }
  this.getcategory();
  this.getUserByid();

}




categoryChanged() {
  if (this.categories) {
    // Filter selected categories and update nomcatalogues array
    const selectedCategories = this.categories
      .filter((category: Category) => category.selected)
      .map((category: Category) => category.nomCatalogue);

    // Update the nomcatalogues array with selected categories
    this.questionDto.nomcatalogues = selectedCategories;
  }
}





getUserByid(): void {
  this.auth.getClient(this.userConnect.id).subscribe(
    user => {
      if (user) {
        this.userConnect = user;
        if (!this.userConnect.image) {
          this.userConnect.image = "https://img.freepik.com/icones-gratuites/utilisateur_318-563642.jpg?w=360" ;
      }
        console.log("notre user", user);
        console.log("notre image",this.userConnect.image)
      } else {
        console.error("L'utilisateur est null.");
      }
    },
    error => {
      console.error("Erreur lors de la récupération de l'utilisateur :", error);
    }
  );
  }  


//1-obtient tout les categorie dans une liste 
getcategory(){
  this.Service.getcategory().subscribe((data) => this.categories = Object.values(data));
 }
 onSubmit(): void {
  // Retrieve the selected category ID from questionDto
  const selectedCategoryIds = this.questionDto.nomcatalogues;

  // Check if at least one category is selected
  if (selectedCategoryIds && selectedCategoryIds.length > 0) {
    // Set user ID
    this.questionDto.idUser = this.idUser;
  
    // Iterate over selected category IDs and create a question for each category
    selectedCategoryIds.forEach((categoryId: number) => {
      // Set the category ID
      this.questionDto.idCatalogue = categoryId;
      
    console.log(this.questionDto)  
      // Create the question
      this.auth.createQuestion(this.questionDto).subscribe(
        response => {
               
          console.log('Question created successfully:', response);
          alert("The question has been posted.");
          
          // Clear the form after posting the question
          this.questionDto = {
            id: 0,
            question: '',
            idUser: 0,
            idCatalogue: 0,
            nomcatalogues: [] // Reset selected categories
          };
        },
        error => {
          console.error('Error creating the question:', error);
        }
      );
    });
  } else {
    console.error('No category selected.');
  }
}

}





