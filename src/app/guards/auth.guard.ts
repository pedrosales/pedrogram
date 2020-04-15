import { CanActivate } from "@angular/router";
import { Injectable } from '@angular/core';
import { NavController } from '@ionic/angular';

@Injectable()
export class AuthGuard implements CanActivate {
    /**
     *
     */
    constructor(
        private navCtrl: NavController
    ) {

    }

    canActivate() {
        const user = localStorage.getItem('pedrogram.user');
        if (!user) {
            this.navCtrl.navigateRoot('login');
            return false;
        }

        return true;
    }
}