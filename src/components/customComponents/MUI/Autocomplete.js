import * as React from 'react';
import TextField from '@mui/material/TextField';
import MuiAutocomplete from '@mui/material/Autocomplete';
import CircularProgress from '@mui/material/CircularProgress';
import { Stack } from '@mui/material';

export default function Autocomplete({
  value,
  name,
  onChange,
  multiple,
  //onSearch is a async function which returns valid list of options taking the debounced Search Term
  onSearch,
  onTextFieldChange,
  autoFocus,
  searchOnMount,
  preOptions,
  textFieldSize,
  type,
  disableClearable,
  ...props
}) {
  const [open, setOpen] = React.useState(false);
  const [text, setText] = React.useState('');
  const [options, setOptions] = React.useState(preOptions ?? []);
  const loading = open && options?.length === 0;

  React.useEffect(() => {
    setOptions(preOptions);
  }, [preOptions]);

  React.useEffect(() => {
    if (!options) setOptions(preOptions);
  }, [options]);

  React.useEffect(() => {
    if (!onSearch) return;
    if (text) {
      try {
        onSearch(text).then((options) => {
          if (options) setOptions([...new Set(options)]);
        });
      } catch (error) {}
    }
    if (searchOnMount) {
      try {
        onSearch(text).then((options) => {
          setOptions([...new Set(options)]);
        });
      } catch (error) {}
    }
  }, [text]);

  React.useEffect(() => {
    if (!open) {
      setOptions(preOptions);
    }
  }, [open]);

  return (
    <MuiAutocomplete
      id={`autoCompleteInput${name}`}
      className="autocomplete_classname dropselect"
      sx={{
        '.MuiInputBase-root': {
          padding: 0.6,
        },
        '.MuiOutlinedInput-notchedOutline': {
          border: 0,
        },
        outline: 'none',
        '&.Mui-focused .MuiOutlinedInput-notchedOutline': {
          border: 'none',
          borderRadius: '5px',
        },
        border: 'none',
        '& fieldset': { border: 'none' },
        backgroundColor: 'white',
        borderRadius: 2,
      }}
      freeSolo
      clearOnBlur
      disableClearable={disableClearable}
      multiple={multiple}
      open={open}
      onOpen={() => {
        setOpen(true);
      }}
      onClose={() => {
        setOpen(false);
      }}
      value={value}
      onChange={onChange}
      name={name}
      getOptionLabel={(option) => option?.title ?? option}
      options={options ?? preOptions ?? []}
      loading={loading}
      renderOption={(props, option) => (
        <li
          {...props}
          key={option?.title ?? option}
          id={option?.title ?? option}
        >
          {option?.title ?? option}
        </li>
      )}
      renderInput={(params) => (
        <TextField
          id={`autoCompleteInput${params?.label}`}
          className="autocomplete_textfield_classname"
          {...params}
          {...props}
          autoFocus={autoFocus}
          value={value}
          size={textFieldSize || 'medium'}
          onChange={(e) => {
            setText(e.target.value);
            if (onTextFieldChange) {
              onTextFieldChange(e.target.value);
            }
          }}
          InputProps={{
            ...params.InputProps,
            endAdornment: (
              <>
                {loading ? (
                  <Stack alignItems="center">
                    <CircularProgress color="inherit" size={20} />
                  </Stack>
                ) : null}
                {params.InputProps.endAdornment}
              </>
            ),
          }}
        />
      )}
    />
  );
}
