import { Component, OnInit, Inject } from '@angular/core';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { ServerService } from 'src/app/server.service';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';


export interface UserId {
  userId: number;
}
@Component({
  selector: 'app-editprofile',
  templateUrl: './editprofile.component.html',
  styleUrls: ['./editprofile.component.scss']
})
export class EditprofileComponent implements OnInit {

  constructor(
    public dialogRef: MatDialogRef<EditprofileComponent>,
    private server: ServerService,
    private formBuilder: FormBuilder,
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
        this.form.value
      );
      submittedData.subscribe(responseData => {
        console.log('Call is done and data is updated');
        console.log(responseData);
        this.form.patchValue(responseData);
      });
    }
  }

}
