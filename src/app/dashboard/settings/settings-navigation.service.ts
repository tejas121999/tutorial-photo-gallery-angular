import { Injectable } from '@angular/core';
import { Router } from '@angular/router';

@Injectable({
  providedIn: 'root'
})
export class SettingsNavigationService {

  constructor(private router: Router) { }

  navigateToHome() {
    this.router.navigate(['/dashboard/home'], { 
      skipLocationChange: false,
      replaceUrl: false
    });
  }

  navigateToReport() {
    this.router.navigate(['/dashboard/report'], { 
      skipLocationChange: false,
      replaceUrl: false
    });
  }

  navigateToAddEntry() {
    this.router.navigate(['/dashboard/add-entry'], { 
      skipLocationChange: false,
      replaceUrl: false
    });
  }

  navigateToStock() {
    this.router.navigate(['/dashboard/stock'], { 
      skipLocationChange: false,
      replaceUrl: false
    });
  }

  navigateToSettings() {
    this.router.navigate(['/dashboard/settings'], { 
      skipLocationChange: false,
      replaceUrl: false
    });
  }

  navigateToSetPin() {
    this.router.navigate(['/dashboard/settings/set-pin'], { 
      skipLocationChange: false,
      replaceUrl: false
    });
  }

  navigateToProfile() {
    this.router.navigate(['/dashboard/settings/profile'], { 
      skipLocationChange: false,
      replaceUrl: false
    });
  }

  navigateToAboutUs() {
    this.router.navigate(['/dashboard/settings/about-us'], { 
      skipLocationChange: false,
      replaceUrl: false
    });
  }

  navigateToHelpAndSupport() {
    this.router.navigate(['/dashboard/settings/help-and-support'], { 
      skipLocationChange: false,
      replaceUrl: false
    });
  }

  navigateBackToSettings() {
    this.router.navigate(['/dashboard/settings'], { 
      skipLocationChange: false,
      replaceUrl: false
    });
  }

  // Force refresh navigation - navigate to a different route first, then to target
  navigateToHomeWithRefresh() {
    this.router.navigate(['/dashboard/settings'], { 
      skipLocationChange: false,
      replaceUrl: false
    }).then(() => {
      setTimeout(() => {
        this.router.navigate(['/dashboard/home'], { 
          skipLocationChange: false,
          replaceUrl: false
        });
      }, 100);
    });
  }

  navigateToReportWithRefresh() {
    this.router.navigate(['/dashboard/settings'], { 
      skipLocationChange: false,
      replaceUrl: false
    }).then(() => {
      setTimeout(() => {
        this.router.navigate(['/dashboard/report'], { 
          skipLocationChange: false,
          replaceUrl: false
        });
      }, 100);
    });
  }

  navigateToAddEntryWithRefresh() {
    this.router.navigate(['/dashboard/settings'], { 
      skipLocationChange: false,
      replaceUrl: false
    }).then(() => {
      setTimeout(() => {
        this.router.navigate(['/dashboard/add-entry'], { 
          skipLocationChange: false,
          replaceUrl: false
        });
      }, 100);
    });
  }
} 