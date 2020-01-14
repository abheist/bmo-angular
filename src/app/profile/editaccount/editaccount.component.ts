import { Component, OnInit, Inject } from '@angular/core';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { ServerService } from 'src/app/server.service';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { MatSnackBar } from '@angular/material';


export interface UserId {
  userId: number;
}
@Component({
  selector: 'app-editaccount',
  templateUrl: './editaccount.component.html',
  styleUrls: ['./editaccount.component.scss']
})
export class EditaccountComponent implements OnInit {

  constructor(
    public dialogRef: MatDialogRef<EditaccountComponent>,
    private server: ServerService,
    private formBuilder: FormBuilder,
    private snackBar: MatSnackBar,
    @Inject(MAT_DIALOG_DATA) public userId: UserId
  ) { }

  data: any;
  form: FormGroup;

  ngOnInit() {
    this.form = this.formBuilder.group({
      first_name: ['', Validators.required],
      last_name: ['', Validators.required],
      username: ['', Validators.required],
      email: ['', Validators.required],
    });
    this.server.request(
      'GET',
      `/api/v1/user/${this.userId.userId}/`
    ).subscribe((data: any) => {
      this.form.patchValue(data);
      this.data = data;
    });
  }

  onNoClick(): void {
    this.dialogRef.close();
  }

  onSubmit() {
    const data = {
      ...this.data,
      ...this.form.value
    };
    if (this.form.valid) {
      const submittedData = this.server.request(
        'PUT',
        `/api/v1/user/${this.userId.userId}/`,
        data
      );
      submittedData.subscribe(responseData => {
        this.form.patchValue(responseData);
        this.dialogRef.close();
        this.snackBar.open('Successfully updated', '', {
          duration: 2000,
        });
      });
    }
  }

}
