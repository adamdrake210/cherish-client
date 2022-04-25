import { Control, Controller } from 'react-hook-form';
import makeStyles from '@mui/styles/makeStyles';
import { TextField } from '@mui/material';

const useStyles = makeStyles(() => ({
  inputField: {
    minWidth: 250,
  },
}));

type Props = {
  control: Control<any>;
  name: string;
  label: string;
  rules: any;
  type?: string;
  disabled?: boolean;
  placeholder?: string;
  helperText?: string;
  extraStyles?: any;
};

export default function ControlledTextField({
  control,
  name,
  label,
  rules,
  type,
  disabled,
  placeholder,
  helperText,
  extraStyles,
}: Props) {
  const classes = useStyles();

  return (
    <Controller
      name={name}
      control={control}
      defaultValue=""
      render={({ field, fieldState: { error } }) => (
        <TextField
          className={classes.inputField}
          sx={{ my: 2, ...extraStyles }}
          label={label}
          variant="outlined"
          fullWidth
          type={type}
          error={!!error}
          placeholder={placeholder}
          helperText={error ? error.message : helperText || null}
          value={field.value}
          disabled={disabled}
          onChange={field.onChange}
        />
      )}
      rules={rules}
    />
  );
}
