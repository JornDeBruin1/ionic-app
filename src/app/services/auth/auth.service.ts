import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { User } from 'src/app/model/user/User';
import { AngularFireAuth } from '@angular/fire/compat/auth';

@Injectable({
  providedIn: 'root'
})
export class AuthService {

  constructor(private auth: AngularFireAuth) { }

  recoverEmailPassword(email: string): Observable<void> {
    return new Observable<void>(observer => {
      console.log('Sending password reset email to:', email);
      this.auth.sendPasswordResetEmail(email)
        .then(() => {
          console.log('Password reset email sent successfully.');
          observer.next();
          observer.complete();
        })
        .catch(error => {
          console.error('Error sending password reset email:', error);
          observer.error(error);
          observer.complete();
        });
    });
  }

  login(email: string, password: string) : Observable<User>{
    return new Observable<User>(observer =>{
      setTimeout(() => {
        if(email == "error@email.com"){
          observer.error({message: 'User not found'});
          observer.next();
        }
        else{
          const user = new User();
          user.email = email;
          user.id = "userId";
          observer.next(user);
        }
        observer.complete
      }, 3000)
    }
  )}
}
