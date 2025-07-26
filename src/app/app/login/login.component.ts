import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss'],
})
export class LoginComponent implements OnInit {
  email: string = '';
  password: string = '';
  showPassword: boolean = false;

  constructor(private router: Router) { }

  ngOnInit() {}

  toggleShowPassword() {
    this.showPassword = !this.showPassword;
  }

  onLogin() {
    // Add your login logic here
    this.router.navigate(['/dashboard']);
  }
}
