import { Component, OnInit } from '@angular/core';
import { SwitchService } from 'src/app/servicios/switch.service';

@Component({
  selector: 'app-modal-login',
  templateUrl: './modal-login.component.html',
  styleUrls: ['./modal-login.component.css']
})
export class ModalLoginComponent implements OnInit {

  constructor(private modalSS:SwitchService) { }

  ngOnInit(): void {
  }

  cierraModal(){
    this.modalSS.$modal.emit(false);
  }

}
