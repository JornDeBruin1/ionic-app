import { ComponentFixture, TestBed, waitForAsync } from '@angular/core/testing';
import { LoginPage } from './login.page';
import { Router } from '@angular/router';
import { IonicModule, ToastController } from '@ionic/angular';
import { AppRoutingModule } from 'src/app/app-routing.module';
import { ReactiveFormsModule } from '@angular/forms';
import { Store, StoreModule } from '@ngrx/store';
import { loadingReducer } from 'src/store/loading/loading.reducers';
import { loginReducer } from 'src/store/login/login.reducers';
import { AppState } from 'src/store/AppState';
import { login, loginFail, loginSuccess, recoverPassword, recoverPasswordFail, recoverPasswordSuccess } from 'src/store/login/login.actions';
import { User } from 'src/app/model/user/User';


describe('LoginPage', () => {
  let component: LoginPage;
  let fixture: ComponentFixture<LoginPage>;
  let router: Router;
  let page: any;
  let store: Store<AppState>
  let toastController: ToastController;


  beforeEach(waitForAsync(() => {
    TestBed.configureTestingModule(
      {
        declarations: [LoginPage],
        imports: [
          IonicModule.forRoot(),
          AppRoutingModule,
          ReactiveFormsModule,
          StoreModule.forRoot([]),
          StoreModule.forFeature("loading", loadingReducer),
          StoreModule.forFeature("login", loginReducer)
        ]
      }).compileComponents();

    fixture = TestBed.createComponent(LoginPage);
    router = TestBed.get(Router);
    store = TestBed.get(Store);
    toastController = TestBed.get(ToastController);
  

    component = fixture.componentInstance;
    page = fixture.debugElement.nativeElement;
  }));

  it('should create form on init', () => {

    component.ngOnInit();
    expect(component.form).not.toBeUndefined();

  })

  it('should go to register page on register', () => {
    spyOn(router, 'navigate');
    component.register();
    expect(router.navigate).toHaveBeenCalledWith(['register']);
  });

  // it('should recover email/password on forgot email/password', () => {

  //   fixture.detectChanges();
  //   component.form.get('email')?.setValue("valid@email.com");
  //   page.querySelector("#recoverPasswordButton").click();
  //   store.select('login').subscribe(loginState => {
  //     expect(loginState.isRecoveringPassword).toBeTruthy();
  //   })
  // })

  it('should show loading page when recovering password', () => {

    fixture.detectChanges();
    store.dispatch(recoverPassword({email: "any@mail.com"}));
    store.select('loading').subscribe(loadingState => {
      expect(loadingState.show).toBeTruthy();
    })
  })

  it('should hide loading and show success message when has recoverd password', () => {
    spyOn(toastController, 'create');

    fixture.detectChanges();
    store.dispatch(recoverPassword({email: "any@mail.com"}));
    store.dispatch(recoverPasswordSuccess());
    store.select('loading').subscribe(loadingState => {
      expect(loadingState.show).toBeFalsy();
    })

    expect(toastController.create).toHaveBeenCalledTimes(1);

  })

  it("should hide loading and show error message when error on recover password", () => {
    spyOn(toastController, 'create').and.returnValue(<any> Promise.resolve({present:() => {}}));
    fixture.detectChanges();
    store.dispatch(recoverPassword({email: "any@mail.com"}));
    store.dispatch(recoverPasswordFail({ error: "message" }));
    store.select('loading').subscribe(loadingState => {
      expect(loadingState.show).toBeFalsy();
    })

    expect(toastController.create).toHaveBeenCalledTimes(1);
  })

  it('should show loading and start login when logging in', () => {
    fixture.detectChanges();
    // component.form.get('email')?.setValue('valid@email.com');
    // component.form.get('password')?.setValue('anyPassword');
    page.querySelector('#loginButton').click();
    store.select('loading').subscribe(loadingState => {
      expect(loadingState.show).toBeTruthy();
    })
    store.select('login').subscribe(loginState => {
      expect(loginState.isLoggingIn).toBeTruthy();
    })
  })

  it('should hide loading component and send user to home page when user has logged in', ()=>{
    spyOn(router, 'navigate');

    fixture.detectChanges();
    store.dispatch(login({email: "valid@email.com", password: "anyPassword"}))
    store.dispatch(loginSuccess({user: new User()}))
    store.select('loading').subscribe(loadingState => {
      expect(loadingState.show).toBeFalsy();
    })
    store.select('login').subscribe(loginState => {
      expect(loginState.isLoggedIn).toBeTruthy();
    })
    expect(router.navigate).toHaveBeenCalledWith(['home'])
  })

it('should hide loading and show error when user couldnt login', ()=>{
  spyOn(toastController, 'create').and.returnValue(<any> Promise.resolve({present:() => {}}));

  fixture.detectChanges();
  store.dispatch(login({email: "valid@email.com", password: "anyPassword"}));
  store.dispatch(loginFail({error: {message: 'error message'}}))

  store.select('loading').subscribe(loadingState => {
    expect(loadingState.show).toBeFalsy();
  })

  expect(toastController.create).toHaveBeenCalledTimes(1);
})

});
