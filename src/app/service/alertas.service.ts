import { Injectable } from '@angular/core';
import { BsModalRef, BsModalService } from 'ngx-bootstrap/modal';
import { AlertasComponent } from '../alertas/alertas.component';

@Injectable({
  providedIn: 'root'
})
export class AlertasService {

  constructor(
    private bsModalService: BsModalService
  ) { }

  private showAlert(message: string, type: string) {
    const bsModalRef: BsModalRef = this.bsModalService.show(AlertasComponent)
    bsModalRef.content.type = type
    bsModalRef.content.message = message
  }

  showAlertDanger(msg: string) {
    this.showAlert(msg, 'danger')
  }

  showAlertSuccess(msg: string) {
    this.showAlert(msg, 'successs')
  }

  showAlertInfo(msg: string) {
    this.showAlert(msg, 'info')
  }
}
