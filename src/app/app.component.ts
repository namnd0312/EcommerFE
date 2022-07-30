import {ChangeDetectionStrategy, Component, OnDestroy, OnInit,} from '@angular/core';
import {TranslationService} from './modules/i18n/translation.service';
import {SplashScreenService} from './_metronic/partials/layout/splash-screen/splash-screen.service';
import {NavigationEnd, Router} from '@angular/router';
import {Subscription} from 'rxjs';

// language list
import {locale as enLang} from "./modules/i18n/vocabs/en";
import {locale as vnLang} from "./modules/i18n/vocabs/vn";
import {locale as way4CardEnLang} from "./modules/i18n/way4-card/en";
import {locale as way4CardVnLang} from "./modules/i18n/way4-card/vn";

@Component({
    selector: 'body[root]',
    templateUrl: './app.component.html',
    styleUrls: ['./app.component.scss'],
    changeDetection: ChangeDetectionStrategy.OnPush,
})
export class AppComponent implements OnInit, OnDestroy {
    private unsubscribe: Subscription[] = []; // Read more: => https://brianflove.com/2016/12/11/anguar-2-unsubscribe-observables/

    constructor(
        private translationService: TranslationService,
        private splashScreenService: SplashScreenService,
        private router: Router
    ) {
        // register translations
        this.translationService.loadTranslations(
            enLang,
            vnLang,
            way4CardEnLang,
            way4CardVnLang
        );
    }

    ngOnInit() {
        const routerSubscription = this.router.events.subscribe((event) => {
            if (event instanceof NavigationEnd) {
                // hide splash screen
                this.splashScreenService.hide();

                // scroll to top on every route change
                window.scrollTo(0, 0);

                // to display back the body content
                setTimeout(() => {
                    document.body.classList.add('page-loaded');
                }, 500);
            }
        });
        this.unsubscribe.push(routerSubscription);
    }

    ngOnDestroy() {
        this.unsubscribe.forEach((sb) => sb.unsubscribe());
    }
}
