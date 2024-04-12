import { Component } from '@angular/core';
import { faMapMarker, faEnvelope, faPhone } from '@fortawesome/free-solid-svg-icons';
import { faTwitter, faFacebookF, faLinkedinIn,faYoutube,faInstagram } from '@fortawesome/free-brands-svg-icons';
@Component({
  selector: 'app-footer',
  templateUrl: './footer.component.html',
  styleUrl: './footer.component.css'
})
export class FooterComponent {
  faMapMarker=faMapMarker
  faEnvelope=faEnvelope
  faPhone=faPhone
  faTwitter = faTwitter;
  faFacebookF = faFacebookF;
  faLinkedinIn = faLinkedinIn;
  faYoutube =faYoutube ;
  faInstagram=faInstagram
}
