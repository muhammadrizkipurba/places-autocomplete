import { CircularProgress, Stack, Typography } from "@mui/material";
import { GoogleMap, MarkerF, useJsApiLoader } from "@react-google-maps/api";
import { connect } from "react-redux";


const GoogleMapContainer = ({defaultPosition, selectedPlace}) => {

  let showMarker = false;
  if(selectedPlace) {
    showMarker = JSON.stringify(defaultPosition) !== JSON.stringify(selectedPlace.geometry)
  };

  const { isLoaded } = useJsApiLoader({
    googleMapsApiKey: process.env.REACT_APP_GOOGLE_API_KEY
  });

  if(!isLoaded) {
    return (
      <>
        <CircularProgress />
        <Typography variant="string" marginTop="2rem">Showing google map...</Typography>
      </>
    )
  };

  return (
    <Stack
      width="100%"
      height="100%"
    >
      <GoogleMap
        center={selectedPlace ? selectedPlace.geometry : defaultPosition}
        zoom={15}
        mapContainerStyle={{
          width: "100%",
          height: "100%"
        }}
      >
        {showMarker && <MarkerF position={selectedPlace.geometry} />}
      </GoogleMap>
    </Stack>
  )
}

const mapStateToProps = state => {
  const { selectedPlace } = state;
  return {
    selectedPlace
  }
}

export default connect(mapStateToProps, {})(GoogleMapContainer)