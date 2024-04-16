import { Component } from '@angular/core';
import { LoginService } from '../services/login.service';
import { FAQ } from '../faq';

@Component({
  selector: 'app-admin-faq',
  templateUrl: './admin-faq.component.html',
  styleUrl: './admin-faq.component.css'
})
export class AdminFaqComponent {
  questionsAndAnswers: any[]=[];

  faq: FAQ = {
   question:'',
   answer:''
  };
  constructor( private auth: LoginService ) { } 
  ngOnInit(): void {
    this.getAllFaqs();

console.log("heloo this faq",this.faq)
}
  getAllFaqs(): void {
    this.auth.getAllFaqs().subscribe(data => {
      this.questionsAndAnswers = data;})}
  
 
//3-methode post faqs
AddFaq() {
  console.log("voila faq",this.faq)
      this.auth.createFaq(this.faq).subscribe(
        response => {
        // Afficher un message de succès à l'utilisateur si nécessaire
        console.log('Article créé avec succès:', response);
        alert('FAQ created successfully'); 
        this.resetFields();

        },
        error => {
          console.log("hi",this.faq)
                alert("Error creating the FAQ"); 

        }
      );

}
  //4 methode remove faq
  removeFaq(id: number): void {
    console.log("id=",id)
    this.auth.removeFaq(id).subscribe(
      () => {
        this.questionsAndAnswers = this.questionsAndAnswers.filter(faq => faq.id !== id);
  
        alert("FAQ supprimée avec succès")
      },
  
      (error) => {
        alert("Une erreur s'est produite lors de la suppression de la FAQ")
      }
    );
  }
  //5 resetFields intialiser les input
resetFields(){
  this.faq.answer=''
  this.faq.question=''
}
logout() {
  this.auth.signOut();
}
//2-methode de toggle
toggleQuestion(event: MouseEvent): void {
  const target = event.target as HTMLElement;
  const question = target.closest('.question');

  if (question) {
    const answer = question.querySelector('p');

    if (answer) {
      if (question.classList.contains('active')) {
        question.classList.remove('active');
        answer.classList.remove('show');
      } else {
        question.classList.add('active');
        answer.classList.add('show');
      }
    }
  }
}
}
