import { Component, OnDestroy, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { LoginPageform } from './login.page.form';
import { Store } from '@ngrx/store';
import { AppState } from 'src/store/AppState';
import { hide, show } from 'src/store/loading/loading.actions';
import { login, loginFail, loginSuccess, recoverPassword, recoverPasswordFail, recoverPasswordSuccess } from 'src/store/login/login.actions';
import { AlertController, LoadingController, ToastController } from '@ionic/angular';
import { LoginState } from 'src/store/login/LoginState';
import { AuthService } from 'src/app/services/auth/auth.service'
import { Subscription } from 'rxjs';
@Component({
  selector: 'app-login',
  templateUrl: './login.page.html',
  styleUrls: ['./login.page.scss'],
})
export class LoginPage implements OnInit{

  credentials!: FormGroup;
  form!: FormGroup;
  constructor( 
    private fb: FormBuilder,
    private loadingController: LoadingController,
    private alertController: AlertController,
    private authService: AuthService,
    private router: Router
    ){}

      get email(){
        return this.credentials.get('email');
      }

      get password(){
        return this.credentials.get('password');
      }

  ngOnInit() {
      this.credentials = this.fb.group({
      email:['', [Validators.required, Validators.email]],
      password:['',[Validators.required, Validators.minLength(6)]]
    })
  }

  async register() {
    if (this.credentials.invalid) {
      this.showAlert('Registration failed', 'Please fill in all the required fields.');
      return;
    }
  
    const loading = await this.loadingController.create();
    await loading.present();
  
    const user = await this.authService.register(this.credentials.value);
    await loading.dismiss();
  
    if (user) {
      this.router.navigateByUrl('/home', { replaceUrl: true });
    } else {
      this.showAlert('Registration failed', 'Please try again!');
    }
  }
  
  async login() {
    if (this.credentials.invalid) {
      this.showAlert('Login failed', 'Please fill in all the required fields.');
      return;
    }
  
    const loading = await this.loadingController.create();
    await loading.present();
  
    const user = await this.authService.login(this.credentials.value);
    await loading.dismiss();
  
    if (user) {
      this.router.navigateByUrl('/home', { replaceUrl: true });
    } else {
      this.showAlert('Login failed', 'Please try again!');
    }
  }

  async showAlert(header:string, message:string){
    const alert = await this.alertController.create({
      header,
      message,
      buttons:['OK']
    });
    await alert.present();
  }
  
}
