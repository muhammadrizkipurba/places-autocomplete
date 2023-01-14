import { CircularProgress, Stack, Typography } from "@mui/material";
import { GoogleMap, useJsApiLoader } from "@react-google-maps/api";

const center = {lat: 3.0489479434800315, lng: 101.44697147630937};

const GoogleMapContainer = () => {
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
        center={center}
        zoom={15}
        mapContainerStyle={{
          width: "100%",
          height: "100%"
        }}
      >

      </GoogleMap>
    </Stack>
  )
}

export default GoogleMapContainer