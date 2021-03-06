import { Component, OnInit } from '@angular/core';
import { User } from "../models/user.model";
import {
  ToastController,
  LoadingController,
  NavController
} from "@ionic/angular";
import { AngularFireAuth } from "@angular/fire/auth";

@Component({
  selector: 'app-register',
  templateUrl: './register.page.html',
  styleUrls: ['./register.page.scss'],
})
export class RegisterPage implements OnInit {
  user = {} as User;
  constructor(
    private toastCtrl: ToastController,private loadingCtrl: LoadingController,
    private afAuth: AngularFireAuth,
    private navCtrl: NavController
  ) { }

  ngOnInit() {}
  async register(user: User){
    if (this.formValidation()) {
      let loader = await this.loadingCtrl.create({
        message: "Please wait..."
      });
      (await loader).present();

      try{
        await this.afAuth.auth
          .createUserWithEmailAndPassword(user.username, user.password)
          .then(data => {
            console.log(data);
            this.navCtrl.navigateRoot("home");
          })
          .catch();
      }catch(e){
        this.showToast(e);
      }
      (await loader).dismiss();

        
    }
  }



  formValidation() {
    if (!this.user.username) {
      // show toast message
      this.showToast("Enter Email");
      return false;
    }

    if (!this.user.password) {
      // show toast message
      this.showToast("Enter password");
      return false;
    }

    return true;
  }

  showToast(message: string) {
    this.toastCtrl
      .create({
        message: message,
        duration: 3000
      })
      .then(toastData => toastData.present());
  }

}
