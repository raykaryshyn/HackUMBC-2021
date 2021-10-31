import React from 'react';

const fetch = require("isomorphic-fetch");
const { compose, withProps, withHandlers } = require("recompose");
const {
    withScriptjs,
    withGoogleMap,
    GoogleMap,
    Marker,
} = require("react-google-maps");
const { MarkerClusterer } = require("react-google-maps/lib/components/addons/MarkerClusterer");

const MapWithAMarkerClusterer = compose(
    withProps({
        googleMapURL: "https://maps.googleapis.com/maps/api/js?key=AIzaSyC3RDeRum5X-MLlcKX8_Z5c2RWtPNdxUY4&v=3.exp&libraries=geometry,drawing,places",
        loadingElement: <div style={{ height: `100%` }} />,
        containerElement: <div style={{ height: `400px` }} />,
        mapElement: <div style={{ height: `100%` }} />,
    }),
    withHandlers({
        onMarkerClustererClick: () => (markerClusterer) => {
            const clickedMarkers = markerClusterer.getMarkers()
            console.log(`Current clicked markers length: ${clickedMarkers.length}`)
            console.log(clickedMarkers)
        },
    }),
    withScriptjs,
    withGoogleMap
)(props =>
    <GoogleMap
        defaultZoom={3}
        defaultCenter={{ lat: 39.254749, lng: -90.710838 }}
    >
        <MarkerClusterer
            onClick={props.onMarkerClustererClick}
            averageCenter
            enableRetinaIcons
            gridSize={60}
        >
            {props.markers.map((marker, i) => (
                <Marker
                    key={i}
                    position={{ lat: marker.Latitude, lng: marker.Longitude }}
                />
            ))}
        </MarkerClusterer>
    </GoogleMap>
);

class MyGoogleMap extends React.PureComponent {
    constructor(props) {
        super(props);
        this.state = { markers: props.points };
        console.log("in constructor, ", props.points);
    }

    UNSAFE_componentWillReceiveProps(nextProps) {
        console.log('Component received new props', nextProps);
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
