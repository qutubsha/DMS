import { Component, Input, Output, EventEmitter, ViewChild } from '@angular/core';
import { ModalComponent } from 'ng2-bs3-modal/ng2-bs3-modal';

@Component({
    selector: 'ai-modal',
    templateUrl: './modal.component.html',
})
export class CommonModalComponent {
    @Input() modalTitle: string;
    @Input() modalContent: string;
    @Input() showCancel: boolean;
    @Output() modalClicked: EventEmitter<string> = new EventEmitter<string>();
    // Event emitter used to emit the click event of OK button, will call the implemented click event of the child component
    onClick(): void {
        this.modalClicked.emit();
    }

    @ViewChild('modal')
    modal: ModalComponent;
    open() {
        //$("body").removeClass("widescreen");
        this.modal.open();
    }

    close() {
        //$("body").addClass("widescreen");
    }
}