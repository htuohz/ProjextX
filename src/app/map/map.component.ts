import { Component, OnInit, AfterContentInit, EventEmitter, Output } from '@angular/core';
import * as L from 'leaflet';
import { icon, Marker } from 'leaflet';
import { element } from 'protractor';


const iconUrl = 'assets/203-2036956_location-map-pins-png-pin-icon-clipart.png';

const iconDefault = icon({

  iconUrl,

  iconSize: [40, 40],
});
Marker.prototype.options.icon = iconDefault;

@Component({
  selector: 'app-map',
  templateUrl: './map.component.html',
  styleUrls: ['./map.component.css'],
  outputs: ['notesChange'],
})
export class MapComponent implements OnInit {
  
  
  
  private markers = [];
  private map;
  notes:Note[];
  places:Place[];
  selectedNotes:Note[] =[];
  @Output() notesChange= new EventEmitter();

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
    ];

    

    this.notes = [{
      url:"https://www.youtube.com/embed/2Mf9oXqxJ4s",
      author: "David",
      description:"Beijing is interesting" ,
      placeID:1,
      tags:['History','Palace'],
      center:[39.90, 116.40]

    },{
      url:"https://www.youtube.com/embed/RTbFz7zTWFA",
      author: "Bob",
      description:"Beijing is a nice place" ,
      placeID:1,
      tags:['History','Palace'],
      center:[39.90, 116.40]
    },{
      url:"https://www.youtube.com/embed/SdsxV818EDk",
      author: "Alic",
      description:"Suzhou is a nice place" ,
      placeID:2,
      tags:['History','Palace'],
      center:[31.29, 120.58]
    },{
      url:"https://www.youtube.com/embed/SdsxV818EDk",
      author: "Tom",
      description:"Suzhou is interesting" ,
      placeID:2,
      tags:['History','Palace'],
      center:[31.29, 120.58]
    }
    
    ];


    
    this.places.forEach(element => {
          
      this.markers.push(L.marker(element.center).addTo(this.map));
    });
    this.markers.forEach(element => {
      element.on('click',this.clickMarkerHandler);
    });
    this.map.on('click',this.clickMapHandler)

  }
  
  clickMarkerHandler(e){
    console.log(e);
    this.selectedNotes = [];
    this.selectedNotes=this.notes.filter(
      note=>note.center[0] == e.latlng.lat && note.center[1] == e.latlng.lng 
    ) 
    this.notesChange.emit(this.selectedNotes);
    
  }
  clickMapHandler(){
    this.selectedNotes = [];
    this.notesChange.emit(this.selectedNotes);
  }

  private initMap(): void {


    
    this.map = L.map('map', {
      zoom: 4,
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
  constructor() { 
    this.clickMapHandler = this.clickMapHandler.bind(this);
    this.clickMarkerHandler = this.clickMarkerHandler.bind(this);
  }

  ngOnInit(): void {
    
    
  }




}
export interface Note {
  url:string;
  author:string;
  description: string;
  placeID: number;
  tags:string[];
  center:[number,number];
}
export interface Place{
  placeID:number;
  placeName:string;
  center:[number,number];
}
