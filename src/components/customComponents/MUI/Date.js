import TextField from '@mui/material/TextField';
import { AdapterDateFns } from '@mui/x-date-pickers/AdapterDateFns';
import { LocalizationProvider } from '@mui/x-date-pickers/LocalizationProvider';
import { DesktopDatePicker } from '@mui/x-date-pickers/DesktopDatePicker';

function Date({ ...props }) {
  //formik.handleChange doesn't work because somehow the event does not pass to handleChange
  //FIX: `helperText` prop on a DOM element
  return (
    <LocalizationProvider dateAdapter={AdapterDateFns}>
      <DesktopDatePicker
        label={props.label}
        value={props?.value}
        inputFormat="dd/MM/yyyy"
        renderInput={(params) => (
          <TextField
            sx={{
              border: 'none',
              '& fieldset': { border: 'none' },
              backgroundColor: 'white',
              borderRadius: 2,
              marginTop: 0.5,
            }}
            fullWidth
            {...params}
          />
        )}
        {...props}
      />
    </LocalizationProvider>
  );
}

export default Date;
