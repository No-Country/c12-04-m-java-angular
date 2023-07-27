import { Component, OnInit, Inject } from '@angular/core';
import {MatDialog, MAT_DIALOG_DATA, MatDialogRef, MatDialogModule} from '@angular/material/dialog';
import { MatSnackBar } from "@angular/material/snack-bar";
import { NotificationService } from "./../../services/notification.service";
import { FormControl, FormGroup } from '@angular/forms';

@Component({
  selector: 'app-mensaje-confirmacion',
  templateUrl: './mensaje-confirmacion.component.html',
  styleUrls: ['./mensaje-confirmacion.component.css'],
  standalone: true,
  imports: [MatDialogModule],  
})
export class MensajeConfirmacionComponent implements OnInit {
  mensaje: string;
  btn = 'aceptar';
  constructor(
      public notificationService: NotificationService,
      private _snackBar: MatSnackBar,
      public dialogRef: MatDialogRef<MensajeConfirmacionComponent>,
      @Inject(MAT_DIALOG_DATA) public data: any
    ) { 
        this.mensaje = data.mensaje;
        console.log('mensaje', this.mensaje);
      }

  ngOnInit(): void {
  }

  onNoClick(): void {
    this.dialogRef.close();
  }

  showConfirm() {
    this.notificationService.confirmation("Esta tarea sera eliminada, ", () => {
      this.notificationService.success("Tarea sera eliminada");
    },
    'Esta Ud seguro?',
     () => {
      this.notificationService.error("Transacion cancelada");
    });
  }
}
