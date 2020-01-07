import { Component, OnInit, Inject } from '@angular/core';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { ServerService } from 'src/app/server.service';


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
    @Inject(MAT_DIALOG_DATA) public userId: UserId
  ) { }

  data: any;

  ngOnInit() {
    this.server.request(
      'GET',
      `/api/v1/user/${this.userId.userId}/`
    ).subscribe((data: any) => {
      this.data = data;
    });
  }

  onNoClick(): void {
    this.dialogRef.close();
  }

}
