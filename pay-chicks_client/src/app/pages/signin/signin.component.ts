import { Component } from '@angular/core';
import { IconsComponent } from '../../shared/icons/wallet/icons.component';
import {RouterLink} from '@angular/router';

@Component({
  selector: 'app-signin',
  imports: [IconsComponent, RouterLink],
  templateUrl: './signin.component.html',
  styleUrl: './signin.component.css'
})
export class SigninComponent {

}
