import {Component, OnInit} from '@angular/core';
import {FormBuilder, FormControl, FormGroup} from "@angular/forms";
import {formatDateToString} from "../../share/utils/format-datepicker";
import {DATE_FORMAT_DDMMYYYY} from "../../share/constants/input.constants";
import {BehaviorSubject} from "rxjs";
import {MockData} from "./mock-data";
import {ToastrService} from "ngx-toastr";
import {Way4Card} from "./roles-management.model";

@Component({
    selector: 'roles-management',
    templateUrl: './roles-management.component.html',
    styleUrls: []
})
export class RolesManagementComponent implements OnInit {

    searchForm: FormGroup;
    cardStatusLst: any[] = [
        {type: '1', desc: 'Tạo mới'},
        {type: '2a', desc: 'VHT chuyển phát trực tiếp tới KH'},
        {type: '2b', desc: 'VHT bàn giao trực tiếp cho ĐVKD'},
        {type: '2c', desc: 'VHT trả về ĐVKD'},
        {type: '2d', desc: 'VHT hủy thẻ'},
        {type: '3', desc: 'ĐVKD đã nhận thẻ'},
        {type: '4', desc: 'Đã giao thẻ cho KH'},
        {type: '5', desc: 'Thẻ đã kích hoạt'},
        {type: '6', desc: 'Thẻ đóng do KH không kích hoạt trong 90D'},
        {type: '7', desc: 'Thẻ đóng'},
        {type: '8', desc: 'Thẻ đã hủy vật lý'}
    ]
    typeList: string[] = [
        'Phát hành thẻ mới',
        'Gia hạn thẻ cho thẻ hết hạn hoặc chưa hết hạn',
        'Gia hạn thẻ vật lý cho thẻ hết hạn hoặc chưa hết hạn',
        ' Phát hành lại thẻ do mất thẻ',
        'Phát hành lại thẻ do các lý do ko phải mất thẻ',
        'Phát hành lại thẻ vật lý'
    ]
    way4CardList: Way4Card[] = [];
    listCardsChecked: BehaviorSubject<Way4Card[]> = new BehaviorSubject<Way4Card[]>([]);
    checkAllValid: boolean = true;

    constructor(
        private fb: FormBuilder,
        private toastService: ToastrService
    ) {
    }

    ngOnInit(): void {
        this.initForm();
        this.getListCardOnWay4();
    }

    initForm() {
        this.searchForm = this.fb.group({
            roleName: new FormControl(),
            roleId: new FormControl()
        });
    }

    onSearch() {
        let data = this.searchForm.value;
        console.log(data);
    }

    getListCardOnWay4() {
        this.way4CardList = MockData.way4_list;
        if (this.way4CardList.length > 0) {
            let status = this.way4CardList[0].status;
            this.way4CardList.forEach(t => {
                if (t.status !== status) {
                    this.checkAllValid = false;
                }
            });
        }
    }

    checkAllItems(_events: any) {
        if (this.way4CardList.length === 0) {
            return;
        }
        if (!this.checkAllValid && _events.checked) {
            this.toastService.warning('Các bạn ghi không cùng trạng thái');
            return;
        }
        this.way4CardList.forEach(t => {
            t.checked = _events.checked;
        });
        if (_events.checked) {
            this.listCardsChecked.next(this.way4CardList);
        } else {
            this.listCardsChecked.next([]);
        }
    }

    checkItems(_events: any, data: Way4Card) {
        this.way4CardList.forEach(t => {
            if (t.cardNumber === data.cardNumber) {
                t.checked = _events.checked;
            }
        });
        let dataCheck = this.listCardsChecked.getValue();
        if (_events.checked && dataCheck.length > 0 && data.status !== dataCheck[0].status) {
            this.toastService.warning('Bản ghi không cùng trạng thái');
            this.way4CardList.forEach(t => {
                if (t.cardNumber === data.cardNumber) {
                    t.checked = false;
                }
            });
            return;
        }
        let itemsCheck = this.listCardsChecked.getValue();
        if (_events.checked) {
            itemsCheck.push(data);
        } else {
            itemsCheck = itemsCheck.filter(t => {
                return t.cardNumber !== data.cardNumber;
            });
        }
        this.listCardsChecked.next(itemsCheck === null ? [] : itemsCheck);
    }
}
