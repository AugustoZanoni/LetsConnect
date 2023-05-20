import React, { useEffect, useState } from 'react';
import GlobeGL from 'react-globe.gl';

export const Globe = () => {
  const [points, setPoints] = useState([]);
  useEffect(() => {
    navigator.geolocation.getCurrentPosition(location => setPoints([{
      lat: location.coords.latitude,
      lng: location.coords.longitude,
      name: "You",
      //add any data to go to points
    }]));
  }, [])


  return (
    <GlobeGL showGlobe
      width={window.innerWidth}
      height={window.innerHeight - 57}
      globeImageUrl={'//unpkg.com/three-globe/example/img/earth-night.jpg'}
      backgroundImageUrl="//unpkg.com/three-globe/example/img/night-sky.png"
      pointAltitude={0}
      onPointClick={data => console.log(data)}
      pointColor={() => "lightgreen"} // point => point.color
      pointsData={points} />
  )
}