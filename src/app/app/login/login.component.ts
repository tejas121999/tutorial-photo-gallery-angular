import { Component, OnInit } from "@angular/core";
import { Router } from "@angular/router";
import { FormGroup, FormControl, Validators } from "@angular/forms";
import { AppPreference } from "../../shared/app-preference";
import { ApiServiceService } from "../../services/api-service.service";
import { HttpClientModule } from "@angular/common/http";

@Component({
  selector: "app-login",
  templateUrl: "./login.component.html",
  styleUrls: ["./login.component.scss"],
})
export class LoginComponent implements OnInit {
  loginForm: FormGroup;
  showPassword: boolean = false;

  constructor(
    private router: Router,
    private appPreference: AppPreference,
    private apiService: ApiServiceService
  ) {
    this.loginForm = new FormGroup({
      user_name: new FormControl("", [Validators.required]),
      user_password: new FormControl("", [
        Validators.required,
        Validators.minLength(6),
      ]),
    });
  }

  ngOnInit() {}

  toggleShowPassword() {
    this.showPassword = !this.showPassword;
  }

  async onLogin() {
    if (this.loginForm.valid) {
      var temp = [
        {
          user_name: this.loginForm.get("user_name")?.value,
          user_password: this.loginForm.get("user_password")?.value,
          user_desk_url: "temp",
        },
      ];
      this.apiService.userLogin(temp).subscribe(
        async (response: any) => {
          console.log("Login successful, response?._LoginToken", response);
          // Store the authorization token from response
          if (response && response?._AuthoriseToken) {
            localStorage.setItem("ACCESS_TOKEN", response._AuthoriseToken);
            await this.appPreference.set("_LoginToken", response?._LoginToken);
            await this.appPreference.set(
              "ACCESS_TOKEN",
              response._AuthoriseToken
            );

            var _BranchList: any[] = [];
            response._BranchList.forEach((element: any) => {
              _BranchList.push({
                branch_code: element.branch_code,
                branch_name: element.branch_name,
                branch_token_id: element.branch_token_id,
              });
            });
            await this.appPreference.set("_BranchList", _BranchList);
            this.router.navigate(["/dashboard"]);
            await this.appPreference.presentToast(
              "Login Successfully!",
              2000,
              "bottom",
              "success"
            );
          } else {
            await this.appPreference.presentToast(
              response?._Message,
              2000,
              "bottom",
              "danger"
            );
          }
        },
        (error) => {
          console.error("Login failed", error);
          this.appPreference.presentToast(
            "Login failed. Please try again.",
            2000,
            "bottom",
            "danger"
          );
        }
      );
    } else {
      this.appPreference.presentToast(
        "Please fill in all required fields correctly.",
        2000,
        "bottom",
        "danger"
      );
    }
  }

  // Getter methods for easy access to form controls
  get user_name() {
    return this.loginForm.get("user_name");
  }
  get user_password() {
    return this.loginForm.get("user_password");
  }
}
