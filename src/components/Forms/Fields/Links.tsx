import React from 'react';
import { FieldArray, getIn, FormikErrors } from 'formik';
import {
  Box,
  Button,
  TextField,
  Typography,
  IconButton,
  Tooltip,
} from '@mui/material';
import AddCircleOutlineIcon from '@mui/icons-material/AddCircleOutline';
import RemoveCircleOutlineIcon from '@mui/icons-material/RemoveCircleOutline';
import { PersonFormValues } from '../PersonForm';

type Props = {
  values: PersonFormValues;
  touched: any;
  errors: FormikErrors<PersonFormValues>;
  handleChange: (event: React.ChangeEvent<any>) => void;
  handleBlur: (event: React.FocusEvent<any>) => void;
};

export default function Links({
  values,
  touched,
  errors,
  handleChange,
  handleBlur,
}: Props) {
  return (
    <Box
      sx={{
        display: 'flex',
        flexDirection: 'column',
        width: '100%',
        mb: 2,
      }}
    >
      <Typography component="h3" variant="h5" gutterBottom>
        Useful Links
      </Typography>
      <FieldArray name="links">
        {({ push, remove }) => (
          <div>
            {values.links && values.links.length > 0 ? (
              <>
                <>
                  {values.links.map((link, index) => {
                    const linkName = `links.${index}`;
                    const touchedLinkName = getIn(touched, linkName);
                    const errorLinkName = getIn(errors, linkName);

                    return (
                      <div key={index}>
                        <Box
                          sx={{
                            display: 'flex',
                            alignItems: 'center',
                          }}
                        >
                          <TextField
                            sx={{ width: '100%' }}
                            margin="normal"
                            variant="outlined"
                            label={`Link #${index + 1}*`}
                            name={`links.${index}`}
                            value={link}
                            helperText={
                              touchedLinkName && errorLinkName
                                ? errorLinkName
                                : ''
                            }
                            error={Boolean(touchedLinkName && errorLinkName)}
                            onChange={handleChange}
                            onBlur={handleBlur}
                          />
                          <Tooltip title="Remove Link">
                            <IconButton
                              aria-label="Remove this link"
                              onClick={() => remove(index)} // remove a link from the list
                            >
                              <RemoveCircleOutlineIcon color="secondary" />
                            </IconButton>
                          </Tooltip>
                        </Box>
                      </div>
                    );
                  })}
                </>
                <Box
                  sx={{
                    display: 'flex',
                    width: '100%',
                    justifyContent: 'center',
                  }}
                >
                  <Tooltip title="Add new link">
                    <IconButton
                      aria-label="Add new link"
                      onClick={() => push('')} // insert an empty string at a position
                    >
                      <AddCircleOutlineIcon color="primary" />
                    </IconButton>
                  </Tooltip>
                </Box>
              </>
            ) : (
              <Button
                type="button"
                onClick={() => push('')}
                variant="contained"
                color="secondary"
              >
                {/* show this when user has removed all links from the list */}
                Add a link
              </Button>
            )}
          </div>
        )}
      </FieldArray>
    </Box>
  );
}
