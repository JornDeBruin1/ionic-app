import { Injectable } from '@angular/core';
import { Auth, createUserWithEmailAndPassword, signInWithEmailAndPassword, User, signOut } from '@angular/fire/auth';
import { Observable, catchError, from, map, of } from 'rxjs';
import { AngularFireAuth } from '@angular/fire/compat/auth';
import { FirebaseError } from 'firebase/app';
import { UserRegister } from 'src/app/model/user/UserRegister';




@Injectable({
  providedIn: 'root'
})

export class AuthService {
  

  constructor(private auth: Auth, private authFire:AngularFireAuth) { }

  register(userRegister: UserRegister) : Observable<void>{
    return new Observable<void>(observer => {
      setTimeout(()=>{
        if(userRegister.email == "error@email.com"){
          observer.error({message:"email already registered"});
        }
        else{
          observer.next();
        }
        observer.complete()
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

  // register({ email, password }: { email: string, password: string }) {
  //   return from(createUserWithEmailAndPassword(this.auth, email, password)).pipe(
  //     map((userCredential) => userCredential.user),
  //     catchError((error) => of(null))
  //   );
  // }

  async login({ email, password }: { email: string, password: string }): Promise<User | null> {
    try {
      const userCredential = await signInWithEmailAndPassword(this.auth, email, password);
      const user = userCredential.user;
      return user;
    } catch (error) {
      if (error instanceof FirebaseError) {
        // Handle known Firebase Authentication errors
        switch (error.code) {
          case 'auth/invalid-email':
            console.error('Invalid email format. Please check your email address.', error);
            break;
          // Add more specific error cases as needed.
          default:
            console.error('Authentication error:', error);
        }
      } else {
        // Handle other types of errors or unknown errors here.
        console.error('An unknown error occurred. Please try again later.');
      }
      return null;
    }
  }

  logout(){
    return signOut(this.auth);
  }
}
