import { Component } from '@angular/core';
import { NavController, NavParams } from 'ionic-angular';
import { Http, Headers } from '@angular/http';
import { HomePage } from '../home/home';

/**
 * Generated class for the LoginPage page.
 *
 * See https://ionicframework.com/docs/components/#navigation for more info on
 * Ionic pages and navigation.
 */

@Component({
  selector: 'page-login',
  templateUrl: 'login.html',
})
export class LoginPage {
  private email = "";
  private password = "";
  private rs = "";
  private alert = "";

  constructor(public navCtrl: NavController, public navParams: NavParams, public http:Http) {
  }

  logar() {
    let headers = new Headers();
    headers.append('Content-Type','application/json');

    let body = {
      email:this.email,
      password:this.password
    };

    this.http.post('http://10.0.0.110:8000/api/login', JSON.stringify(body),{headers:headers}).toPromise().then(rs => {
      //this.rs = rs.json();
      console.log(rs);
        this.rs = rs.json();
        console.log(this.rs);
        this.navCtrl.push(HomePage,{
          user:this.rs
        });
    });
  }

}
