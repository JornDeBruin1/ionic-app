import { Injectable } from '@angular/core';
import { Auth, createUserWithEmailAndPassword, signInWithEmailAndPassword, user } from '@angular/fire/auth';
import { signOut,getAuth, sendPasswordResetEmail, User } from 'firebase/auth';
import { Observable } from 'rxjs';
import { AngularFireAuth } from '@angular/fire/compat/auth';

const fireAuth = getAuth();

@Injectable({
  providedIn: 'root'
})

export class AuthService {
  

  constructor(private auth: Auth, private authFire:AngularFireAuth ) { }

  recoverEmailPassword(email: string): Observable<void> {
    return new Observable<void>(observer => {
    this.authFire.sendPasswordResetEmail(email).then(()=>{
      observer.next();
      observer.complete();
    }).catch(error => {
      observer.error(error);
      observer.complete();
    })
    })
  }
  


  async register({ email, password }: { email: string, password: string }) {
    try{
      await createUserWithEmailAndPassword(
          this.auth,
          email,
          password
        );
       return user;
    }
    catch(e){
      return null;
    }
    
   
  }

  async login({ email, password }: { email: string, password: string }) {
    try{
     await signInWithEmailAndPassword(
         this.auth,
         email,
         password
       );
      return user;
   }
   catch(e){
     return null;
   }
  }

  logout(){
    return signOut(this.auth);
  }
  
}
