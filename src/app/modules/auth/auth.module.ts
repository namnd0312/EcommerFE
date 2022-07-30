import {NgModule} from '@angular/core';
import {CommonModule} from '@angular/common';
import {FormsModule, ReactiveFormsModule} from '@angular/forms';
import {HttpClientModule} from '@angular/common/http';
import {AuthRoutingModule} from './auth-routing.module';
import {LoginComponent} from './login/login.component';
import {LogoutComponent} from './logout/logout.component';
import {AuthComponent} from './auth.component';
import {TranslationModule} from '../i18n/translation.module';

@NgModule({
    declarations: [
        LoginComponent,
        LogoutComponent,
        AuthComponent,
    ],
    imports: [
        CommonModule,
        TranslationModule,
        AuthRoutingModule,
        FormsModule,
        ReactiveFormsModule,
        HttpClientModule,
    ]
})
export class AuthModule {
}
