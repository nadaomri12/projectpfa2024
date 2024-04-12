import { Component } from '@angular/core';
import { LoginService } from '../services/login.service';
import { SerrviceService } from '../services/serrvice.service';
@Component({
  selector: 'app-allquestion',
  templateUrl: './allquestion.component.html',
  styleUrl: './allquestion.component.css'
})
export class AllquestionComponent {

  nbreQuestion:number=0;
  questions:any = [];
  categories:any
   users:any = [];
   combinedData: { questions: any, users: any, ListCatgeorie: any }[] = [];
   question:any;

   ListCatgeorie:any=[];

  constructor( private auth: LoginService, private Service:SerrviceService) { } 
  ngOnInit(): void {
    this.getAllQuestions();
    this.getcategory();
  
}

getcategory(){
  this.Service.getcategory().subscribe((data) => this.categories = Object.values(data));
 }
//get Tous Les Question Dans Notre application
  getAllQuestions(): void {
    // Ici, vous récupérez vos questions, puis pour chaque question, vous récupérez les détails de l'utilisateur
     
    // Récupérer toutes les questions
    this.auth.getAllQuestions().subscribe(
      questionList => {
          this.questions = questionList;

          // Pour chaque question, récupérer les détails de l'utilisateur correspondant
          this.questions.forEach((question: any) => {
              // Récupérer l'utilisateur associé à la question
              this.auth.getClient(question.idUser).subscribe(
                  user => {
                      // Ajouter l'utilisateur à la liste
                      this.users.push(user);
                      if (!user.image) {
                        user.image = "https://img.freepik.com/icones-gratuites/utilisateur_318-563642.jpg?w=360" ;
                    }
                  },
                  error => {
                      console.log("Erreur lors de la récupération des détails de l'utilisateur :", error);
                  }
              );

              // Récupérer la catégorie associée à la question
              this.Service.getcategorybyid(question.idCatalogue).subscribe(
                  categorie => {
                      // Ajouter la catégorie à la liste
                      this.ListCatgeorie.push(categorie);
                  },
                  error => {
                      console.log("Erreur lors de la récupération des détails de la catégorie :", error);
                  }
              );
          });
         this.nbreQuestion=this.questions.length
          console.log("Liste des utilisateurs :", this.users);
          console.log("Liste des catégories :", this.ListCatgeorie);
      },
      error => {
          console.log("Erreur lors de la récupération des questions :", error);
      }
  );


}


//getTouslesquestionBy categoryId
  fetchQuestionsByCategoryId(CategoryId: number): void {
    this.auth.getQuestionsByCatalogueId(CategoryId)
        .subscribe(questionList => {
          this.questions = questionList;
          console.log(questionList)
        },
        error => {
          // Gérer les erreurs
          console.error('Une erreur s\'est produite : ', error);
        }
      );
  }
  


}
