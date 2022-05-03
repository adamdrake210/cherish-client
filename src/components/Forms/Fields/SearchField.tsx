import React from 'react';
import { Box } from '@mui/system';

import TextField from '@mui/material/TextField';
import InputAdornment from '@mui/material/InputAdornment';
import SearchIcon from '@mui/icons-material/Search';
import { grey } from '@mui/material/colors';

type Props = {
  handleChange: (arg: any) => void;
};

export const SearchField = ({ handleChange }: Props) => {
  return (
    <Box sx={{ display: 'flex', justifyContent: 'center', mt: 2 }}>
      <TextField
        type="text"
        variant="outlined"
        placeholder="Search Peeps..."
        sx={{
          width: 300,
          border: `1px solid ${grey[300]}`,
          borderRadius: '5px',
        }}
        onChange={e => handleChange(e)}
        InputProps={{
          startAdornment: (
            <InputAdornment position="start">
              <SearchIcon sx={{ color: grey[400] }} />
            </InputAdornment>
          ),
        }}
      />
    </Box>
  );
};
