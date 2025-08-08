import { Component } from "@angular/core";
import { Camera, CameraResultType, CameraSource } from "@capacitor/camera";

@Component({
  selector: "app-profile",
  templateUrl: "./profile.component.html",
  styleUrls: ["./profile.component.scss"],
})
export class ProfileComponent {
  avatarUrl: string | undefined;

  constructor() {}

  async ngOnInit() {
    console.log("Profile component initialized");
    // await this.getPhoto();
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
}
