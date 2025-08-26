import { Component } from '@angular/core';
import { IconsComponent } from '../../shared/icons/wallet/icons.component';
import {RouterLink} from '@angular/router';
import {FormGroup, FormControl, ReactiveFormsModule} from '@angular/forms';
import axios from 'axios';
import { environment } from '../../../environments/environment';

@Component({
  selector: 'app-signin',
  imports: [IconsComponent, RouterLink, ReactiveFormsModule],
  templateUrl: './signin.component.html',
  styleUrl: './signin.component.css'
})
export class SigninComponent {

  SignInForm = new FormGroup({
    username: new FormControl(''),
    password: new FormControl('')
  })

  public async handleOnSubmit() {
    const formData: any = this.SignInForm.value;

    const response = await axios.post(`${environment.apiUrl}/api/v2/auth/signin`, 
      {
        username: formData.username,
        password: formData.password
      },
    {
      withCredentials: true,
      headers: {
        'Content-Type': 'application/json'
      }
    })

  }

}
