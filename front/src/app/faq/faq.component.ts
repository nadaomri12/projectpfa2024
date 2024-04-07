import { Component } from '@angular/core';
import { LoginService } from '../services/login.service';

@Component({
  selector: 'app-faq',
  templateUrl: './faq.component.html',
  styleUrl: './faq.component.css'
})
export class FAQComponent {
  questionsAndAnswers: any[]=[];

  constructor( private auth:LoginService) { } 
  ngOnInit(): void {
    this.getAllFaqs();
}
getAllFaqs(): void {
  this.auth.getAllFaqs().subscribe(data => {
    this.questionsAndAnswers = data;})}



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
