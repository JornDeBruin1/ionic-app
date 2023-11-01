import { Component, OnDestroy, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { AlertController, LoadingController, ToastController } from '@ionic/angular';
import { Store } from '@ngrx/store';
import { AuthService } from 'src/app/services/auth/auth.service';
import { AppState } from 'src/store/AppState';
import { recoverPassword, recoverPasswordFail, recoverPasswordSuccess } from 'src/store/login/login.actions';
import { LoginPageform } from './login.page.form';
import { hide, show } from 'src/store/loading/loading.actions';
import { LoginState } from 'src/store/login/LoginState';
import { Subscription } from 'rxjs';

@Component({
  selector: 'app-login',
  templateUrl: './login.page.html',
  styleUrls: ['./login.page.scss'],
})
export class LoginPage implements OnInit, OnDestroy {

  credentials!: FormGroup; 
  loginStateSubscription!: Subscription

  constructor(
    private fb: FormBuilder,
    private loadingController: LoadingController,
    private alertController: AlertController,
    private authService: AuthService,
    private router: Router,
    private store: Store<AppState>,
    private toastController: ToastController,
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

   this.loginStateSubscription = this.store.select('login').subscribe(loginState => {
      this.onIsRecoveredPassword(loginState);
      this.onIsRecoveringPassword(loginState)
      this.onIsRecoveringPasswordFail(loginState)
    });
  }

  ngOnDestroy(){
    if(this.loginStateSubscription){
      this.loginStateSubscription.unsubscribe();
    }
  }

  private async onIsRecoveringPasswordFail(loginState: LoginState){
    if(loginState.error){
      this.store.dispatch(hide());
      const toaster = await this.toastController.create({
        position: "bottom",
        message: loginState.error.message,
        color: "danger"
      });
      toaster.present();

    }
  }

  private onIsRecoveringPassword(loginState: LoginState) {
    if (loginState.isRecoveringPassword) {
      this.store.dispatch(show());

      // Ensure the 'credentials' form is initialized before accessing 'email' control
      if (this.credentials) {
        const emailControl = this.credentials.get('email');

        if (emailControl) {
          this.authService.recoverEmailPassword(emailControl.value).subscribe(() => {
            this.store.dispatch(recoverPasswordSuccess());
          },error =>{ 
            this.store.dispatch(recoverPasswordFail({error}))
        });
        } 
      }
    }
  }
  private async onIsRecoveredPassword(loginState: LoginState){
    if(loginState.isRecoveredPassword){
      this.store.dispatch(hide());
      const toaster = await this.toastController.create({
        position: "bottom",
        message: "recovery email sent",
        color: "primary"
      });
      toaster.present();
    }
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
