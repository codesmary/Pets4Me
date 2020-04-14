import React from 'react'
import mapboxgl from 'mapbox-gl';
import "./MapMedia.css"

interface MapMediaProps { 
  address: string;
  postcode: number;
}

interface MapMediaState {
  long: number;
  lat: number;
  zoom: number;
}

mapboxgl.accessToken = "pk.eyJ1IjoiZGVhbnRvcmtlbHNvbiIsImEiOiJjazhienAxZDQwZWdpM2VxYzI2bWs0bWFvIn0.50o7Qc543TVjRT5XaXbFpA";

class MapMedia extends React.Component<MapMediaProps, MapMediaState> {
  mapContainer: any;
  DEFAULT_LONG = -97.7357368;
  DEFAULT_LAT = 30.2853668;

  constructor(props: MapMediaProps) {
    super(props);
    // Default to the GDC
    this.state = {
      long: this.DEFAULT_LONG,
      lat: this.DEFAULT_LAT,
      zoom: 12
    };
  }

  componentDidUpdate(prevProps: MapMediaProps) {
    if (this.props !== prevProps) {
      let address = this.props.address.replace(/[, ]/g, '+')
      let nominatimUrl = "https://nominatim.openstreetmap.org/?q="+address+"&format=json&limit=1";
      fetch(nominatimUrl, {
        method: 'POST',
        headers: {
          'Accept': 'application/json',
          'Content-Type': 'application/json'
        },
      })
      .then(res => {
        res.json()
        .then((data) => {
          if (data.length !== 0) {
            this.setState({
              lat: data[0].lat,
              long: data[0].lon
            });
            this.createMap();
          } else {
            this.getPostcodeMap();
          }
        })
      })
    }
  }

  getPostcodeMap() {
    let nominatimUrl = "https://nominatim.openstreetmap.org/?q="+this.props.postcode+"&format=json&limit=1";
    fetch(nominatimUrl, {
      method: 'POST',
      headers: {
        'Accept': 'application/json',
        'Content-Type': 'application/json'
      },
    })
    .then(res => {
      res.json()
      .then((data) => {
        if (data.length !== 0) {
          this.setState({
            lat: data[0].lat,
            long: data[0].lon
          });
        }
        this.createMap();
      });
    })
  }
  
  createMap() {
    new mapboxgl.Map({
      container: this.mapContainer,
      style: 'mapbox://styles/mapbox/streets-v11',
      center: [this.state.long, this.state.lat],
      zoom: this.state.zoom
    });
    // Currently disabled because Markers are screwy
    /* let marker = new mapboxgl.Marker().setLngLat({
      lat: this.state.lat,
      lng: this.state.long
    }).addTo(map);
    map.scrollZoom.disable(); */
  }

  render() {
    
    return (
      <div>
        <div ref={el => this.mapContainer = el}
          className="mapContainer"/>
        {this.state.lat === this.DEFAULT_LAT && this.state.long === this.DEFAULT_LONG && 
        <div className='error'>Uh-oh! We encountered an error trying to display the map for this shelter. Displaying default location instead.</div>}
      </div>)
  }
}

export default MapMedia