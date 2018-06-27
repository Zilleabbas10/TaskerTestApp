import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams, Platform } from 'ionic-angular';
import {
  GoogleMaps,
  GoogleMap,
  GoogleMapsEvent,
  GoogleMapOptions,
  CameraPosition,
  MarkerOptions,
  GoogleMapsAnimation,
  Marker,
  LatLng
} from '@ionic-native/google-maps';
import { Geolocation } from '@ionic-native/geolocation';


@IonicPage()
@Component({
  selector: 'page-map',
  templateUrl: 'map.html',
})
export class MapPage {
  public element: HTMLElement;
  public map: GoogleMap;


  constructor(public navCtrl: NavController, public navParams: NavParams, private geolocation: Geolocation, private platform: Platform, private googleMaps: GoogleMaps) {
  	platform.ready().then(() => {
	    this.loadMap();
	  });
  }

  ionViewDidLoad() {
    console.log('ionViewDidLoad MapPage');
  }

loadMap() {
  console.log('Abbas');

 this.geolocation.getCurrentPosition({ maximumAge: 3000, timeout: 5000, enableHighAccuracy: true }).then((resp) => {
    console.log(resp.coords.latitude+", "+resp.coords.longitude);
    let location = new LatLng(resp.coords.latitude, resp.coords.longitude);

    let mapOptions: GoogleMapOptions = {
      camera: {
        target: {
          lat: resp.coords.latitude,
          lng: resp.coords.longitude
        },
        zoom: 18,
        tilt: 30
      },
      'backgroundColor': 'white',
      'controls': {
        'compass': true,
        'myLocationButton': true,
        'indoorPicker': true,
        'zoom': true
      },
      'gestures': {
        'scroll': true,
        'tilt': true,
        'rotate': true,
        'zoom': true
      }
    };

    this.map = new GoogleMap('map_canvas', mapOptions);

    this.map.on(GoogleMapsEvent.MAP_READY).subscribe(() => {
      console.log('Map is ready!');

        // Now you can use all methods safely.
        this.map.addMarker({
            title: 'Current Location',
            icon: 'red',
            animation: 'DROP',
            position: {
              lat: resp.coords.latitude,
              lng: resp.coords.longitude
            }
          })
          .then(marker => {
            marker.on(GoogleMapsEvent.MARKER_CLICK)
              .subscribe(() => {
                alert('clicked');
              });
            });
    });
  }).catch((error) => {
    console.log('Error getting location', error);
  });
  }

}
