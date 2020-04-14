import { Component, OnInit } from '@angular/core';
import { ToastController, NavController } from '@ionic/angular';
import { Post } from 'src/app/models/post.model';
import { Observable } from 'rxjs';
import { AngularFirestore } from '@angular/fire/firestore';

@Component({
  selector: 'app-home',
  templateUrl: 'home.page.html',
  styleUrls: ['home.page.scss'],
})
export class HomePage implements OnInit {
  posts$: Observable<any[]>;

  constructor(
    private db: AngularFirestore,
    private toastCtrl: ToastController,
    private navCtrl: NavController
  ) {
    this.posts$ = this.db.collection('posts').valueChanges();
  }

  ngOnInit() {
    const img = localStorage.getItem('pedrogram.post');
    if (img) this.showMessage("Você tem uma publicação não salva");
  }

  async showMessage(message: string) {
    const toast = await this.toastCtrl.create({
      message: message, duration: 3000, buttons: [
        {
          icon: "send",
          handler: () => {
            this.navCtrl.navigateForward("/post");
          }
        }
      ]
    });

    toast.present();
  }

}
