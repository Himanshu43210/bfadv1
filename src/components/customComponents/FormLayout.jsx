import { useFormikContext } from "formik";
import { Grid } from "@mui/material";

function FormLayout({ getFields, search, searchFields, disabled, ...props }) {
  const formProps = useFormikContext();

  return (
    <Grid container spacing={6}>
      {getFields({ formProps, ...props })?.map(
        (
          { span, Component, Search, searchProps, nonFormComponent, ...args },
          index
        ) => {
          if (args.noRender) return <></>;
          return search && searchFields?.includes(args.name) ? (
            <Grid key={index} item xs={span * 4}>
              {Search ? (
                <Search
                  value={formProps?.values[args.name]}
                  onChange={formProps?.handleChange}
                  error={
                    formProps?.touched[args.name] &&
                    Boolean(formProps?.errors[args.name])
                  }
                  helperText={
                    formProps?.touched[args.name] &&
                    formProps?.errors[args.name]
                  }
                  disabled={formProps?.isSubmitting || disabled}
                  {...args}
                  {...searchProps}
                />
              ) : nonFormComponent ? (
                <Component {...args} />
              ) : (
                <Component
                  value={formProps?.values[args.name]}
                  onChange={formProps?.handleChange}
                  error={
                    formProps?.touched[args.name] &&
                    Boolean(formProps?.errors[args.name])
                  }
                  helperText={
                    formProps?.touched[args.name] &&
                    formProps?.errors[args.name]
                  }
                  disabled={formProps?.isSubmitting || disabled}
                  {...args}
                  {...searchProps}
                />
              )}
            </Grid>
          ) : !search ? (
            <Grid key={index} item xs={span * 4}>
              <Component
                value={formProps?.values[args.name]}
                onChange={formProps?.handleChange}
                error={
                  formProps?.touched[args.name] &&
                  Boolean(formProps?.errors[args.name])
                }
                helperText={
                  formProps?.touched[args.name] && formProps?.errors[args.name]
                }
                disabled={formProps?.isSubmitting || disabled}
                {...args}
              />
            </Grid>
          ) : (
            <></>
          );
        }
      )}
    </Grid>
  );
}
export default FormLayout;
