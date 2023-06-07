import React, { useEffect, useState } from "react";
import Accordion from "@mui/material/Accordion";
import AccordionSummary from "@mui/material/AccordionSummary";
import AccordionDetails from "@mui/material/AccordionDetails";
import Typography from "@mui/material/Typography";
import ExpandMoreIcon from "@mui/icons-material/ExpandMore";
import { red } from "@mui/material/colors";
import Checkbox from "@mui/material/Checkbox";
import "../assets/css/filter.css";

const FilterComponent = ({onClickScope , onClickType}) => {
  const [scopeSelected, setScopeSelected] = useState("all");
  const [typeSelected, setTypeSelected] = useState("all");
  const searchScope = [
    {
      type: "all",
      text: "All",
    },
    {
      type: "name",
      text: "Title",
    },
    {
      type: "description",
      text: "Description",
    },
  ];
  const formats = [
    {
      type: "all",
      text: "All",
    },
    {
      type: "image",
      text: "Image",
    },
    {
      type: "video",
      text: "Video",
    },
  ];

  const onClickCheckboxScope = (e) => {
    onClickScope(e)
    setScopeSelected(e.type);
  };
  const onClickCheckboxFileType = (e) => {
    onClickType(e)
    setTypeSelected(e.type);
  };

  return (
    <div className="">
      <Accordion className="filter-div m-0" style={{ margin: "0px" }} defaultExpanded={true}>
        <AccordionSummary
          className="accord-header m-0"
          style={{ padding: "0px" }}
          expandIcon={<ExpandMoreIcon />}
          aria-controls="panel1a-content"
          id="panel1a-header"
        >
          <text className="text-red weight-700">General Options</text>
          {/* <Typography className="">General Options</Typography> */}
        </AccordionSummary>
        <div>
          <div className="container-fluid p-0">
            <div className="row scope mt-2 p-0">Search Scope</div>
            <div className="row">
              {searchScope.length ? (
                searchScope.map((m, index) => (
                  <div className="col-6 p-0">
                    <Checkbox
                      className="mr-5"
                      onClick={(e) => onClickCheckboxScope(m)}
                      defaultChecked={m.type == scopeSelected ? true : false}
                      checked={m.type == scopeSelected ? true : false}
                      style={{ marginRight: "5px" }}
                      sx={{
                        color: red[900],
                        "&.Mui-checked": {
                          color: red[900],
                        },
                      }}
                    />
                    <text className="scope-text">{m.text}</text>
                  </div>
                ))
              ) : (
                <></>
              )}
            </div>
          </div>
        </div>
        <div>
          <div className="container-fluid p-0">
            <div className="row scope mt-2 p-0">File Formats</div>
            <div className="row">
              {formats.length ? (
                formats.map((m, index) => (
                  <div className="col-6 p-0">
                    <Checkbox
                      className="mr-5"
                      onClick={(e) => onClickCheckboxFileType(m)}
                      defaultChecked={m.type == typeSelected ? true : false}
                      checked={m.type == typeSelected ? true : false}
                      style={{ marginRight: "5px" }}
                      sx={{
                        color: red[900],
                        "&.Mui-checked": {
                          color: red[900],
                        },
                      }}
                    />
                    <text className="scope-text">{m.text}</text>
                  </div>
                ))
              ) : (
                <></>
              )}
            </div>
          </div>
        </div>
      </Accordion>
    </div>
  );
};

export default FilterComponent;
