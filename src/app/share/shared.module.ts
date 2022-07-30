import {NgModule} from '@angular/core';
import {SharedLibsModule} from './shared-libs.module';
import {ModalAskComponent} from './components/modal-ask/modal-ask.component';
import {DateAdapter, MAT_DATE_FORMATS, MAT_DATE_LOCALE} from '@angular/material/core';
import {APP_DATE_FORMATS, AppDateAdapter} from './utils/format-datepicker';


@NgModule({
    imports: [
        SharedLibsModule
    ],
    declarations: [
        ModalAskComponent
    ],
    exports: [
        SharedLibsModule
    ],
    entryComponents: [
        ModalAskComponent
    ],
    providers: [
        {provide: DateAdapter, useClass: AppDateAdapter},
        {provide: MAT_DATE_FORMATS, useValue: APP_DATE_FORMATS},
        {provide: MAT_DATE_LOCALE, useValue: 'vi-VN'},
    ],
})
export class SharedModule {

}
