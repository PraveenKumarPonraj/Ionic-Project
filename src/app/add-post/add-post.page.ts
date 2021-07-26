import { Component, OnInit } from '@angular/core';
import { Post } from "../models/post.model";
import { ToastController,LoadingController,NavController } from "@ionic/angular";
import { AngularFirestore } from "@angular/fire/firestore";
@Component({
  selector: 'app-add-post',
  templateUrl: './add-post.page.html',
  styleUrls: ['./add-post.page.scss'],
})
export class AddPostPage implements OnInit {
  post = {} as Post;

  constructor( private toastCtrl: ToastController,
  private loadingCtrl: LoadingController, 
  private navCtrl: NavController,
  private firestore: AngularFirestore,) { }

  ngOnInit() {}

  async createPost(post: Post){
    if (this.formValidation()) {
      let loader =  this.loadingCtrl.create({
        message: "Please wait..."
      });
      (await loader).present();
      
      try {
        await this.firestore.collection("posts").add(post);

      } catch (e) {
        this.showToast(e);
      }

      (await loader).dismiss();
      this.navCtrl.navigateRoot("home");
    }
  }



  formValidation() {
    if (!this.post.title) {
      // show toast message
      this.showToast("Enter Name");
      return false;
    }

    if (!this.post.details) {
      // show toast message
      this.showToast("Enter Department");
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


