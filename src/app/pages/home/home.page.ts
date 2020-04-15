import { Component, OnInit } from '@angular/core';
import { ToastController, NavController, ActionSheetController } from '@ionic/angular';
import { Post } from 'src/app/models/post.model';
import { Observable } from 'rxjs';
import { AngularFirestore } from '@angular/fire/firestore';
import { User } from 'src/app/models/user.model';

@Component({
  selector: 'app-home',
  templateUrl: 'home.page.html',
  styleUrls: ['home.page.scss'],
})
export class HomePage implements OnInit {
  public user: User = new User('', '', 'https://placehold/500');
  posts$: Observable<any[]>;

  constructor(
    private db: AngularFirestore,
    private toastCtrl: ToastController,
    private navCtrl: NavController,
    private actionCtrl: ActionSheetController
  ) {
    this.posts$ = this.db.collection('posts').valueChanges();
  }

  ngOnInit() {
    this.user = JSON.parse(localStorage.getItem('pedrogram.user'));
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

  async showOptions() {
    const actionSheet = await this.actionCtrl.create({
      header: 'Opções',
      buttons: [{
        text: 'Logout',
        role: 'destructive',
        icon: 'power',
        handler: () => {
          localStorage.removeItem('pedrogram.user');
          this.navCtrl.navigateRoot("/login");
        }
      }, {
        text: 'Cancelar',
        icon: 'close',
        role: 'cancel'
      }
      ]
    });

    await actionSheet.present();
  }
}
