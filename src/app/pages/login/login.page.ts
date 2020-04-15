import { Component, OnInit } from '@angular/core';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { LoadingController, NavController, ToastController } from '@ionic/angular';
import { AngularFireAuth } from '@angular/fire/auth';
import { User } from 'src/app/models/user.model';
import { auth } from 'firebase';

@Component({
  selector: 'app-login',
  templateUrl: './login.page.html',
  styleUrls: ['./login.page.scss'],
})
export class LoginPage implements OnInit {
  public form: FormGroup;

  constructor(
    private fb: FormBuilder,
    private loadingCtrl: LoadingController,
    private navCtrl: NavController,
    private toastCtrl: ToastController,
    private fbAuth: AngularFireAuth
  ) {
    this.form = this.fb.group({
      email: ['', Validators.required],
      password: ['', Validators.required]
    });

  }

  ngOnInit() {
  }

  async submit() {
    const loading = await this.loadingCtrl.create({ message: "Autenticando..." });
    loading.present();

    this
      .fbAuth
      .signInWithEmailAndPassword(
        this.form.controls['email'].value,
        this.form.controls['password'].value
      ).then((data) => {
        loading.dismiss();
        //TODO: salvar o nome da imagem e depois ler
        localStorage.setItem('pedrogram.user', JSON.stringify(new User('', data.user.email, '')));
        this.navCtrl.navigateRoot('home');
      })
      .catch((error) => {
        console.log(error);
        loading.dismiss();
        this.showMessage("Usuário ou senha inválidos");
      });
  }

  async showMessage(message: string) {
    const toast = await this.toastCtrl.create({ message: message, duration: 3000 });
    toast.present();
  }

  async goToSignup() {
    this.navCtrl.navigateForward('signup');
  }

  async signInWithGoogle() {
    this.fbAuth.signInWithPopup(new auth.GoogleAuthProvider())
      .then((data) => {
        console.log(data);
        localStorage.setItem('pedrogram.user', JSON.stringify(new User(data.user.displayName, data.user.email, data.user.photoURL)));
        this.navCtrl.navigateRoot('home');
      })
      .catch((error) => {
        console.log(error);
        this.showMessage("Usuário ou senha inválidos");
      })
  }
}
