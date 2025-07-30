import { Component, OnInit } from '@angular/core';
import { AppPreference } from '../../shared/app-preference';
@Component({
  selector: 'app-dashboard-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.scss']
})
export class HomeComponent implements OnInit {
  email: string = '';
  password: string = '';

  constructor(private appPreference: AppPreference) {}

  async ngOnInit() {
    this.email = await this.appPreference.get('email') || '';
    this.password = await this.appPreference.get('password') || '';
  }
}
