import {Injectable} from '@angular/core';
import {ActivatedRouteSnapshot, CanActivate, RouterStateSnapshot,} from '@angular/router';
import {AuthService} from './auth.service';

@Injectable({providedIn: 'root'})
export class AuthGuard implements CanActivate {
    constructor(
        private authService: AuthService
    ) {
    }

    canActivate(route: ActivatedRouteSnapshot, state: RouterStateSnapshot) {
        // const currentUser = this.authService.currentUserValue;
        const currentUser = localStorage.getItem('secretKey');
        if (currentUser) {
            // logged in so return true
            return true;
            if (state.url && state.url === '/dashboard') {
                return true;
            }
            // if (state.url && (!currentUser.usermatrix || !this.checkUserMatrix(currentUser.usermatrix, state.url))) {
            //     this.router.navigateByUrl('error/error-5');
            //     return true;
            // }
            return true;
        }
        // not logged in so redirect to login page with the return url
        this.authService.logout();
        return false;
    }

    // checkUserMatrix(userMatrix: UserMatrix[], url: string) {
    //     let rolesValid = false;
    //     userMatrix.forEach(t => {
    //         if (t.function_id === url) {
    //             rolesValid = true;
    //         }
    //     });
    //     return rolesValid;
    // }
}
