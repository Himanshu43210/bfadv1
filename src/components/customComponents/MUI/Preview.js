import { useDispatch, useSelector } from "react-redux";
import { useEffect, useState } from "react";
import { Formik, Form as FormikForm } from "formik";
import Button from "@mui/material/Button";
import Card from "@mui/material/Card";
import CardHeader from "@mui/material/CardHeader";
import CardContent from "@mui/material/CardContent";
import CardActions from "@mui/material/CardActions";
import LinearProgress from "@mui/material/LinearProgress";
import IconButton from "@mui/material/IconButton";
import EditIcon from "@mui/icons-material/Edit";
import SaveIcon from "@mui/icons-material/Save";
import CancelIcon from "@mui/icons-material/Cancel";
import Modal from "../MUI/Modal";
import CircularProgress from "../MUI/CircularProgress";
import useMaster from "../../hooks/useMaster";
import FormLayout from "../FormLayout";
import * as actions from "../../store/creators/index";
import { RestartAltOutlined, SearchOutlined } from "@mui/icons-material";
import { Stack } from "@mui/material";

//TODO: component "Update" and "Insert" are almost same difference is on "<IconButton />" & "<Button />" *(FIXED)
function Update({
  Form,
  onSubmit,
  initialValues,
  title,
  getFields,
  collection,
  ...props
}) {
  const [open, setOpen] = useState(false);
  const master = useMaster(collection);
  const dispatch = useDispatch();
  const cache = useSelector((state) => state.cacheReducer);

  function getSectorMap(map) {
    const result = {};
    if (!map) return {};
    map?.forEach(({ sectorNumber, plotNumbers, roadWidths, sizes }) => {
      result[sectorNumber] = {
        plotNumbers,
        roadWidths,
        sizes,
      };
    });
    return result;
  }

  function submit(values, { setSubmitting }) {
    dispatch(
      actions.update(
        collection,
        {
          ...values,
          ...(typeof values.parkFacing === "boolean" && {
            parkFacing: values.parkFacing ? "Y" : "N",
          }),
          ...(typeof values.cornerPlot === "boolean" && {
            cornerPlot: values.cornerPlot ? "Y" : "N",
          }),
          lastUpdatedOn: new Date(),
        },
        setSubmitting,
        () => setOpen(false)
      )
    );
  }

  return (
    <>
      <IconButton
        variant="outlined"
        onClick={() => {
          setOpen((open) => !open);
        }}
        color="primary"
      >
        <EditIcon />
      </IconButton>
      <Formik initialValues={initialValues} onSubmit={submit}>
        {(formProps) => (
          <Modal
            open={open}
            onClose={() =>
              formProps.isSubmitting ? setOpen((open) => open) : setOpen(false)
            }
          >
            {master.loaded ? (
              <Card>
                <CardHeader title={title} />
                {formProps.isSubmitting && <LinearProgress />}
                <FormikForm>
                  <CardContent>
                    <FormLayout
                      disabled
                      getFields={getFields}
                      list={master.configs.list}
                      sectorMap={getSectorMap(cache.sectorMaps)}
                      {...props}
                    />
                  </CardContent>
                  <CardActions>
                    <Button
                      type="reset"
                      color="error"
                      variant="outlined"
                      disabled={formProps.isSubmitting}
                      startIcon={<RestartAltOutlined />}
                      className="buttonstyle"
                    >
                      Reset
                    </Button>
                    <Button
                      type="submit"
                      color="success"
                      variant="outlined"
                      disabled={formProps.isSubmitting}
                      startIcon={<SearchOutlined />}
                      className="buttonstyle"
                    >
                      Submit
                    </Button>
                  </CardActions>
                </FormikForm>
              </Card>
            ) : (
              <Stack alignItems="center">
                <CircularProgress />
              </Stack>
            )}
          </Modal>
        )}
      </Formik>
    </>
  );
}

export default Update;
