import { NgModule } from "@angular/core";
import { CommonModule } from "@angular/common";
import { IonicModule } from "@ionic/angular";
import { FormsModule } from "@angular/forms";
import { LoginComponent } from "./login/login.component";
import { LoginRoutingModule } from "./login/login-routing.module";
import { HttpClientModule } from "@angular/common/http";

@NgModule({
  declarations: [LoginComponent],
  imports: [
    CommonModule,
    IonicModule,
    FormsModule,
    LoginRoutingModule,
    HttpClientModule,
  ],
})
export class LoginModule {}
