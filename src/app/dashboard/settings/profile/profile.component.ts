import { Component } from "@angular/core";
import { FormBuilder, FormGroup } from "@angular/forms";
import { ActivatedRoute } from "@angular/router";
import { Camera, CameraResultType, CameraSource } from "@capacitor/camera";
import { AppPreference } from "src/app/shared/app-preference";
import { SettingsNavigationService } from "../settings-navigation.service";

@Component({
  selector: "app-profile",
  templateUrl: "./profile.component.html",
  styleUrls: ["./profile.component.scss"],
})
export class ProfileComponent {
  avatarUrl: string | undefined;
  profileForm: FormGroup;
  user_details: any;

  constructor(
    private fb: FormBuilder,
    private appPreference: AppPreference,
    private route: ActivatedRoute,
    private settingsNavigation: SettingsNavigationService
  ) {
    this.initializeData();
  }

  async ngOnInit() {
    this.route.queryParams.subscribe(async () => {
      this.user_details = await this.appPreference.get("_UserDetail");
      console.log(
        "Profile component initialized profile",
        this.user_details.user_email
      );
      this.patchData();
      // await this.getPhoto();
    });
  }

  async initializeData() {
    this.profileForm = this.fb.group({
      name: [""],
      e_mail: [""],
      phone_number: [""],
      postal_code: [""],
    });
  }

  patchData() {
    this.profileForm.patchValue({
      name: this.user_details.user_name,
      e_mail: this.user_details.user_email,
    });
  }

  async openGallery() {
    const image = await Camera.getPhoto({
      quality: 90,
      allowEditing: false,
      resultType: CameraResultType.DataUrl,
      source: CameraSource.Photos, // Use .Photos for gallery
    });

    this.avatarUrl = image.dataUrl; // Update the avatar image
  }

  updateProfile() {
    // Logic to update profile will go here
    console.log("Profile update clicked");
  }

  navigateToHome() {
    this.settingsNavigation.navigateToHomeWithRefresh();
  }

  navigateToReport() {
    this.settingsNavigation.navigateToReportWithRefresh();
  }

  navigateToAddEntry() {
    this.settingsNavigation.navigateToAddEntryWithRefresh();
  }
}
