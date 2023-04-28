import React, { useState, useCallback } from 'react'
import { GoogleMap, useJsApiLoader, Marker } from '@react-google-maps/api'

const center = { lat: 34.0522, lng: -118.2437 }

const MapComponent = ({ title, lat, lng }) => {

    const [map, setMap] = useState("")

    const containerStyle = {
        width: '100%',
        length: '100%'
    }


    const { isLoaded } = useJsApiLoader({
        id: 'google-map-script',
        googleMapsApiKey: process.env.REACT_APP_GMAP_KEY
    });

    // const onLoad = useCallback((map) => {
    //     const bounds = new window.google.maps.LatLngBounds();
    //     map.fitBounds(bounds);
    //     setMap(map)
    // }, [])

    const onUnmount = useCallback((map) => {
        setMap(null)
    }, [])


    return isLoaded ? (

        <div style={{ height: '900px', width: '100vh' }}>
            <GoogleMap
                mapContainerStyle={containerStyle}
                center={center}
                zoom={15}
                // onLoad={onLoad}
                onUnmount={onUnmount}
            >
                {/* <Marker
                        position={{ lat, lng }}
                        title={title}
                        icon={{
                            path: 'M 100 100 L 300 100 L 200 300 z',
                            fillColor: 'red',
                            fillOpacity: 1,
                            scale: .2,
                            strokeColor: 'red',
                            strokeWeight: 2
                        }}
                        streetView={false} /> */}


                <></>
            </GoogleMap>
        </div>
    ) : <></>
}

export default MapComponent
