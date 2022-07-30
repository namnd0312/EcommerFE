import {Component, Input, ViewEncapsulation} from '@angular/core';
import {NgbActiveModal} from '@ng-bootstrap/ng-bootstrap';

@Component({
    selector: 'modal-ask',
    templateUrl: './modal-ask.component.html',
    styleUrls: ['./modal-common.scss'],
    encapsulation: ViewEncapsulation.None
})
export class ModalAskComponent {
    @Input() content;
    @Input() title;

    constructor(public activeModal: NgbActiveModal) {
    }
}
