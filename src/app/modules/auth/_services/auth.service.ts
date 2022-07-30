import {Injectable, OnDestroy} from '@angular/core';
import {HttpClient, HttpHeaders} from '@angular/common/http';
import {BehaviorSubject, Observable} from 'rxjs';
import {environment} from '../../../../environments/environment';
import {Router} from '@angular/router';

const httpOptions = {
    headers: new HttpHeaders({ 'Content-Type': 'application/json', 'No-Auth': 'True'  })
};

@Injectable({
    providedIn: 'root'
})


export class AuthService implements OnDestroy {

    authLocalStorageToken = `${environment.appVersion}-${environment.USERDATA_KEY}`;
    authUrl = environment.baseUrl;
    isLoading$: BehaviorSubject<boolean> = new BehaviorSubject<boolean>(false);
    currentUserSubject: BehaviorSubject<any> = new BehaviorSubject<any>(null);
    permissions: any[] = [];


    constructor(
        private http: HttpClient,
        private router: Router
    ) {
        this.init();
    }

    init(): void {
        const auth = JSON.parse(localStorage.getItem(this.authLocalStorageToken));
        if (auth) {
            this.currentUserSubject.next(auth.username);
        }
    }

    login(username: string, password: string): Observable<any> {
        return  this.http.post(`${this.authUrl + '/auth/login'}`, {
            username: username, password: password
        },  httpOptions) ;
    }



    setAuthToLocalStorage(auth: any): boolean {
        if (auth && auth.jwt) {
            localStorage.setItem('secretKey', auth.secretKey);
            localStorage.setItem(this.authLocalStorageToken, JSON.stringify(auth));
            this.currentUserSubject.next(auth.username);
            return true;
        }
        return false;
    }

    getAuthFromLocalStorage() {
        try {
            return JSON.parse(localStorage.getItem(this.authLocalStorageToken));
        } catch (error) {
            console.error(error);
            return undefined;
        }
    }

    logout(): void {
        localStorage.removeItem(this.authLocalStorageToken);
        localStorage.removeItem('secretKey');
        this.router.navigate(['/auth/login']);
    }

    ngOnDestroy() {
    }
}
