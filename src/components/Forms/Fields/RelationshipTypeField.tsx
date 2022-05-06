import React, { ReactNode } from 'react';
import { InputLabel, MenuItem, Select, SelectChangeEvent } from '@mui/material';
import { relationshipTypeArray } from '@/constants/constants';
import { capitalizeFirstLetter } from '@/helpers/helpers';

type Props = {
  errors: any;
  values: any;
  handleChange: (event: SelectChangeEvent<string>, child: ReactNode) => void;
  disabled: boolean;
};

export default function RelationshipTypeField({
  errors,
  handleChange,
  values,
  disabled,
}: Props) {
  return (
    <>
      <InputLabel id="action-type-select-label">
        Choose Relationship Type*
      </InputLabel>
      <Select
        name="relationshiptype"
        labelId="action-type-select-label"
        id="action-type-select"
        label="Choose Relationship Type*"
        value={values.relationshiptype}
        error={errors.relationshiptype}
        onChange={handleChange}
        sx={{ mb: 2 }}
        disabled={disabled}
      >
        {relationshipTypeArray.map(relationship => (
          <MenuItem key={relationship} value={relationship}>
            {capitalizeFirstLetter(relationship)}
          </MenuItem>
        ))}
      </Select>
    </>
  );
}
