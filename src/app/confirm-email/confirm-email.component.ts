import { Component, OnInit } from '@angular/core';
import { ServerService } from '../server.service';
import { ActivatedRoute } from '@angular/router';

@Component({
  selector: 'app-confirm-email',
  templateUrl: './confirm-email.component.html',
  styleUrls: ['./confirm-email.component.scss']
})
export class ConfirmEmailComponent implements OnInit {

  constructor(private server: ServerService, private route: ActivatedRoute) { }

  ngOnInit() {
    this.server.request('GET', '/api/v1/verify-email/' + this.route.snapshot.params.id + '/')
      .subscribe((response: any) => { });
  }
}
