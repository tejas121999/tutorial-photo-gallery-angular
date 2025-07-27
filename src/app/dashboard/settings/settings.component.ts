import { Component } from '@angular/core';
import { Router } from '@angular/router';

@Component({
  selector: 'app-settings',
  templateUrl: './settings.component.html',
  styleUrls: ['./settings.component.scss']
})
export class SettingsComponent {
  constructor(private router: Router) {}

  isChildRouteActive(): boolean {
    // Checks if the current route is exactly /dashboard/settings
    // If not, a child route is active
    return this.router.url !== '/dashboard/settings';
  }
}
