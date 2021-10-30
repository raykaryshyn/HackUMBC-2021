const { compose } = require("recompose");
const {
    withScriptjs,
    withGoogleMap,
    GoogleMap,
} = require("react-google-maps");
const { MarkerWithLabel } = require("react-google-maps/lib/components/addons/MarkerWithLabel");

const MapWithAMarkerWithLabel = compose(
    withScriptjs,
    withGoogleMap
)(props =>
    <GoogleMap
        defaultZoom={8}
        defaultCenter={{ lat: -34.397, lng: 150.644 }}
    >
        <MarkerWithLabel
            position={{ lat: -34.397, lng: 150.644 }}
            labelAnchor={{ x: (10/2) + 2 , y: 80 }}
            labelStyle={{ backgroundColor: "yellow", fontSize: "32px", padding: "16px" }}
        >
            <div>Hello There!</div>
        </MarkerWithLabel>
    </GoogleMap>
);

function MyGoogleMap() {
    return (
        <MapWithAMarkerWithLabel
            googleMapURL="https://maps.googleapis.com/maps/api/js?key=AIzaSyC3RDeRum5X-MLlcKX8_Z5c2RWtPNdxUY4&v=3.exp&libraries=geometry,drawing,places"
            loadingElement={<div style={{ height: `100%` }} />}
            containerElement={<div style={{ height: `400px` }} />}
            mapElement={<div style={{ height: `100%` }} />}
        />
    );
}

export default MyGoogleMap;
