import { Component, OnInit } from '@angular/core';
import { SerrviceService } from '../services/serrvice.service';
import { FormBuilder,FormGroup,Validators } from '@angular/forms';
import { Subject } from 'rxjs';
import { Router } from '@angular/router';

@Component({
  selector: 'app-contact',
  templateUrl: './contact.component.html',
  styleUrl: './contact.component.css'
})
export class ContactComponent implements OnInit {
  ContactForm!: FormGroup;
 
  constructor(private service: SerrviceService, private router: Router,private fb: FormBuilder){
    
  }
  ngOnInit() {
    this.ContactForm = this.fb.group({
      name: ['', Validators.required],
      email: ['', Validators.required],
      subject: ['', Validators.required],
      phone: ['', Validators.required],
      message: ['', Validators.required],
    });

  }
  addcontact(){

    const ContactObject = { // Crée un objet userObject avec les valeurs saisies dans le formulaire
      name: this.ContactForm.value.name,
      email: this.ContactForm.value.email, 
    
      subject:this.ContactForm.value.subject,
      phone:this.ContactForm.value.phone,
      message:this.ContactForm.value.message

    };
  this.service.addcontact(ContactObject).subscribe(
    response => {
      console.log(ContactObject)
      alert(" Le contact a été envoyé avec succès")
      this.router.navigate(['']);

      
    },
    error => {
      console.error('Error creating the article', error);
     
    }
  );
}


}
