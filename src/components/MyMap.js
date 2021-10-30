import React, { useState, useEffect } from 'react';
import { GoogleMap, withScriptjs, withGoogleMap, Marker } from "react-google-maps";

function Map() {
    const [data, setData] = useState([]);
    const getData = () => {
        fetch('data.json', {
            headers: {
                'Content-Type': 'application/json',
                'Accept': 'application/json'
            }
        }
        )
            .then(function (response) {
                //console.log(response)
                return response.json();
            })
            .then(function (myJson) {
                //console.log(myJson);
                setData(myJson);
            });
    }

    useEffect(() => {
        getData()
    }, []);

    return (
        <GoogleMap defaultZoom={10} defaultCenter={{ lat: 39.254749, lng: -76.710838 }}>
            {data.map((point, i) => (
                <Marker key={i} position={{
                    lat: point.Latitude,
                    lng: point.Longitude
                }} />
            ))}
        </GoogleMap>
    );
}

const WrappedMap = withScriptjs(withGoogleMap(Map));

function MyMap() {
    return (
        <div className="Map">
            <WrappedMap googleMapURL={`https://maps.googleapis.com/maps/api/js?v=3.exp&libraries=geometry,drawing,places&key=AIzaSyC3RDeRum5X-MLlcKX8_Z5c2RWtPNdxUY4`}
                loadingElement={<div style={{ height: `100%` }} />}
                containerElement={<div style={{ height: `100%` }} />}
                mapElement={<div style={{ height: `100%` }} />}
            >
            </WrappedMap>
        </div>
    );
}

export default MyMap;
