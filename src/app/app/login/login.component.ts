import { Component, OnInit } from "@angular/core";
import { Router } from "@angular/router";
import { AppPreference } from "../../shared/app-preference";
import { ApiServiceService } from "../../services/api-service.service";
import { HttpClientModule } from '@angular/common/http';

@Component({
  selector: "app-login",
  templateUrl: "./login.component.html",
  styleUrls: ["./login.component.scss"],
})
export class LoginComponent implements OnInit {
  email: string = "";
  password: string = "";
  showPassword: boolean = false;

  constructor(
    private router: Router,
    private appPreference: AppPreference,
    private apiService: ApiServiceService
  ) {}

  ngOnInit() {}

  toggleShowPassword() {
    this.showPassword = !this.showPassword;
  }

  async onLogin() {
    // Store email and password
    // await this.appPreference.set("email", this.email);
    // await this.appPreference.set("password", this.password);

    // var temp = [
    //   {
    //     user_name: this.email,
    //     user_password: this.password,
    //     user_desk_url: "temp",
    //   },
    // ];
    // this.apiService.userLogin(temp).subscribe(
    //   async (response) => {
    //     console.log("Login successful", response);
    //     // Handle successful login, e.g., navigate to dashboard
    //     // this.router.navigate(["/dashboard"]);
    //     await this.appPreference.presentToast("Login Successfully!");
    //   },
    //   (error) => {
    //     console.error("Login failed", error);
    //     // Handle login failure, e.g., show error message
    //     this.appPreference.presentToast("Login failed. Please try again.");
    //   }
    // );
    
    this.router.navigate(["/dashboard"]);
  }
}

