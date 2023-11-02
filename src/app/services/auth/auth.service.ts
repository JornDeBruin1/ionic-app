import { Injectable } from '@angular/core';
import { Auth, createUserWithEmailAndPassword, signInWithEmailAndPassword, user } from '@angular/fire/auth';
import { signOut,getAuth, sendPasswordResetEmail, User } from 'firebase/auth';
import { Observable } from 'rxjs';
import { AngularFireAuth } from '@angular/fire/compat/auth';
import { UserRegister } from 'src/app/model/user/UserRegister';



@Injectable({
  providedIn: 'root'
})

export class AuthService {
  

  constructor(private auth: Auth, private authFire:AngularFireAuth ) { }

  register(userRegister: UserRegister) : Observable<void>{
    return new Observable<void>(observer => {
      setTimeout(()=>{
        if(userRegister.email == "error@email.com"){
          observer.error({message:"email already registered"});
        }
        else{
          observer.next();
        }
        observer.complete();
      },3000)
    })
  }

  recoverEmailPassword(email: string): Observable<void> {
    return new Observable<void>(observer => {
     this.authFire.sendPasswordResetEmail(email).then(()=>{
      observer.next();
      observer.complete();
    }).catch(error => {
      observer.error(error);
      observer.complete();
    })
    });
  }


  
  


  // async register({ email, password }: { email: string, password: string }): Promise<User | null> {
  //   try {
  //     const userCredential = await createUserWithEmailAndPassword(this.auth, email, password);
  //     return userCredential.user;
  //   } catch (e) {
  //     return null;
  //   }
  // }

  async login({ email, password }: { email: string, password: string }): Promise<User | null> {
    try {
      const userCredential = await signInWithEmailAndPassword(this.auth, email, password);
      return userCredential.user;
    } catch (e) {
      return null;
    }
  }

  logout(){
    return signOut(this.auth);
  }
  
}
