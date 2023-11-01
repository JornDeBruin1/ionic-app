import { Observable, of, throwError } from "rxjs";
import { LoginEffects } from "./login.effects"
import { Action, StoreModule } from "@ngrx/store";
import { login, loginSuccess, recoverPassword, recoverPasswordFail, recoverPasswordSuccess } from "./login.actions";
import { TestBed } from "@angular/core/testing";
import { EffectsModule } from "@ngrx/effects";
import { provideMockActions } from '@ngrx/effects/testing'
import { AuthService } from "src/app/services/auth/auth.service";
import { User } from "src/app/model/user/User";

describe('Login effects', ()=>{

    let effects: LoginEffects;
    let actions$: Observable<Action>
    let error = {error: 'error'}
    let user = new User();
    user.id = "anyUserId";
    let authServiceMock = {
        recoverPassword: (email: string) => {
            if(email == "error@email.com"){
                return throwError(error)
            }
            return of({})
        }
    }

    beforeEach(()=>{
        TestBed.configureTestingModule({
            imports: [
                StoreModule.forRoot([]),
                EffectsModule.forRoot([]),
                EffectsModule.forFeature([
                    LoginEffects
                ])
            ],
            providers:[
                provideMockActions(()=>actions$)
            ]
        }).overrideProvider(AuthService,{useValue: authServiceMock} )

        effects = TestBed.get(LoginEffects);
    })

    it('should recover password with existing email return succes', (done)=> {
        actions$ = of(recoverPassword({email: "any@mail.com"}))
        
        effects.recoverPassword$.subscribe(newAction => {
            expect(newAction).toEqual(recoverPasswordSuccess());
            done()
        })
    })
    it('should recover password with not existing email', (done) =>{
        actions$ = of(recoverPassword({email: "error@email.com"}));

        effects.recoverPassword$.subscribe(newAction =>{
            expect(newAction).toEqual(recoverPasswordFail({error}));
            done()
        })
    })

    it('should login with correct credentials', done =>{
        actions$ = of(login({email: "valid@email.com", password: "anyPassword"}));

        effects.login$.subscribe(newAction => {
            expect(newAction).toEqual(loginSuccess({user}));
            done();
        })
    })
})


