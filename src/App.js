import { Box, Grid, Stack } from "@mui/material";
import SearchInput from "./components/SearchInput";
import GoogleMapContainer from "./components/GoogleMapContainer";
import SearchHistory from "./components/SearchHistory";

function App() {

  const defaultPosition = {
    lat: 3.1415275483230243, 
    lng: 101.65272402444117
  };
  
  return (
    <div className="App">
      <Grid container spacing={0} height="100vh" width="100vw">
        <Grid item xs={12} lg={4} height="fit-content">
          <Box paddingX={4} >
            <SearchInput />
            <SearchHistory />
          </Box>
        </Grid>
        <Grid item xs={12} lg={8}>
          <Stack height="100%" width="100%">
            <GoogleMapContainer defaultPosition={defaultPosition} />
          </Stack>
        </Grid>
      </Grid>

    </div>
  );
}

export default App;
