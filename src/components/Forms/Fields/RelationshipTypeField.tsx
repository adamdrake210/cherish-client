import React, { ReactNode } from 'react';
import { InputLabel, MenuItem, Select, SelectChangeEvent } from '@mui/material';
import { relationshipTypeArray } from '@/constants/constants';
import { capitalizeFirstLetter } from '@/helpers/helpers';

type Props = {
  isEditable: boolean;
  errors: any;
  values: any;
  handleChange: (event: SelectChangeEvent<string>, child: ReactNode) => void;
};

export default function RelationshipTypeField({
  isEditable,
  errors,
  handleChange,
  values,
}: Props) {
  return (
    <>
      <InputLabel id="action-type-select-label">
        Choose Relationship Type*
      </InputLabel>
      <Select
        disabled={!isEditable}
        name="relationshiptype"
        labelId="action-type-select-label"
        id="action-type-select"
        label="Choose Relationship Type*"
        value={values.relationshiptype}
        error={errors.relationshiptype}
        onChange={handleChange}
        sx={{ mb: 2 }}
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
