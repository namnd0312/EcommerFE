import {Injectable} from '@angular/core';
import {BehaviorSubject, Observable, of} from 'rxjs';
import {delay} from 'rxjs/operators';

@Injectable({
    providedIn: 'root'
})
export class CommonService {

    group$: BehaviorSubject<string> = new BehaviorSubject<string>(null);

    constructor() {
    }

    initGroup(): Observable<any> {
        return of(Math.random()).pipe(delay(2000));
    }
}
