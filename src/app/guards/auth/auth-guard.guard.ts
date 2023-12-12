// import { Injectable, inject } from '@angular/core';
// import {  ActivatedRouteSnapshot, CanActivateFn, Router, RouterStateSnapshot, UrlTree } from '@angular/router';
// import { Observable, of} from 'rxjs';
// import { switchMap, take } from 'rxjs/operators';
// import { AppState } from 'src/store/AppState';
// @Injectable({
//   providedIn: 'root'
// })
// class PermissionsService {

//   constructor(private router: Router) {}

//   canActivate(next: ActivatedRouteSnapshot, state: RouterStateSnapshot): boolean {
//       return this.AppState.store.select('login').pipe(
//         take(1),
//         switchMap(loginState =>{
//           if(loginState.isLoggedIn){
//             return of(true);
//           }
//           this.router.navigateByUrl('login');
//           return of(false);
//         })
//       )
      
//     }
//   }


// export const AuthGuard: CanActivateFn = (next: ActivatedRouteSnapshot, state: RouterStateSnapshot): boolean => {
//   return inject(PermissionsService).canActivate(next, state);
  
// }
 

  
// }
