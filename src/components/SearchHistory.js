import { connect } from "react-redux";
import {
  Box,
  Button,
  List,
  ListItem,
  Typography,
} from "@mui/material";
import { DeleteForever, Search } from "@mui/icons-material";

import { resetSearchHistory, setSelectedPlace } from "../redux/actions";

const SearchHistory = ({ history, resetSearchHistory, setSelectedPlace }) => {
  
  const onClearHistory = () => {
    setSelectedPlace(null);
    resetSearchHistory();
  };

  return (
    <Box>
      <Box
        display="flex"
        flexWrap="wrap"
        justifyContent="space-between"
        alignItems="center"
      >
        <Typography variant="string" fontWeight="bold">
          Search History
        </Typography>
        <Button onClick={onClearHistory} color="error" variant="outlined">
          <Box
            display="flex"
            flexWrap="wrap"
            justifyContent="center"
            alignItems="center"
          >
            <Typography variant="string" fontWeight="bold" marginRight="2px">
              Clear all
            </Typography>
            <DeleteForever fontSize="small" />
          </Box>
        </Button>
      </Box>
      <List style={{marginTop: "1rem"}}>
        { history.length > 0 &&
          history.reverse().map((item) => (
            <ListItem key={item.place_id} disablePadding>
              <Button style={{padding: '10px', borderRadius: 5, width: '100%'}} onClick={() => setSelectedPlace(item)}>
                <Box display="flex" flexDirection="row" alignItems="center" width="100%">
                  <Search fontSize="medium" htmlColor="black" />
                  <Box display="flex" flexDirection="column" alignItems="start" marginLeft={2}>
                    <Typography variant="string" color="black">{item.name}</Typography>
                    <Typography variant="caption" color="gray" textAlign="left">{item.address}</Typography>
                  </Box>
                </Box>
              </Button>
            </ListItem>
          ))}
      </List>
    </Box>
  );
};

const mapStateToProps = (state) => {
  const { history } = state;

  return {
    history,
  };
};

export default connect(mapStateToProps, { resetSearchHistory, setSelectedPlace })(SearchHistory);
