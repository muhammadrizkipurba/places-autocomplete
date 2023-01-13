import { useCallback, useEffect, useState } from "react";
import { Autocomplete, Stack, TextField } from "@mui/material";
import { Box } from "@mui/system";

const SearchInput = () => {
  const [input, setInput] = useState("");
  const [searchResults, setSearchResults] = useState([]);

  const fetchPlaces = useCallback(() => {
    if(input) {
      // fetch(`https://maps.googleapis.com/maps/api/place/autocomplete/json?input=${input}&key=AIzaSyDGa5iWVYcZgDmGePKr1YsfJ3gzPcb8yLk`)
      fetch(`https://maps.googleapis.com/maps/api/place/autocomplete/json?input=${input}&key=${process.env.REACT_APP_GOOGLE_API_KEY}`, {
        method: "GET",
        headers: {
          "Access-Control-Allow-Origin": "*"
        }
      })
      .then(response => response.json())
      .then((json) => setSearchResults(json.data));
    };

    return;
  }, [input])
  

  useEffect(() => {
    fetchPlaces();
  }, [fetchPlaces]);

  return (
    <Stack sx={{width: 500}} marginX="auto" marginY="5rem">
      <Autocomplete 
        id="place-search-input"
        getOptionLabel={(searchResults) => `${searchResults.first_name} ${searchResults.last_name}`}
        options={searchResults}
        sx={{
          width: 500
        }}
        isOptionEqualToValue={(option, value) => {
          return option.first_name === value.first_name
        }}
        noOptionsText="No places found. Please use another keywords"
        renderOption={(props, searchResults) => (
          <Box component="li" {...props} key={searchResults.id}>
            {searchResults.first_name} {searchResults.last_name}
          </Box>
        )}
        renderInput={(params) => (
          <TextField {...params} label="Search place" onChange={({target}) => setInput(target.value)} />
        )}
      />
    </Stack>
  )
}

export default SearchInput