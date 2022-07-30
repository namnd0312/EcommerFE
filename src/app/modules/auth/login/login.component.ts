import {Component, OnDestroy, OnInit} from '@angular/core';
import {FormBuilder, FormGroup, Validators} from '@angular/forms';
import {BehaviorSubject, Observable, Subscription} from 'rxjs';
import {AuthService} from '../_services/auth.service';
import {ActivatedRoute, Router} from '@angular/router';
import {HttpClient, HttpHeaders} from "@angular/common/http";
import {finalize} from "rxjs/operators";

@Component({
    selector: 'app-login',
    templateUrl: './login.component.html',
    styleUrls: ['./login.component.scss'],
})
export class LoginComponent implements OnInit, OnDestroy {
    defaultAuth: any = {
        username: 'namnd',
        password: '123456',
    };
    loginForm: FormGroup;
    hasError: boolean;
    returnUrl: string;
    isLoading$: BehaviorSubject<boolean> = new BehaviorSubject(false);

    // private fields
    private unsubscribe: Subscription[] = []; // Read more: => https://brianflove.com/2016/12/11/anguar-2-unsubscribe-observables/

    constructor(
        private fb: FormBuilder,
        private authService: AuthService,
        private route: ActivatedRoute,
        private router: Router,
        private http: HttpClient
    ) {
        this.isLoading$ = this.authService.isLoading$;
        // redirect to home if already logged in
        // if (this.authService.currentUserValue) {
        //     this.router.navigate(['/']);
        // }
    }

    ngOnInit(): void {
        this.initForm();
        // get return url from route parameters or default to '/'
        this.returnUrl =
            this.route.snapshot.queryParams['returnUrl'.toString()] || '/';
    }

    // convenience getter for easy access to form fields
    get f() {
        return this.loginForm.controls;
    }

    initForm() {
        this.loginForm = this.fb.group({
            username: [
                this.defaultAuth.username,
                Validators.compose([
                    Validators.required,
                    Validators.minLength(3),
                    Validators.maxLength(320),
                ]),
            ],
            password: [
                this.defaultAuth.password,
                Validators.compose([
                    Validators.required,
                    Validators.minLength(3),
                    Validators.maxLength(100),
                ]),
            ],
        });
    }

    submit() {
        this.hasError = false;
        const res = this.authService.login(this.f.username.value, this.f.password.value)
            .pipe(finalize(() => this.isLoading$.next(false)))
            .subscribe(user=> {
                console.log("response login ------------>", user)
                if (user) {
                    this.setAuthToLocalStorage(user);
                    this.router.navigate(['/dashboard']);

                } else {
                    this.hasError = true;
                }
            });

        this.unsubscribe.push(res);
    }

    setAuthToLocalStorage(auth: any): boolean {
        if (auth && auth.token) {
            localStorage.setItem('secretKey', auth.token);
            // localStorage.setItem(this.authLocalStorageToken, JSON.stringify(auth));
            // this.currentUserSubject.next(auth.username);
            return true;
        }
        return false;
    }

    ngOnDestroy() {
        this.unsubscribe.forEach((sb) => sb.unsubscribe());
    }
}
