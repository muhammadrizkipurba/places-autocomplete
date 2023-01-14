import axios from "axios";
import { useCallback, useEffect, useMemo, useState } from "react";
import { Autocomplete, Stack, TextField } from "@mui/material";
import { Box } from "@mui/system";
import {
  getPlaceDetails,
  addPlaceHistory,
  setSelectedPlace,
} from "../redux/actions";
import { connect } from "react-redux";

const SearchInput = ({
  setPosition,
  selectedPlace,
  setSelectedPlace,
  getPlaceDetails,
  addPlaceHistory,
}) => {
  const [input, setInput] = useState("");
  const [searchResults, setSearchResults] = useState([]);

  const fetchPlaces = useCallback(() => {
    if (input) {
      axios({
        method: "GET",
        url: `https://cors-anywhere.herokuapp.com/https://maps.googleapis.com/maps/api/place/autocomplete/json?input=${input}&key=${process.env.REACT_APP_GOOGLE_API_KEY}`,
        headers: {}
      }).then((response) => {
        if (response.data && response.data.predictions)
          return setSearchResults(response.data.predictions);
      });
    }

    return;
  }, [input]);

  useEffect(() => {
    fetchPlaces();
  }, [fetchPlaces]);

  useEffect(() => {
    const close = document.getElementsByClassName(
      "MuiAutocomplete-clearIndicator"
    )[0];
      
    // Add a Click Event Listener to the button
    if(close) {
      close.addEventListener("click", () => {
        setSelectedPlace(null);
      });
    }
  });
  

  useMemo(async () => {
    try {
      if (selectedPlace) {
        const placePosition = await getPlaceDetails(selectedPlace.place_id);
        return setPosition(placePosition.result.geometry.location);
      }
      return;
    } catch (error) {
      console.log(error);
    }
  }, [selectedPlace, getPlaceDetails, setPosition]);

  const onSelectHandler = (value) => {
    setSelectedPlace(value);

    // SAVE SELECTED PLACE HISTORY
    const { place_id, description, terms } = value;
    const payload = {
      place_id,
      description,
      terms,
    };

    addPlaceHistory(payload);
  };

  return (
    <Stack marginX="auto" marginY="2rem">
      <Autocomplete
        id="place-search-input"
        getOptionLabel={(searchResults) => `${searchResults.description}`}
        options={searchResults}
        sx={{
          width: "100%",
        }}
        isOptionEqualToValue={(option, value) => {
          return option.description === value.description;
        }}
        noOptionsText="No places found. Please use another keywords"
        renderOption={(props, searchResults) => (
          <Box component="li" {...props} key={searchResults.reference}>
            {searchResults.description}
          </Box>
        )}
        value={selectedPlace}
        onChange={(event, value) => {
          setInput(event.target.value);
          if (value) {
            onSelectHandler(value);
          }
        }}
        renderInput={(params) => (
          <TextField
            {...params}
            label="Search place"
            style={{
              backgroundColor: "white",
            }}
            onChange={({ target }) => setInput(target.value)}
          />
        )}
      />
    </Stack>
  );
};

const mapStateToProps = (state) => {
  const { selectedPlace } = state;
  return {
    selectedPlace,
  };
};

export default connect(mapStateToProps, {
  getPlaceDetails,
  addPlaceHistory,
  setSelectedPlace,
})(SearchInput);
