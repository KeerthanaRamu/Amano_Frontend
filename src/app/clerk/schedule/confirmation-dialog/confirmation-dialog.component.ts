import { Component, Inject } from '@angular/core';
import { MAT_DIALOG_DATA, MatDialogRef,MatDialog } from '@angular/material/dialog';

@Component({
  selector: 'app-confirmation-dialog',
  templateUrl: './confirmation-dialog.component.html',
  styleUrls: ['./confirmation-dialog.component.sass']
})
export class ConfirmationDialogComponent {

  message: string = ""
  confirmButtonText = ""
  cancelButtonText = ""
  btnColor="primary";
  dynamicMsg=''
  constructor(
    @Inject(MAT_DIALOG_DATA) private data: any,
    private dialogRef: MatDialogRef<ConfirmationDialogComponent>) {
      if(data){
        this.message = data.message || this.message;
        this.btnColor = data.btnColor || this.btnColor;
        this.dynamicMsg=data.dynamicMsg || '';
        if (data.buttonText) {
          this.confirmButtonText = data.buttonText.ok || this.confirmButtonText;
          this.cancelButtonText = data.buttonText.cancel || this.cancelButtonText;
        }
      }
  }

  onConfirmClick(): void {
    this.dialogRef.close(true);
  }

  onClose(): void {
    this.dialogRef.close(true);
  }

}
