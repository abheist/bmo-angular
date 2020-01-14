import { Component, OnInit } from '@angular/core';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { ServerService } from '../server.service';

@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.scss']
})

export class RegisterComponent implements OnInit {
  form: FormGroup;

  constructor(
    private fb: FormBuilder,
    private server: ServerService,
    private router: Router
  ) { }

  ngOnInit() {
    this.form = this.fb.group({
      email: ['', Validators.email],
      name: ['', Validators.required],
      password: ['', Validators.compose([Validators.required, Validators.minLength(8)])]
    });
  }

  onSubmit() {
    if (!this.form.valid) {
      return;
    }
    const request = this.server.request('POST', '/api/v1/rest-auth/registration/', {
      username: this.form.get('name').value,
      email: this.form.get('email').value,
      password1: this.form.get('password').value,
      password2: this.form.get('password').value
    });

    request.subscribe(() => {
      this.router.navigate(['/login']);
    });
  }
}
