import React from 'react';

const { compose, withProps, withHandlers } = require("recompose");
const {
    withScriptjs,
    withGoogleMap,
    GoogleMap,
    Marker,
} = require("react-google-maps");
const { MarkerClusterer } = require("react-google-maps/lib/components/addons/MarkerClusterer");

const exampleMapStyles = [
    { elementType: "geometry", stylers: [{ color: "#242f3e" }] },
    { elementType: "labels.text.stroke", stylers: [{ color: "#242f3e" }] },
    { elementType: "labels.text.fill", stylers: [{ color: "#746855" }] },
    {
        featureType: "administrative.locality",
        elementType: "labels.text.fill",
        stylers: [{ color: "#d59563" }],
    },
    {
        featureType: "poi",
        elementType: "labels.text.fill",
        stylers: [{ color: "#d59563" }],
    },
    {
        featureType: "poi.park",
        elementType: "geometry",
        stylers: [{ color: "#263c3f" }],
    },
    {
        featureType: "poi.park",
        elementType: "labels.text.fill",
        stylers: [{ color: "#6b9a76" }],
    },
    {
        featureType: "road",
        elementType: "geometry",
        stylers: [{ color: "#38414e" }],
    },
    {
        featureType: "road",
        elementType: "geometry.stroke",
        stylers: [{ color: "#212a37" }],
    },
    {
        featureType: "road",
        elementType: "labels.text.fill",
        stylers: [{ color: "#9ca5b3" }],
    },
    {
        featureType: "road.highway",
        elementType: "geometry",
        stylers: [{ color: "#746855" }],
    },
    {
        featureType: "road.highway",
        elementType: "geometry.stroke",
        stylers: [{ color: "#1f2835" }],
    },
    {
        featureType: "road.highway",
        elementType: "labels.text.fill",
        stylers: [{ color: "#f3d19c" }],
    },
    {
        featureType: "transit",
        elementType: "geometry",
        stylers: [{ color: "#2f3948" }],
    },
    {
        featureType: "transit.station",
        elementType: "labels.text.fill",
        stylers: [{ color: "#d59563" }],
    },
    {
        featureType: "water",
        elementType: "geometry",
        stylers: [{ color: "#17263c" }],
    },
    {
        featureType: "water",
        elementType: "labels.text.fill",
        stylers: [{ color: "#515c6d" }],
    },
    {
        featureType: "water",
        elementType: "labels.text.stroke",
        stylers: [{ color: "#17263c" }],
    },
];

const MapWithAMarkerClusterer = compose(
    withProps({
        googleMapURL: "https://maps.googleapis.com/maps/api/js?key=AIzaSyC3RDeRum5X-MLlcKX8_Z5c2RWtPNdxUY4&v=3.exp&libraries=geometry,drawing,places",
        loadingElement: <div style={{ height: `100%` }} />,
        containerElement: <div style={{ height: `calc(100vh - 65px)` }} />,
        mapElement: <div style={{ height: `100%` }} />,
    }),
    withHandlers({
        onMarkerClustererClick: () => (markerClusterer) => {
            const clickedMarkers = markerClusterer.getMarkers()
            /* console.log(`Current clicked markers length: ${clickedMarkers.length}`)
            console.log(clickedMarkers) */
        },
        onMarkerClick: () => (marker) => {
            document.getElementById("popup-name").innerHTML = marker['OTC Name'];
            document.getElementById("popup-phone").innerHTML = marker['OTC Telephone #'];
            document.getElementById("popup-address").innerHTML = [marker['Address.1'], marker['City.1']].join(', ');
            document.getElementById("popup-zip").innerHTML = marker['ZIP.1'];
            document.getElementById("popup-website").innerHTML = "<a href='" + marker['Organ Transplantation Center'] + "' target='_blank'>" + marker['Organ Transplantation Center'] + "</a>";
            document.getElementById("popup-filters").innerHTML = "<div class='filter-badge'>" + marker['OTC Service List'].join("</div><div class='filter-badge'>") + "</div>";
            document.getElementById("popup-container").style.display = "block";
            document.getElementById("popup-container").style.display = "block";
        },
    }),
    withScriptjs,
    withGoogleMap
)(props =>
    <GoogleMap
        defaultZoom={3}
        defaultCenter={{ lat: 35.254749, lng: -90.710838 }}
        defaultOptions={{
            styles: exampleMapStyles,
        }}
    >
        <MarkerClusterer
            onClick={props.onMarkerClustererClick}
            averageCenter
            enableRetinaIcons
            gridSize={60}
        >
            {props.markers.map((marker, i) => (
                (window.google !== null) ?
                    <Marker
                        key={i}
                        icon={new window.google.maps.MarkerImage(
                            "https://i.postimg.cc/zXR6GWbb/4287648.png",
                            null, /* size is determined at runtime */
                            null, /* origin is 0,0 */
                            null, /* anchor is bottom center of the scaled image */
                            new window.google.maps.Size(50, 50)
                        )
                        }
                        position={{ lat: marker.Latitude, lng: marker.Longitude }}
                        onClick={() => { props.onMarkerClick(marker) }}
                    />
                    :
                    <Marker
                        key={i}
                        position={{ lat: marker.Latitude, lng: marker.Longitude }}
                        onClick={() => { props.onMarkerClick(marker) }}
                    />
            ))}
        </MarkerClusterer>
    </GoogleMap>
);

class MyGoogleMap extends React.PureComponent {
    constructor(props) {
        super(props);
        this.state = { markers: props.points };
    }

    UNSAFE_componentWillReceiveProps(nextProps) {
        this.setState({ markers: nextProps.points });
    }

    render() {
        return (
            <>
                <MapWithAMarkerClusterer markers={this.state.markers} />
            </>
        )
    }
}

export default MyGoogleMap;
