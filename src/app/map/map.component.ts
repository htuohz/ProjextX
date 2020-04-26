import { Component, OnInit, AfterContentInit } from '@angular/core';
import * as L from 'leaflet';
import { icon, Marker } from 'leaflet';

const iconRetinaUrl = 'assets/marker-icon-2x.png';
const iconUrl = 'assets/marker-icon.png';
const shadowUrl = 'assets/marker-shadow.png';
const iconDefault = icon({
  iconRetinaUrl,
  iconUrl,
  shadowUrl,
  iconSize: [25, 41],
  iconAnchor: [12, 41],
  popupAnchor: [1, -34],
  tooltipAnchor: [16, -28],
  shadowSize: [41, 41]
});
Marker.prototype.options.icon = iconDefault;

@Component({
  selector: 'app-map',
  templateUrl: './map.component.html',
  styleUrls: ['./map.component.css']
})
export class MapComponent implements OnInit {
  
  
  
  
  private map;
  notes:Note[];
  places:Place[];



  ngAfterContentInit(): void {
    this.initMap();
    
    this.map.on('locationfound', this.onLocationFound);
    this.map.on('locationerror', this.onLocationError);
    this.places = [
      {placeID:1,
      placeName:"Beijing",
    center:[39.90, 116.40]},
    {placeID:2,
      placeName:"Suzhou",
    center:[31.29, 120.58]}
    ]


 L.marker(this.places[0].center).addTo(this.map);



  }
  
  private initMap(): void {


    
    this.map = L.map('map', {
      zoom: 13,
      center:[39.9042, 116.4074]
    });
    const tiles = L.tileLayer('https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png', {
      maxZoom: 19,
      attribution: '&copy; <a href="http://www.openstreetmap.org/copyright">OpenStreetMap</a>'
    });

    tiles.addTo(this.map);



  }

  onLocationFound(e) {
    var radius = e.accuracy;

    L.marker(e.latlng).addTo(this.map)
        .bindPopup("You are within " + radius + " meters from this point").openPopup();

    L.circle(e.latlng, radius).addTo(this.map);
}
  onLocationError(e) {
    alert(e.message);
  }


  title="";
  constructor() { }

  ngOnInit(): void {
    
    
  }




}
interface Note {
  url:string;
  author: string;
  description: string;
  placeID: number;

}
interface Place{
  placeID:number;
  placeName:string;
  center:[number,number];
}