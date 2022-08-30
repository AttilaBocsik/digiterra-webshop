import { Component, OnInit, OnDestroy, ElementRef, ViewChild, AfterViewInit } from '@angular/core';
import { TranslateService } from '@ngx-translate/core';
import { Subscription } from 'rxjs';
import { LanguagesService } from 'src/app/services/languages.service';
import * as ol from 'openlayers';

@Component({
  selector: 'app-connection',
  templateUrl: './connection.component.html',
  styleUrls: ['./connection.component.scss']
})
export class ConnectionComponent implements OnInit, OnDestroy, AfterViewInit {
  /**
   * Openlayers
   * 47.529963; 19.008488
   */
  @ViewChild('mapElement', {static: false}) mapElement: ElementRef;
  public vectorSource: any;
  public vectorLayer: any;
  public map: any;
  public features = []
  /**
   * Language
   */
  language: string;
  languageSubscription: Subscription;
  updateTimeVar: Date;

  constructor(public translate: TranslateService, private languagesService: LanguagesService) { 
    translate.addLangs(['Magyar', 'English']);
    this.updateTimeVar = new Date("2020-03-07 11:54:20");
    //openlayers
    var osm_layer: any = new ol.layer.Tile({
      source: new ol.source.OSM()
    });

    this.vectorSource = new ol.source.Vector({
      features: []
    });

    this.vectorLayer = new ol.layer.Vector({
      source: this.vectorSource
    });

    this.map = new ol.Map({
      layers: [osm_layer, this.vectorLayer],
      view: new ol.View({
        center: ol.proj.transform([19.008488, 47.529963], 'EPSG:4326', 'EPSG:3857'),
        zoom: 17
      })
    });
    this.features = [];
  }

  ngAfterViewInit() {
    this.map.setTarget(this.mapElement.nativeElement.id);
    this.map.on('click', (evt) => {
      var lonlat = ol.proj.transform(evt.coordinate, 'EPSG:3857', 'EPSG:4326');
      var lon = lonlat[0];
      var lat = lonlat[1];
      //this.addMarker(lon, lat)
      console.log('lon,lat',lonlat)
    });
    this.addMarker(19.008488, 47.529963)
  }

  ngOnInit() {
    this.languageSubscription = this.languagesService.getLanguage()
      .subscribe(lang => {
        this.language = lang;
        this.translate.use(this.language);
      },
        err => console.error(err),
        () => console.log('unsubscribed')
      );
  }

  ngOnDestroy() {
    this.languageSubscription.unsubscribe();
  }

  private addMarker(lon: any, lat: any) {
    var geom = new ol.geom.Point(ol.proj.transform([lon, lat], 'EPSG:4326', 'EPSG:3857'));
    var feature = new ol.Feature(geom);
    feature.setStyle([
      new ol.style.Style({
        image: new ol.style.Icon(({
          anchor: [0.5, 1],
          anchorXUnits: 'fraction',
          anchorYUnits: 'fraction',
          opacity: 1,
          src: 'https://openlayers.org/en/v4.6.5/examples/data/dot.png'
        }))
      })
    ]);

    this.features.push({ lon: lon, lat: lat })
    //console.log(this.features)
    this.drawMarkers()
  }

  drawMarkers() {
    for (let i = 0; i < this.features.length; i++) {
      var geom = new ol.geom.Point(ol.proj.transform([this.features[i].lon, this.features[i].lat], 'EPSG:4326', 'EPSG:3857'));
      var feature = new ol.Feature(geom);
      feature.setStyle([
        new ol.style.Style({
          image: new ol.style.Icon(({
            anchor: [0.5, 1],
            anchorXUnits: 'fraction',
            anchorYUnits: 'fraction',
            opacity: 1,
            src: '../../../assets/images/map-marker-icon.png'
          }))
        })
      ]);
      this.vectorSource.addFeature(feature);
    }
  } 

}
