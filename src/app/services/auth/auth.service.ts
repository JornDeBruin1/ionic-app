import { Injectable } from '@angular/core';
import { Auth, createUserWithEmailAndPassword, signInWithEmailAndPassword, user } from '@angular/fire/auth';
import { signOut } from 'firebase/auth';

@Injectable({
  providedIn: 'root'
})
export class AuthService {

  constructor(private auth: Auth) { }

  async register({ email, password }: { email: string, password: string }) {
    try{
       createUserWithEmailAndPassword(
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
      signInWithEmailAndPassword(
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
  

//   login(email: string, password: string) : Observable<User>{
//     return new Observable<User>(observer =>{
//       setTimeout(() => {
//         if(email == "error@email.com"){
//           observer.error({message: 'User not found'});
//           observer.next();
//         }
//         else{
//           const user = new User();
//           user.email = email;
//           user.id = "userId";
//           observer.next(user);
//         }
//         observer.complete
//       }, 3000)
//     }
//   )}
}
