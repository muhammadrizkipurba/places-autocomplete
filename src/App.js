import { Box, Grid, Stack } from "@mui/material";
import SearchInput from "./components/SearchInput";
import GoogleMapContainer from "./components/GoogleMapContainer";
import { useState } from "react";

function App() {
  const [selectedPlace, setSelectedPlace] = useState(null);

  return (
    <div className="App">
      <Grid container spacing={0} height="100vh" width="100vw">
        <Grid item xs={12} lg={4} height="fit-content">
          <Box paddingX={4} >
            <SearchInput setSelectedPlace={setSelectedPlace} />
          </Box>
        </Grid>
        <Grid item xs={12} lg={8}>
          <Stack height="100%" width="100%">
            <GoogleMapContainer selectedPlace={selectedPlace} />
          </Stack>
        </Grid>
      </Grid>

    </div>
  );
}

export default App;
