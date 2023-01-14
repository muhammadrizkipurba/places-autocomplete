import { useCallback, useEffect, useState } from "react";
import { Autocomplete, Stack, TextField } from "@mui/material";
import { Box } from "@mui/system";
import axios from "axios";

const SearchInput = ({ setSelectedPlace }) => {
  const [input, setInput] = useState("");
  const [searchResults, setSearchResults] = useState([]);

  const fetchPlaces = useCallback(() => {
    if (input) {
      axios
        .get(
          `/maps/api/place/autocomplete/json?input=${input}&key=${process.env.REACT_APP_GOOGLE_API_KEY}`
        )
        .then((response) => {
          if(response.data) return setSearchResults(response.data.predictions);
        })
    }

    return;
  }, [input]);

  useEffect(() => {
    fetchPlaces();
  }, [fetchPlaces]);

  return (
    <Stack marginX="auto" marginY="2rem">
      <Autocomplete
        id="place-search-input"
        getOptionLabel={(searchResults) =>
          `${searchResults.description}`
        }
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
        onChange={(event, value) => {
          setInput(event.target.value);
          setSelectedPlace(value)
        }}
        renderInput={(params) => (
          <TextField
            {...params}
            label="Search place"
            style={{
              backgroundColor: "white"
            }}
            onChange={({ target }) => setInput(target.value)}
          />
        )}
      />
    </Stack>
  );
};

export default SearchInput;
