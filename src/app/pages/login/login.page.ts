import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { AlertController, LoadingController, ToastController } from '@ionic/angular';
import { Store } from '@ngrx/store';
import { AuthService } from 'src/app/services/auth/auth.service';
import { AppState } from 'src/store/AppState';
import { recoverPassword } from 'src/store/login/login.actions';
import { LoginPageform } from './login.page.form';
import { show } from 'src/store/loading/loading.actions';

@Component({
  selector: 'app-login',
  templateUrl: './login.page.html',
  styleUrls: ['./login.page.scss'],
})
export class LoginPage implements OnInit {

  credentials!: FormGroup; 
  constructor(
    private fb: FormBuilder,
    private loadingController: LoadingController,
    private alertController: AlertController,
    private authService: AuthService,
    private router: Router,
    private store: Store<AppState>
  ) {}

  get email() {
    return this.credentials.get('email');
  }

  get password() {
    return this.credentials.get('password');
  }

  forgotEmailPassword() {
    this.store.dispatch(recoverPassword());
  }

  ngOnInit() {
    // Initialize the credentials form using the FormBuilder
    this.credentials = this.fb.group({
      email: ['', [Validators.required, Validators.email]],
      password: ['', [Validators.required, Validators.minLength(6)]]
    });

    this.store.select('login').subscribe(loginState => {
      if (loginState.isRecoveringPassword) {
        this.store.dispatch(show());
      }
    });
  }

  async toRegister(){
    const loading = await this.loadingController.create();
    await loading.present();
  
    const user = this.router.navigateByUrl('/register', {replaceUrl: true});

    await loading.dismiss();
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
