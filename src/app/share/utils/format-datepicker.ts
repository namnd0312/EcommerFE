import {MatDateFormats, NativeDateAdapter} from "@angular/material/core";
import * as moment from 'moment'

export class AppDateAdapter extends NativeDateAdapter {
    format(date: Date, displayFormat: Object): string {
        if (displayFormat === 'input') {
            let day: string = date.getDate().toString();
            day = +day < 10 ? '0' + day : day;
            let month: string = (date.getMonth() + 1).toString();
            month = +month < 10 ? '0' + month : month;
            let year = date.getFullYear();
            return `${day}/${month}/${year}`;
        } else if (displayFormat === 'header') {
            let day: string = date.getDate().toString();
            day = +day < 10 ? '0' + day : day;
            let month: string = (date.getMonth() + 1).toString();
            month = +month < 10 ? '0' + month : month;
            let year = date.getFullYear();
            return `${day}-${month}-${year}`;
        }
        return date.toDateString();
    }
}

export const APP_DATE_FORMATS: MatDateFormats = {
    parse: {
        dateInput: {month: 'numeric', year: 'numeric', day: 'numeric'},
    },
    display: {
        dateInput: 'input',
        monthYearLabel: 'header',
        dateA11yLabel: {year: 'numeric', month: 'numeric', day: 'numeric'},
        monthYearA11yLabel: {year: 'numeric', month: 'numeric'},
    }
};


export function formatDateToString(date: any, format: string): string {
    if (!date) {
        return null;
    }
    return moment(date).format(format);
}
