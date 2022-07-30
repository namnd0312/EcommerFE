import {NgModule} from '@angular/core';
import {BrowserModule} from '@angular/platform-browser';
import {BrowserAnimationsModule} from '@angular/platform-browser/animations';
import {HTTP_INTERCEPTORS, HttpClientModule} from '@angular/common/http';
import {ClipboardModule} from 'ngx-clipboard';
import {TranslateModule} from '@ngx-translate/core';
import {InlineSVGModule} from 'ng-inline-svg';
import {NgbModule} from '@ng-bootstrap/ng-bootstrap';
import {AppRoutingModule} from './app-routing.module';
import {AppComponent} from './app.component';
// Highlight JS
import {HIGHLIGHT_OPTIONS, HighlightModule} from 'ngx-highlightjs';
import xml from 'highlight.js/lib/languages/xml';
import json from 'highlight.js/lib/languages/json';
import scss from 'highlight.js/lib/languages/scss';
import typescript from 'highlight.js/lib/languages/typescript';
import {SplashScreenModule} from './_metronic/partials/layout/splash-screen/splash-screen.module';
import {SharedModule} from './share/shared.module';
import {ToastrModule} from 'ngx-toastr';
import {AuthInterceptor} from './modules/auth/_services/auth.interceptor';


/**
 * Import specific languages to avoid importing everything
 * The following will lazy load highlight.js core script (~9.6KB) + the selected languages bundle (each lang. ~1kb)
 */
export function getHighlightLanguages() {
    return [
        {name: 'typescript', func: typescript},
        {name: 'scss', func: scss},
        {name: 'xml', func: xml},
        {name: 'json', func: json},
    ];
}

@NgModule({
    declarations: [AppComponent],
    imports: [
        BrowserModule,
        BrowserAnimationsModule,
        SplashScreenModule,
        TranslateModule.forRoot(),
        HttpClientModule,
        HighlightModule,
        ClipboardModule,
        AppRoutingModule,
        InlineSVGModule.forRoot(),
        NgbModule,
        SharedModule,
        ToastrModule.forRoot({
            timeOut: 10000,
            positionClass: 'toast-top-center',
            progressBar: true,
            preventDuplicates: true,
            countDuplicates: true,
            resetTimeoutOnDuplicate: true
        }),
    ],
    providers: [
        {
            provide: HTTP_INTERCEPTORS,
            useClass: AuthInterceptor,
            multi: true
        },
        {
            provide: HIGHLIGHT_OPTIONS,
            useValue: {
                languages: getHighlightLanguages,
            },
        },
    ],
    bootstrap: [AppComponent],
})
export class AppModule {
}
