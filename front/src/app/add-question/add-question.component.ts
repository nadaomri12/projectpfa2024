import { Component } from '@angular/core';
import { User } from '../user';
import { QuestionDto } from '../question-dto';
import { LoginService } from '../services/login.service';
import { Categorie } from '../categorie';

@Component({
  selector: 'app-add-question',
  templateUrl: './add-question.component.html',
  styleUrl: './add-question.component.css'
})
export class AddQuestionComponent {
 image2: string | undefined;

  image: string | null = null;
  Categorie:Categorie[] = [];
  selectedCategoryId: number=0// Définition de la propriété pour stocker l'ID sélectionné
  idUser: number = 0; // Déclaration de idUser
  

  users:User[]=[]

  fileSelected: boolean = false;
  // Nom du fichier sélectionné
  fileName: string = '';

  submitDisabled = false;

  


  //creation objet questionDto
questionDto: QuestionDto = {
      id: 0,
      question:'',
      idUser:0,
      idCatalogue: this.selectedCategoryId,// Utilisez selectedCategoryId pour idCatalogue
      file:''
    };
  //creation objet user

    userConnect: User = {
      id: 0,
      username: '',
      email: '',
      password: '',
      CIN:0,
      NumTel: 0,
      address:'',
      emailSubscription: '',
    };
constructor( private auth: LoginService) { } 

ngOnInit(): void {
  const clientIdString = localStorage.getItem("clientId");
  if (clientIdString) {
    // Utilisez parseInt pour convertir la chaîne en nombre
    this.idUser = parseInt(clientIdString, 10);
    this.userConnect.id=parseInt(clientIdString, 10);
  }this.getAllCategories()
  this.getUserById();

}







getUserById(): void {
  this.auth.getUserById(this.userConnect.id).subscribe(
    (user: User) => {
      if (user) {
        this.userConnect = user;
      }
    },
    error => {
      console.error("Erreur lors de la récupération de l'utilisateur :", error);
    }
  );
}



//1-obtient tout les categorie dans une liste 
getAllCategories(): void {
  this.auth.getAllCategorie()
    .subscribe(categorie => {
      this.Categorie = categorie;
       console.log(categorie)
    });
}
onSubmit(): void {
  console.log("our selected category id", this.selectedCategoryId);
  if (this.selectedCategoryId !== null && this.selectedCategoryId !== 0) {
    this.questionDto.idCatalogue = this.selectedCategoryId;
    this.questionDto.idUser = this.idUser; // Also make sure to assign idUser
    if (this.questionDto.file) {
      console.log("our image 2 is", this.questionDto.file);
      this.auth.createQuestion(this.questionDto).subscribe(
        response => {
          console.log('question created successfully:', response);
          alert("The question has been posted.");
         this. questionDto = {
            id: 0,
            question:'',
            idUser:0,
            idCatalogue: this.selectedCategoryId,// Utilisez selectedCategoryId pour idCatalogue
            file:''
          };
        },
        error => {
          console.error('Error creating the question:', error);
        }
      );
    } else {
      alert("The upload is not yet completed.");
    }
  }
}



}