import { useEffect, useRef } from "react";
import { connect } from "react-redux";
import { Button, InputAdornment, Stack, TextField } from "@mui/material";

import CloseIcon from '@mui/icons-material/Close';

import { addPlaceHistory, setSelectedPlace } from "../redux/actions";

const ClearInputButton = ({ onClick }) => {
  return (
    <InputAdornment position="end">
      <Button onClick={onClick} variant="text" size="small" style={{padding: 0, minWidth: 0}}>
        <CloseIcon htmlColor="black" />
      </Button>
    </InputAdornment>
  )
}

const SearchInput = ({ selectedPlace, setSelectedPlace, addPlaceHistory }) => {
  const autoCompleteRef = useRef();
  const inputRef = useRef();

  useEffect(() => {
    if (selectedPlace) {
      inputRef.current.value = `${selectedPlace.name}, ${selectedPlace.address}`;
    }
  }, [selectedPlace]);

  useEffect(() => {
    autoCompleteRef.current = new window.google.maps.places.Autocomplete(
      inputRef.current
    );
    autoCompleteRef.current.addListener("place_changed", async function () {
      const place = await autoCompleteRef.current.getPlace();

      // SAVE SELECTED PLACE HISTORY
      const { place_id, name, formatted_address, geometry } = place;
      const parsed_geometry = {
        lat: geometry.location.lat(),
        lng: geometry.location.lng(),
      };

      const payload = {
        place_id,
        name,
        address: formatted_address,
        geometry: parsed_geometry,
      };

      setSelectedPlace(payload);
      addPlaceHistory(payload);
    });
  }, [addPlaceHistory, setSelectedPlace]);

  useEffect(() => {
    const close = document.getElementsByClassName(
      "MuiAutocomplete-clearIndicator"
    )[0];

    // Add a Click Event Listener to the button
    if (close) {
      close.addEventListener("click", () => {
        setSelectedPlace(null);
      });
    }
  });

  const clearInputHandler = () => {
    if(inputRef.current.value) inputRef.current.value = "";
    setSelectedPlace(null);
  };

  return (
    <Stack marginX="auto" marginY="2rem">
      <TextField
        inputRef={(input) => (inputRef.current = input)}
        label="Search place"
        className="pac-target-input"
        style={{
          backgroundColor: "white",
        }}
        InputProps={{
          endAdornment: <ClearInputButton onClick={clearInputHandler} />
        }}
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
  addPlaceHistory,
  setSelectedPlace,
})(SearchInput);
