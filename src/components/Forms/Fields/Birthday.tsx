import React, { ReactNode } from 'react';
import { daysArray, monthsArray } from '@/constants/constants';
import { createYearsArray } from '@/helpers/dateHelpers';
import {
  Box,
  InputLabel,
  MenuItem,
  Select,
  SelectChangeEvent,
  Typography,
} from '@mui/material';

type Props = {
  errors: any;
  values: any;
  handleChange: (event: SelectChangeEvent<string>, child: ReactNode) => void;
  disabled: boolean;
};

export default function Birthday({
  errors,
  handleChange,
  values,
  disabled,
}: Props) {
  return (
    <div>
      <div>
        <Box>
          <InputLabel htmlFor="birthday" id="action-type-select-label">
            Birthday
          </InputLabel>
          <Box
            sx={{
              display: 'flex',
              width: '100%',
            }}
          >
            <Select
              name="birthday"
              labelId="action-type-select-label"
              id="action-type-select"
              label="Day"
              value={values.birthday}
              error={errors.birthday}
              onChange={handleChange}
              sx={{ mt: 1, mb: 2, minWidth: 60 }}
              disabled={disabled}
            >
              {daysArray.slice(1).map(day => (
                <MenuItem key={day} value={day}>
                  {day}
                </MenuItem>
              ))}
            </Select>

            <Select
              name="birthmonth"
              labelId="action-type-select-label"
              id="action-type-select"
              label="Month"
              value={values.birthmonth}
              error={errors.birthmonth}
              onChange={handleChange}
              sx={{ mt: 1, mb: 2, ml: 2, minWidth: 200 }}
              disabled={disabled}
            >
              {monthsArray.map(month => (
                <MenuItem key={month} value={month}>
                  {month}
                </MenuItem>
              ))}
            </Select>
          </Box>
        </Box>

        <div>
          <InputLabel htmlFor="birthyear" id="action-type-select-label">
            Year of Birth
          </InputLabel>

          <Select
            name="birthyear"
            labelId="action-type-select-label"
            id="action-type-select"
            label="Month"
            value={values.birthyear}
            error={errors.birthyear}
            onChange={handleChange}
            sx={{ mt: 1, mb: 2, minWidth: 200 }}
            disabled={disabled}
          >
            {createYearsArray('June 26, 1915 11:13:00')
              .reverse()
              .map(year => (
                <MenuItem key={year} value={year}>
                  {year}
                </MenuItem>
              ))}
          </Select>
        </div>
        <Box sx={{ mb: 2 }}>
          <Typography
            component="p"
            variant="body2"
            gutterBottom
            sx={{ fontStyle: 'italic' }}
          >
            If you don&apos;t know the brithday you can leave it blank
          </Typography>
        </Box>
      </div>
    </div>
  );
}
