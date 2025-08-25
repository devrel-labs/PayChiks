import { Component } from '@angular/core';
import { IconsComponent } from '../../shared/icons/wallet/icons.component';
import { RouterLink } from '@angular/router';

@Component({
  selector: 'app-signup',
  imports: [IconsComponent, RouterLink],
  templateUrl: './signup.component.html',
  styleUrl: './signup.component.css'
})
export class SignupComponent {

}
