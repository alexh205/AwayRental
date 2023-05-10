import React, { useMemo, useState } from 'react'
import { GoogleMap, Marker, useLoadScript } from '@react-google-maps/api'


const MapComponent = ({ title, lat, lng }) => {

    // const { isLoaded } = useLoadScript({
    //     googleMapsApiKey: process.env.REACT_APP_GOOGLE_API_KEY,
    // });
    // const    markers = [
    //     { lat: 18.5204, lng: 73.8567 },
    //     { lat: 18.5314, lng: 73.8446 },
    //     { lat: 18.5642, lng: 73.7769 },
    // ];

    // const onLoad = (map) => {
    //     const bounds = new google.maps.LatLngBounds();
    //     markers?.forEach(({ lat, lng }) => bounds.extend({ lat, lng }));
    //     map.fitBounds(bounds);
    // };

    // return (
    //     <div className="App">
    //         {!isLoaded ? (
    //             <h1>Loading...</h1>
    //         ) : (
    //             <GoogleMap mapContainerClassName="map-container" onLoad={onLoad}>
    //                 {markers.map(({ lat, lng }) => (
    //                     <Marker position={{ lat, lng }} />
    //                 ))}
    //             </GoogleMap>
    //         )}
    //     </div>
    // );
    const { isLoaded } = useLoadScript({
        googleMapsApiKey: process.env.REACT_APP_GMAP_KEY
    });
    const center = useMemo(() => ({ lat: 32.52043, lng: 73.856743 }), [])
    return (
        <div className='h-full w-full '>
            {!isLoaded ? (
                <h1>Loading...</h1>
            ) : (<GoogleMap
                mapContainerClassName='w-full h-full'
                center={center}
                zoom={12} >  <Marker position={{ lat: 18.52043, lng: 73.856743 }} /> </GoogleMap>)}
        </div>
    )
}

export default MapComponent
