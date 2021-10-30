import * as React from 'react';

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
        containerElement: <div style={{ height: `calc(100vh - 65px)` }} />,
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
        defaultZoom={4}
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

class Map2 extends React.Component {
    constructor(props) {
        super(props);
        console.log(props.dummy);
        this.state = {
            /* markers: props.markers */
            organFilter: props.organFilter
        };
    }

    shouldComponentUpdate(nextProps) {
        return this.props.organFilter !== nextProps.organFilter;
    }

    /*  componentWillMount() {
         this.setState({   organFilter: { heart: true, kidney: true, liver: true, pancreas: true, lung: true, vca: true, intestine: true, islet: true } })
     } */

    componentDidMount(props) {
        console.log("loading data...")
        const url = [
            `data.json`
        ].join("")

        fetch(url)
            .then(res => res.json())
            .then(data => {
                this.setState({ markers: data });
            });
    }

    componentDidUpdate(props) {
        console.log("did update?", props);
        this.setState({ /* markers: [] */  organFilter: props.organFilter })
    }

    render() {
        console.log("am i?", this.state.organFilter);
        return (
            <>
                {/* <MapWithAMarkerClusterer markers={this.state.markers} /> */}
                {this.state.organFilter.heart}
            </>
        )
    }
}

export default Map2;