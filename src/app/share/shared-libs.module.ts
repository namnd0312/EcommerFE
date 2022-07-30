import {CommonModule} from '@angular/common';
import {NgbButtonsModule, NgbModule, NgbPaginationModule} from '@ng-bootstrap/ng-bootstrap';
import {NgModule} from '@angular/core';
import {MatTableModule} from '@angular/material/table';
import {MatPaginatorModule} from '@angular/material/paginator';
import {TranslationModule} from '../modules/i18n/translation.module';
import {FormsModule, ReactiveFormsModule} from '@angular/forms';
import {NgSelectModule} from '@ng-select/ng-select';
import {MatDatepickerModule} from '@angular/material/datepicker';
import {MatCheckboxModule} from '@angular/material/checkbox';

@NgModule({
    exports: [
        CommonModule,
        MatTableModule,
        NgbButtonsModule,
        MatPaginatorModule,
        MatDatepickerModule,
        MatCheckboxModule,
        TranslationModule,
        ReactiveFormsModule,
        NgbPaginationModule,
        NgbModule,
        FormsModule,
        NgSelectModule
    ]
})
export class SharedLibsModule {
}
