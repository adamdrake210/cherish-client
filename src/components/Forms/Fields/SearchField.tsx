import React from 'react';
import { makeStyles } from '@mui/styles';

import TextField from '@mui/material/TextField';
import InputAdornment from '@mui/material/InputAdornment';
import SearchIcon from '@mui/icons-material/Search';

const useStyles = makeStyles(() => ({
  searchField: {
    width: 300,
    backgroundColor: '#ffffff',
  },
}));

type Props = {
  handleChange: (arg: any) => void;
};

export const SearchField = ({ handleChange }: Props) => {
  const classes = useStyles();

  return (
    <div className="homepage-search">
      <TextField
        type="text"
        variant="outlined"
        placeholder="Search Peeps..."
        className={classes.searchField}
        onChange={e => handleChange(e)}
        InputProps={{
          startAdornment: (
            <InputAdornment position="start">
              <SearchIcon />
            </InputAdornment>
          ),
        }}
      />
    </div>
  );
};
