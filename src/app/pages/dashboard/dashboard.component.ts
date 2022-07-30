import {Component, OnInit} from '@angular/core';
import {CommonService} from '../../share/common.service';

@Component({
    selector: 'app-dashboard',
    templateUrl: './dashboard.component.html',
    styleUrls: ['./dashboard.component.scss']
})
export class DashboardComponent implements OnInit {

    constructor(
        private commonService: CommonService
    ) {
    }

    ngOnInit(): void {
        this.commonService.group$.subscribe(res => {
            if (res) {
                console.log('>>>>> group is:', res);
            }
        });
    }

    // initGroup(): void {
    //     this.commonService.initGroup()
    //         .subscribe(res => {
    //             this.commonService.group$.next(res);
    //         });
    // }

}
