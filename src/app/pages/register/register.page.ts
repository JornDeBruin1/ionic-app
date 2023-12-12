import { Component, OnDestroy, OnInit } from '@angular/core';
import { RegisterPageForm } from './form/register.page.form';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Store } from '@ngrx/store';
import { hide, show } from 'src/store/loading/loading.actions';
import { register } from 'src/store/register/register.actions';
import { RegisterState } from 'src/store/register/RegisterState';
import { AppState } from 'src/store/AppState';
import { ToastController } from '@ionic/angular';
import { login } from 'src/store/login/login.actions';
import { Subscription } from 'rxjs';
import { Address } from 'src/app/model/address/Address';



@Component({
  selector: 'app-register',
  templateUrl: './register.page.html',
  styleUrls: ['./register.page.scss'],
})
export class RegisterPage implements OnInit, OnDestroy {

  registerForm!: RegisterPageForm;
  registerStateSubscription!:Subscription;
  form: FormGroup
  email!: string
  password!:string

  constructor(
    private formBuilder: FormBuilder,
    private store: Store<AppState>,
    private toastController: ToastController,
    
  ) { 
    this.form = this.formBuilder.group({
      email: ['', [Validators.required, Validators.email]],
      password: ['',[Validators.required, Validators.minLength(6)]],
      repeatPassword: ['', [Validators.required]]
    });
  }

  ngOnInit() {
    this.createForm();
    this.watchRegisterState();
  }

  ngOnDestroy(){
    this.registerStateSubscription.unsubscribe();
  }



  register() {
    this.registerForm.getForm().markAllAsTouched();
   console.log('Form validity:', this.registerForm.getForm().valid);
    if (this.registerForm.getForm().valid) {
      this.email = this.form.get('email')?.value;
      this.password = this.form.get('password')?.value;
      
      this.store.dispatch(register({
        userRegister: {
          email: this.email,
          password: this.password,
          name: '',
          phone: '',
          address: new Address ()
        }
      }));
    }
   
  }

  private watchRegisterState(){
   this.registerStateSubscription = this.store.select('register').subscribe(state => {
      this.toggleLoading(state);
      this.onRegistered(state);
      this.onError(state);
     
    })
  }

  private onRegistered(state: RegisterState){
    if(state.isRegisterd){
    this.email = this.registerForm.getForm()?.value.email;
    this.password = this.registerForm.getForm()?.value.password;

    console.log('Email:', this.email);
    console.log('Password:', this.password);

    this.store.dispatch(login({ email: this.email, password: this.password }));
     }
  }

  private onError(state: RegisterState){
    if(state.error){
      this.toastController.create({
        message:state.error.message,
        duration:5000,
        header:'registration not done'
      }).then(toast  => toast.present())
     }
  }

  private toggleLoading(state: RegisterState){
    if(state.isRegistering){
      this.store.dispatch(show())
    } else{
      this.store.dispatch(hide())
    }
  }

  private createForm(){
    this.registerForm = new RegisterPageForm(this.formBuilder)
  }
 
}
