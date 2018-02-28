import { Component } from '@angular/core';
import { NavController } from 'ionic-angular';
import { Http, Headers } from '@angular/http';
import { Geolocation } from '@ionic-native/geolocation';
import 'rxjs/add/operator/map';
import 'rxjs/add/operator/toPromise';
import { ListaPage } from '../lista/lista';
import { NavParams } from 'ionic-angular/navigation/nav-params';


@Component({
  selector: 'page-home',
  templateUrl: 'home.html'
})
export class HomePage {

  private data = [];

  private lat = 0;
  private lon = 0;

  private user;

  private nameSmall;
  private descricaoSmall;

  constructor(public navCtrl: NavController, private geolocation: Geolocation, public http: Http,public navParams: NavParams) {
    this.geolocation.getCurrentPosition().then((resp) => {
      console.log(resp.coords.latitude);
      console.log(resp.coords.longitude);

      this.lat = resp.coords.latitude;
      this.lon = resp.coords.longitude;

     }).catch((error) => {
       console.log('Error getting location', error);
     });

     this.user = this.navParams.get("user");
     
     /*
     let watch = this.geolocation.watchPosition();
     watch.subscribe((data) => {
      // data can be a set of coordinates, or an error (if an error occurred).
      console.log(data.coords.latitude);
      console.log(data.coords.longitude);
     });
     */

  }



  teste() {
    let headers = new Headers();
    headers.append('Content-Type','application/json');

    let body = {
      latitude:this.lat,
      longitude:this.lon
    };
    this.http.post('http://10.0.0.110:8000/api/coord', JSON.stringify(body),{headers:headers}).toPromise().then(rs => {
      console.log(rs);
    });
  }

  teste2(){
    this.http.get('http://10.0.0.110:8000/api/coord').toPromise().then(rs => {
      this.data = rs.json();
      this.navCtrl.push(ListaPage,{
        data:this.data
      });
    });
    
  }

  teste3() {
    let headers = new Headers();
    headers.append('Content-Type','application/json');

    let body = {
      latitude:this.lat,
      longitude:this.lon
    };
    this.http.post('http://10.0.0.110:8000/api/shorterDistance', JSON.stringify(body),{headers:headers}).toPromise().then(rs => {
      let aux = rs.json();
      this.nameSmall = aux.name;
      this.descricaoSmall = aux.descricao;

    });
  }
}
