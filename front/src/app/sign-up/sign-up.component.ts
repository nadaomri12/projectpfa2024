import { Component } from '@angular/core';
import { LoginService } from '../services/login.service';
import { Router } from '@angular/router';
import { NgToastService } from 'ng-angular-popup';
import { FormBuilder,FormGroup,Validators } from '@angular/forms';
@Component({
  selector: 'app-sign-up',
  templateUrl: './sign-up.component.html',
  styleUrl: './sign-up.component.css'
})
export class SignUpComponent {
  eyeIcon:string = "fa-eye-slash"
  isText: boolean = false;
  loginForm!: FormGroup;
  SignUpForm!:FormGroup;

  type: string = 'password';
  
  constructor(private fb: FormBuilder, private auth: LoginService, private router: Router,private toast: NgToastService
    ) {}

    ngOnInit(): void {
      this.SignUpForm = this.fb.group({
        username: ['', Validators.required],
        email: ['', [Validators.required, Validators.email]],
        NumTel: ['', Validators.required],
        address: ['', Validators.required],
        CIN: ['', Validators.required],
        Compte: ['', Validators.required],
        role: ['CLIENT', Validators.required],
        password: ['', Validators.required],
        
      });
    }
 // Cette méthode est appelée lorsqu'un utilisateur clique sur l'icône de l'œil pour afficher ou masquer le mot de passe.
hideShowPass() {
  // Inverse la valeur de isText. Si isText est true, il devient false et vice versa.
  this.isText = !this.isText;
  
  // Met à jour l'icône de l'œil en fonction de la valeur actuelle de isText.
  // Si isText est true, l'icône de l'œil ouvert est affichée, sinon l'icône de l'œil barré est affichée.
  this.isText ? this.eyeIcon = 'fa-eye' : this.eyeIcon = 'fa-eye-slash';
  
  // Met à jour le type du champ de saisie du mot de passe en fonction de la valeur actuelle de isText.
  // Si isText est true, le type est défini sur 'text', ce qui rend le texte visible.
  // Sinon, le type est défini sur 'password', ce qui masque le texte.
  this.isText ? this.type = 'text' : this.type = 'password';
}

 
OnSignUp() {
    if (this.SignUpForm.valid) {
      const userObject = {
    
        userName: this.SignUpForm.value.userName, // Récupère le nom d'utilisateur saisi dans le formulaire
        email: this.SignUpForm.value.email, // Récupère le mot de passe saisi dans le formulaire
        CIN:this.SignUpForm.value.CIN,
        NumTel:this.SignUpForm.value.NumTel,
        address:this.SignUpForm.value.address,
        password: this.SignUpForm.value.password,
        Compte:this.SignUpForm.value.Compte,
        role:this.SignUpForm.value.role,
       

      };
      
      console.log("userobject",userObject);
      
      let signUpObj = {
        ...this.SignUpForm.value,
     
        
      }
      console.log("signUpObj",signUpObj);
      this.auth.signUp(signUpObj).subscribe({
        next: (res) => {
          alert('Utilisateur enregistré');
          this.SignUpForm.reset();
          this.router.navigate(['']);
        },
        error: (err) => {
          alert(err.error.message);
        }
      });
    
    }
    else {
      // Throw the error using toaster and with fields
      this.validateAllFormFields(this.SignUpForm);
      alert("Your form is invalid");
    }
  }
  validateAllFormFields(formGroup: FormGroup) {
    Object.keys(formGroup.controls).forEach(field => {
      const control = formGroup.get(field);
      if (control instanceof FormGroup) {
        this.validateAllFormFields(control); // Recursively validate nested form groups
      } else {
        control?.markAsTouched();
      }
    });
  }
  isFieldInvalid(fieldName: string): boolean {
    const control = this.SignUpForm.get(fieldName);
    return !!control && control.dirty && control.hasError('required');
  }

}

