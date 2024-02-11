import React, { useState } from "react";
import {
  Autocomplete,
  Box,
  Dialog,
  FormControl,
  InputLabel,
  MenuItem,
  Select,
  TextField,
  Typography,
} from "@mui/material";
import { styled } from "@mui/material/styles";
import Stepper from "@mui/material/Stepper";
import Step from "@mui/material/Step";
import StepLabel from "@mui/material/StepLabel";
import SettingsIcon from "@mui/icons-material/Settings";
import VideoLabelIcon from "@mui/icons-material/VideoLabel";
import StepConnector, { stepConnectorClasses } from "@mui/material/StepConnector";
import DetailsIcon from "@mui/icons-material/Details";
import Chip from "@mui/material/Chip";
import MUIRichTextEditor from "mui-rte";
import Card from "@mui/material/Card";
import ListSubheader from "@mui/material/ListSubheader";
import "./lab.css";
import MKTypography from "~/components/MKTypography";
import AddIcon from "@mui/icons-material/Add";
import MKButton from "~/components/MKButton";
import ArrowDropDownIcon from "@mui/icons-material/ArrowDropDown";
import DeleteOutlineIcon from "@mui/icons-material/DeleteOutline";
import { labPermissionsArr, allOptions } from "./Constant";
import { lighten, darken } from "@mui/system";
import Draft, { convertToRaw, convertFromHTML } from "draft-js";

/**
 * @author
 * @function LabConfiguration
 **/
const DialogTitleWrapper = styled("div")(
  () => `
  min-height: 60px;
  margin: 0px;
  -webkit-box-align: center;
  align-items: center;
  position: sticky;
  top: 0px;
  background: rgb(255, 255, 255);
  z-index: 99;
  border-bottom: 1px solid rgb(227, 235, 246);
`
);
const DialogBodyWrapper = styled("div")(
  () => `
    flex: 1 1 auto;
    padding: 24px;
    overflow-y: auto;
    background-color: rgb(239, 242, 245);
}
  `
);
const DialogActionsWrapper = styled("div")(
  () => `
    padding: 12px;
    height: 60px;
    border-top: 1px solid rgb(227, 235, 246);
    background: rgb(255, 255, 255);
}`
);

const ColorlibStepIconRoot = styled("div")(({ theme, ownerState }) => ({
  backgroundColor: theme.palette.mode === "dark" ? theme.palette.grey[700] : "#ccc",
  zIndex: 1,
  color: "#fff",
  width: 50,
  height: 50,
  display: "flex",
  borderRadius: "50%",
  justifyContent: "center",
  alignItems: "center",
  ...(ownerState.active && {
    backgroundImage:
      "linear-gradient( 136deg, rgb(39, 118, 245) 0%, rgb(48, 193, 255) 50%, rgb(99, 158, 247) 100%)",
    boxShadow: "0 4px 10px 0 rgba(0,0,0,.25)",
  }),
  ...(ownerState.completed && {
    backgroundImage:
      "linear-gradient( 136deg, rgb(39, 118, 245) 0%, rgb(48, 193, 255) 50%, rgb(99, 158, 247) 100%)",
  }),
}));

const ColorlibConnector = styled(StepConnector)(({ theme }) => ({
  [`&.${stepConnectorClasses.alternativeLabel}`]: {
    top: 22,
  },
  [`&.${stepConnectorClasses.active}`]: {
    [`& .${stepConnectorClasses.line}`]: {
      backgroundImage:
        "linear-gradient( 95deg,rgb(39, 118, 245) 0%,rgb(48, 193, 255) 50%,rgb(99, 158, 247) 100%)",
    },
  },
  [`&.${stepConnectorClasses.completed}`]: {
    [`& .${stepConnectorClasses.line}`]: {
      backgroundImage:
        "linear-gradient( 95deg,rgb(39, 118, 245) 0%,rgb(48, 193, 255) 50%,rgb(99, 158, 247) 100%)",
    },
  },
  [`& .${stepConnectorClasses.line}`]: {
    height: 3,
    border: 0,
    backgroundColor: theme.palette.mode === "dark" ? theme.palette.grey[800] : "#eaeaf0",
    borderRadius: 1,
  },
}));

function ColorlibStepIcon(props) {
  const { active, completed, className } = props;
  const icons = {
    1: <SettingsIcon />,
    2: <DetailsIcon />,
    3: <VideoLabelIcon />,
  };

  return (
    <ColorlibStepIconRoot ownerState={{ completed, active }} className={className}>
      {icons[String(props.icon)]}
    </ColorlibStepIconRoot>
  );
}

const labelKey = {
  "compute.instances.create": "Create new Compute Engine instances.",
  "compute.instances.delete": "Delete Compute Engine instances.",
  "compute.instances.start": "Start Compute Engine instances.",
  "storage.buckets.create": "Create new storage buckets.",
  "storage.objects.list": "List objects within a storage bucket.",
  "storage.objects.delete": "Delete objects within a storage bucket.",
};

const GroupHeader = styled("div")(({ theme }) => ({
  position: "sticky",
  top: "-8px",
  padding: "4px 10px",
  color: theme.palette.primary.main,
  backgroundColor:
    theme.palette.mode === "light"
      ? lighten(theme.palette.primary.light, 0.85)
      : darken(theme.palette.primary.main, 0.8),
}));

const GroupItems = styled("ul")({
  padding: 0,
});

const steps = ["Basic Details", "Step Configuration", "Labs Permissions"];
function LabConfiguration(props) {
  const editorEmptyObject = { label: "", editor: "" };
  const [labTitle, setLabTitle] = useState("");
  const [labDesc, setLabDesc] = useState("");
  const [cloudServices, setCloudServices] = useState([]);
  const [selectedPermissions, setSelectedPermissions] = useState([]);
  const [stepConfiguration, setStepConfiguration] = useState([editorEmptyObject]);
  const [step, setStep] = useState(1);

  const getStepContent = (step) => {
    switch (step) {
      case 1:
        return (
          <Card style={{ height: "auto", minHeight: "300px" }} className="p-2">
            <div className="d-flex justify-content-center">
              <div
                className="container position-relative"
                style={{ maxWidth: "1137px", minWidth: "1137px" }}
              >
                <div className="mb-3">
                  <TextField
                    type="text"
                    label="Lab title"
                    value={labTitle}
                    onChange={(e) => setLabTitle(e.target.value)}
                    fullWidth
                  />
                </div>
                <div className="mb-2">
                  <TextField
                    type="text"
                    label="Lab Description"
                    fullWidth
                    multiline
                    rows={5}
                    value={labDesc}
                    onChange={(e) => setLabDesc(e.target.value)}
                  />
                </div>

                <Box sx={{ minWidth: 120, minHeight: 120 }}>
                  <FormControl fullWidth style={{ minHeight: "40px" }}>
                    <InputLabel id="demo-simple-select-label">Select Cloud Platform</InputLabel>
                    <Select
                      labelId="demo-simple-select-label"
                      id="demo-simple-select"
                      value={cloudServices}
                      label="Select Cloud Platform"
                      multiple
                      onChange={handleChange}
                      style={{ minHeight: "50px" }}
                      IconComponent={ArrowDropDownIcon}
                      renderValue={(selected) => (
                        <Box sx={{ display: "flex", flexWrap: "wrap", gap: 0.5 }}>
                          {selected.map((value) => (
                            <Chip key={value} label={value} />
                          ))}
                        </Box>
                      )}
                    >
                      <MenuItem value={"AZURE"}>AZURE</MenuItem>
                      <MenuItem value={"GCP"}>GCP</MenuItem>
                      <MenuItem value={"AWS"}>AWS</MenuItem>
                    </Select>
                  </FormControl>
                </Box>
              </div>
            </div>
          </Card>
        );
      case 2:
        return (
          <>
            {stepConfiguration.map((step, index) => (
              <Card key={index} style={{ height: "auto", minHeight: "300px" }} className="p-3 mb-3">
                <div className="cursor-pointer mb-2 text-right" onClick={() => deleteStep(index)}>
                  <DeleteOutlineIcon />
                </div>
                <div className="d-flex justify-content-center">
                  <div
                    className="container position-relative"
                    style={{ maxWidth: "1137px", minWidth: "1137px" }}
                  >
                    <div className="mb-3">
                      <TextField
                        type="text"
                        label="Step title"
                        fullWidth
                        value={step.label}
                        onChange={(e) => updateStep(index, e.target.value)}
                      />
                    </div>
                    <div className="mb-2">
                      <MUIRichTextEditor
                        label="Step Description ..."
                        defaultValue={step.editor}
                        onChange={(e) => updateStepEditor(index, e)}
                        onSave={(e) => handleEditorSave(index, e)}
                        onBlur={() => updateStepEditor(index)}
                      />
                    </div>
                  </div>
                </div>
              </Card>
            ))}

            <div className="text-right">
              <span className="mt-2 cursor-pointer" onClick={addNewStep}>
                <AddIcon /> Add new step
              </span>
            </div>
          </>
        );
      case 3:
        return (
          <Card style={{ height: "auto", minHeight: "300px" }} className="p-2">
            <div className="d-flex justify-content-center">
              <div
                className="container position-relative"
                style={{ maxWidth: "1137px", minWidth: "1137px" }}
              >
                <MKTypography fontWeight="regular">
                  Here you can set the permissions for cloud services that you have selected
                </MKTypography>
                <FormControl sx={{ m: 1 }} fullWidth style={{ minHeight: "40px" }}>
                  {/* <InputLabel htmlFor="grouped-select">
                    Permission for selected cloud service
                  </InputLabel> */}
                  {/*<Select
                    defaultValue=""
                    id="grouped-select"
                    label="Permission for selected cloud service"
                    style={{ minHeight: "50px" }}
                    multiple
                    value={selectedPermissions}
                    renderValue={(selected) => (
                      <Box sx={{ display: "flex", flexWrap: "wrap", gap: 0.5 }}>
                        {selected.map((value) => (
                          <Chip key={value} label={labelKey[value]} />
                        ))}
                      </Box>
                    )}
                    onChange={handleChangePermissions}
                    MenuProps={{
                      anchorOrigin: {
                        vertical: "bottom",
                        horizontal: "center",
                      },
                      getContentAnchorEl: null,
                      PaperProps: {
                        style: {
                          height: "250px",
                          overflowY: "scroll",
                        },
                      },
                    }}
                  >
                    {labPermissionsArr.map((labPermissionObj, indexP) => (
                      <div key={indexP}>
                        <ListSubheader>{labPermissionObj.listHeading}</ListSubheader>
                        {labPermissionObj.options.map((item, index) => (
                          <MenuItem key={index} value={item.value}>
                            {item.label}
                          </MenuItem>
                        ))}
                      </div>
                    ))}
                     <MenuItem value="">
                      <em>None</em>
                    </MenuItem> 

                    <MenuItem value={"compute.instances.create"}>
                      Create new Compute Engine instances.
                    </MenuItem>
                    <MenuItem value={"compute.instances.delete"}>
                      Delete Compute Engine instances.
                    </MenuItem>
                    <MenuItem value={"compute.instances.start"}>
                      Start Compute Engine instances.
                    </MenuItem>
                    <ListSubheader>GCP Storage Permissions:</ListSubheader>
                    <MenuItem value={"storage.buckets.create"}>
                      Create new storage buckets.
                    </MenuItem>
                    <MenuItem value={"storage.objects.list"}>
                      List objects within a storage bucket.
                    </MenuItem>
                    <MenuItem value={"storage.objects.delete"}>
                      Delete objects within a storage bucket.
                    </MenuItem>
                    <ListSubheader>AWS</ListSubheader>
                    <MenuItem value={3}>Option 3</MenuItem>
                    <MenuItem value={4}>Option 4</MenuItem>
                    <ListSubheader>AZURE</ListSubheader>
                    <MenuItem value={3}>Option 3</MenuItem>
                    <MenuItem value={4}>Option 4</MenuItem> 
                  </Select>*/}
                  <Autocomplete
                    id="grouped-demo"
                    multiple
                    onChange={handleChangePermissions}
                    value={selectedPermissions}
                    options={allOptions}
                    groupBy={(option) => option.groupBy}
                    getOptionLabel={(option) => option.label}
                    // sx={{ width: 300 }}
                    renderInput={(params) => <TextField {...params} label="" />}
                    renderTags={(value, getTagProps) =>
                      value.map((option, index) => (
                        <Chip
                          key={index}
                          // variant="outlined"
                          label={option.label}
                          {...getTagProps({ index })}
                          // style={{ backgroundColor: "rgba(0, 0, 0, 0.08)", color: "black" }}
                        />
                      ))
                    }
                    // renderGroup={(params) => (
                    //   <li key={params.key}>
                    //     <GroupHeader>{params.group}</GroupHeader>
                    //     <GroupItems>{params.children}</GroupItems>
                    //   </li>
                    // )}
                  />
                </FormControl>
              </div>
            </div>
          </Card>
        );
    }
  };
  const handleChange = (event) => {
    const {
      target: { value },
    } = event;
    setCloudServices(
      // On autofill we get a stringified value.
      typeof value === "string" ? value.split(",") : value
    );
  };

  const handleChangePermissions = (event, newValue) => {
    console.log("event", newValue);
    // const {
    //   target: { value },
    // } = event;
    // setSelectedPermissions(
    //   // On autofill we get a stringified value.
    //   typeof value === "string" ? value.split(",") : value
    // );
    setSelectedPermissions(newValue);
  };
  const handleStep = (next) => {
    console.log("cloudServices:", cloudServices);
    console.log("selectedPermissions:", selectedPermissions);
    console.log("stepConfiguration:", stepConfiguration);
    console.log("step:", step);
    console.log("labTitle:", labTitle);
    console.log("labDesc:", labDesc);
    if (next) {
      if (steps.length === step) return;
      setStep((prevStep) => prevStep + 1);
    } else {
      if (step === 1) return;
      setStep((prevStep) => prevStep - 1);
    }
  };

  const addNewStep = () => {
    const temp = JSON.parse(JSON.stringify(stepConfiguration));
    temp.push(editorEmptyObject);
    setStepConfiguration(temp);
  };

  const deleteStep = (index) => {
    let temp = JSON.parse(JSON.stringify(stepConfiguration));
    temp.splice(index, 1);
    if (temp.length === 0) {
      temp.push(editorEmptyObject);
    }
    setStepConfiguration(temp);
  };

  const updateStep = (index, value) => {
    let temp = JSON.parse(JSON.stringify(stepConfiguration));
    temp[index].label = value;
    setStepConfiguration(temp);
  };

  const handleEditorSave = (index, value) => {
    let temp = JSON.parse(JSON.stringify(stepConfiguration));
    temp[index].editor = value;
    setStepConfiguration(temp);
  };

  const updateStepEditor = (index, value) => {
    let temp = JSON.parse(JSON.stringify(stepConfiguration));
    if (value) {
      temp[index].editorHTML = Draft.convertToRaw(value.getCurrentContent());
    } else {
      temp[index].editor = temp[index].editorHTML ? JSON.stringify(temp[index].editorHTML) : "";
    }
    setStepConfiguration(temp);
  };

  return (
    <Dialog fullScreen open={true}>
      <DialogTitleWrapper>
        <div className="align-items-center container d-flex h-100 justify-content-sm-between">
          Labs Configuration
        </div>
      </DialogTitleWrapper>
      <DialogBodyWrapper>
        <div className="container">
          <Stepper alternativeLabel activeStep={step - 1} connector={<ColorlibConnector />}>
            {steps.map((label) => (
              <Step key={label}>
                <StepLabel StepIconComponent={ColorlibStepIcon}>
                  <div style={{ color: "#639ef7" }}>{label}</div>
                </StepLabel>
                {/* <StepContent className="d-flex justify-content-center mt-3 align-content-center">
                <MKInput type="text" label="Lab title" fullWidth />
              </StepContent> */}
              </Step>
            ))}
          </Stepper>
          {getStepContent(step)}
        </div>
      </DialogBodyWrapper>
      <DialogActionsWrapper>
        <div className="d-flex align-items-center justify-content-between m-auto container">
          <MKButton variant="gradient" onClick={() => handleStep(false)}>
            {step == 1 ? "Cancel" : "Back"}
          </MKButton>
          <MKButton variant="gradient" color="info" onClick={() => handleStep(true)}>
            Next
          </MKButton>
        </div>
      </DialogActionsWrapper>
    </Dialog>
  );
}

export default LabConfiguration;
