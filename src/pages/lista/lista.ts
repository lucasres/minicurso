import { Component } from '@angular/core';
import { NavController, NavParams } from 'ionic-angular';

/**
 * Generated class for the ListaPage page.
 *
 * See https://ionicframework.com/docs/components/#navigation for more info on
 * Ionic pages and navigation.
 */

@Component({
  selector: 'page-lista',
  templateUrl: 'lista.html',
})
export class ListaPage {

  private data = []

  constructor(public navCtrl: NavController, public navParams: NavParams) {
    this.data = this.navParams.get('data');
  }

  ionViewDidLoad() {
    console.log(this.data);
  }

}
